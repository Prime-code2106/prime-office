// Vercel serverless function for Daddy messaging platform
import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import { validatePhone, validateOTP, validateDisplayName, RateLimiter } from '../utils/validation';

const app = express();

// Environment variables validation
const JWT_SECRET = process.env.JWT_SECRET || 'daddy_messaging_super_secure_jwt_secret_key_2024_production_ready';

if (!JWT_SECRET || JWT_SECRET.length < 32) {
  console.error('❌ JWT_SECRET must be at least 32 characters long');
}

// Trust the proxy to get the correct client IP
app.set('trust proxy', 1);

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
});

app.use(cors({
  origin: [
    'https://daddy-liart.vercel.app',
    'https://*.vercel.app',
    'http://localhost:3000',
    'http://127.0.0.1:3000'
  ],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));

// --- In-Memory Database (Vercel Edge Functions) ---
// Note: In production, use Redis/PostgreSQL for persistence
interface OtpEntry {
  otp: string;
  expiresAt: number;
  attempts: number;
  createdAt: number;
}

interface User {
  id: string;
  phone_number: string;
  display_name: string | null;
  profile_picture_url: string | null;
  created_at: number;
  last_login: number;
  is_verified: boolean;
}

// Global storage (resets on cold starts - use Redis in production)
const otpCache = new Map<string, OtpEntry>();
const usersDb = new Map<string, User>();
const otpRateLimiter = new RateLimiter();
const authRateLimiter = new RateLimiter();

// Rate limiting for Vercel
const createRateLimit = (windowMs: number, max: number, message: string) => 
  rateLimit({
    windowMs,
    max,
    message: { error: message },
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => {
      return `${req.ip}-${req.get('User-Agent')?.slice(0, 50) || 'unknown'}`;
    },
    skip: (req) => {
      // Skip rate limiting for health checks
      return req.path === '/api/health';
    }
  });

const strictOtpLimiter = createRateLimit(
  15 * 60 * 1000, // 15 minutes
  5, // More lenient for testing
  'Too many OTP requests from this device. Please try again in 15 minutes.'
);

const authLimiter = createRateLimit(
  15 * 60 * 1000, // 15 minutes  
  15, // More lenient for testing
  'Too many authentication attempts. Please try again later.'
);

// --- API Routes ---

// API 1: Request OTP
app.post('/api/auth/request-otp', strictOtpLimiter, (req, res) => {
  const { phone_number } = req.body;

  // Validate phone number
  const phoneValidation = validatePhone(phone_number);
  if (!phoneValidation.isValid) {
    return res.status(400).json({ error: phoneValidation.error });
  }

  const sanitizedPhone = phoneValidation.sanitized!;

  // Additional rate limiting per phone number
  if (!otpRateLimiter.isAllowed(sanitizedPhone, 5, 15 * 60 * 1000)) {
    const remainingTime = Math.ceil(otpRateLimiter.getRemainingTime(sanitizedPhone) / 1000 / 60);
    return res.status(429).json({ 
      error: `Too many OTP requests for this number. Try again in ${remainingTime} minutes.` 
    });
  }

  // Generate OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
  // Save to cache
  otpCache.set(sanitizedPhone, {
    otp,
    expiresAt: Date.now() + (5 * 60 * 1000), // 5 minutes
    attempts: 0,
    createdAt: Date.now()
  });

  // Log OTP for testing (remove in production)
  console.log(`[TEST] OTP for ${sanitizedPhone}: ${otp}`);
  
  const response: any = { 
    message: 'OTP sent successfully', 
    success: true,
    expiresIn: 5 * 60,
    // Include OTP in response for testing (remove in production)
    otp: otp
  };

  res.json(response);
});

// API 2: Verify OTP
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
  if (!authRateLimiter.isAllowed(sanitizedPhone, 10, 15 * 60 * 1000)) {
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

  if (cacheEntry.attempts >= 5) {
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
    // Update last login
    user.last_login = Date.now();
    user.is_verified = true;
  }

  // Generate JWT token
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

  // Safe user data
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
    expiresIn: 7 * 24 * 60 * 60
  });
});

// JWT middleware
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

// API 3: Update Profile
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

  // Validate avatar URL
  if (avatar_url !== undefined) {
    if (typeof avatar_url === 'string' && avatar_url.length > 0) {
      if (avatar_url.length > 1024 * 1024) {
        return res.status(400).json({ error: 'Avatar image too large' });
      }
      user.profile_picture_url = avatar_url;
    } else {
      user.profile_picture_url = null;
    }
  }

  const safeUser = {
    id: user.id,
    phone_number: user.phone_number,
    display_name: user.display_name,
    profile_picture_url: user.profile_picture_url,
    is_verified: user.is_verified
  };

  res.json({ success: true, user: safeUser });
});

// Get current user
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

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    platform: 'vercel',
    users: usersDb.size,
    otps: otpCache.size
  });
});

// Error handling
app.use((err: any, req: any, res: any, next: any) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Export for Vercel
export default app;