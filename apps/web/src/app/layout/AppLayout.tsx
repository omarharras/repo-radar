import { Box, Toolbar, Container } from '@mui/material';
import { Outlet } from 'react-router';
import { SideMenu } from './SideMenu';
import { AppNavbar } from './AppNavbar';

export function AppLayout() {
  return (
    <Box sx={{ display: 'flex' }}>
      <SideMenu />
      <AppNavbar />

      <Box
        component='main'
        sx={{
          flexGrow: 1,
          minWidth: 0,
        }}
      >
        <Toolbar />

        <Container maxWidth='lg' sx={{ p: 3 }}>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}
