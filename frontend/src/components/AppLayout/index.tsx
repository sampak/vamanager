import { FC, Props } from './typings';
import styles from './styles.module.scss';
import Logo from 'components/Logo';
import Sidebar from 'components/Sidebar';

const AppLayout: FC<Props> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default AppLayout;
