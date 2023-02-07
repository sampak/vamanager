import { FC, Props } from './typings';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { useEffect, useRef } from 'react';

const DropdownMenu: FC<Props> = ({
  options,
  isOpen,
  toggle,
  className = '',
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Element)
      ) {
        toggle?.(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <>
      {isOpen && (
        <div
          ref={wrapperRef}
          className={classNames(styles.dropdown, className)}
        >
          {options.map((option) => (
            <div
              onClick={() => {
                option?.onClick();
                toggle?.(false);
              }}
              className={styles.option}
            >
              {option?.text}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default DropdownMenu;
