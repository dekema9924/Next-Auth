# Next.js Authentication System with Better Auth

A modern, full-featured authentication system built with Next.js 15, Better Auth, Prisma, and TypeScript. This project provides a complete authentication solution with email verification, password management, and user profile features.

## Features

### Authentication

- ✅ **Email & Password Authentication** - Secure sign up and sign in
- ✅ **Email Verification** - Verify user emails with OTP
- ✅ **Forgot Password** - Password reset via email
- ✅ **Change Password** - Allow users to update their password
- ✅ **Social Login** - Google and GitHub OAuth integration
- ✅ **Session Management** - Secure session handling with Better Auth

### User Management

- ✅ **User Profiles** - View and edit user information
- ✅ **Profile Pictures** - Upload images to Cloudinary
- ✅ **Account Settings** - Manage personal information
- ✅ **Dashboard** - Protected user dashboard

### UI/UX

- ✅ **Responsive Design** - Mobile-first, works on all devices
- ✅ **Modern UI** - Clean, professional interface
- ✅ **Toast Notifications** - Real-time user feedback
- ✅ **Form Validation** - React Hook Form with validation
- ✅ **Loading States** - Clear feedback during async operations

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Authentication:** [Better Auth](https://www.better-auth.com/)
- **Database:** [Prisma](https://www.prisma.io/) ORM
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Form Handling:** [React Hook Form](https://react-hook-form.com/)
- **File Upload:** [Cloudinary](https://cloudinary.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Notifications:** [React Hot Toast](https://react-hot-toast.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js 18.x or higher
- npm, yarn, pnpm, or bun
- PostgreSQL (or your preferred database)
- Cloudinary account (for image uploads)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd next-authentication
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"

# Better Auth
BETTER_AUTH_SECRET="your-secret-key-here"
BETTER_AUTH_URL="http://localhost:3000"

# OAuth Providers (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# Cloudinary (for image uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Email (Optional - for email verification)
EMAIL_SERVER="smtp://user:password@smtp.example.com:587"
EMAIL_FROM="noreply@example.com"
```

### 4. Set up the database

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# (Optional) Seed the database
npx prisma db seed
```

### 5. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```
├── app/
│   ├── api/
│   │   ├── auth/          # Authentication API routes
│   │   └── upload/        # File upload routes
│   ├── auth/
│   │   ├── signin/        # Sign in page
│   │   ├── signup/        # Sign up page
│   │   └── verify-otp/    # Email verification
│   ├── dashboard/         # Protected dashboard
│   ├── forgot-password/   # Password reset
│   └── reset-password/    # Reset password with token
├── components/
│   ├── ui/               # Reusable UI components
│   ├── Header.tsx        # Navigation header
│   ├── UpdateProfile.tsx # Profile update modal
│   └── PasswordInputs.tsx # Password form component
├── context/
│   └── ModalContext.tsx  # Global modal state
├── lib/
│   ├── auth.ts          # Better Auth configuration
│   ├── prisma.ts        # Prisma client
│   ├── session.ts       # Session utilities
│   └── updateProfile.ts # Profile update logic
├── prisma/
│   └── schema.prisma    # Database schema
└── public/              # Static assets
```

## 🔧 Configuration

### Better Auth Setup

Better Auth is configured in `lib/auth.ts`. You can customize:

- Email providers
- OAuth providers (Google, GitHub, etc.)
- Session duration
- Security settings

### Prisma Schema

The database schema is defined in `prisma/schema.prisma`. Main models include:

- **User** - User account information
- **Session** - Active user sessions
- **Account** - OAuth account connections
- **VerificationToken** - Email verification tokens

### Cloudinary Integration

Images are uploaded to Cloudinary for:

- Profile pictures
- User-generated content

Configure your Cloudinary credentials in `.env.local`.

## Authentication Flow

1. **Sign Up**

   - User creates account with email and password
   - Verification email sent (if configured)
   - Account created in database

2. **Email Verification**

   - User receives OTP code
   - Enters code on verification page
   - Email marked as verified

3. **Sign In**

   - User enters credentials
   - Session created on success
   - Redirected to dashboard

4. **Password Reset**
   - User requests reset via email
   - Receives reset link with token
   - Creates new password
   - Token invalidated after use

## Customization

### Styling

This project uses Tailwind CSS. Customize the theme in `tailwind.config.ts`:

```typescript
module.exports = {
  theme: {
    extend: {
      colors: {
        // Add your custom colors
      },
    },
  },
};
```

### Components

All UI components are in the `components/` directory and can be customized to match your brand.

## Key Scripts

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npx prisma studio    # Open Prisma Studio
npx prisma migrate dev # Create new migration
npx prisma generate  # Generate Prisma Client
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

### Other Platforms

This app can be deployed to any platform that supports Next.js:

- AWS
- Google Cloud
- Railway
- Render
- DigitalOcean

Make sure to:

- Set all environment variables
- Run database migrations
- Configure OAuth callback URLs

## 🔒 Security Best Practices

- ✅ Passwords hashed with bcrypt
- ✅ CSRF protection enabled
- ✅ Secure session management
- ✅ Input validation and sanitization
- ✅ Rate limiting on auth endpoints
- ✅ Environment variables for secrets

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Better Auth](https://www.better-auth.com/) for authentication
- [Prisma](https://www.prisma.io/) for database ORM
- [Next.js](https://nextjs.org/) team for the amazing framework
- [Vercel](https://vercel.com/) for hosting and deployment

## 🔗 Links

- [Documentation](https://github.com/dekema9924/Next-Auth)
<!-- - [Demo](https://your-demo-url.com) -->
- [Issues](https://github.com/dekema9924/Next-Auth/issues)

---

Made with ❤️ using Next.js and Better Auth
