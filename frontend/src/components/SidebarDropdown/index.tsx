import { FC, Props } from './typings';
import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const SidebarDropdown: FC<Props> = ({
  className = '',
  icon,
  title,
  options,
}) => {
  const [isShowed, setIsShowed] = useState(false);

  const isDropdownActive =
    !!options.find((option) => option.active) && !isShowed;

  return (
    <div className={styles.wrapper}>
      <div
        onClick={() => setIsShowed(!isShowed)}
        className={classNames(styles.header, className)}
      >
        <div className={styles.option}>
          <div className={styles.iconBox}>
            {icon && (
              <FontAwesomeIcon
                className={classNames(
                  styles.optionIcon,
                  isDropdownActive && styles.activeIcon
                )}
                icon={icon}
              />
            )}
          </div>
          <div className={classNames(styles.optionName)}>{title}</div>
        </div>
        {isShowed ? (
          <FontAwesomeIcon className={styles.carrot} icon={faCaretUp} />
        ) : (
          <FontAwesomeIcon className={styles.carrot} icon={faCaretDown} />
        )}
      </div>
      {isShowed && (
        <div className={styles.menu}>
          {options.map((option) => (
            <div
              onClick={option.onClick}
              className={classNames(styles.optione, option.className)}
            >
              <div className={styles.iconBox}>
                <FontAwesomeIcon
                  className={classNames(
                    styles.optionIcon,
                    option.active && styles.activeIcon
                  )}
                  icon={option.icon}
                />
              </div>
              <div className={classNames(styles.optionNameMenu)}>
                {option.title}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarDropdown;
