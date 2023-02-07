import { FC, Props } from './typing';
import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import BodyText from 'components/BodyText';

const EmptyCard: FC<Props> = ({ text }) => {
  return (
    <div className={styles.card}>
      <FontAwesomeIcon icon={faUser} />
      <BodyText>{text}</BodyText>
    </div>
  );
};

export default EmptyCard;
