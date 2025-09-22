# Create GSP React Template

A powerful CLI tool to quickly scaffold modern React applications with various template options including TypeScript, Tailwind CSS, and ShadcnUI.

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

Choose from 6 different template configurations:

### 🟡 JavaScript Templates

- **JavaScript** - Pure React with JavaScript, Vite, Formik & Yup
- **JavaScript + Tailwind** - JavaScript template with Tailwind CSS
- **JavaScript + ShadcnUI** - JavaScript template with ShadcnUI components

### 🔵 TypeScript Templates

- **TypeScript** - React with TypeScript, Vite, Formik & Yup
- **TypeScript + Tailwind** - TypeScript template with Tailwind CSS
- **TypeScript + ShadcnUI** - TypeScript template with ShadcnUI components

## 🛠️ What's Included

### Core Features

- ⚛️ **React 19** - Latest React with concurrent features
- ⚡ **Vite** - Lightning fast development and build tool
- 🧭 **React Router 7** - Modern declarative routing
- 📝 **Formik + Yup** - Robust form handling and validation
- 🎨 **Sass** - CSS preprocessing with organized architecture
- 🔍 **ESLint** - Code quality and consistency

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

### Interactive Mode

```bash
npm create gsp@latest
# Follow the prompts to name your project and choose template
```

### Direct Template Selection

```bash
# JavaScript with Tailwind
npm create gsp@latest my-app --template javascript-tailwind

# TypeScript with ShadcnUI
npm create gsp@latest my-app --template typescript-shadcn

# Pure TypeScript
npm create gsp@latest my-app --template typescript
```

### Available Template IDs

- `javascript`
- `typescript`
- `javascript-tailwind`
- `typescript-tailwind`
- `javascript-shadcn`
- `typescript-shadcn`

## 🚀 After Project Creation

```bash
cd my-app
npm install
npm run dev
```

Your app will be running at `http://localhost:5173`

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
