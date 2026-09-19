import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';
import { NavLink } from 'react-router';
import { appRoutes } from '../router/appRoutes';

const drawerWidth = 240;

export function SideMenu() {
  return (
    <Drawer
      variant='permanent'
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />

      <Box sx={{ overflow: 'auto' }}>
        <List>
          {appRoutes.map((route) => (
            <ListItemButton
              key={route.path}
              component={NavLink}
              to={route.path}
              sx={{
                '&.active': {
                  bgcolor: 'action.selected',
                },
              }}
            >
              <ListItemIcon>{route.handle.nav.icon}</ListItemIcon>

              <ListItemText primary={route.handle.nav.label} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
