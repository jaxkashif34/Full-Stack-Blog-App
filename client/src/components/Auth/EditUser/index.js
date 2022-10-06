import { Box, Typography, Container } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import AuthForm from '../form';

const EditUser = () => {
  const { currentUser } = useSelector((state) => state.auth);

  return (
    <Box>
      <Typography variant="h6" sx={{ mt: 1 }} textAlign="center">
        Edit Profile {currentUser?.name}
      </Typography>

      <Container maxWidth="sm">
        <AuthForm form="editProfile" />
      </Container>
    </Box>
  );
};

export default EditUser;
