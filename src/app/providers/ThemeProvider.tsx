import type { ReactNode } from 'react';
// import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState, useMemo } from 'react';
import { ThemeContext } from '~entities/contexts/theme-context';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export function MUIThemeProvider({ children }: { children: ReactNode }) {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  const themeContextValue = useMemo(
    () => ({
      isDarkTheme,
      toggleTheme,
    }),
    [isDarkTheme],
  );

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
          {children}
        </ThemeProvider>
      </LocalizationProvider>
    </ThemeContext.Provider>
  );
}
