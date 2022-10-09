/**
 * It's a navbar that has a profile icon that opens a menu when clicked.
 * @returns A React component.
 */
import React, { useRef } from 'react';
import { AppBar, Toolbar, Typography, Box, Menu, MenuItem, Avatar, Tooltip, ListItemIcon } from '@mui/material';
import { Container } from '@mui/system';
import { Book, Person, Logout, ManageAccounts, Delete } from '@mui/icons-material';
import { Link, Link as RouterLink } from 'react-router-dom';
import { handleUserMenu, handleModal } from '../../store/UI-Features';
import { logOutUser } from '../../store/Auth';
import { useDispatch, useSelector } from 'react-redux';
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
                sx={{ width: { xs: 40, md: 45 }, height: { xs: 40, md: 45 }, cursor: 'pointer' }}
                onClick={() => currentUser !== null && dispatch(handleUserMenu(true))}>
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
                    }}>
                    <ListItemIcon>
                      <ManageAccounts />
                    </ListItemIcon>
                    Edit Profile
                  </MenuItem>
                </Link>
                <MenuItem
                  onClick={() => {
                    dispatch(logOutUser());
                    dispatch(handleUserMenu(false));
                  }}>
                  <ListItemIcon>
                    <Logout />
                  </ListItemIcon>
                  LogOut
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    dispatch(handleModal(true));
                  }}>
                  <ListItemIcon>
                    <Delete />
                  </ListItemIcon>
                  Delete Account
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
