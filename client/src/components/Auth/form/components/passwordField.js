import React from 'react';
import { Box, IconButton, TextField } from '@mui/material';
import { Field } from 'formik';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { setShowPassword } from '../../../../store/UI-Features';
const PasswordField = ({ data }) => {
  const { errors, touched } = data;
  const isValidPasswrod = touched.password && !!errors.password;
  const { showPassword } = useSelector((state) => state.UIFeatures);
  const dispatch = useDispatch();
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
      <Field
        name="password"
        error={isValidPasswrod}
        helperText={isValidPasswrod && errors.password}
        type={showPassword ? 'text' : 'password'}
        as={TextField}
        label="Password"
        size="small"
        variant="standard"
        fullWidth
      />
      <IconButton disableRipple onClick={() => dispatch(setShowPassword(!showPassword))}>
        {showPassword ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </Box>
  );
};

export default PasswordField;
