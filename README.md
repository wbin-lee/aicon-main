# DS AI Week 2025 - Conference Website

A modern conference website built with Vite, React, TypeScript, and Tailwind CSS.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

Since this project is in WSL, it's recommended to run commands directly from within WSL rather than PowerShell:

1. Open WSL terminal and navigate to the project directory:
```bash
cd /home/nuriguri/workspace/aicon25-figma
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:3000`

### Alternative Installation (if WSL commands don't work)

If you encounter issues with WSL, you can also try:

```bash
# Clear npm cache
npm cache clean --force

# Install with legacy peer deps flag
npm install --legacy-peer-deps

# Or use yarn instead
yarn install
```

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 🎨 Features

- Modern responsive design
- Smooth animations and transitions
- Dark mode support
- Component-based architecture
- TypeScript for type safety
- Optimized build with Vite

## 📁 Project Structure

```
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   └── ...             # Feature components
├── styles/             # Global styles and CSS
├── src/                # Source files
│   └── main.tsx        # Application entry point
├── public/             # Static assets
└── index.html          # HTML template
```

## 🚀 Deployment

To build for production:

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service like Vercel, Netlify, or GitHub Pages.

## 🔧 Configuration

The project includes:
- Vite configuration (`vite.config.ts`)
- Tailwind CSS configuration (`tailwind.config.js`)
- TypeScript configuration (`tsconfig.json`)
- ESLint configuration (`.eslintrc.cjs`)

## 📝 Notes

- The project has been migrated from Next.js to Vite for better performance and simpler deployment
- All Zone.Identifier files have been removed for cleaner repository
- Background images from Figma assets have been replaced with CSS gradients
- All dependencies are properly configured for the Vite environment 