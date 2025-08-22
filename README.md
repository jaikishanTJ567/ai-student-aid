# EduBridge AI - Intelligent Assessment Platform

A modern educational platform built with React + TypeScript that provides AI-powered assignment analysis with teacher oversight. Students can upload assignments to receive instant AI feedback, while teachers can review and approve AI assessments.

## 🚀 Features

### For Students
- **File Upload**: Upload assignments (PDF, JPG, PNG) with progress tracking
- **AI Analysis**: Get instant feedback on assignments with scores and weak topic identification  
- **Progress Tracking**: View submission history and approval status
- **Personalized Resources**: Receive AI-recommended learning materials

### For Teachers  
- **Classroom Overview**: Monitor class performance with analytics dashboard
- **Weak Topics Heatmap**: Visual representation of student struggling areas
- **Review System**: Approve/adjust AI assessments with detailed submission views
- **Student Management**: Track individual student progress and submissions

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: TailwindCSS with custom design system
- **Components**: shadcn/ui components
- **Charts**: Recharts for data visualization  
- **Animation**: Framer Motion
- **Authentication**: Supabase Auth (Email + Google OAuth)
- **State Management**: React Query + Context API

## 📋 Project Setup

### Prerequisites

- Node.js 18+ and npm installed
- [Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd edubridge-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup** 
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your Supabase credentials:
   ```bash
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

   Access the app at `http://localhost:8080`

## 🔐 Demo Accounts

The app includes demo functionality with mock data:

- **Student Account**: `student@demo.com` / `demo123`
- **Teacher Account**: `teacher@demo.com` / `demo123`

> **Note**: For full Supabase authentication, you'll need to configure your Supabase project with these demo accounts or create your own.

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── FileUpload.tsx  # File upload with progress
│   ├── Navbar.tsx      # Navigation component
│   └── SubmissionDetailModal.tsx
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication state
├── lib/               # Utilities and configuration
│   ├── supabase.ts    # Supabase client setup
│   ├── mockData.ts    # Demo data and types
│   └── utils.ts       # Helper functions
├── pages/             # Main page components
│   ├── Login.tsx      # Authentication page
│   ├── StudentDashboard.tsx
│   └── TeacherDashboard.tsx
└── index.css          # Design system and styles
```

## 🎨 Design System

The app uses a comprehensive design system with:

- **Educational Color Palette**: Academic blue, success green, warm orange
- **Semantic Tokens**: All colors defined in CSS variables
- **Responsive Components**: Mobile-first design approach
- **Smooth Animations**: Framer Motion for enhanced UX
- **Consistent Spacing**: Tailwind spacing scale

## 📱 Pages & Features

### Login Page (`/login`)
- Supabase Auth UI integration
- Role-based redirect after login
- Google OAuth support
- Demo account information

### Student Dashboard (`/student`)
- File upload with drag-and-drop
- Submission history table
- AI analysis results cards
- Progress tracking and resource recommendations

### Teacher Dashboard (`/teacher`)
- Class overview statistics
- Weak topics heatmap visualization
- Student submissions management
- Detailed review modal for each submission

## 🔒 Authentication & Routing

- **Protected Routes**: Role-based access control
- **Auto-redirect**: Users redirected to appropriate dashboard
- **Session Management**: Persistent authentication state
- **Role Validation**: Server-side role verification (mock)

## 🚀 Deployment

### Using Lovable
1. Open your [Lovable Project](https://lovable.dev/projects/54cd2773-6ff7-4754-9795-d9b47f988648)
2. Click Share → Publish
3. Your app will be deployed instantly

### Manual Deployment
```bash
npm run build
# Deploy the `dist` folder to your hosting provider
```

## 📊 Mock Data & API

Currently uses mock data for demonstration:
- Sample student submissions with various states
- Classroom analytics and weak topic data  
- Simulated file upload progress
- Mock AI analysis results

To connect real APIs:
1. Replace mock functions in `lib/mockData.ts`
2. Implement actual Supabase database queries
3. Add real file upload to Supabase Storage
4. Integrate with AI analysis services

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Quality
- TypeScript for type safety
- ESLint configuration included
- Consistent code formatting
- Component-based architecture

## 📝 License

This project is part of the Lovable platform. See [Lovable Documentation](https://docs.lovable.dev) for more information.

## 🆘 Support

- [Lovable Documentation](https://docs.lovable.dev)
- [Supabase Documentation](https://supabase.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)

---

Built with ❤️ using [Lovable](https://lovable.dev)
