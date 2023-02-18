import { FC, Props } from './typing';
import styles from './styles.module.scss';
import Sidebar from '../Sidebar';

const AppLayout: FC<Props> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default AppLayout;
