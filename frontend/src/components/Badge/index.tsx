import { VFC, Props } from './typings';
import styles from './styles.module.scss';

const Badge: VFC<Props> = ({ text, className = '' }) => {
  return <div className={`${styles.badge} ${className}`}>{text}</div>;
};

export default Badge;
