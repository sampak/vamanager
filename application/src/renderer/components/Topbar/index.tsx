import { FC, Props } from './typings';
import styles from './styles.module.scss';
import Logo from '../Logo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowMinimize, faXmark } from '@fortawesome/free-solid-svg-icons';
import { EventsType } from '../../../dto/Events';
import ErrorModal from '../ErrorModal';
import { useState } from 'react';

const Topbar: FC<Props> = () => {
  const [isCloseModal, setIsCloseModal] = useState(false);

  const handleCloseModal = () => {
    window.electron.ipcRenderer.sendMessage(EventsType.CLOSE_APPLICATION, {});
  };

  const handleClickClose = () => setIsCloseModal(true);

  const handleClickMinimalize = () => {
    window.electron.ipcRenderer.sendMessage(
      EventsType.MINIMALIZE_APPLICATION,
      {}
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <Logo badgeClassName={styles.badgeLogo} size={12} />
      </div>
      <div className={styles.buttons}>
        <div onClick={handleClickMinimalize} className={styles.button}>
          <FontAwesomeIcon icon={faWindowMinimize} />
        </div>

        <div onClick={handleClickClose} className={styles.button}>
          <FontAwesomeIcon icon={faXmark} />
        </div>
      </div>
      <ErrorModal
        onAccept={handleCloseModal}
        onCancel={() => setIsCloseModal(false)}
        toggle={setIsCloseModal}
        isOpen={isCloseModal}
        acceptText="Close"
        cancelText="Cancel"
        title="Are you sure?"
        text="Do you really want to close the application if you have an active flight, all data will be permamently deleted"
      />
    </div>
  );
};

export default Topbar;
