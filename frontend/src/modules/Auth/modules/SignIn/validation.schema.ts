import * as Yup from 'yup';

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .required('Password is a required field')
    .email('Provided Email is incorect'),
  password: Yup.string()
    .required('Password is a required field')
    .min(2, 'Password is to short'),
});

export default SignInSchema;
