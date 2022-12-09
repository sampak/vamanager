import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import Logo from 'components/Logo';
import { useNavigate } from 'react-router-dom';

const Menu = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.menu}>
      <div className={styles.logo}>
        <Logo size={24} />
      </div>
      <div className={styles.navigation}>
        <div className={`${styles.option} ${styles.active}`}>
          <FontAwesomeIcon icon={faHome} />
          Homepage
        </div>
        <div className={styles.option}>Features</div>
        <div className={styles.option}>Stats</div>
        <div onClick={() => navigate('/auth/signin')} className={styles.option}>
          <FontAwesomeIcon icon={faSignInAlt} />
          Login/Register
        </div>
      </div>
    </div>
  );
};

export default Menu;
