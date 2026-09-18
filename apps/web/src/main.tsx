import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './app/App.tsx';
import { AppThemeProvider } from './app/providers/AppThemeProvider.tsx';
import { AppStoreProvider } from './app/providers/AppStoreProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppStoreProvider>
      <AppThemeProvider>
        <App />
      </AppThemeProvider>
    </AppStoreProvider>
  </StrictMode>,
);
