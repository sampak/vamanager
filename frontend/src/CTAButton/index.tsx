import { FC, Props } from './typings';
import styles from './styles.module.scss';
const CTAButton: FC<Props> = ({
  text = '',
  className = '',
  onClick = () => {},
}) => {
  return (
    <span onClick={onClick} className={`${styles.button} ${className}`}>
      {text}
    </span>
  );
};

export default CTAButton;
