import BodyText from 'components/BodyText';
import Logo from 'components/Logo';
import RoundedButton from 'components/RoundedButton';
import Title from 'components/Title';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';

const ErrorScreen = ({ onClick }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.logo}>
        <Logo size={24} />
      </div>
      <div className={styles.wrapper}>
        <Title className={styles.emoji} black>
          🤖
        </Title>
        <Title className={styles.title} black>
          Something went wrong...
        </Title>
        <BodyText className={styles.subTitle} black>
          We are already working on this issue. Please try refreshing the page
          or go back to the homepage.
        </BodyText>
        <div className={styles.buttonsWrapper}>
          <RoundedButton onClick={() => window.location.reload()}>
            Refresh Page
          </RoundedButton>
          <RoundedButton
            onClick={() => {
              onClick?.();
              navigate('/');
            }}
          >
            Back To Home
          </RoundedButton>
        </div>
      </div>

      <div className={styles.color} />
    </div>
  );
};

export default ErrorScreen;
