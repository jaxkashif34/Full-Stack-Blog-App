import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { Stack, Box, Grid, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { signUpInitial, signUpValidation, signInInitial, signInValidation } from '../utils';
import Axios from 'axios';
import { handleSnack } from '../../../store/UI-Features';
import { setCurrentUser } from '../../../store/Auth';
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
  const onSubmit = async (values, actions) => {
    const data = new FormData();
    if (isFormSignUpOrEdit) {
      const uploadedData = {
        ...values,
        profile_pic: profile_pic.file,
      };
      console.log(uploadedData);
      Object.keys(uploadedData).forEach((key) => {
        data.append(key, uploadedData[key]);
      });
      if (form === 'signup') {
        if (profile_pic.file !== null) {
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
              console.log(err);
            })
            .finally(() => {
              actions.setSubmitting(false);
            });
        } else {
          dispatch(handleSnack({ isOpen: true, message: 'Please select a profile picture' }));
          actions.setSubmitting(false);
        }
      } else if (form === 'editProfile') {
        // edit user code will goes here'
        Axios({
          url: `http://localhost:8000/edit-user/${currentUser?.id}`,
          method: 'PUT',
          data,
        })
          .then((response) => {
            dispatch(setCurrentUser({ ...currentUser, ...response.data.data }));
            dispatch(handleSnack({ isOpen: true, message: response.data.message }));
            navigate('/');
          })
          .catch((err) => {
            dispatch(handleSnack({ isOpen: true, message: err.message }));
            console.log(err);
          });
      }
    } else if (form === 'signin') {
      Axios({
        url: 'http://localhost:8000/log-in',
        method: 'POST',
        data: values,
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
