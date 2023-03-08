import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './styles.module.scss';

const LoadingIcon = () => {
  return (
    <div className={styles.wrapper}>
      <FontAwesomeIcon className={styles.icon} icon={faSpinner} />
    </div>
  );
};

export default LoadingIcon;
