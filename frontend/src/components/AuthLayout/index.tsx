import { FC, Props } from './typings';
import styles from './styles.module.scss';
import Menu from 'components/Menu';

const HomeLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <Menu />
      {children}
    </>
  );
};

export default HomeLayout;
