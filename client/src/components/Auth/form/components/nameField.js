import React from 'react';
import { Field } from 'formik';
import { TextField } from '@mui/material';
const NameField = ({ data }) => {
  const { errors, touched } = data;
  const isValidName = touched.name && !!errors.name;
  return <Field error={isValidName} helperText={errors.name && errors.name} name="name" type="text" as={TextField} label="Full Name" size="small" variant="standard" />;
};

export default NameField;
