import { FC, Props } from './typings';
import styles from './styles.module.scss';

const BodyText: FC<Props> = ({ children, className, black = false }) => {
  return (
    <div className={`${styles.text} ${black && styles.black} ${className}`}>
      {children}
    </div>
  );
};

export default BodyText;
