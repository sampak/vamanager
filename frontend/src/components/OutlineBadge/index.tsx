import { FC, Props } from './typings';
import styles from './styles.module.scss';

const OutlineBadge: FC<Props> = ({ children, className = '' }) => {
  return <div className={`${styles.badge} ${className}`}>{children}</div>;
};

export default OutlineBadge;
