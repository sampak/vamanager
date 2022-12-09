import { FC } from './typings';
import styles from './styles.module.scss';
import Title from 'components/Title';
import Input from 'components/Input';
import BodyText from 'components/BodyText';
import RoundedButton from 'components/RoundedButton';

import { Formik } from 'formik';
import SignInSchema from './validation.schema';
import { useTranslation } from 'react-i18next';
import CTAButton from 'CTAButton';
import { useNavigate } from 'react-router-dom';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

const SignIn: FC = () => {
  const navigate = useNavigate();
  const translation = useTranslation();
  const t = (key: string) => translation.t(`signIn.${key}`);

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = (e, values) => {
    e.preventDefault();

    console.log('submitted');
  };

  const handleSignUp = () => navigate('/auth/signup');

  return (
    <div className={styles.content}>
      <div className={styles.badge}></div>
      <Title black>{t('title')}</Title>
      <BodyText black>{t('subTitle')}</BodyText>
      <Formik
        initialValues={initialValues}
        validationSchema={SignInSchema}
        onSubmit={() => {}}
        validateOnMount
        isInitialValid={false}
      >
        {({ values, touched, handleChange, handleBlur, isValid }) => (
          <form
            onSubmit={(e) => handleSubmit(e, values)}
            className={styles.form}
          >
            <Input
              icon={faEnvelope}
              name="email"
              type="email"
              label={t('inputEmail.label')}
              placeholder={t('inputEmail.placeholder')}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              error={touched.email ? t('inputEmail.error') : ''}
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
              error={touched.password ? t('inputEmail.error') : ''}
            />
            <RoundedButton disabled={!isValid} className={styles.button}>
              {t('button')}
            </RoundedButton>
          </form>
        )}
      </Formik>
      <BodyText className={styles.bottomText}>
        <>
          {t('cta')} <CTAButton onClick={handleSignUp} text={t('signUp')} />
        </>
      </BodyText>
    </div>
  );
};

export default SignIn;
