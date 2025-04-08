import type { ReactNode } from 'react';
// import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const defaultTheme = createTheme();

export function MUIThemeProvider({ children }:{ children:ReactNode }) {
    return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={defaultTheme}>
                {children}
        </ThemeProvider>
    </LocalizationProvider>
    );
}