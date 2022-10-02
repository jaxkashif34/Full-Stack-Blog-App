import React, { useRef } from 'react';
import { AppBar, IconButton, Toolbar, Typography, Box, Menu, MenuItem, Avatar, Button, Tooltip } from '@mui/material';
import { Container } from '@mui/system';
import { Book, Menu as MenuIcon, Person } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { setAnchorElNav } from '../../store/UI-Features';
import { useDispatch, useSelector } from 'react-redux';
const Nav = () => {
  const anchorRef = useRef(null);
  const dispatch = useDispatch();
  const { anchorElNav } = useSelector((state) => state.UIFeatures);
  const { currentUser } = useSelector((state) => state.auth);
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        {/* what is gutter padding ? */}
        <Toolbar disableGutters>
          <Book sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none' }}>
            Blog App
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton ref={anchorRef} size="large" color="inherit" onClick={() => dispatch(setAnchorElNav(true))}>
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorRef.current}
              anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={anchorElNav}
              onClose={() => dispatch(setAnchorElNav(false))}
              sx={{ top: 30, left: 10, dispaly: { xs: 'block', md: 'none' } }}>
              <MenuItem>
                <Typography textAlign="center">Home</Typography>
              </MenuItem>
              <MenuItem>
                <Typography textAlign="center">LogOut</Typography>
              </MenuItem>
            </Menu>
          </Box>

          <Book sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={RouterLink}
            to="/"
            sx={{ mr: 2, display: { xs: 'flex', md: 'none' }, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none' }}>
            Blog App
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button color="inherit">Home</Button>
            <Button color="inherit">LogOut</Button>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={currentUser?.name || 'User Profile'} arrow placement="left-end">
              <IconButton sx={{ p: 0 }}>
                <Avatar src={currentUser?.profile_pic?.secure_url} alt={currentUser?.name} sx={{ width: { xs: 40, md: 45 }, height: { xs: 40, md: 45 } }}>
                  <IconButton component="label">
                    <input type="file" accept="image/*" hidden />
                    {currentUser === null && <Person />}
                  </IconButton>
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Nav;
