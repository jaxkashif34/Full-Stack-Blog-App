/**
 * It's a function that returns a Box component with a prop of sx={{ my: 3 }} and an Outlet component.
 * @returns A function that returns a Box component with an Outlet component inside of it.
 */
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
