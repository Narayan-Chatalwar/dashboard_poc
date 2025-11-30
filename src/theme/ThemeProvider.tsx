'use client';

import { createContext, useState, useMemo, ReactNode, useEffect } from 'react';
import { createTheme, ThemeProvider as MUIThemeProvider, CssBaseline } from '@mui/material';

const THEME_KEY = 'visualise_theme_mode';

export const ThemeContext = createContext({
  toggleTheme: () => {},
  mode: 'dark',
});

interface AppThemeProviderProps {
  children: ReactNode;
}

export function AppThemeProvider({ children }: AppThemeProviderProps) {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const savedMode = localStorage.getItem(THEME_KEY) as 'light' | 'dark' | null;
    if (savedMode) {
      setMode(savedMode);
    }
  }, []);

  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem(THEME_KEY, newMode);
      return newMode;
    });
  };

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      ...(mode === 'dark'
        ? {
            primary: { main: '#6366f1', light: '#818cf8', dark: '#4f46e5' },
            secondary: { main: '#ec4899', light: '#f472b6', dark: '#db2777' },
            background: { default: '#0f172a', paper: '#1e293b' },
            text: { primary: '#f1f5f9', secondary: '#94a3b8' },
            success: { main: '#10b981' },
            warning: { main: '#f59e0b' },
            error: { main: '#ef4444' },
            info: { main: '#3b82f6' },
          }
        : {
            primary: { main: '#6366f1', light: '#818cf8', dark: '#4f46e5' },
            secondary: { main: '#ec4899', light: '#f472b6', dark: '#db2777' },
            background: { default: '#f1f5f9', paper: '#ffffff' },
            text: { primary: '#1e293b', secondary: '#64748b' },
            success: { main: '#16a34a' },
            warning: { main: '#f97316' },
            error: { main: '#dc2626' },
            info: { main: '#2563eb' },
          }),
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: { fontWeight: 700, fontSize: '2.5rem' },
      h2: { fontWeight: 700, fontSize: '2rem' },
      h3: { fontWeight: 600, fontSize: '1.5rem' },
      h4: { fontWeight: 600, fontSize: '1.25rem' },
      h5: { fontWeight: 600, fontSize: '1rem' },
      h6: { fontWeight: 600, fontSize: '0.875rem' },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: { textTransform: 'none', fontWeight: 600, borderRadius: 8, padding: '10px 24px' },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: { backgroundImage: 'none', borderRadius: 16, border: '1px solid rgba(148, 163, 184, 0.1)' },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: { backgroundImage: 'none' },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: { textTransform: 'none', fontWeight: 500, fontSize: '0.875rem' },
        },
      },
    },
  }), [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
}
