import MenuIcon from '@mui/icons-material/Menu';
import {
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  AppBar as MuiAppBar,
  Stack,
  SvgIcon,
  SvgIconProps,
  Toolbar,
  Typography,
} from '@mui/material';
import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { H1, Nav, StyledMenuItem } from './HeaderStyles';

// Cтиль поисковика
// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(1),
//     width: 'auto',
//   },
// }));
// Стиль инпута
// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'black',
//   width: '100%',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     [theme.breakpoints.up('sm')]: {
//       width: '12ch',
//       '&:focus': {
//         width: '20ch',
//       },
//     },
//   },
// }));

export const Header: FC = () => {
  const { username, logout } = useAuth();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
    navigate('/');
  };

  function HomeIcon(props: SvgIconProps) {
    return (
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    );
  }

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
              <StyledMenuItem>
                <Link to="/events/new">
                  <Typography textAlign="center">New</Typography>
                </Link>
                <Link to="/events/popular">
                  <Typography textAlign="center">Popular</Typography>
                </Link>
                <Link to="/events/categories">
                  <Typography textAlign="center">Category</Typography>
                </Link>
              </StyledMenuItem>
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
                <Typography textAlign="center">New</Typography>
              </Link>
              <Link to="/events/popular">
                <Typography textAlign="center">Popular</Typography>
              </Link>
              <Link to="/events/categories">
                <Typography textAlign="center">Category</Typography>
              </Link>
              {/* <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search> */}
            </Nav>
          </Box>
          {username ? (
            <div>
              <Button
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Stack direction="row" spacing={3}>
                  <HomeIcon
                    sx={{
                      color: 'white',
                      fontSize: '30px',
                    }}
                  />
                </Stack>
              </Button>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <Typography variant="h6" textAlign={'center'}>
                  {username}
                </Typography>
                <MenuItem onClick={handleClose}>
                  <Link to="/cabinet/events">Кабинет</Link>
                </MenuItem>
                <MenuItem onClick={handleLogout}>Выйти</MenuItem>
              </Menu>
            </div>
          ) : (
            <Link to="/auth/login">Войти</Link>
          )}
        </Toolbar>
      </Container>
    </MuiAppBar>
  );
};
