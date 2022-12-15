/**
 * I'm trying to disable the "Admin" option in the dropdown menu.
 * @returns A React component that renders a select field with two options.
 */
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Field } from 'formik';
import React from 'react';

const RoleField = ({ handleChange }) => {
  return (
    <FormControl variant="standard" sx={{ minWidth: 120 }}>
      <InputLabel id="role">Role</InputLabel>
      <Field component={Select} defaultValue="AUTHER" label="Role" id="role" name="role" onChange={handleChange} disabled>
        <MenuItem component="option" value="ADMIN" disabled>
          Admin
        </MenuItem>
        <MenuItem component="option" value="AUTHER">
          Auther
        </MenuItem>
      </Field>
    </FormControl>
  );
};

export default RoleField;
