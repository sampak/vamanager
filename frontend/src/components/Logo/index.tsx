import { FC, Props } from './typings';
import styles from './styles.module.scss';
import classNames from 'classnames';
import Badge from 'components/Badge';
const Logo: FC<Props> = ({ size, className }) => {
  return (
    <div
      style={{ fontSize: size + 'px' }}
      className={classNames(styles.logo, className)}
    >
      <span className={styles.color}>VA</span>Manager
      <Badge className={styles.badge} text="BETA" />
    </div>
  );
};

export default Logo;
