import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const initialState = {
  currentUser: null,
};

export const handleForm = createAsyncThunk('auth/handleForm', async (data, thunkApi) => {
  const {isFormSignUpOrEdit,profile_pic, form} = data;
  const {dispatch} = thunkApi;
  try {
    const data = new FormData();
    if (isFormSignUpOrEdit) {
      const uploadedData = {
        ...values,
        profile_pic
      };
      Object.keys(uploadedData).forEach((key) => {
        data.append(key, uploadedData[key]);
      });
      if (form === 'signup') {
        if (profile_pic !== null) {
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
              if (err.response.data.error.indexOf('Unique constraint failed on the fields: (`email`)') !== -1) {
                dispatch(handleSnack({ isOpen: true, message: 'Email already exists' }));
              } else {
                dispatch(handleSnack({ isOpen: true, message: err.response.data.message }));
              }
            })
            .finally(() => {
              setSubmitting(false);
            });
        } else {
          dispatch(handleSnack({ isOpen: true, message: 'Please select a profile picture' }));
          setSubmitting(false);
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
            dispatch(handleSnack({ isOpen: true, message: err.response.data.message }));
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
          setSubmitting(false);
        });
    }
  } catch (err) {}
});
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, { payload }) => {
      state.currentUser = payload;
    },
  },
});

export const { setCurrentUser } = userSlice.actions;

export const userSliceReducer = userSlice.reducer;
