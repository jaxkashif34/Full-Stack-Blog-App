/**
 * It's a formik field that takes in a date of birth and validates it
 * @returns A component that is a text field that is a formik field.
 */
import { TextField } from '@mui/material';
import { Field } from 'formik';
import React from 'react';
import { useSelector } from 'react-redux';

const DobField = ({ data }) => {
  const { errors, touched, handleChange } = data;
  const isValidDOB = touched.date_of_birth && !!errors.date_of_birth;
  const { isDark } = useSelector((state) => state.UIFeatures);
  return (
    <Field
      error={isValidDOB}
      helperText={isValidDOB && "Date of birth can't be empty"}
      component={TextField}
      name="date_of_birth"
      id="date_of_birth"
      type="date"
      onChange={handleChange}
      style={{ colorScheme: `${isDark ? 'dark' : 'white'}` }}
    />
  );
};

export default DobField;
