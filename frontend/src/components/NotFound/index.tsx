import BodyText from 'components/BodyText';
import Logo from 'components/Logo';
import RoundedButton from 'components/RoundedButton';
import Title from 'components/Title';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';

const NotFound = ({ onClick }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.logo}>
        <Logo size={24} />
      </div>
      <div className={styles.wrapper}>
        <Title className={styles.emoji} black>
          😨
        </Title>
        <Title className={styles.title} black>
          404 Page Not Found
        </Title>
        <BodyText className={styles.subTitle} black>
          The page you are trying to access does not exist. Please return to the
          homepage.
        </BodyText>
        <div className={styles.buttonsWrapper}>
          <RoundedButton
            onClick={() => {
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

export default NotFound;
