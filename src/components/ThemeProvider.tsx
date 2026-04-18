/**
 * THEME PROVIDER COMPONENT
 * Forces dark mode across the entire application
 * 
 * FEATURES:
 * - Always applies dark mode
 * - Proper HTML class management for Tailwind dark mode
 * - Simplified context for components that still need theme awareness
 * 
 * DEVELOPER NOTE: This provider wraps the entire app and ensures the 'dark' class
 * is always applied to the document element for Tailwind's dark mode functionality
 */

import React, { createContext, useContext, useEffect } from 'react';

// Theme type definition
type Theme = 'dark' | 'light';

// Theme context interface
interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

// Create theme context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme provider props
interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
}

/**
 * THEME PROVIDER COMPONENT
 * Handles light/dark mode state and persistent storage
 */
export function ThemeProvider({ 
  children, 
  defaultTheme = 'dark' 
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
    
    // Fallback to defaultTheme
    return defaultTheme;
  });

  /**
   * THEME APPLICATION
   * Update the document element classes when theme changes
   */
  useEffect(() => {
    const root = document.documentElement;
    
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setThemeState(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  // Context value
  const value: ThemeContextType = {
    theme,
    isDark: theme === 'dark',
    setTheme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * THEME HOOK
 * Custom hook to use theme context
 * 
 * USAGE:
 * const { isDark } = useTheme(); // Always returns isDark: true
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}