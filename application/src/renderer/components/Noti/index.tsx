import { FC, Props } from './typings';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

const Noti: FC<Props> = ({ className = '', text, icon }) => {
  return (
    <div className={classNames(styles.noti, className)}>
      <FontAwesomeIcon className={styles.icon} icon={icon ?? faCircleInfo} />
      {text}
    </div>
  );
};

export default Noti;
