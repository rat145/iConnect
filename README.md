# iConnect — Project Overview

## What is iConnect?

iConnect is an **internal employee portal** — the kind of website a company uses for its own staff. Think of it as a private dashboard where employees can find everything they need in one place: company announcements, HR resources, IT support links, policies, documents, and a searchable employee directory.

The project simulates a real-world corporate intranet used by a fictional company called **Acme Corporation** (with sub-companies like Acme Digital, Acme Health, and Acme Ventures). Employees log in using their company Google account, and the portal automatically shows them content relevant to their company.

> **In simple terms:** You log in → you see your company's announcements, links, and resources → you can browse different sections from the navigation.

---

## Tech Stack

| Technology | What it's used for |
|---|---|
| **React 18** | The entire UI is built with React — components, state, rendering |
| **React Router v6** | Handles navigation between pages (no full page reloads) |
| **@react-oauth/google** | Google Sign-In button and JWT token handling |
| **Create React App** | Project setup, dev server, and build tooling |
| **Plain CSS** | Global styles and CSS variables (no CSS framework like Tailwind or Bootstrap) |
| **Inline styles** | Most component-level styling is done with inline `style` props in JSX |
| **LocalStorage** | Persists the logged-in user and selected company across page refreshes |
| **Google Fonts (Inter)** | The font used throughout the app |

There is no backend. All data is hardcoded in JavaScript files inside `src/data/`. This is a **frontend-only** project.

---

## Pages & Routes

| Route | Page | What it shows |
|---|---|---|
| `/signin` | Sign In | Google login screen with company selector |
| `/` | Home | Dashboard with announcements, news, quick links, events, etc. |
| `/quick-links` | Quick Links | All frequently-used tools, grouped by category |
| `/documents` | Documents | Company documents with search and category filter |
| `/hr` | HR Resources | Leave, payroll, benefits, performance links |
| `/it-support` | IT Support | Raise a ticket, self-service resources, IT contacts |
| `/policies` | Policies | Company policies grouped by category, with search |
| `/directory` | Directory | Searchable employee directory with department filter |
| `/help` | Help & Support | FAQ accordion, useful guides, and a contact form |

All routes except `/signin` are **protected** — you must be logged in to access them.

---

## Folder & File Structure

```
iConnect/
│
├── public/
│   ├── index.html          # The single HTML file the app is injected into
│   └── robots.txt          # Tells search engines not to index the site
│
├── src/
│   │
│   ├── index.jsx           # Entry point — mounts the React app into index.html
│   ├── App.jsx             # Root component — sets up providers and all routes
│   │
│   ├── pages/              # One file per page/route
│   │   ├── HomePage.jsx
│   │   ├── QuickLinksPage.jsx
│   │   ├── DocumentsPage.jsx
│   │   ├── HRPage.jsx
│   │   ├── ITSupportPage.jsx
│   │   ├── PoliciesPage.jsx
│   │   ├── DirectoryPage.jsx
│   │   └── HelpPage.jsx
│   │
│   ├── components/
│   │   ├── layout/         # Structural components that wrap every page
│   │   │   ├── AppLayout.jsx   # The main shell: Header + page content + Footer
│   │   │   ├── Header.jsx      # Top navigation bar (logo, nav links, search, user menu)
│   │   │   ├── Sidebar.jsx     # Mobile drawer menu (slides in on small screens)
│   │   │   └── Footer.jsx      # Bottom footer with links and copyright
│   │   │
│   │   ├── auth/           # Authentication-related components
│   │   │   ├── SignInPage.jsx      # The login page with Google button
│   │   │   ├── ProtectedRoute.jsx  # Redirects to /signin if not logged in
│   │   │   └── AccessDenied.jsx    # Shown when email domain is not allowed
│   │   │
│   │   └── common/         # Small reusable UI building blocks
│   │       ├── Card.jsx        # White box container used everywhere
│   │       ├── Badge.jsx       # Coloured pill label (e.g. "HR", "High", "IT")
│   │       ├── Avatar.jsx      # User profile picture or initials circle
│   │       ├── SearchBar.jsx   # Global search input (opened from the header)
│   │       └── Icon.jsx        # Simple icon wrapper
│   │
│   ├── context/            # React Context — global state shared across components
│   │   ├── AuthContext.jsx     # Stores the logged-in user, handles sign in/out
│   │   └── CompanyContext.jsx  # Stores the currently selected company
│   │
│   ├── data/               # All mock/static data (no real API or database)
│   │   ├── companies.js        # Full data for all companies (announcements, docs, employees, etc.)
│   │   └── index.js            # Re-exports from companies.js for easy importing
│   │
│   └── styles/             # Global CSS files
│       ├── global.css          # Reset, base styles, typography, layout utilities
│       └── variables.css       # CSS custom properties (colours, spacing, border radius)
│
├── .env                    # Environment variables (Google OAuth Client ID)
├── .env.example            # Template showing what variables are needed
└── package.json            # Project dependencies and npm scripts
```

---

## How the App Works — The Big Picture

```
App.jsx
  └── CompanyProvider        ← makes selected company available everywhere
        └── AuthProvider     ← makes logged-in user available everywhere
              └── BrowserRouter
                    ├── /signin  →  SignInPage (public)
                    └── /*       →  ProtectedRoute → AppLayout → <Page />
                                       (redirects to /signin if not logged in)
```

1. When the app loads, `CompanyContext` reads the last selected company from `localStorage`.
2. The user visits `/signin`, picks a company, and clicks "Sign in with Google".
3. Google returns a token. `AuthContext` decodes it, checks the email domain against the company's allowed domains, and either authenticates or rejects the user.
4. Once authenticated, the user is redirected to `/` (Home). All pages use `useCompany()` and `useAuth()` hooks to access the current company's data and the logged-in user.
5. All page content (announcements, documents, employees, etc.) comes from `src/data/companies.js` — there is no network call to a server.

---

## Key Concepts for Students

- **React Context** — `AuthContext` and `CompanyContext` are examples of the Context API. They let any component in the tree access shared state without passing props through every level.
- **React Router** — `<Routes>`, `<Route>`, `<Link>`, `<NavLink>`, and `useNavigate()` are all used. Study `App.jsx` and `Header.jsx` to see how routing works.
- **Protected Routes** — `ProtectedRoute.jsx` is a wrapper component that checks if the user is logged in. If not, it redirects to `/sign in`. This is a very common real-world pattern.
- **Reusable Components** — `Card`, `Badge`, and `Avatar` are used on almost every page. Understanding how `props` control their appearance is a good exercise.
- **Inline styles vs CSS** — This project mixes both approaches. `global.css` handles base/reset styles; individual components use inline `style={{...}}` objects for layout and theming.
#
