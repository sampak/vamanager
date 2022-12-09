import { FC, Props } from './typings';
import classNames from 'classnames';
import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const RoundedButton: FC<Props> = ({
  onClick,
  children,
  className,
  outline = false,
  disabled = false,
  isLoading = false,
}) => {
  const outlineStyle = outline ? styles.outline : '';
  const disabledStyle = disabled ? styles.disabled : '';

  return (
    <button
      onClick={onClick}
      className={classNames(
        styles.button,
        outlineStyle,
        disabledStyle,
        className
      )}
    >
      <div className={styles.shadow}></div>
      <div className={styles.children}>
        {isLoading ? (
          <FontAwesomeIcon className={styles.loadingAnim} icon={faSpinner} />
        ) : (
          children
        )}
      </div>
    </button>
  );
};

export default RoundedButton;
