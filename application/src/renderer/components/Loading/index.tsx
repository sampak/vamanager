import { FC, Props } from './typings';
import styles from './styles.module.scss';
import Logo from '../Logo';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

const Loading: FC<Props> = ({ className = '' }) => {
  return (
    <div className={classNames(styles.wrapper, className)}>
      <Logo size={48} />
      <FontAwesomeIcon className={styles.icon} icon={faSpinner} />
    </div>
  );
};

export default Loading;
