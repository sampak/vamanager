import { FC, Props } from './typings';
import styles from './styles.module.scss';
import classNames from 'classnames';

const DropdownMenu: FC<Props> = ({
  options,
  isOpen,
  toggle,
  className = '',
}) => {
  return (
    <>
      {isOpen && (
        <div className={classNames(styles.dropdown, className)}>
          {options.map((option) => (
            <div
              onClick={() => {
                option.onClick();
                toggle?.(false);
              }}
              className={styles.option}
            >
              {option.text}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default DropdownMenu;
