import { Box, TextField, Typography, Container, Grid } from '@mui/material';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setEditedUser } from '../../../store/Auth';
import AuthForm from '../form';

const EditUser = () => {
  const { editUser, currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

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
