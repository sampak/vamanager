import { FC, Props } from './typings';
import styles from './styles.module.scss';

const DropdownMenu: FC<Props> = ({ options, isOpen, toggle }) => {
  return (
    <>
      {isOpen && (
        <div className={styles.dropdown}>
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
