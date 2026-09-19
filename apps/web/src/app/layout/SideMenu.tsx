import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { NavLink } from 'react-router';

import { appRoutes } from '../router/appRoutes';

const drawerWidth = 300;

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
          borderRightColor: 'divider',
        },
      }}
    >
      <Toolbar>
        <Typography variant='subtitle1' sx={{ fontWeight: 700 }}>
          Repo Radar
        </Typography>
      </Toolbar>

      <Box sx={{ px: 1.5, py: 1 }}>
        <List>
          {appRoutes.map((route) => (
            <ListItemButton
              key={route.path}
              component={NavLink}
              to={route.path}
              sx={{
                borderRadius: 2,
                mb: 0.5,

                '&.active': {
                  bgcolor: 'action.selected',
                  color: 'primary.main',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color: 'inherit',
                }}
              >
                {route.handle.nav.icon}
              </ListItemIcon>

              <ListItemText primary={route.handle.nav.label} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
