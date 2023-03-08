import { FC } from './typings';
import styles from './styles.module.scss';
import Title from '../../components/Title';
import Input from '../../components/Input';
import BodyText from '../../components/BodyText';
import RoundedButton from '../../components/RoundedButton';

import { Formik } from 'formik';
import SignInSchema from './validation.schema';
import { useTranslation } from 'react-i18next';
import CTAButton from '../../components/CTAButton';
import { useNavigate } from 'react-router-dom';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import authService from '../../api/authService';
import { setToken } from '../../api/user';
import { FormEvent, useContext, useState } from 'react';
import ErrorNoti from '../../components/ErrorNoti';
import { getAPIError } from '../../utils/getAPIError';
import AuthLayout from 'renderer/components/AuthLayout';
import { EventsType } from '../../../dto/Events';

const SignIn: FC = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const queryEmail = urlParams.get('email');
  const navigate = useNavigate();
  const translation = useTranslation();
  const t = (key: string) => translation.t(`signIn.${key}`);
  const { mutate: signIn, isLoading } = authService.useLogin();
  const [error, setError] = useState('');

  const initialValues = {
    email: queryEmail ?? '',
    password: '',
  };

  const handleSubmit = (
    e: FormEvent<HTMLFormElement>,
    values: { email: string; password: string }
  ) => {
    e.preventDefault();
    signIn(
      {
        ...values,
      },
      {
        onSuccess: (response) => {
          setToken(response.data);
          window.electron.ipcRenderer.sendMessage(EventsType.SEND_TOKEN, {
            token: response.data,
          });
          navigate('/choose-workspace');
        },
        onError: (e: any) => {
          if (e?.response?.status === 403) {
            setError(t('errors.NOT_ACTIVE'));
            return;
          }
          setError(getAPIError(e, t));
        },
      }
    );
  };

  return (
    <AuthLayout>
      <div className={styles.content}>
        {!!error.length && <ErrorNoti text={error} />}
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
          {({ values, touched, handleChange, handleBlur, isValid, errors }) => (
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
                error={
                  touched.email && errors.email ? t('inputEmail.error') : ''
                }
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
                  touched.password && errors.password
                    ? t('inputPassword.error')
                    : ''
                }
              />
              <RoundedButton
                disabled={!isValid}
                isLoading={isLoading}
                className={styles.button}
              >
                {t('button')}
              </RoundedButton>
            </form>
          )}
        </Formik>
      </div>
    </AuthLayout>
  );
};

export default SignIn;
