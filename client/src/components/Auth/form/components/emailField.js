/**
 * It's a function that takes in a prop called data, and returns a Field component from the formik
 * library, with some props.
 * @returns A function that returns a component.
 */
import React from 'react';
import { TextField } from '@mui/material';
import { Field } from 'formik';
const EmailField = ({ data }) => {
  const { errors, touched } = data;
  const isValidEmail = touched.email && !!errors.email;
  return <Field name="email" error={isValidEmail} helperText={isValidEmail && errors.email} type="email" as={TextField} label="Email" size="small" variant="standard" />;
};

export default EmailField;
