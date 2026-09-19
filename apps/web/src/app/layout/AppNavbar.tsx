import {
  AppBar,
  Toolbar,
  Typography,
  useColorScheme,
  Tooltip,
  IconButton,
} from '@mui/material';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';

const drawerWidth = 300;
export function AppNavbar() {
  const { mode, setMode } = useColorScheme();

  const isDarkMode = mode === 'dark';

  const handleToggleTheme = () => {
    setMode(isDarkMode ? 'light' : 'dark');
  };

  return (
    <AppBar
      position='fixed'
      elevation={0}
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        borderBottom: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
        color: 'text.primary',
      }}
    >
      <Toolbar
        sx={{
          justifyContent: 'space-between',
        }}
      >
        <Typography variant='h6' noWrap sx={{ fontWeight: 700 }}>
          Repo Radar
        </Typography>
        <Tooltip title={isDarkMode ? 'Light mode' : 'Dark mode'}>
          <IconButton
            onClick={handleToggleTheme}
            color='inherit'
            aria-label='Toggle color scheme'
          >
            {isDarkMode ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}
