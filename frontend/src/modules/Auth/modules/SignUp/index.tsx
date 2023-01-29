import { FC } from './typings';
import styles from './styles.module.scss';
import Title from 'components/Title';
import Input from 'components/Input';
import BodyText from 'components/BodyText';
import RoundedButton from 'components/RoundedButton';

import { Formik } from 'formik';
import SignInSchema from './validation.schema';
import { useTranslation } from 'react-i18next';
import Badge from 'components/Badge';
import CTAButton from 'CTAButton';
import { useNavigate } from 'react-router-dom';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import Checkbox from 'components/Checkbox';
import { useState, useContext } from 'react';
import authService from 'api/authService';
import codeContext from 'contexts/code';
import { getAPIError } from 'utils/getAPIError';
import ErrorNoti from 'components/ErrorNoti';

interface InitialValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const SignUp: FC = () => {
  const navigate = useNavigate();
  const translation = useTranslation();
  const { mutate: register, isLoading } = authService.useRegister();
  const t = (key: string) => translation.t(`signUp.${key}`);
  const { setCode } = useContext(codeContext);

  const [showLastName, setShowLastName] = useState(false);
  const [error, setError] = useState('');

  const initialValues: InitialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  const handleSubmit = (e, values) => {
    e.preventDefault();
    setError('');
    register(
      { ...values, allowShowLastName: showLastName },
      {
        onSuccess: (response) => {
          setCode(response.data.id);
          navigate('/auth/verify');
        },
        onError: (err: any) => {
          setError(getAPIError(err, t));
        },
      }
    );
  };

  const handleSignIn = () => navigate('/auth/signin');

  return (
    <div className={styles.content}>
      {!!error.length && (
        <ErrorNoti className={styles.errorNoti} text={error} />
      )}
      <div className={styles.badge}>
        <Badge text={t('beta')} />
      </div>
      <Title black>{t('title')}</Title>
      <BodyText black>{t('subTitle')}</BodyText>
      <Formik
        initialValues={initialValues}
        validationSchema={SignInSchema}
        onSubmit={() => {}}
        validateOnMount
        isInitialValid={false}
      >
        {({ values, touched, errors, handleChange, handleBlur, isValid }) => (
          <form
            onSubmit={(e) => handleSubmit(e, values)}
            className={styles.form}
          >
            <Input
              icon={faUser}
              name="firstName"
              type="text"
              label={t('inputFirstName.label')}
              placeholder={t('inputFirstName.placeholder')}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.firstName}
              error={
                touched.firstName && errors.firstName
                  ? t('inputFirstName.error')
                  : ''
              }
            />
            <Input
              icon={faUser}
              name="lastName"
              type="text"
              label={t('inputLastName.label')}
              placeholder={t('inputLastName.placeholder')}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.lastName}
              error={
                touched.lastName && errors.lastName
                  ? t('inputLastName.error')
                  : ''
              }
            />
            <Input
              icon={faEnvelope}
              name="email"
              type="email"
              label={t('inputEmail.label')}
              placeholder={t('inputEmail.placeholder')}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              error={touched.email && errors.email ? t('inputEmail.error') : ''}
            />
            <Input
              icon={faLock}
              name="password"
              value={values.password}
              label={t('inputPassword.label')}
              placeholder={t('inputPassword.placeholder')}
              onChange={handleChange}
              onBlur={handleBlur}
              type="password"
              error={
                touched.password && errors.password ? t('inputEmail.error') : ''
              }
            />
            <Checkbox
              label={t('showLastName')}
              checked={showLastName}
              onCheck={setShowLastName}
            />
            <RoundedButton
              disabled={!isValid || isLoading}
              isLoading={isLoading}
              className={styles.button}
            >
              {t('button')}
            </RoundedButton>
          </form>
        )}
      </Formik>
      <BodyText className={styles.bottomText}>
        <>
          {t('cta')} <CTAButton onClick={handleSignIn} text={t('signIn')} />
        </>
      </BodyText>
    </div>
  );
};

export default SignUp;
