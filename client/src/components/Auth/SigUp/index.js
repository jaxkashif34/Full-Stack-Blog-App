import { Box, Grid } from '@mui/material';
import React from 'react';
import AuthForm from '../form';
const SignUp = () => {
  return (
    <Box>
      <Grid container spacing={2} sx={{ placeContent: 'center' }}>
        <Grid item xs={12} md={6} sx={{ marginY: 1.7, display: { xs: 'none', md: 'flex' } }}>
          <img src="/static/images/signUp.png" alt="sign up user" style={{ width: '100%', height: '100%' }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <AuthForm form="signup" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignUp;
