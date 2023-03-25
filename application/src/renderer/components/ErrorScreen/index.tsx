import BodyText from '../BodyText';
import Logo from '../Logo';
import RoundedButton from '../RoundedButton';
import Title from '../Title';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import { FC, Props } from './typings';

const ErrorScreen: FC<Props> = ({ onClick }) => {
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
          We are already working on this issue.
        </BodyText>
        <div className={styles.buttonsWrapper}>
          <RoundedButton
            onClick={() => {
              onClick?.();
              navigate('/auth/signin');
            }}
          >
            Back to login
          </RoundedButton>
        </div>
      </div>

      <div className={styles.color} />
    </div>
  );
};

export default ErrorScreen;
