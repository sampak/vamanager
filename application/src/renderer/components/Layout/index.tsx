import { FC, Props } from './typings';
import styles from './styles.module.scss';
import Logo from '../../components/Logo';
import Topbar from '../Topbar';

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Topbar />
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Layout;
