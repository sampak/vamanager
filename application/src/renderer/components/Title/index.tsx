import { FC, Props } from './typings';
import styles from './styles.module.scss';

const Title: FC<Props> = ({ children, className, black = false }) => {
  return (
    <div className={`${styles.title} ${black && styles.black} ${className}`}>
      {children}
    </div>
  );
};

export default Title;
