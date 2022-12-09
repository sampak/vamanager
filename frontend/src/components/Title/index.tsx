import { FC, Props } from './typings';
import styles from './styles.module.scss';

const Title: FC<Props> = ({children, className}) => {
  return <div className={`${styles.title} ${className}`}>{children}</div>
}

export default Title;