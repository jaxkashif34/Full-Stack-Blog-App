import { FormLabel, Box, TextField } from '@mui/material';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
const CustomDatePicker = ({ ...other }) => {
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  return (
    <Box>
      <FormLabel>Date of Birth</FormLabel>
      <DatePicker
        popperPlacement="top-end"
        customInput={<TextField {...other} size="small" name="date_of_birth" />}
        selected={dateOfBirth}
        onChange={(date) => {
          setDateOfBirth(date);
        }}
      />
    </Box>
  );
};

export default CustomDatePicker;
