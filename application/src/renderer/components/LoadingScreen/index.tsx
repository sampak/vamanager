import { FC, Props } from './typings';
import styles from './styles.module.scss';
import Logo from '../Logo';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

const LoadingScreen: FC<Props> = ({
  text,
  logoClassName = '',
  className = '',
}) => {
  return (
    <div className={classNames(styles.wrapper, className)}>
      <Logo className={styles.logoClassName} size={48} />
      <FontAwesomeIcon className={styles.icon} icon={faSpinner} />
      {text && text}
    </div>
  );
};

export default LoadingScreen;
