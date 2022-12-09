import { FC, Props } from './typings';
import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BodyText from 'components/BodyText';

const TextArea: FC<Props> = ({
  icon,
  label,
  placeholder = '',
  onChange,
  value,
  error,
  ...props
}) => {
  return (
    <div className={styles.content}>
      {!!label?.length && <div className={styles.label}>{label}</div>}
      <div className={styles.inputWrapper}>
        {icon && (
          <div className={styles.icon}>
            <FontAwesomeIcon icon={icon} />
          </div>
        )}
        <textarea
          placeholder={placeholder}
          className={styles.input}
          value={value}
          onChange={onChange}
          {...props}
        />
      </div>
      {error && !!error.length && (
        <BodyText className={styles.error}>{error}</BodyText>
      )}
    </div>
  );
};

export default TextArea;
