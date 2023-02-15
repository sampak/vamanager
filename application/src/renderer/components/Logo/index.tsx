import { FC, Props } from './typings';
import styles from './styles.module.scss';
import classNames from 'classnames';
import Badge from '../Badge';
const Logo: FC<Props> = ({ size, className, badgeClassName }) => {
  return (
    <div
      style={{ fontSize: size + 'px' }}
      className={classNames(styles.logo, className)}
    >
      <span className={styles.color}>VA</span>Manager
      <Badge className={classNames(styles.badge, badgeClassName)} text="BETA" />
    </div>
  );
};

export default Logo;
