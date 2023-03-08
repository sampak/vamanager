import { FC, Props } from './typings';
import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretDown,
  faCaretUp,
  faMap,
} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

const ContainerHeader: FC<Props> = ({
  icon,
  text,
  isHidable = false,
  isShowed = false,
  onClick = () => {},
}) => {
  return (
    <div
      onClick={onClick}
      className={classNames(styles.header, isHidable ? styles.point : '')}
    >
      <div className={styles.leftSide}>
        {icon && <FontAwesomeIcon icon={icon} />}
        {text}
      </div>
      {isHidable && (
        <div className={styles.hideArea}>
          {isShowed ? (
            <FontAwesomeIcon icon={faCaretDown} />
          ) : (
            <FontAwesomeIcon icon={faCaretUp} />
          )}
        </div>
      )}
    </div>
  );
};

export default ContainerHeader;
