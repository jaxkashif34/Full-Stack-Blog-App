import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { Stack, Box, TextField, Avatar, FormControl, InputLabel, Select, MenuItem, Grid, Checkbox, FormControlLabel, IconButton } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { initialValue, validationSchema } from '../utils';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Axios from 'axios';
import { setShowPassword, handleSnack } from '../../../store/UI-Features';
import { setCurrentUser } from '../../../store/Auth';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const AuthForm = ({ form }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showPassword } = useSelector((state) => state.UIFeatures);
  const [profile_pic, setProfile_pi] = useState({ file: null, path: '' });
  const handleChangeProfile = async (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (e) => {
      setProfile_pi({ file, path: reader.result });
    };
  };

  const onSubmit = async (values, actions) => {
    const data = new FormData();
    if (profile_pic.file !== null) {
      const uploadedData = {
        ...values,
        profile_pic: profile_pic.file,
      };
      Object.keys(uploadedData).forEach((key) => {
        data.append(key, uploadedData[key]);
      });

      Axios({
        url: 'http://localhost:8000/sign-up',
        method: 'POST',
        data,
      })
        .then((response) => {
          dispatch(setCurrentUser(response.data.data));
          dispatch(handleSnack({ isOpen: true, message: response.data.message }));
          navigate('/');
        })
        .catch((err) => {
          dispatch(handleSnack({ isOpen: true, message: err.message }));
        })
        .finally(() => {
          actions.setSubmitting(false);
        });
    } else {
      dispatch(handleSnack({ isOpen: true, message: 'Please select a profile picture' }));
      actions.setSubmitting(false);
    }
  };
  return (
    <Box sx={{ width: { xs: '100%', md: '60%' }, mx: 'auto', py: 1, px: 2 }}>
      <Formik initialValues={initialValue} validationSchema={validationSchema} onSubmit={onSubmit}>
        {(formik) => {
          const { touched, errors, handleChange } = formik;
          const isValidEmail = touched.email && !!errors.email;
          const isValidPasswrod = touched.password && !!errors.password;
          const isValidName = touched.name && !!errors.name;
          const isValidDOB = touched.date_of_birth && !!errors.date_of_birth;
          return (
            <Form autoComplete="off" encType="multipart/form-data">
              <Stack spacing={3}>
                {form === 'signup' && (
                  <Box>
                    <Avatar component="label" htmlFor="profile_pic" src={profile_pic.path} alt="profile picture" sx={{ margin: 'auto', width: { xs: 60, md: 80 }, height: { xs: 60, md: 80 } }} />
                    <input type="file" hidden id="profile_pic" name="profile_pic" onChange={(e) => handleChangeProfile(e.target.files[0])} />
                  </Box>
                )}
                {form === 'signup' && <Field error={isValidName} helperText={errors.name && errors.name} name="name" type="text" as={TextField} label="Full Name" size="small" variant="standard" />}
                <Field name="email" error={isValidEmail} helperText={isValidEmail && errors.email} type="email" as={TextField} label="Email" size="small" variant="standard" />
                <Box sx={{ display: 'flex' }}>
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
                {form === 'signup' && (
                  <Grid container alignItems="center">
                    <Grid item xs={6} md={6}>
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
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Field
                        error={isValidDOB}
                        helperText={isValidDOB && "Date of birth can't be empty"}
                        component={TextField}
                        name="date_of_birth"
                        id="date_of_birth"
                        type="date"
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>
                )}
                {form === 'signup' && <FormControlLabel control={<Checkbox name="receive_email_updates" onChange={handleChange} />} label="receive email updates ?" />}
                <LoadingButton variant="contained" type="submit" fullWidth loading={formik.isSubmitting}>
                  {form === 'signup' ? "Let's Go" : 'Sign In'}
                </LoadingButton>
              </Stack>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default AuthForm;
