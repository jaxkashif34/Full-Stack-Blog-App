import React, { useRef } from 'react';
import { AppBar, Toolbar, Typography, Box, Menu, MenuItem, Avatar, Tooltip, ListItemIcon } from '@mui/material';
import { Container } from '@mui/system';
import { Book, Person, Logout, ManageAccounts } from '@mui/icons-material';
import { Link, Link as RouterLink } from 'react-router-dom';
import { handleUserMenu } from '../../store/UI-Features';
import { setCurrentUser, setEditedUser } from '../../store/Auth';
import { useDispatch, useSelector } from 'react-redux';
import storage from 'redux-persist/lib/storage';
const Nav = () => {
  const anchorRefProfile = useRef(null);
  const dispatch = useDispatch();
  const { isUserMenuOpen } = useSelector((state) => state.UIFeatures);
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

          <Book sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={RouterLink}
            to="/"
            sx={{ mr: 2, display: { xs: 'flex', md: 'none' }, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none' }}>
            Blog App
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={currentUser?.name || 'User Profile'} arrow placement="left-end">
              <Avatar
                ref={anchorRefProfile}
                src={currentUser?.profile_pic?.secure_url}
                alt={currentUser?.name}
                sx={{ width: { xs: 40, md: 45 }, height: { xs: 40, md: 45 } }}
                onClick={() => currentUser !== null && dispatch(handleUserMenu(true))}>
                <input type="file" accept="image/*" hidden />
                {currentUser === null && <Person />}
              </Avatar>
            </Tooltip>
            {currentUser !== null && (
              <Menu
                anchorEl={anchorRefProfile.current}
                id="profile-menu"
                open={isUserMenuOpen}
                onClose={() => dispatch(handleUserMenu(false))}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Link to={`edit-user/${currentUser?.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                  <MenuItem
                    onClick={() => {
                      dispatch(handleUserMenu(false));
                      dispatch(setEditedUser(currentUser));
                    }}>
                    <ListItemIcon>
                      <ManageAccounts />
                    </ListItemIcon>
                    Edit Profile
                  </MenuItem>
                </Link>
                <MenuItem
                  onClick={() => {
                    dispatch(setCurrentUser(null));
                    storage.removeItem('persist:auth');
                    dispatch(handleUserMenu(false));
                  }}>
                  <ListItemIcon>
                    <Logout />
                  </ListItemIcon>
                  LogOut
                </MenuItem>
              </Menu>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Nav;
