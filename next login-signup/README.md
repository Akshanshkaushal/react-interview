# Next.js Authentication App - Complete Architecture Guide

## Project Overview
This is a full-stack Next.js authentication application with MongoDB, featuring login/signup functionality, protected routes, and JWT-based authentication. Built with TypeScript, Tailwind CSS, and optimized with Next.js best practices.

## Architecture Overview

### Application Stack
- **Frontend Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Styling**: Tailwind CSS
- **Runtime**: Node.js

## Browser-Side (Client-Side) Components

### Client-Side Rendered Pages
1. **Login Page** (`app/login/page.tsx`)
   - Form with email and password fields
   - Form submission to `/api/auth/login` endpoint
   - Client-side validation
   - Error handling and loading states
   - Redirect to dashboard on success

2. **Signup Page** (`app/signup/page.tsx`)
   - Form with name, email, password, and confirm password fields
   - Client-side password confirmation validation
   - Form submission to `/api/auth/signup` endpoint
   - Error handling and loading states
   - Redirect to login on success

3. **Home Page** (`app/page.tsx`)
   - Links to login and signup pages
   - Static content pre-rendered

### Client-Side Features
- `'use client'` directive enables client interactivity
- React hooks (`useState`, `useRouter`)
- Fetch API for HTTP requests
- Next.js `useRouter` for client-side navigation
- Cookie-based session management (via HTTP-only cookies)

## Server-Side Components

### Server-Side Rendered Pages
1. **Dashboard Page** (`app/dashboard/page.tsx`)
   - Server Component (default in Next.js 14 App Router)
   - Server-side JWT verification from cookies
   - Protected route with automatic redirect to login if not authenticated
   - User information display from JWT payload

### API Routes (Backend)
1. **POST /api/auth/signup** (`app/api/auth/signup/route.ts`)
   - Receives: `{ email, password, name }`
   - Validates required fields
   - Checks for duplicate users in MongoDB
   - Hashes password using bcryptjs
   - Stores user in MongoDB
   - Returns: `{ message, userId }`

2. **POST /api/auth/login** (`app/api/auth/login/route.ts`)
   - Receives: `{ email, password }`
   - Finds user in MongoDB
   - Compares password with bcrypt
   - Generates JWT token (expires in 7 days)
   - Sets HTTP-only cookie with token
   - Returns: `{ message, user: { id, email, name } }`

3. **GET /api/auth/logout** (`app/api/auth/logout/route.ts`)
   - Clears HTTP-only cookie with token
   - Returns: `{ message }`

### Middleware (`middleware.ts`)
- Protects `/dashboard` routes
- Verifies JWT from cookies
- Redirects to `/login` if token is invalid or missing
- Runs on every request to protected routes

## Data Flow

### Authentication Flow
```
User → Signup Page (Client)
         ↓
    Validate Input (Client)
         ↓
    POST /api/auth/signup (Server)
         ↓
    Validate in DB (Server)
    Hash Password (Server)
    Store in MongoDB (Server)
         ↓
    Redirect to Login (Client)

User → Login Page (Client)
         ↓
    POST /api/auth/login (Server)
         ↓
    Verify Password (Server)
    Generate JWT (Server)
    Set HTTP-only Cookie (Server)
         ↓
    Redirect to Dashboard (Client)

Dashboard Request (Client)
         ↓
    Middleware Verification (Server)
         ↓
    Verify JWT from Cookie (Server)
    Server-Side Render Dashboard (Server)
         ↓
    Display User Info (Client)
```

## CORS Handling in Next.js

### Why CORS is NOT an Issue Here
- **Same-Origin Requests**: Client and server are on the same domain
- **No External API Calls**: Frontend only calls same-origin API routes
- **Built-in Same-Origin**: Next.js API routes are served from the same origin as the frontend

### If You Need External API Integration
Add CORS headers in API routes:

```typescript
import { NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ /* data */ })
  response.headers.set('Access-Control-Allow-Origin', 'https://your-frontend.com')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  return response
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': 'https://your-frontend.com',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
```

## Database Schema

### Users Collection (MongoDB)
```json
{
  "_id": ObjectId,
  "email": string (unique),
  "password": string (hashed),
  "name": string,
  "createdAt": Date
}
```

## Security Features

### Implemented
1. **Password Hashing**: Bcryptjs with 12 salt rounds
2. **HTTP-Only Cookies**: JWT stored securely (not accessible to JavaScript)
3. **Secure Cookie Flags**:
   - `httpOnly: true` - Prevents XSS attacks
   - `secure: true` (in production) - Only sent over HTTPS
   - `sameSite: 'strict'` - Prevents CSRF attacks
4. **JWT Expiration**: 7 days
5. **Middleware Protection**: Server-side verification of protected routes
6. **Token Validation**: Every request to `/dashboard` validates JWT

### Production Recommendations
1. Use environment variables for JWT secret (already configured in `.env.local`)
2. Enable HTTPS in production
3. Set `process.env.NODE_ENV === 'production'` for secure cookie flag
4. Use MongoDB Atlas with network restrictions
5. Add rate limiting to API routes
6. Implement refresh token rotation
7. Add CSRF protection
8. Use helmet.js for security headers

## Performance Optimizations (Next.js Advantages Over React)

### 1. Server-Side Rendering (SSR)
- Dashboard page is server-rendered, sent as HTML to browser
- Faster initial page load
- Better SEO (for non-auth pages)

### 2. Static Site Generation (SSG)
- Home page pre-generated at build time
- Instant load times

### 3. Code Splitting
- Automatic route-based code splitting
- Load only necessary JavaScript per page

### 4. Image Optimization
- Built-in `next/image` component (not used here but available)

### 5. Font Optimization
- Next.js optimizes Google Fonts automatically
- Font loading doesn't block rendering

### 6. Incremental Static Generation (ISG)
- Pages can be re-validated after certain intervals
- Update static content without full rebuild

### 7. Middleware
- Edge function execution
- Fast authentication checks before expensive operations

### 8. Automatic Code Splitting
- Each page's JavaScript bundle is minimized
- Only loaded when needed

### 9. Built-in Compression
- Automatic gzip/brotli compression

### 10. API Routes
- Backend code in same repository
- Server-side execution (not exposed to client)
- Automatic response optimization

## Directory Structure

```
next-login-signup/
├── app/
│   ├── api/
│   │   └── auth/
│   │       ├── login/
│   │       │   └── route.ts          # Login endpoint
│   │       ├── logout/
│   │       │   └── route.ts          # Logout endpoint
│   │       └── signup/
│   │           └── route.ts          # Signup endpoint
│   ├── dashboard/
│   │   └── page.tsx                  # Protected page (SSR)
│   ├── login/
│   │   └── page.tsx                  # Login page (Client)
│   ├── signup/
│   │   └── page.tsx                  # Signup page (Client)
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # Home page (SSG)
│   └── globals.css                   # Global styles
├── lib/
│   └── mongodb.ts                    # MongoDB connection pool
├── middleware.ts                     # Authentication middleware
├── types/
│   └── global.d.ts                   # Global type definitions
├── .env.local                        # Environment variables
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
└── .eslintrc.json
```

## Running the Application

### Prerequisites
- **Node.js** 18+
- **MongoDB** (local, Docker, or Atlas)

### MongoDB Setup (Choose One)

**Option 1: Docker** (Fastest for testing)
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

**Option 2: Docker Compose**
```bash
docker-compose up -d
```

**Option 3: MongoDB Atlas** (Cloud)
- Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create free cluster
- Update `MONGODB_URI` in `.env.local` with your connection string

**Option 4: Local Installation**
- Download from [MongoDB Community Server](https://www.mongodb.com/try/download/community)
- Start MongoDB service

### Development
```bash
npm run dev
```
Open `http://localhost:3000` in browser

### Production Build
```bash
npm run build
npm start
```

### Quality Checks
```bash
npm run lint
```

## Environment Variables

```env
MONGODB_URI=mongodb://localhost:27017/authdb
JWT_SECRET=your-super-secret-jwt-key-here-change-in-production
```

## Key Differences: Next.js vs React Only

| Feature | Next.js | React Only |
|---------|---------|-----------|
| **Server-Side Rendering** | Built-in | Need Express.js or similar |
| **API Routes** | Native | Need separate backend |
| **Middleware** | Built-in | Not integrated |
| **Static Generation** | Automatic | Need custom build process |
| **Image Optimization** | Native | Manual optimization needed |
| **Font Optimization** | Native | Manual optimization needed |
| **Code Splitting** | Automatic | Manual with React.lazy |
| **Bundle Size** | Smaller (per-page bundles) | Larger monolithic bundle |
| **SEO** | Great (SSR/SSG support) | Requires headless SSR setup |
| **Development Speed** | Fast (built-in HMR) | Setup-dependent |
| **Routing** | File-based | Need React Router setup |

## Performance Metrics

- **First Contentful Paint (FCP)**: Improved with SSR
- **Largest Contentful Paint (LCP)**: Better with SSG and server-side data
- **Cumulative Layout Shift (CLS)**: Minimized with proper layout patterns
- **Bundle Size**: ~95 KB shared JS (compared to typical React SPA at 200+KB)

## License
MIT