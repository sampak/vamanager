import { FC, Props } from './typings';
import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Title from 'components/Title';

const OnbordingCard: FC<Props> = ({ icon, label, onClick }) => {
  return (
    <div onClick={onClick} className={styles.container}>
      <div className={styles.card}>
        <FontAwesomeIcon icon={icon} />
      </div>
      <Title className={styles.title} black>
        {label}
      </Title>
    </div>
  );
};

export default OnbordingCard;
