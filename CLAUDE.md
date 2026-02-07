# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16.1.6 application using the App Router, React 19, TypeScript, and Tailwind CSS 4. The project is configured with shadcn/ui components (New York style) and follows modern Next.js best practices.

## Development Commands

```bash
# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run ESLint
npm run lint
```

## Architecture

### Framework & Routing
- **Next.js App Router**: All routes are defined in the `app/` directory
- **Server Components by default**: Use `"use client"` directive only when client-side interactivity is needed
- **File-based routing**: `app/page.tsx` is the home page, `app/layout.tsx` is the root layout

### Styling System
- **Tailwind CSS 4**: Using the new v4 syntax with `@import "tailwindcss"` in globals.css
- **CSS Variables**: Theme defined using OKLCH color space with CSS custom properties
- **Dark Mode**: Implemented via `.dark` class with custom variant `@custom-variant dark (&:is(.dark *))`
- **shadcn/ui**: Components use the New York style with CSS variables enabled

### Path Aliases
TypeScript path mapping configured in `tsconfig.json`:
- `@/*` maps to root directory
- shadcn/ui component aliases (from `components.json`):
  - `@/components` - React components
  - `@/components/ui` - UI components from shadcn
  - `@/lib` - Utility libraries
  - `@/lib/utils` - Contains `cn()` utility for className merging
  - `@/hooks` - Custom React hooks

### Key Dependencies
- **UI Components**: shadcn/ui with Radix UI primitives, lucide-react for icons
- **Styling Utilities**:
  - `clsx` and `tailwind-merge` via `cn()` utility in `lib/utils.ts`
  - `class-variance-authority` for component variants
  - `tw-animate-css` for animations
- **Fonts**: Geist Sans and Geist Mono via `next/font/google`

## Component Development

### Adding shadcn/ui Components
Use the shadcn CLI to add pre-built components:
```bash
npx shadcn@latest add [component-name]
```

Components will be added to the `components/ui/` directory (which doesn't exist yet but will be created on first use).

### Styling Conventions
- Use the `cn()` utility from `@/lib/utils` for conditional className merging
- Leverage CSS variables for theming (e.g., `bg-background`, `text-foreground`)
- Follow shadcn/ui patterns for component composition

### TypeScript Configuration
- Strict mode enabled
- JSX transform: `react-jsx`
- Module resolution: `bundler`
- Target: ES2017

## File Structure
```
app/
  layout.tsx      # Root layout with font setup and metadata
  page.tsx        # Home page
  globals.css     # Global styles with Tailwind imports and theme
lib/
  utils.ts        # cn() utility for className merging
components/       # (Created when adding shadcn components)
  ui/             # shadcn/ui components
public/           # Static assets
```

## ESLint Configuration
Using Next.js recommended ESLint configs with TypeScript support. Ignores `.next/`, `out/`, `build/`, and `next-env.d.ts`.
