import { FC, Props } from './typings';
import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BodyText from '../BodyText';
import classNames from 'classnames';

const Input: FC<Props> = ({
  icon,
  label,
  placeholder = '',
  onChange,
  value,
  error,
  className,
  fref,
  ...props
}) => {
  return (
    <div ref={fref} className={styles.content}>
      {!!label?.length && <div className={styles.label}>{label}</div>}
      <div className={styles.inputWrapper}>
        {icon && (
          <div className={styles.icon}>
            <FontAwesomeIcon icon={icon} />
          </div>
        )}
        <input
          placeholder={placeholder}
          className={classNames(
            styles.input,
            !icon && styles.withoutIcon,
            className
          )}
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

export default Input;
