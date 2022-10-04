import React from 'react';
import { TextField } from '@mui/material';
import { Field } from 'formik';
const EmailField = ({ data }) => {
  const { errors, touched } = data;
  const isValidEmail = touched.email && !!errors.email;
  return <Field name="email" error={isValidEmail} helperText={isValidEmail && errors.email} type="email" as={TextField} label="Email" size="small" variant="standard" />;
};

export default EmailField;
