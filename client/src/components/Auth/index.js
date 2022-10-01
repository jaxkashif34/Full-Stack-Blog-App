import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
const Auth = () => {
  return (
    <Box sx={{ my: 3 }}>
      <Outlet />
    </Box>
  );
};

export default Auth;
