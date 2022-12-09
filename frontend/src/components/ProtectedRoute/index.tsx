import { FC, Props } from './typings';
import styles from './styles.module.scss';

const ProtectedRoute: FC<Props> = ({ children }) => {
  return children;
};

export default ProtectedRoute;
