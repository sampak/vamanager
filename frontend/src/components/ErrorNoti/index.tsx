import { FC, Props } from './typings';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import Noti from 'components/Noti';

const ErrorNoti: FC<Props> = ({ className = '', text }) => {
  return (
    <Noti
      text={text}
      icon={faXmarkCircle}
      className={`${styles.noti} ${className}`}
    />
  );
};

export default ErrorNoti;
