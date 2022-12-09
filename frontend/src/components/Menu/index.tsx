import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

const Menu = () => {
  return (
    <div className={styles.menu}>
      <div className={styles.navigation}>
        <div className={`${styles.option} ${styles.active}`}>
          <FontAwesomeIcon icon={faHome} />
          Homepage
        </div>
        <div className={styles.option}>Features</div>
        <div className={styles.option}>Stats</div>
        <div className={styles.option}>
          <FontAwesomeIcon icon={faSignInAlt} />
          Login/Register
        </div>
      </div>
    </div>
  );
};

export default Menu;
