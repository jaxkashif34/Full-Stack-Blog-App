import { Checkbox, FormControlLabel } from '@mui/material';
import React from 'react';

const CheckBox = ({ data }) => {
  const { handleChange } = data;
  return <FormControlLabel control={<Checkbox name="emailUpdates" onChange={handleChange} />} label="receive email updates ?" />;
};

export default CheckBox;
