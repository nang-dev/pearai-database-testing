# PearAI Generic Web Application Template

A modern, responsive web application template built with React, TypeScript, and shadcn/ui components.

## Features

- 🚀 Built with Vite for fast development and building
- 💪 TypeScript for type safety
- 🎨 Styled with Tailwind CSS
- 📦 Comprehensive UI components from shadcn/ui
- 📱 Fully responsive design
- 🧭 React Router for navigation
- 📊 Recharts for data visualization
- 🌙 Dark mode support (via next-themes)

## Project Structure

```
src/
├── components/     # Reusable UI components
│   └── ui/        # shadcn/ui components
├── hooks/         # Custom React hooks
├── lib/          # Utility functions and helpers
└── pages/        # Application pages/routes
```

## Getting Started

1. Clone the repository
```bash
git clone <repository-url>
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Build for production
```bash
npm run build
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Customization

### Styling
- The template uses Tailwind CSS for styling
- Custom styles can be added in `src/index.css`
- Theme customization can be done in `tailwind.config.ts`

### Components
- UI components are from shadcn/ui and can be found in `src/components/ui`
- Custom components can be added to `src/components`

### Routing
- Routes are defined in `src/App.tsx`
- Add new pages in `src/pages` directory

## Technologies Used

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [Recharts](https://recharts.org/)
- [React Query](https://tanstack.com/query/latest)

## License

MIT
