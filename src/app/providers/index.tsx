import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '~pages/dashboard';
import { withSuspense } from '~shared/lib/react';
import { BrowserRouter } from './RouterProvider';
import { MUIThemeProvider } from './ThemeProvider';
import { JSX } from 'react';
import React from 'react';
import { AntDesignProvider } from './AntDesignProvider';
import { SidebarProvider } from './SidebarProvider';
import { ToastProvider } from './ToastProvider';
// import '../../i18n.js';

export default function App(): JSX.Element {
  return (
    <React.StrictMode>
      <MUIThemeProvider>
        <ToastProvider>
          <AntDesignProvider>
            <SidebarProvider>
              <BrowserRouter />
            </SidebarProvider>
          </AntDesignProvider>
        </ToastProvider>
      </MUIThemeProvider>
    </React.StrictMode>
  );
}

const SuspensedProvider = withSuspense(App, {
  fallback: (
    <div>
      <h2>Что-то пошло не так... :/</h2>
    </div>
  ),
});

export const Provider = withErrorBoundary(SuspensedProvider, {
  fallbackRender: ErrorFallback,
});
