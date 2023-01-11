import { FC, Props } from './typings';
import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const BackButton: FC<Props> = ({ onClick, text }) => {
  return (
    <div onClick={onClick} className={styles.container}>
      <FontAwesomeIcon icon={faArrowLeft} />
      {text}
    </div>
  );
};

export default BackButton;
