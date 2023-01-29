import { FC, Props } from './typings';
import styles from './styles.module.scss';
const CTAButton: FC<Props> = ({
  disabled = false,
  text = '',
  className = '',
  onClick = () => {},
}) => {
  return (
    <span
      onClick={onClick}
      className={`${styles.button} ${className} ${disabled && styles.disabled}`}
    >
      {text}
    </span>
  );
};

export default CTAButton;
