import * as yup from 'yup';
const initialValue = {
  email: '',
  password: '',
  name: '',
  role: 'AUTHER',
  date_of_birth: /((?:19|20)\\d\\d)-(0?[1-9]|1[012])-([12][0-9]|3[01]|0?[1-9])/,
  receive_email_updates: false,
};

const validationSchema = yup.object().shape({
  email: yup.string().email().required("Email can't be empty"),
  password: yup.string().min(8).required("Password can't be empty"),
  name: yup.string().required("Name can't be empty"),
  role: yup.string(),
  date_of_birth: yup.date().required("Date of birth can't be empty"),
  receive_email_updates: yup.boolean(),
});

export { initialValue, validationSchema };
