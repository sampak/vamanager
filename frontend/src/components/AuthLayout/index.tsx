import { FC, Props } from './typings';
import styles from './styles.module.scss';
import Logo from 'components/Logo';

const AuthLayout: FC<Props> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Logo size={32} className={styles.logo} />
      <div className={styles.card}>{children}</div>
    </div>
  );
};

export default AuthLayout;
