import { FC, Props } from './typings';
import styles from './styles.module.scss';
import Logo from 'components/Logo';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const LoadingScreen: FC<Props> = () => {
  return (
    <div className={styles.wrapper}>
      <Logo size={48} />
      <FontAwesomeIcon className={styles.icon} icon={faSpinner} />
    </div>
  );
};

export default LoadingScreen;
