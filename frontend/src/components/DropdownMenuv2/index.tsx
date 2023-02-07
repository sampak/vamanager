import { FC, Props } from './typings';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

const DropdownMenuV2: FC<Props> = ({ options, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Element)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <FontAwesomeIcon
        onClick={() => setIsOpen(!isOpen)}
        className={styles.dropdownIcon}
        icon={faEllipsis}
      />
      {isOpen && (
        <div className={classNames(styles.dropdown, className)}>
          {options.map((option) => (
            <div
              onClick={() => {
                option?.onClick();
                setIsOpen(false);
              }}
              className={styles.option}
            >
              {option?.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenuV2;
