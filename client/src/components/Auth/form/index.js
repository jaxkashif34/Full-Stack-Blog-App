/**
 * It's a form that takes in a form type as a prop and renders the appropriate form fields based on the
 * form type.
 * @returns The return value of the function is the value of the last expression evaluated inside the
 * function.
 */
import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { Stack, Box, Grid, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { signUpInitial, signUpValidation, signInInitial, signInValidation } from '../utils';
import { handleSignUp, handleLogin, handleUpdateUser } from '../../../store/Auth';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { UploadPic, NameField, EmailField, PasswordField, RoleField, DobField, CheckBox } from './components';
const AuthForm = ({ form }) => {
  const [profile_pic, setProfile_pic] = useState({ file: null, path: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const validationSchema = form === 'signup' ? signUpValidation : form === 'editProfile' ? signUpValidation : signInValidation;
  const initialValues = form === 'signup' ? signUpInitial : form === 'editProfile' ? signUpInitial : signInInitial;
  const isFormSignUpOrEdit = form === 'signup' || form === 'editProfile';
  const onSubmit = async (values, { setSubmitting }) => {
    if (form === 'signup') {
      const data = {
        profile_pic: profile_pic.file,
        setSubmitting,
        values,
      };
      await dispatch(handleSignUp(data));
      navigate('/');
    } else if (form === 'signin') {
      const data = {
        setSubmitting,
        values,
      };
      await dispatch(handleLogin(data));
      navigate('/');
    } else if (form === 'editProfile') {
      const data = {
        setSubmitting,
        values,
        profile_pic: profile_pic.file,
        currentUserId: currentUser.id,
      };
      await dispatch(handleUpdateUser(data));
      navigate('/');
    }
  };
  return (
    <Box sx={{ width: { xs: '100%', md: '60%' }, mx: 'auto', py: 1, px: 2 }}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {(formik) => {
          const { touched, errors, handleChange } = formik;
          return (
            <Form autoComplete="off" encType="multipart/form-data">
              <Stack spacing={3}>
                {isFormSignUpOrEdit && <UploadPic profile_pic={profile_pic} setProfile_pic={setProfile_pic} />}
                {isFormSignUpOrEdit && <NameField data={{ errors, touched }} />}
                <EmailField data={{ touched, errors }} />
                <PasswordField data={{ touched, errors }} />
                {isFormSignUpOrEdit && (
                  <Grid container alignItems="center">
                    <Grid item xs={6} md={6}>
                      <RoleField handleChange={handleChange} />
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <DobField data={{ touched, errors, handleChange }} />
                    </Grid>
                  </Grid>
                )}
                {isFormSignUpOrEdit && <CheckBox data={{ handleChange }} />}
                <LoadingButton variant="contained" disabled={formik.isSubmitting} type="submit" fullWidth loading={formik.isSubmitting}>
                  {form === 'signup' ? "Let's Go" : form === 'signin' ? 'Sign In' : 'update'}
                </LoadingButton>
              </Stack>
              {form !== 'editProfile' && (
                <Typography sx={{ textAlign: 'center', mt: 1 }}>
                  {form === 'signup' ? 'Already have an account ?' : "Don't have an account ?"}{' '}
                  <Link to={`/auth/${form === 'signup' ? 'sign-in' : 'sign-up'}`} style={{ color: 'inherit' }}>
                    {form === 'signup' ? 'Sign In' : 'Sign up'}
                  </Link>
                </Typography>
              )}
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default AuthForm;
