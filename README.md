# 🎬 Netflix Clone - React

A pixel-perfect Netflix clone built with React 19, Firebase, and TMDB API. This application replicates the core Netflix experience with user authentication, dynamic movie content, and a responsive design.

![Netflix Clone Demo](https://via.placeholder.com/800x400/000000/FFFFFF?text=Netflix+Clone+Demo)

## 🚀 Live Demo

[View Live Demo](your-deployment-url-here) | [View Repository](https://github.com/your-username/netflix-clone)

---

<details>
<summary>📋 <strong>Table of Contents</strong></summary>

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Environment Setup](#-environment-setup)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [API Integration](#-api-integration)
- [Authentication](#-authentication)
- [Responsive Design](#-responsive-design)
- [Contributing](#-contributing)
- [License](#-license)

</details>

---

## ✨ Features

<details>
<summary><strong>🔐 User Authentication</strong></summary>

- **Firebase Authentication Integration**
- User registration with email/password
- Secure login system with form validation
- Automatic session management with `onAuthStateChanged`
- Protected routes with authentication guards
- Real-time authentication state monitoring
- Logout functionality with toast confirmations
- **Multi-layer authentication checks** (App-level + component-level)
- **Authentication state persistence** across browser sessions
- **Immediate redirect prevention** for logged-in users accessing login page

</details>

<details>
<summary><strong>🎥 Movie Content</strong></summary>

- **Dynamic Hero Section** with random featured movies
- **Multiple Movie Categories**:
  - Popular on Netflix
  - Blockbuster Movies
  - Top Rated
  - Upcoming
  - Now Playing
- **Real-time data** from TMDB API
- High-quality movie posters and backdrops
- Movie trailers integration via YouTube

</details>

<details>
<summary><strong>🎮 Interactive Features</strong></summary>

- **Horizontal Scrolling** movie carousels (Netflix-style)
- **Video Player** with YouTube trailer integration and authentication checks
- **Smooth Navigation** between pages with route protection
- **Loading States** with Netflix-branded spinners across all components
- **Error Handling** with comprehensive error boundaries and fallbacks
- **Toast Notifications** for user feedback with custom styling
- **Memory Leak Prevention** with proper event listener cleanup
- **Professional User Feedback** with success/error/info toast messages

</details>

<details>
<summary><strong>📱 Responsive Design</strong></summary>

- **Mobile-First Approach**
- Responsive breakpoints: 500px, 800px, 1024px
- Adaptive layout for all screen sizes
- Touch-friendly interface
- Optimized images and content

</details>

---

## 🛠 Tech Stack

<details>
<summary><strong>Frontend Technologies</strong></summary>

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.1.1 | UI Library with Hooks |
| **Vite** | 7.1.7 | Build Tool & Dev Server |
| **React Router DOM** | 7.9.2 | Client-side Routing & Navigation |
| **React Toastify** | 11.0.5 | Toast Notifications System |
| **Firebase** | 12.3.0 | Authentication & Database |
| **CSS3** | - | Styling & Responsive Design |

</details>

<details>
<summary><strong>Backend & APIs</strong></summary>

| Service | Purpose |
|---------|---------|
| **Firebase Auth** | User Authentication |
| **Firestore** | User Data Storage |
| **TMDB API** | Movie Data & Images |
| **YouTube API** | Video Trailers |

</details>

<details>
<summary><strong>Development Tools</strong></summary>

- **ESLint** - Code linting and formatting
- **Vite** - Fast development server with HMR
- **Modern ES6+** - Latest JavaScript features

</details>

---

## 🚀 Installation

<details>
<summary><strong>Prerequisites</strong></summary>

- Node.js (v16 or higher)
- npm or yarn package manager
- Firebase account
- TMDB API account

</details>

<details>
<summary><strong>Step-by-Step Setup</strong></summary>

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/netflix-clone.git
   cd netflix-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file in root directory
   touch .env
   ```

4. **Configure Firebase and TMDB** (see Environment Setup below)

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Build for production**
   ```bash
   npm run build
   ```

</details>

---

## ⚙️ Environment Setup

<details>
<summary><strong>Firebase Configuration</strong></summary>

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable Authentication with Email/Password
3. Create a Firestore database
4. Get your Firebase config object
5. Update `src/config.js` with your Firebase credentials:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};
```

</details>

<details>
<summary><strong>TMDB API Setup</strong></summary>

1. Create an account at [TMDB](https://www.themoviedb.org/signup)
2. Request an API key from your account settings
3. Add your TMDB access token to `src/config.js`:

```javascript
const TMDB_Access_Key = "your-tmdb-access-token";
```

</details>

---

## 🎯 Usage

<details>
<summary><strong>Authentication Flow</strong></summary>

1. **New Users**: Click "Sign Up" to create an account
2. **Existing Users**: Use "Sign In" with email/password
3. **Automatic Redirect**: Authenticated users go to home page
4. **Session Management**: Stay logged in across browser sessions
5. **Logout**: Click profile dropdown → "Sign Out"

</details>

<details>
<summary><strong>Navigation Guide</strong></summary>

- **Home Page**: Browse featured movies and categories
- **Movie Cards**: Click any movie to view trailer
- **Video Player**: Watch trailers with back navigation
- **Responsive Menu**: Mobile-friendly navigation
- **Scroll Browsing**: Horizontal scroll through movie categories

</details>

---

## 📁 Project Structure

<details>
<summary><strong>Directory Overview</strong></summary>

```
netflix-clone/
├── public/
│   ├── background_banner.jpg
│   └── netflix_favicon.ico
├── src/
│   ├── assets/
│   │   ├── cards/          # Movie card images
│   │   └── *.png|*.svg     # UI icons and images
│   ├── components/
│   │   ├── Footer/         # Site footer
│   │   ├── Navbar/         # Navigation bar
│   │   └── TitleCards/     # Movie carousels
│   ├── pages/
│   │   ├── Home/           # Main dashboard
│   │   ├── Login/          # Authentication
│   │   └── Player/         # Video player
│   ├── utils/
│   │   └── toastUtils.jsx  # Toast notification helper
│   ├── App.jsx             # Main app component
│   ├── config.js           # API configurations
│   ├── firebase.js         # Firebase setup
│   └── main.jsx            # App entry point
└── package.json
```

</details>

<details>
<summary><strong>Component Architecture</strong></summary>

- **App.jsx**: Main routing and global authentication state management with `onAuthStateChanged`
- **Home**: Landing page with dynamic hero section and categorized movie collections
- **Login**: Authentication form with validation, sign up/in toggle, and auth state checking
- **Player**: Video player for movie trailers with authentication guards and error handling
- **Navbar**: Navigation with user profile, logout functionality, and scroll effects
- **TitleCards**: Reusable movie carousel component with horizontal scrolling and error states
- **Footer**: Site footer with Netflix-style links and responsive design
- **Utils**: Toast notification utilities for consistent user feedback

</details>

---

## 🔌 API Integration

<details>
<summary><strong>TMDB API Endpoints</strong></summary>

| Endpoint | Purpose | Usage |
|----------|---------|-------|
| `/movie/popular` | Featured movies | Hero section |
| `/movie/top_rated` | High-rated films | "Blockbuster Movies" |
| `/movie/upcoming` | Coming soon | "Upcoming" section |
| `/movie/now_playing` | Current releases | "Now Playing" |
| `/movie/{id}/videos` | Movie trailers | Video player |

</details>

<details>
<summary><strong>Data Flow</strong></summary>

1. **Authentication**: Firebase handles user auth state with real-time listeners
2. **Movie Data**: TMDB API provides movie information with proper error handling
3. **Real-time Updates**: Components fetch fresh data on mount with loading states
4. **Error Handling**: Graceful fallbacks for API failures with toast notifications
5. **Loading States**: Professional Netflix-branded spinners during data fetch
6. **State Management**: Efficient state updates with proper dependency management
7. **Memory Management**: Cleanup of event listeners and subscriptions

</details>

---

## 🔐 Authentication

<details>
<summary><strong>Firebase Auth Implementation</strong></summary>

- **onAuthStateChanged**: Real-time auth state monitoring with global listener
- **Protected Routes**: Automatic redirection based on auth status at app level
- **Component-Level Guards**: Individual components verify authentication state
- **User Data Storage**: Firestore integration for user profiles and metadata
- **Error Handling**: User-friendly error messages with toast notifications
- **Session Persistence**: Automatic login across browser sessions and page refreshes
- **Duplicate Login Prevention**: Prevents authenticated users from accessing login page
- **Memory Management**: Proper cleanup of authentication listeners

</details>

<details>
<summary><strong>Security Features</strong></summary>

- Email/password validation
- Firebase security rules
- Protected API routes
- Secure token management
- Automatic session timeout handling

</details>

---

## 📱 Responsive Design

<details>
<summary><strong>Breakpoint Strategy</strong></summary>

| Screen Size | Breakpoint | Layout Changes |
|-------------|------------|----------------|
| **Mobile** | < 500px | Compact navigation, smaller images |
| **Tablet** | 500px - 800px | Medium layouts, hidden menu items |
| **Desktop** | > 800px | Full navigation, large images |

</details>

<details>
<summary><strong>Mobile Optimizations</strong></summary>

- Touch-friendly interface
- Optimized image sizes
- Compressed navigation menu
- Swipe-friendly carousels
- Fast loading on mobile networks

</details>

---

## 🚀 Performance Features

<details>
<summary><strong>Optimization Techniques</strong></summary>

- **Code Splitting**: React Router lazy loading and component optimization
- **Image Optimization**: TMDB responsive images with proper fallbacks
- **Memory Management**: Comprehensive event listener cleanup and leak prevention
- **Loading States**: Professional spinners and perceived performance improvements
- **Error Boundaries**: Graceful error handling with user-friendly fallbacks
- **Authentication Optimization**: Efficient auth state management with minimal re-renders
- **API Optimization**: Proper dependency management in useEffect hooks
- **Vite Build**: Optimized production builds with tree shaking

</details>

---

## 🤝 Contributing

<details>
<summary><strong>Development Guidelines</strong></summary>

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

</details>

<details>
<summary><strong>Code Standards</strong></summary>

- Follow React best practices
- Use functional components with hooks
- Implement proper error handling
- Add loading states for async operations
- Maintain responsive design principles
- Clean up event listeners and subscriptions

</details>

---

## 🐛 Known Issues & Roadmap

<details>
<summary><strong>Current Limitations</strong></summary>

- [ ] Environment variables need to be moved to .env file for security
- [x] Authentication state management implemented across all components
- [x] Memory leak prevention with proper cleanup
- [x] Toast notification system integrated
- [x] Multi-layer authentication guards implemented
- [ ] TypeScript migration for better type safety
- [ ] Unit tests implementation (Jest + React Testing Library)
- [ ] PWA features for offline support
- [ ] ESLint exhaustive-deps warnings cleanup

</details>

<details>
<summary><strong>Future Enhancements</strong></summary>

- [ ] User watchlist functionality with Firestore persistence
- [ ] Movie search feature with TMDB search endpoints
- [ ] Multiple user profiles with role-based access
- [ ] Content recommendations based on viewing history
- [ ] Dark/light theme toggle with user preferences
- [ ] Internationalization support (i18n)
- [ ] Email verification for new user registration
- [ ] Password reset functionality
- [ ] User profile management and settings
- [ ] Movie rating and review system

</details>

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Netflix** for design inspiration
- **TMDB** for movie database API
- **Firebase** for authentication services
- **React Team** for the amazing framework
- **Vite** for lightning-fast development experience

---

## 📞 Contact

**Your Name** - [@yourtwitter](https://twitter.com/yourtwitter) - your.email@example.com

Project Link: [https://github.com/your-username/netflix-clone](https://github.com/your-username/netflix-clone)

---

<div align="center">

**⭐ Star this repo if you found it helpful!**

Made with ❤️ and ☕ by [Your Name]

</div>
