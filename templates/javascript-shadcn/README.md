# GSP React Template

A modern and well-structured React template built with the latest technologies. This template provides a solid foundation for building scalable React applications with clean architecture, form handling, and best practices.

## 🚀 Technologies & Libraries

### Core Libraries

- **React 19.1.1** - Modern user interface library with the latest features
- **React DOM 19.1.1** - React DOM integration for web applications
- **React Router 7.9.1** - Declarative routing for React applications

### Form Handling & Validation

- **Formik 2.4.6** - Build forms without tears, handles form state management
- **Yup 1.7.1** - Dead simple Object schema validation library

### Development Tools

- **Vite 7.1.7** - Next generation frontend tooling with lightning fast HMR
- **@vitejs/plugin-react 5.0.3** - Official React plugin for Vite
- **Sass 1.93.0** - Professional grade CSS extension language

### Code Quality & TypeScript Support

- **ESLint 9.36.0** - Find and fix problems in JavaScript/React code
- **@types/react 19.1.13** - TypeScript definitions for React
- **@types/react-dom 19.1.9** - TypeScript definitions for React DOM
- **eslint-plugin-react-hooks 5.2.0** - ESLint rules for React Hooks
- **eslint-plugin-react-refresh 0.4.20** - ESLint plugin for React Fast Refresh

## 📁 Project Structure

```
GSPReactTemplate/
├── public/                          # Static assets and files
│   ├── vite.svg                    # Vite logo
│   ├── icons/                      # Application icons
│   │   └── vite.svg
│   └── images/                     # Image assets
│       └── vite.svg
├── src/                            # Source code directory
│   ├── main.jsx                    # Application entry point
│   ├── assets/                     # Static assets (images, fonts, etc.)
│   │   └── react.svg              # React logo
│   ├── components/                 # Reusable React components
│   │   ├── admin/                  # Admin panel specific components
│   │   │   ├── Dashboard/          # Main dashboard component
│   │   │   │   ├── index.jsx
│   │   │   │   └── Dashboard.scss
│   │   │   └── AdminNotFound/      # 404 error page component
│   │   │       ├── index.jsx
│   │   │       └── AdminNotFound.scss
│   │   ├── main/                   # Main application components
│   │   └── ui/                     # Reusable UI components (buttons, inputs, etc.)
│   ├── Layouts/                    # Page layout components
│   │   └── AdminLayout/            # Admin panel layout wrapper
│   │       ├── index.jsx
│   │       └── AdminLayout.scss
│   ├── hooks/                      # Custom React hooks
│   │   └── useWindowSize.js        # Window size tracking hook
│   ├── libs/                       # External library integrations & utilities
│   │   └── helpers.js              # Helper functions and utilities
│   ├── styles/                     # Global styles and SCSS modules
│   │   ├── global.css              # Global CSS reset and base styles
│   │   ├── index.scss              # Main Sass entry point
│   │   ├── _variables.scss         # Sass variables (colors, fonts, etc.)
│   │   ├── _mixins.scss            # Reusable Sass mixins
│   │   └── _animations.scss        # CSS animations and transitions
│   └── utils/                      # Utility functions and configurations
│       └── router.js               # React Router configuration
├── .gitignore                      # Git ignore rules
├── eslint.config.js                # ESLint configuration
├── vite.config.js                  # Vite bundler configuration
├── package.json                    # Project dependencies and scripts
└── README.md                       # Project documentation
```

## 🏗️ Architecture Overview

### 📦 Components Organization

The template follows a feature-based component organization:

#### `components/admin/`

Admin panel specific components with their own styling:

- **Dashboard**: Main control panel with metrics and navigation
- **AdminNotFound**: Custom 404 error page for admin routes

#### `components/main/`

Main application components for public-facing features (ready for expansion)

#### `components/ui/`

Reusable UI components that can be used throughout the application:

- Form elements (inputs, buttons, selects)
- Layout components (cards, modals, tooltips)
- Navigation components

**Example usage:**

```jsx
import Dashboard from "../components/admin/Dashboard";
import Button from "../components/ui/Button";
```

### 🎨 Layouts

Components that define page layouts and structure:

#### `AdminLayout`

Main layout wrapper for admin panel routes. Uses React Router's Outlet to render child components.

**Features:**

- Consistent admin panel structure
- Navigation integration
- Responsive design ready

**Example structure:**

```jsx
// AdminLayout/index.jsx
import { Outlet } from "react-router";

function AdminLayout() {
  return (
    <div className="admin-layout">
      <header className="admin-header">
        <h1>Admin Panel</h1>
        <nav>{/* Navigation items */}</nav>
      </header>
      <main className="admin-main">
        <Outlet /> {/* Child components render here */}
      </main>
      <footer className="admin-footer">{/* Footer content */}</footer>
    </div>
  );
}
```

### 📝 Form Handling

The template includes robust form handling capabilities:

#### **Formik Integration**

Formik is integrated for handling complex forms with validation:

```jsx
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Too short").required("Required"),
});

function LoginForm() {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log(values)}
    >
      <Form>
        <Field name="email" type="email" placeholder="Email" />
        <ErrorMessage name="email" component="div" />

        <Field name="password" type="password" placeholder="Password" />
        <ErrorMessage name="password" component="div" />

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
}
```

#### **Yup Validation**

Yup provides powerful schema validation:

```jsx
const userSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  age: Yup.number().positive().integer().required(),
  email: Yup.string().email().required(),
  website: Yup.string().url(),
});
```

### 🎨 Styles Architecture

SCSS architecture with organized and scalable style files:

#### `_variables.scss`

Centralized Sass variables for consistent theming:

```scss
// Color palette
$primary-color: #3498db;
$secondary-color: #2ecc71;
$danger-color: #e74c3c;
$warning-color: #f39c12;
$success-color: #27ae60;

// Typography
$font-family-primary: "Inter", "Arial", sans-serif;
$font-family-mono: "Fira Code", "Courier New", monospace;

// Breakpoints for responsive design
$mobile: 768px;
$tablet: 1024px;
$desktop: 1200px;

// Z-index layers
$z-dropdown: 1000;
$z-modal: 2000;
$z-tooltip: 3000;
```

#### `_mixins.scss`

Reusable Sass mixins for common patterns:

```scss
// Responsive breakpoint mixin
@mixin respond-to($breakpoint) {
  @if $breakpoint == mobile {
    @media (max-width: $mobile) {
      @content;
    }
  }
  @if $breakpoint == tablet {
    @media (max-width: $tablet) {
      @content;
    }
  }
}

// Button styling mixin
@mixin button-variant($bg-color, $text-color: white) {
  background-color: $bg-color;
  color: $text-color;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: darken($bg-color, 10%);
    transform: translateY(-1px);
  }
}

// Flexbox centering
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

#### `_animations.scss`

CSS animations and transitions:

```scss
// Fade animations
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// Loading spinner
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

// Utility classes
.fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

.fade-in-up {
  animation: fadeInUp 0.4s ease-out;
}
```

### 🧭 Router Configuration

#### `router.js`

React Router configuration:

```javascript
import { createBrowserRouter } from "react-router";
import Dashboard from "../components/admin/Dashboard";
import AdminLayout from "../Layouts/AdminLayout";
import AdminNotFound from "../components/admin/AdminNotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AdminLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "*", Component: AdminNotFound },
    ],
  },
]);
```

### 🔧 Custom Hooks

Ready-to-use React hooks for common functionality:

#### `useWindowSize.js`

Advanced hook for responsive design and window size tracking:

**Features:**

- Real-time window dimensions tracking
- SSR/SSG compatible (server-side rendering)
- Debounced resize events for performance
- TypeScript support ready
- Memory leak prevention with cleanup

**Usage example:**

```jsx
import useWindowSize from "../hooks/useWindowSize";

function ResponsiveComponent() {
  const { windowSize, windowHeight, isMobile, isTablet } = useWindowSize();

  return (
    <div>
      <p>
        Current viewport: {windowSize}px × {windowHeight}px
      </p>
      {isMobile && <p>📱 Mobile layout active</p>}
      {isTablet && <p>📱 Tablet layout active</p>}
      {!isMobile && !isTablet && <p>🖥️ Desktop layout active</p>}
    </div>
  );
}
```

**Planned hooks:**

- `useAuth` - Authentication state management
- `useApi` - API calls with loading, error states
- `useLocalStorage` - Persistent local storage hook
- `useDebounce` - Input debouncing for search/filters
- `useForm` - Enhanced form handling with Formik integration

### 📚 Helper Libraries

Utility functions and integrations in the `libs` directory:

#### `helpers.js`

Collection of utility functions for common operations:

**Current utilities:**

```javascript
// Date formatting utilities
export const formatDate = (date, format = "DD/MM/YYYY") => {
  // Implementation for date formatting
};

// String manipulation
export const truncateText = (text, maxLength = 100) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

// Validation helpers
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// API response formatting
export const formatApiResponse = (response) => {
  return {
    data: response.data,
    success: response.status >= 200 && response.status < 300,
    message: response.statusText,
  };
};
```

**Planned utilities:**

- API client wrapper with error handling
- Authentication token management
- File upload helpers
- Data transformation utilities
- Cache management functions

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn** package manager
- **Git** for version control

### Quick Start

1. **Clone the template:**

```bash
git clone https://github.com/your-username/gsp-react-template.git
cd gsp-react-template
```

2. **Install dependencies:**

```bash
npm install
# or
yarn install
```

3. **Start development server:**

```bash
npm run dev
# or
yarn dev
```

4. **Open your browser:**
   Navigate to `http://localhost:5173` to see your application running.

### Development Workflow

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint for code quality
npm run lint

# Run ESLint with auto-fix
npm run lint --fix
```

## 📜 Available Scripts

| Script            | Description                                                |
| ----------------- | ---------------------------------------------------------- |
| `npm run dev`     | Starts Vite development server with hot module replacement |
| `npm run build`   | Creates optimized production build in `dist/` folder       |
| `npm run preview` | Previews production build locally                          |
| `npm run lint`    | Runs ESLint to check code quality and style                |

## 🎯 Key Features

### ✅ Ready-to-Use Features

- **🔥 Vite** - Lightning fast development and build tool
- **⚛️ React 19** - Latest React with concurrent features
- **🧭 React Router** - Declarative routing with nested routes
- **📝 Form Handling** - Formik + Yup for robust form management
- **🎨 SCSS Support** - Organized styling architecture
- **📱 Responsive Design** - Mobile-first approach with breakpoint system
- **🔍 ESLint** - Code quality and consistency enforcement
- **🏗️ Component Architecture** - Well-organized, scalable component structure
- **🪝 Custom Hooks** - Reusable logic with custom React hooks
- **📦 TypeScript Ready** - Type definitions included for better DX

### 🚧 Planned Features

- **🔐 Authentication System** - JWT-based auth with protected routes
- **🌐 API Integration** - Axios wrapper with error handling
- **📊 State Management** - Context API or Zustand integration
- **🎭 Testing Setup** - Jest + React Testing Library
- **📱 PWA Support** - Service worker and offline capabilities
- **🌙 Dark Mode** - Theme switching with CSS custom properties
- **🌍 Internationalization** - Multi-language support with react-i18next
- **📈 Analytics** - Google Analytics or custom analytics integration

## 🏗️ Project Structure Best Practices

### Component Organization

```
src/components/
├── ui/              # Reusable UI components
│   ├── Button/
│   ├── Input/
│   ├── Modal/
│   └── Card/
├── forms/           # Form-specific components
│   ├── LoginForm/
│   ├── ContactForm/
│   └── UserForm/
├── layout/          # Layout components
│   ├── Header/
│   ├── Footer/
│   └── Sidebar/
└── features/        # Feature-specific components
    ├── auth/
    ├── dashboard/
    └── profile/
```

### Styling Guidelines

- Use **SCSS modules** for component-specific styles
- Keep **global styles** in `src/styles/`
- Follow **BEM methodology** for CSS class naming
- Use **CSS custom properties** for theming
- Implement **mobile-first** responsive design

### Code Quality

- Follow **ESLint rules** for consistent code style
- Use **TypeScript** for better development experience
- Implement **proper error boundaries**
- Write **meaningful component and function names**
- Add **JSDoc comments** for complex functions

## 🤝 Contributing

We welcome contributions to make this template even better! Here's how you can help:

### Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/gsp-react-template.git
   ```
3. **Create a feature branch:**
   ```bash
   git checkout -b feature/amazing-new-feature
   ```
4. **Make your changes** and test thoroughly
5. **Commit your changes:**
   ```bash
   git commit -m "✨ Add amazing new feature"
   ```
6. **Push to your branch:**
   ```bash
   git push origin feature/amazing-new-feature
   ```
7. **Open a Pull Request** with a clear description

### Contribution Guidelines

- Follow the existing **code style** and **ESLint rules**
- Write **clear commit messages** using conventional commits
- **Test your changes** thoroughly before submitting
- Update **documentation** if you're adding new features
- Keep **pull requests focused** on a single feature/fix

### Types of Contributions

- � **Bug fixes** - Help us squash those pesky bugs
- ✨ **New features** - Add new components, hooks, or utilities
- 📚 **Documentation** - Improve README, code comments, or examples
- 🎨 **Styling** - Enhance UI/UX or fix responsive issues
- ⚡ **Performance** - Optimize bundle size or runtime performance
- 🧪 **Testing** - Add tests or improve test coverage

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### What this means:

- ✅ **Commercial use** - Use in commercial projects
- ✅ **Modification** - Modify and customize as needed
- ✅ **Distribution** - Share with others
- ✅ **Private use** - Use in private projects
- ❗ **Limitation** - No warranty or liability
- ℹ️ **Condition** - Must include license and copyright notice

## 🙏 Acknowledgments

This template was built with love using these amazing tools and libraries:

- [React](https://reactjs.org/) - The library for web and native user interfaces
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [React Router](https://reactrouter.com/) - Declarative routing for React
- [Formik](https://formik.org/) - Build forms in React, without tears
- [Yup](https://github.com/jquense/yup) - Dead simple Object schema validation
- [Sass](https://sass-lang.com/) - CSS with superpowers
- [ESLint](https://eslint.org/) - Pluggable JavaScript linter

## 📞 Support

If you encounter any issues or have questions:

1. **Check the documentation** above for common solutions
2. **Search existing issues** on GitHub
3. **Create a new issue** with detailed information
4. **Join our community** for discussions and help

---

**Happy coding! 🚀**

Built with ❤️ for the React community
