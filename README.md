# Netflix Clone - React

A pixel-perfect Netflix clone built with React 19, Firebase, and TMDB API. The project now includes a persistent My List experience, a global search overlay, refined toast feedback.

## Live Demo

🚀 **[View Live Demo](https://netflix-clone-taupe-two-69.vercel.app)** | 📂 **[View Repository](https://github.com/sw65109/Netflix-clone)**

---

<!-- markdownlint-disable MD033 -->
<details>
<summary><strong>Table of Contents</strong></summary>

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Integration](#api-integration)
- [Authentication](#authentication)
- [Responsive Design](#responsive-design)
- [Performance Features](#performance-features)
- [Contributing](#contributing)
- [Known Issues & Roadmap](#known-issues--roadmap)
- [License](#license)
- [Acknowledgments](#acknowledgments)
- [Contact](#contact)

</details>

---

## Features

<details>
<summary><strong>User Authentication</strong></summary>

- Firebase Authentication integration with email/password onboarding
- Multi-layer route guarding and redirect prevention for logged-in users
- Session persistence wired through `onAuthStateChanged`
- Logout flow with polished toast confirmations
- Real-time auth state monitoring across the app shell and pages

</details>

<details>
<summary><strong>Discovery & Content</strong></summary>

- Dynamic hero section seeded from TMDB now playing titles
- Horizontal carousels for Popular, Blockbusters, Top Rated, Upcoming, and more
- Persistent **My List** powered by a reusable `useMyList` hook and context
- TMDB multi-search overlay with debounced queries and Add/Remove controls
- Toast messages narrating add/remove actions for clarity

</details>

<details>
<summary><strong>Interaction Enhancements</strong></summary>

- Netflix-style horizontal scrolling protected against vertical wheel jumps
- Player page with authentication checks and trailer playback
- Toast utilities consolidated for consistent success/info/error styling
- Defensive event-listener cleanup to avoid leaks when navigating between pages

</details>

<details>
<summary><strong>Responsive Design</strong></summary>

- Mobile-first layout that scales across 500px, 800px, and 1024px breakpoints
- Touch-friendly card interactions and simplified navigation for handheld devices
- Optimized imagery using TMDB poster/backdrop resolutions with fallbacks

</details>

---

## Tech Stack

<details>
<summary><strong>Frontend Technologies</strong></summary>

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.1.1 | UI library with hooks |
| Vite | 7.1.7 | Build tool & dev server |
| React Router DOM | 7.9.2 | Client-side routing |
| React Toastify | 11.0.5 | Toast notifications |
| Firebase | 12.3.0 | Authentication + data |
| CSS3 | - | Styling & responsive layout |

</details>

<details>
<summary><strong>Backend & APIs</strong></summary>

| Service | Purpose |
|---------|---------|
| Firebase Auth | User authentication |
| Firestore | User persistence roadmap |
| TMDB API | Movie data & artwork |
| YouTube API | Trailer playback |

</details>

<details>
<summary><strong>Development Tooling</strong></summary>

- ESLint and markdownlint for code quality
- Vite dev server with HMR for rapid feedback
- Modern ES2023+ syntax and tooling

</details>

---

## Installation

<details>
<summary><strong>Prerequisites</strong></summary>

- Node.js (v16 or higher)
- npm or yarn
- Firebase account
- TMDB API account

</details>

<details>
<summary><strong>Step-by-Step Setup</strong></summary>

1. **Clone the repository**

   ```bash
   git clone https://github.com/sw65109/Netflix-clone.git
   cd Netflix-clone
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

5. **Start the development server**

   ```bash
   npm run dev
   ```

6. **Build for production**

   ```bash
   npm run build
   ```

</details>

---

## Environment Setup

<details>
<summary><strong>Firebase Configuration</strong></summary>

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable Authentication with Email/Password
3. Create a Firestore database (optional roadmap feature)
4. Grab your Firebase config object
5. Update `src/config.js` with your credentials:

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

1. Sign up at [TMDB](https://www.themoviedb.org/signup)
2. Request a read access token (v4)
3. Add your token to `src/config.js`:

```javascript
const TMDB_Access_Key = "your-tmdb-access-token";
```

</details>

---

## Usage

<details>
<summary><strong>Authentication Flow</strong></summary>

1. **New users**: Click Sign Up to create an account
2. **Returning users**: Sign in with email/password
3. **Automatic redirect**: Authenticated visitors land on the home page
4. **Session persistence**: Stay logged in between refreshes
5. **Logout**: Use the profile menu to trigger sign out with toast feedback

</details>

<details>
<summary><strong>Navigation Guide</strong></summary>

- Home showcases hero, carousels, and My List actions
- Search button opens the new overlay with instant TMDB results
- Player route streams trailers with auth gatekeeping
- Responsive navbar adapts to viewport width and scroll position

</details>

---

## Project Structure

<details>
<summary><strong>Directory Overview</strong></summary>

```text
netflix-clone/
├── public/
│   ├── background_banner.jpg
│   └── netflix_favicon.ico
├── src/
│   ├── assets/
│   │   ├── cards/
│   │   └── assorted UI imagery
│   ├── components/
│   │   ├── Footer/
│   │   ├── Navbar/
│   │   ├── TitleCards/
│   │   └── SearchOverlay/
│   ├── hooks/
│   │   └── useMyList.js
│   ├── pages/
│   │   ├── Home/
│   │   ├── Login/
│   │   └── Player/
│   ├── utils/
│   │   └── toastUtils.js
│   ├── App.jsx
│   ├── config.js
│   ├── firebase.js
│   └── main.jsx
└── package.json
```

</details>

<details>
<summary><strong>Component Architecture</strong></summary>

- `App.jsx`: routing shell with auth listener
- `Navbar`: manages profile dropdown, search trigger, and sticky behavior
- `TitleCards`: reusable TMDB carousel with add/remove hooks and wheel guard
- `SearchOverlay`: TMDB multi-search with debounced fetch, fallback imagery, and My List toggles
- `useMyList`: context hook persisting selections to local storage for now
- `toastUtils`: centralizes toast styling and defaults

</details>

---

## API Integration

<details>
<summary><strong>TMDB API Endpoints</strong></summary>

| Endpoint | Purpose | Usage |
|----------|---------|-------|
| `/movie/popular` | Featured movies | Hero + Popular row |
| `/movie/top_rated` | High-rated films | Blockbuster Movies |
| `/movie/upcoming` | Coming soon | Upcoming row |
| `/movie/now_playing` | Current releases | Now Playing row |
| `/search/multi` | Search overlay | Global search experience |
| `/movie/{id}/videos` | Trailer data | Player view |

</details>

<details>
<summary><strong>Data Flow</strong></summary>

1. Auth listener hydrates global context
2. Rows fetch TMDB data on mount with abort safety
3. Search overlay debounces queries and filters to movies/TV
4. My List toggles sync payloads across TitleCards and SearchOverlay
5. Toast utilities surface success/error states to users

</details>

---

## Authentication

<details>
<summary><strong>Firebase Auth Implementation</strong></summary>

- Real-time `onAuthStateChanged` listener with cleanup
- Route protection across the router and individual pages
- Toast guidance for sign-in, sign-out, and error flows
- Planned Firestore persistence for user-specific lists

</details>

<details>
<summary><strong>Security Features</strong></summary>

- Email/password validation patterns
- Firebase security rules (see console configuration)
- Protected TMDB usage via server-side token storage recommendation
- Session persistence balanced with manual sign-out controls

</details>

---

## Responsive Design

<details>
<summary><strong>Breakpoint Strategy</strong></summary>

| Screen Size | Layout Adjustments |
|-------------|--------------------|
| < 500px | Compact navbar, stacked hero, condensed cards |
| 500px - 800px | Medium grid, hidden secondary nav items |
| > 800px | Full navigation, widescreen hero imagery |

</details>

<details>
<summary><strong>Mobile Optimizations</strong></summary>

- Reduced initial payload via dynamic imports where practical
- Touch-friendly buttons and larger tap targets

</details>

---

## Performance Features

<details>
<summary><strong>Optimization Techniques</strong></summary>

- Debounced fetch calls and abort controllers to avoid race conditions
- Toast feedback throttled to prevent spam on rapid toggles
- Wheel event guard to skip unnecessary re-renders
- Vite build optimizations with tree shaking and code splitting

</details>

---

## Contributing

<details>
<summary><strong>Development Guidelines</strong></summary>

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m "Add amazing feature"`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a pull request

</details>

<details>
<summary><strong>Code Standards</strong></summary>

- Prefer functional components and hooks
- Clean up subscriptions, timeouts, and listeners
- Keep async flows wrapped with error handling and toasts
- Maintain responsive design parity across breakpoints

</details>

---

## Known Issues & Roadmap

<details>
<summary><strong>Current Limitations</strong></summary>

- [ ] Move sensitive keys into `.env`
- [ ] Expand My List persistence to Firestore
- [ ] Add unit tests (React Testing Library + Vitest)
- [ ] Migrate to TypeScript for stronger typing
- [x] Debounced search overlay with TMDB integration
- [x] Consistent toast messaging across components

</details>

<details>
<summary><strong>Future Enhancements</strong></summary>

- [ ] Multi-profile support with avatar selection
- [ ] Recommendation engine based on viewing history
- [ ] PWA support for offline browsing
- [ ] Email verification and password reset flows
- [ ] Theme toggle (light/dark) with persisted preference

</details>

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- Netflix for design inspiration
- TMDB for providing movie metadata and imagery
- Firebase for authentication services
- React team for the core framework
- Vite for the rapid development experience

---

## Contact

Scott Weller - [sjweller65109@gmail.com](mailto:sjweller65109@gmail.com)

Project Link: [https://github.com/sw659109/Netflix-clone](https://github.com/sw659109/Netflix-clone)

---

<div align="center">

**Star this repo if you found it helpful!**

Made with love and coffee by Scott Weller

</div>
