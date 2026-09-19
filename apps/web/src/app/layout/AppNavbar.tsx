import { AppBar, Toolbar, Typography } from '@mui/material';

const drawerWidth = 240;

export function AppNavbar() {
  return (
    <AppBar
      position='fixed'
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
      }}
    >
      <Toolbar>
        <Typography variant='h6' noWrap>
          Repo Radar
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
