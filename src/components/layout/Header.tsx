import MenuIcon from '@mui/icons-material/Menu';
import {
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
} from '@mui/material';
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { H1, Nav } from './HeaderStyles';

export const Header: FC = () => {
  const { username } = useAuth();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <MuiAppBar position="static">
      <Container maxWidth="xl" sx={{ backgroundColor: '#FF4500' }}>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{ display: { xs: 'flex', md: 'none' } }}
          >
            EventsHub
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem>
                <Typography textAlign="center">Новое</Typography>
                <Typography textAlign="center">Популярное</Typography>
                <Typography textAlign="center">По категориям</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{ display: { xs: 'none', md: 'flex' } }}
          >
            {' '}
            <Link to="/">
              <H1>EventsHub</H1>
            </Link>
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
            }}
          >
            <Nav>
              <Link to="/events/new">
                <Typography textAlign="center">Новое</Typography>
              </Link>
              <Link to="/events/popular">
                <Typography textAlign="center">Популярное</Typography>
              </Link>
              <Link to="/events/categories">
                <Typography textAlign="center">По категориям</Typography>
              </Link>
            </Nav>
          </Box>
          {username ? (
            <Link to={'/cabinet'}>
              <Typography>{username}</Typography>
            </Link>
          ) : (
            <Link to={'/auth/login'}>Log In</Link>
          )}
        </Toolbar>
      </Container>
    </MuiAppBar>
  );
};
