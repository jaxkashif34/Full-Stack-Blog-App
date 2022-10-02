import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
const Auth = () => {
  return (
    <Box sx={{ my: 3 }}>
      <Outlet />
    </Box>
  );
};

export default Auth;
