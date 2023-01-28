import { FC, Props } from './typings';
import styles from './styles.module.scss';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BigModal: FC<Props> = ({
  isCloseButton = true,
  isOpen = false,
  handleClose,
  children,
}) => {
  return (
    <>
      {isOpen && (
        <div className={styles.modalWrapper}>
          <div className={styles.modal}>
            <>
              <FontAwesomeIcon
                onClick={() => handleClose(false)}
                className={styles.closeIcon}
                icon={faClose}
              />
              {children}
            </>
          </div>
        </div>
      )}
    </>
  );
};

export default BigModal;
