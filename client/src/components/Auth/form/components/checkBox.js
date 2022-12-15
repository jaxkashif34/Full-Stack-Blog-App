/**
 * It's a function that returns a FormControlLabel component that contains a Checkbox component
 * @returns A FormControlLabel component with a Checkbox component as a child.
 */
import { Checkbox, FormControlLabel } from '@mui/material';
import React from 'react';

const CheckBox = ({ data }) => {
  const { handleChange } = data;
  return <FormControlLabel control={<Checkbox name="emailUpdates" onChange={handleChange} />} label="receive email updates ?" />;
};

export default CheckBox;
