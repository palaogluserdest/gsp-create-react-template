# Create GSP React Template

A powerful CLI tool to quickly scaffold modern React applications with an intelligent multi-step template selection system. Choose your language, routing & forms, and styling approach through an interactive menu.

## 🚀 Quick Start

```bash
# Using npx (recommended)
npx create-gsp-react my-app

# Install to current directory
npx create-gsp-react .

# Or install globally
npm install -g create-gsp-react
create-gsp-react my-app
```

## 📦 Template Options

Interactive multi-step template selection with modern combinations:

### 🌐 Step 1: Choose Language

- **JavaScript** - Modern JavaScript with React 19 and Vite
- **TypeScript** - TypeScript with full type safety and better DX

### 🧭 Step 2: Choose Router + Forms

- **React Router + Formik + Yup** - Traditional form handling with React Router v7
- **React Router + React Hook Form + Zod** - Modern form handling _(Coming in v1.2.0)_

### 🎨 Step 3: Choose Styling

- **Vanilla CSS** - Standard CSS with Sass preprocessing
- **Tailwind CSS** - Utility-first CSS framework
- **Tailwind CSS + ShadcnUI** - Modern UI components built on Tailwind CSS

### 🔗 Available Combinations

Currently available: **6 templates** (3 styling options × 2 languages)  
Coming soon: **12 templates** (6 current + 6 React Hook Form variants)

## 🛠️ What's Included

### Core Features (All Templates)

- ⚛️ **React 19** - Latest React with concurrent features
- ⚡ **Vite** - Lightning fast development and build tool
- 🧭 **React Router 7** - Modern declarative routing with data API
- 🎨 **Sass** - CSS preprocessing with organized architecture
- 🔍 **ESLint** - Code quality and consistency
- 📱 **Responsive Design** - Mobile-first approach
- 🏗️ **Component Architecture** - Well-organized folder structure

### Form Handling Options

**Current (v1.1.0):**
- 📝 **Formik + Yup** - Traditional, battle-tested form handling with schema validation

**Coming (v1.2.0):**
- 🎯 **React Hook Form + Zod** - Modern, performant forms with TypeScript-first validation

### TypeScript Templates Include

- 📘 **TypeScript 5.2+** - Type safety and better DX
- 🔧 **Proper TypeScript configs** - Optimized for React & Vite

### Tailwind Templates Include

- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 📦 **PostCSS** - CSS processing pipeline
- 🎯 **Custom Tailwind config** - Pre-configured with design tokens

### ShadcnUI Templates Include

- 🎯 **ShadcnUI** - Beautiful, accessible components
- 🧩 **Pre-built components** - Button, Input, and more
- 🔧 **Component utilities** - cn() helper function
- 📋 **components.json** - ShadcnUI configuration

## 📁 Project Structure

```
my-app/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── admin/         # Admin-specific components
│   │   ├── main/          # Main app components
│   │   └── ui/            # Reusable UI components (ShadcnUI templates)
│   ├── Layouts/           # Page layouts
│   ├── hooks/             # Custom React hooks
│   ├── libs/              # Utility functions
│   ├── styles/            # Global styles and SCSS
│   └── utils/             # Router and utilities
├── package.json
├── vite.config.{js|ts}
├── tailwind.config.js     # (Tailwind templates)
├── components.json        # (ShadcnUI templates)
└── tsconfig.json          # (TypeScript templates)
```

## 🎯 Usage Examples

### Interactive Mode (Recommended)

```bash
npx create-gsp-react my-app
# Follow the 3-step selection process:
# 1. 🌐 Choose Language: JavaScript or TypeScript
# 2. 🧭 Choose Router + Forms: Formik+Yup or React Hook Form+Zod
# 3. 🎨 Choose Styling: Vanilla CSS, Tailwind CSS, or ShadcnUI
```

### Direct Template Selection

```bash
# JavaScript with Tailwind CSS
npx create-gsp-react my-app --template javascript-tailwind

# TypeScript with ShadcnUI
npx create-gsp-react my-app --template typescript-shadcn

# Pure TypeScript with Vanilla CSS
npx create-gsp-react my-app --template typescript
```

### Current Template IDs

**Available Now (v1.1.0):**
- `javascript` - JS + React Router + Formik+Yup + Vanilla CSS
- `typescript` - TS + React Router + Formik+Yup + Vanilla CSS  
- `javascript-tailwind` - JS + React Router + Formik+Yup + Tailwind CSS
- `typescript-tailwind` - TS + React Router + Formik+Yup + Tailwind CSS
- `javascript-shadcn` - JS + React Router + Formik+Yup + ShadcnUI
- `typescript-shadcn` - TS + React Router + Formik+Yup + ShadcnUI

**Coming in v1.2.0:**
- `javascript-rhf` - JS + React Router + React Hook Form+Zod + Vanilla CSS
- `typescript-rhf` - TS + React Router + React Hook Form+Zod + Vanilla CSS
- `javascript-rhf-tailwind` - JS + React Router + React Hook Form+Zod + Tailwind CSS
- `typescript-rhf-tailwind` - TS + React Router + React Hook Form+Zod + Tailwind CSS
- `javascript-rhf-shadcn` - JS + React Router + React Hook Form+Zod + ShadcnUI
- `typescript-rhf-shadcn` - TS + React Router + React Hook Form+Zod + ShadcnUI

## 🚀 After Project Creation

```bash
cd my-app
npm install
npm run dev
```

Your app will be running at `http://localhost:5173`

### 🌍 What You Get

- **Main Layout** - Available at `/` with navigation
- **Admin Layout** - Available at `/admin` with admin panel
- **Responsive Design** - Works on all devices
- **Development Server** - Hot reload and fast refresh
- **Production Ready** - Optimized build with Vite

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔧 Customization

### Adding ShadcnUI Components (ShadcnUI templates)

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add card
```

### Tailwind Configuration (Tailwind/ShadcnUI templates)

Edit `tailwind.config.js` to customize your design system:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          500: "#3b82f6",
          600: "#2563eb",
        },
      },
    },
  },
};
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT © GSP Team

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI Library
- [Vite](https://vitejs.dev/) - Build Tool
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [ShadcnUI](https://ui.shadcn.com/) - Component Library
- [Formik](https://formik.org/) - Form Library
