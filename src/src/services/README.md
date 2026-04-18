# Services Directory

This directory contains API calls, utility functions, and external service integrations.

## Suggested Services

1. **api.ts** - API client configuration and base functions
2. **emailService.ts** - Email sending functionality (EmailJS, etc.)
3. **analyticsService.ts** - Google Analytics or other tracking
4. **storageService.ts** - Local/session storage utilities
5. **validationService.ts** - Form validation utilities

## Current Implementation
Currently, services are implemented inline in components:
- Contact form submission (placeholder alert)
- External links (direct window.open calls)
- Image loading (Unsplash API)

## Future Enhancements
Consider implementing:
- EmailJS for contact form submission
- Google Analytics for visitor tracking
- Form validation service
- Image optimization service