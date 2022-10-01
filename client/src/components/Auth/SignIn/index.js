import { Box, Grid } from '@mui/material';
import React from 'react';
import AuthForm from '../form';

const SignIn = () => {
  return (
    <Box>
      <Grid container spacing={2} sx={{ placeContent: 'center' }}>
        <Grid item xs={12} md={6} sx={{ marginY: 1.7, display: { xs: 'none', md: 'flex' } }}>
          <img src="/static/images/signIn.png" alt="sign up user" style={{ width: '100%', height: '100%' }} />
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center' }}>
          <AuthForm form="signin" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignIn;
