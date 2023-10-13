# ReasonAI - Collaborative Intelligence Platform

A premium AI-powered platform for complex question analysis, research, and reasoning. Built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

### Core Capabilities
- **Deep Dive Analysis**: Go beyond surface-level understanding to analyze, interpret, and synthesize information
- **Research & Fact Check**: Effortlessly verify information, uncover credible sources, and make decisions with confidence
- **Advanced Reasoning**: Think critically and solve problems step by step with AI-powered logical analysis
- **File Analysis**: Upload and analyze PDF, DOCX, and text files with AI-powered insights

### Technical Features
- **Progressive Web App (PWA)**: Installable on web and mobile with offline functionality
- **Responsive Design**: Pixel-perfect experience across all devices
- **Real-time Chat**: Streaming AI responses with typing indicators
- **File Upload**: Drag-and-drop file upload with progress tracking
- **Mobile-First**: Optimized mobile experience with push-to-side navigation
- **Dark/Light Theme**: Automatic theme detection with manual override

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom Design System
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **UI Components**: Custom components + Headless UI
- **PWA**: Next.js PWA + Workbox

### Backend (Future Implementation)
- **Runtime**: Node.js with Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT + bcrypt
- **File Storage**: AWS S3
- **AI Integration**: OpenAI API + LangChain

## 📱 PWA Features

- **Installable**: Add to home screen on mobile and desktop
- **Offline Ready**: Core functionality works without internet
- **Push Notifications**: Real-time updates and alerts
- **Background Sync**: Automatic data synchronization
- **App-like Experience**: Native app feel with web technology

## 🎨 Design System

### Colors
- **Primary**: Blue gradient (#0ea5e9 to #0284c7)
- **Secondary**: Gray scale (#f8fafc to #0f172a)
- **Accent**: Purple gradient (#d946ef to #a21caf)
- **Success**: Green (#22c55e)
- **Warning**: Orange (#f59e0b)
- **Error**: Red (#ef4444)

### Typography
- **Font Family**: Inter (primary), JetBrains Mono (code)
- **Scale**: Responsive typography with consistent spacing
- **Weights**: 100-900 with proper fallbacks

### Components
- **Buttons**: 5 variants with 3 sizes
- **Forms**: Consistent input styling with validation
- **Cards**: Multiple elevation levels
- **Navigation**: Responsive with mobile drawer
- **Chat**: Message bubbles with animations

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd reason-ai-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
reason-ai-platform/
├── app/                    # Next.js 14 App Router
│   ├── auth/              # Authentication pages
│   ├── chat/              # Chat interface
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── auth/              # Authentication components
│   ├── chat/              # Chat interface components
│   ├── landing/           # Landing page components
│   ├── navigation/        # Navigation components
│   └── ui/                # Reusable UI components
├── store/                 # Zustand state management
├── public/                # Static assets
│   ├── manifest.json      # PWA manifest
│   └── icons/             # App icons
├── tailwind.config.js     # Tailwind configuration
├── next.config.js         # Next.js configuration
└── tsconfig.json          # TypeScript configuration
```

## 🎯 Key Features Implementation

### Landing Page
- **Hero Section**: Animated hero with gradient backgrounds
- **Feature Cards**: Interactive cards with hover effects
- **Trust Indicators**: University logos and testimonials
- **CTA Sections**: Multiple call-to-action areas

### Chat Interface
- **Real-time Messaging**: Streaming AI responses
- **File Upload**: Drag-and-drop with progress tracking
- **Message Types**: User, AI, system messages with metadata
- **Mobile Optimization**: Responsive design with mobile sidebar

### Authentication
- **Login/Register**: Form validation with Zod
- **Social Auth**: Google and GitHub integration (placeholder)
- **Password Strength**: Real-time password validation
- **Remember Me**: Persistent login sessions

### PWA Features
- **Service Workers**: Offline functionality and caching
- **App Manifest**: Installable web app configuration
- **Icons**: Professional app icons for all platforms
- **Push Notifications**: Real-time updates

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_WS_URL=ws://localhost:3001

# AI Configuration
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-4

# Database (Future)
DATABASE_URL=postgresql://user:password@localhost:5432/reasonai

# Authentication (Future)
JWT_SECRET=your_jwt_secret
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

### Tailwind Configuration
The project uses a custom Tailwind configuration with:
- Extended color palette
- Custom animations
- Responsive typography
- Component utilities

### PWA Configuration
Configured with Next.js PWA plugin:
- Automatic service worker generation
- Offline page caching
- Background sync
- Push notification support

## 📱 Mobile Experience

### Responsive Design
- **Mobile First**: Designed for mobile devices first
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch Optimized**: Large touch targets and gestures

### Mobile Navigation
- **Sidebar**: Push-to-side navigation on mobile
- **Bottom Navigation**: Quick access to main features
- **Gesture Support**: Swipe, pinch, and tap interactions

### PWA Mobile Features
- **Install Prompt**: Smart installation suggestions
- **Offline Mode**: Core functionality without internet
- **Push Notifications**: Real-time updates
- **App Shell**: Fast loading with skeleton screens

## 🎨 Design Principles

### Visual Hierarchy
- **Typography**: Clear hierarchy with consistent spacing
- **Colors**: Semantic color usage for different states
- **Spacing**: Consistent spacing scale (4px base unit)
- **Shadows**: Layered shadows for depth

### User Experience
- **Loading States**: Skeleton screens and progress indicators
- **Error Handling**: Graceful error messages and recovery
- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: Optimized for speed and smooth interactions

### Animations
- **Micro-interactions**: Subtle hover and click animations
- **Page Transitions**: Smooth navigation between pages
- **Loading Animations**: Engaging loading states
- **Scroll Animations**: Reveal animations on scroll

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main

### Docker
```bash
# Build Docker image
docker build -t reason-ai-platform .

# Run container
docker run -p 3000:3000 reason-ai-platform
```

### Manual Deployment
```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🔮 Future Enhancements

### Backend Integration
- **API Development**: RESTful API with Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with refresh tokens
- **File Storage**: AWS S3 integration

### AI Features
- **Advanced Reasoning**: Multi-step problem solving
- **Document Analysis**: PDF and DOCX parsing
- **Fact Checking**: Real-time information verification
- **Research Assistance**: Automated source gathering

### Admin Panel
- **User Management**: Admin dashboard for user oversight
- **Analytics**: Usage statistics and insights
- **Content Moderation**: AI response monitoring
- **System Configuration**: Prompt management

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support, email support@reasonaai.com or join our Discord community.

---

Built with ❤️ by the ReasonAI team
