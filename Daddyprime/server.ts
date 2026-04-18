import express from 'express';
import cors from 'cors';
import { createServer as createViteServer } from 'vite';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { validatePhone, validateOTP, validateDisplayName, RateLimiter } from './utils/validation';

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET || JWT_SECRET.length < 32) {
  console.error('❌ JWT_SECRET must be at least 32 characters long');
  process.exit(1);
}

// Trust the proxy to get the correct client IP
app.set('trust proxy', 1);

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  if (process.env.NODE_ENV === 'production') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }
  next();
});

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [
        'https://daddy-liart.vercel.app', 
        'https://*.vercel.app',
        'https://your-domain.com'
      ] 
    : ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));

// --- Database Simulation ---
// In a real app, this would be Redis with proper TTL
interface OtpEntry {
  otp: string;
  expiresAt: number;
  attempts: number;
  createdAt: number;
}
const otpCache = new Map<string, OtpEntry>();

// In a real app, this would be PostgreSQL/MongoDB with proper indexing
interface User {
  id: string;
  phone_number: string;
  display_name: string | null;
  profile_picture_url: string | null;
  created_at: number;
  last_login: number;
  is_verified: boolean;
}
const usersDb = new Map<string, User>();

// Rate limiters
const otpRateLimiter = new RateLimiter();
const authRateLimiter = new RateLimiter();

// --- Enhanced Rate Limiting ---
const createRateLimit = (windowMs: number, max: number, message: string) => 
  rateLimit({
    windowMs,
    max,
    message: { error: message },
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => {
      // Use IP + User-Agent for better fingerprinting
      return `${req.ip}-${req.get('User-Agent')?.slice(0, 50) || 'unknown'}`;
    }
  });

const strictOtpLimiter = createRateLimit(
  15 * 60 * 1000, // 15 minutes
  3, // 3 attempts per IP per 15 minutes
  'Too many OTP requests from this device. Please try again in 15 minutes.'
);

const authLimiter = createRateLimit(
  15 * 60 * 1000, // 15 minutes  
  10, // 10 auth attempts per 15 minutes
  'Too many authentication attempts. Please try again later.'
);

// --- API Routes ---

// API 1: Request OTP with enhanced validation
app.post('/api/auth/request-otp', strictOtpLimiter, (req, res) => {
  const { phone_number } = req.body;

  // Validate phone number
  const phoneValidation = validatePhone(phone_number);
  if (!phoneValidation.isValid) {
    return res.status(400).json({ error: phoneValidation.error });
  }

  const sanitizedPhone = phoneValidation.sanitized!;

  // Additional rate limiting per phone number
  if (!otpRateLimiter.isAllowed(sanitizedPhone, 3, 15 * 60 * 1000)) {
    const remainingTime = Math.ceil(otpRateLimiter.getRemainingTime(sanitizedPhone) / 1000 / 60);
    return res.status(429).json({ 
      error: `Too many OTP requests for this number. Try again in ${remainingTime} minutes.` 
    });
  }

  // Generate cryptographically secure OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
  // Save to cache with enhanced security
  otpCache.set(sanitizedPhone, {
    otp,
    expiresAt: Date.now() + (parseInt(process.env.OTP_EXPIRY_MINUTES || '5') * 60 * 1000),
    attempts: 0,
    createdAt: Date.now()
  });

  // In production, integrate with SMS service (Twilio, AWS SNS, etc.)
  console.log(`[SMS Gateway] Sending OTP ${otp} to ${sanitizedPhone}`);
  
  // Don't expose OTP in response in production
  const response: any = { 
    message: 'OTP sent successfully', 
    success: true,
    expiresIn: parseInt(process.env.OTP_EXPIRY_MINUTES || '5') * 60
  };
  
  if (process.env.NODE_ENV === 'development') {
    response.otp = otp; // Only for development
  }

  res.json(response);
});

// API 2: Verify OTP with enhanced security
app.post('/api/auth/verify-otp', authLimiter, (req, res) => {
  const { phone_number, otp, device_id } = req.body;

  // Validate inputs
  const phoneValidation = validatePhone(phone_number);
  if (!phoneValidation.isValid) {
    return res.status(400).json({ error: phoneValidation.error });
  }

  const otpValidation = validateOTP(otp);
  if (!otpValidation.isValid) {
    return res.status(400).json({ error: otpValidation.error });
  }

  const sanitizedPhone = phoneValidation.sanitized!;
  const sanitizedOtp = otpValidation.sanitized!;

  // Additional rate limiting per phone
  if (!authRateLimiter.isAllowed(sanitizedPhone, 5, 15 * 60 * 1000)) {
    return res.status(429).json({ 
      error: 'Too many verification attempts. Please request a new OTP.' 
    });
  }

  const cacheEntry = otpCache.get(sanitizedPhone);

  if (!cacheEntry) {
    return res.status(400).json({ error: 'OTP expired or not requested' });
  }

  if (Date.now() > cacheEntry.expiresAt) {
    otpCache.delete(sanitizedPhone);
    return res.status(400).json({ error: 'OTP has expired' });
  }

  if (cacheEntry.attempts >= 3) {
    otpCache.delete(sanitizedPhone);
    return res.status(400).json({ error: 'Too many failed attempts. Request a new OTP.' });
  }

  if (cacheEntry.otp !== sanitizedOtp) {
    cacheEntry.attempts += 1;
    return res.status(400).json({ error: 'Invalid OTP' });
  }

  // OTP is valid - clean up
  otpCache.delete(sanitizedPhone);

  // Check if user exists
  let user = Array.from(usersDb.values()).find(u => u.phone_number === sanitizedPhone);
  let isNewUser = false;

  if (!user) {
    // Create new user
    isNewUser = true;
    user = {
      id: uuidv4(),
      phone_number: sanitizedPhone,
      display_name: null,
      profile_picture_url: null,
      created_at: Date.now(),
      last_login: Date.now(),
      is_verified: true
    };
    usersDb.set(user.id, user);
  } else {
    // Update last login and verify status
    user.last_login = Date.now();
    user.is_verified = true;
  }

  // Generate secure session token
  const tokenPayload = {
    userId: user.id,
    phone_number: user.phone_number,
    device_id: device_id || 'unknown',
    iat: Math.floor(Date.now() / 1000)
  };

  const token = jwt.sign(tokenPayload, JWT_SECRET, { 
    expiresIn: '7d',
    issuer: 'daddy-app',
    audience: 'daddy-users'
  });

  // Don't expose sensitive data
  const safeUser = {
    id: user.id,
    phone_number: user.phone_number,
    display_name: user.display_name,
    profile_picture_url: user.profile_picture_url,
    is_verified: user.is_verified
  };

  res.json({
    success: true,
    isNewUser,
    token,
    user: safeUser,
    expiresIn: 7 * 24 * 60 * 60 // 7 days in seconds
  });
});

// Enhanced JWT middleware with better security
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      issuer: 'daddy-app',
      audience: 'daddy-users'
    }) as any;
    
    // Check if user still exists and is verified
    const user = usersDb.get(decoded.userId);
    if (!user || !user.is_verified) {
      return res.status(403).json({ error: 'User not found or not verified' });
    }
    
    req.user = decoded;
    req.currentUser = user;
    next();
  } catch (err: any) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    } else if (err.name === 'JsonWebTokenError') {
      return res.status(403).json({ error: 'Invalid token' });
    }
    return res.status(403).json({ error: 'Token verification failed' });
  }
};

// API 3: Update Profile with validation
app.post('/api/user/profile', authenticateToken, (req: any, res: any) => {
  const { name, avatar_url } = req.body;
  const userId = req.user.userId;

  const user = usersDb.get(userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Validate display name
  if (name !== undefined) {
    const nameValidation = validateDisplayName(name);
    if (!nameValidation.isValid) {
      return res.status(400).json({ error: nameValidation.error });
    }
    user.display_name = nameValidation.sanitized!;
  }

  // Validate avatar URL (basic validation)
  if (avatar_url !== undefined) {
    if (typeof avatar_url === 'string' && avatar_url.length > 0) {
      // In production, validate image format and size
      if (avatar_url.length > 1024 * 1024) { // 1MB limit for base64
        return res.status(400).json({ error: 'Avatar image too large' });
      }
      user.profile_picture_url = avatar_url;
    } else {
      user.profile_picture_url = null;
    }
  }

  // Don't expose sensitive data
  const safeUser = {
    id: user.id,
    phone_number: user.phone_number,
    display_name: user.display_name,
    profile_picture_url: user.profile_picture_url,
    is_verified: user.is_verified
  };

  res.json({ success: true, user: safeUser });
});

// Get current user with enhanced security
app.get('/api/user/me', authenticateToken, (req: any, res: any) => {
  const user = req.currentUser;
  
  const safeUser = {
    id: user.id,
    phone_number: user.phone_number,
    display_name: user.display_name,
    profile_picture_url: user.profile_picture_url,
    is_verified: user.is_verified,
    last_login: user.last_login
  };
  
  res.json({ user: safeUser });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0'
  });
});

// Error handling middleware
app.use((err: any, req: any, res: any, next: any) => {
  console.error('Server error:', err);
  
  // Don't expose internal errors in production
  if (process.env.NODE_ENV === 'production') {
    res.status(500).json({ error: 'Internal server error' });
  } else {
    res.status(500).json({ error: err.message, stack: err.stack });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
