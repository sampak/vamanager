import BodyText from 'components/BodyText';
import Title from 'components/Title';
import styles from './styles.module.scss';
import { useState, useContext, useEffect } from 'react';
import OtpInput from 'react-verify-otp';
import '/node_modules/react-verify-otp/dist/style.css';
import CTAButton from 'CTAButton';
import codeContext from 'contexts/code';
import authService from 'api/authService';
import RoundedButton from 'components/RoundedButton';
import { useNavigate } from 'react-router-dom';
import { setToken } from 'api/user';
import ErrorNoti from 'components/ErrorNoti';

import { useTranslation } from 'react-i18next';

const Verify = () => {
  const translation = useTranslation();
  const t = (key: string) => translation.t(`verify.${key}`);
  const navigate = useNavigate();
  const [inputCode, setCode] = useState('');
  const [error, setError] = useState('');
  const [blockSend, setBlockSend] = useState(false);
  const [time, setTime] = useState<NodeJS.Timeout | null>(null);

  const { code } = useContext(codeContext);
  const { refetch: resendCode } = authService.useResendCode(code);
  const { mutate: sendCode, isLoading } = authService.useSendCode();

  const handleSendCode = () => {
    setError('');
    sendCode(
      {
        code: inputCode,
        userId: code,
      },
      {
        onSuccess: (response) => {
          setToken(response.data);
          navigate('/choose-workspace');
        },
        onError: () => {
          setError(t('error'));
        },
      }
    );
  };

  const handleResendCode = () => {
    if (blockSend === true) return;
    setBlockSend(true);
    resendCode();
    const newTimeout = setTimeout(() => {
      setBlockSend(false);
      setTime(null);
    }, 6000);

    setTime(newTimeout);
  };

  useEffect(() => {
    if (!code.length) {
      navigate('/auth/signin');
    }

    return () => {
      if (time) {
        clearTimeout(time);
      }
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      {!!error.length && <ErrorNoti className={styles.error} text={error} />}
      <div className={styles.content}>
        <Title black>{t('title')}</Title>
        <BodyText black>{t('body')}</BodyText>
        <OtpInput
          otpValue={inputCode}
          numberInputs={6}
          onChange={setCode}
          styleOtpWrapper={styles.otpWrapper}
          styleOtpInput={styles.otp}
        />

        <RoundedButton
          isLoading={isLoading}
          disabled={isLoading}
          onClick={handleSendCode}
          className={styles.button}
        >
          {t('button')}
        </RoundedButton>

        <CTAButton
          disabled={blockSend}
          className={styles.cta}
          onClick={handleResendCode}
          text={t('resend')}
        />
      </div>
    </div>
  );
};

export default Verify;
