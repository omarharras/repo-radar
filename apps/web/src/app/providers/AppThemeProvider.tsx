import { CssBaseline, ThemeProvider } from '@mui/material';
import { appTheme } from '../theme/createAppTheme';

import type { PropsWithChildren } from 'react';

export function AppThemeProvider({ children }: PropsWithChildren) {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}