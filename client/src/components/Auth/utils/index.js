/* A JavaScript file which has initial values and validation schema for formik. */
import * as yup from 'yup';
const signUpInitial = {
  email: '',
  password: '',
  name: '',
  role: 'AUTHER',
  date_of_birth: /((?:19|20)\\d\\d)-(0?[1-9]|1[012])-([12][0-9]|3[01]|0?[1-9])/,
  emailUpdates: false,
};
const signUpValidation = yup.object().shape({
  email: yup.string().email().required("Email can't be empty"),
  password: yup.string().min(8).required("Password can't be empty"),
  name: yup.string().required("Name can't be empty"),
  role: yup.string(),
  date_of_birth: yup.date().required("Date of birth can't be empty"),
  emailUpdates: yup.boolean(),
});
const signInInitial = {
  email: '',
  password: '',
};
const signInValidation = yup.object().shape({
  email: yup.string().email().required("Email can't be empty"),
  password: yup.string().min(8).required("Password can't be empty"),
});

export { signUpInitial, signUpValidation, signInInitial, signInValidation };
