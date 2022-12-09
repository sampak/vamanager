import { FC, Props } from './typings';
import classNames from 'classnames';
import styles from './styles.module.scss';

const Button: FC<Props> = ({ children, className, outline = false }) => {
  const outlineStyle = outline ? styles.outline : '';

  return (
    <button className={classNames(styles.button, outlineStyle, className)}>
      <div className={styles.shadow}></div>
      <div className={styles.children}>{children}</div>
    </button>
  );
};

export default Button;
