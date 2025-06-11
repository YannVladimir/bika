import { createTheme, Theme } from '@mui/material/styles';

export const tokens = {
  primary: {
    main: '#1976d2',
    light: '#42a5f5',
    dark: '#1565c0',
  },
  secondary: {
    main: '#36B37E', // Green from logo
    light: '#57D9A3',
    dark: '#248F63',
  },
  accent: {
    main: '#FFB800', // Yellow from logo
    light: '#FFCC33',
    dark: '#CC9200',
  },
  grey: {
    100: '#f8f9fa',
    200: '#e9ecef',
    300: '#dee2e6',
    400: '#ced4da',
    500: '#adb5bd',
    600: '#6c757d',
    700: '#495057',
    800: '#343a40',
    900: '#212529',
  },
};

export const getTheme = (mode: 'light' | 'dark'): Theme => {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: tokens.primary.main,
        light: tokens.primary.light,
        dark: tokens.primary.dark,
      },
      secondary: {
        main: tokens.secondary.main,
        light: tokens.secondary.light,
        dark: tokens.secondary.dark,
      },
      background: {
        default: mode === 'dark' ? tokens.grey[900] : tokens.grey[100],
        paper: mode === 'dark' ? tokens.grey[800] : '#fff',
      },
      text: {
        primary: mode === 'light' ? tokens.grey[900] : tokens.grey[100],
        secondary: mode === 'light' ? tokens.grey[700] : tokens.grey[300],
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: '2.5rem',
        fontWeight: 600,
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 600,
      },
      h3: {
        fontSize: '1.75rem',
        fontWeight: 600,
      },
      h4: {
        fontSize: '1.5rem',
        fontWeight: 500,
      },
      h5: {
        fontSize: '1.25rem',
        fontWeight: 500,
      },
      h6: {
        fontSize: '1rem',
        fontWeight: 500,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
            fontWeight: 500,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: mode === 'light' 
              ? '0px 2px 4px rgba(0, 0, 0, 0.05)'
              : '0px 2px 4px rgba(0, 0, 0, 0.2)',
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: mode === 'dark' ? tokens.grey[900] : tokens.grey[100],
          },
        },
      },
    },
  });
}; 