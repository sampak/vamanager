import { FC, Props } from './typings';
import classNames from 'classnames';
import styles from './styles.module.scss';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Button: FC<Props> = ({
  children,
  className,
  outline = false,
  onClick = () => {},
  isDisabled = false,
  isLoading = false,
}) => {
  const outlineStyle = outline ? styles.outline : '';
  const isDisabledStyle = isDisabled ? styles.disabled : '';
  {
  }
  return (
    <button
      onClick={() => {
        if (!isDisabled && !isLoading) {
          onClick();
        }
      }}
      className={classNames(
        styles.button,
        outlineStyle,
        isDisabledStyle,
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

export default Button;
