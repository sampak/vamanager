import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faClose,
  faHome,
  faSignInAlt,
} from '@fortawesome/free-solid-svg-icons';
import Logo from 'components/Logo';
import { matchPath, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classNames from 'classnames';

enum MenuOptions {
  Home = 'Home',
  Ranking = 'Ranking',
  Tracker = 'Tracker',
  Roadmap = 'Roadmap',
}

const Menu = () => {
  const navigate = useNavigate();

  const [isBackground, setIsBackground] = useState(false);
  const [isHamburgerMenu, setIsHamburgerMenu] = useState(false);

  const scrollWindow = () => {
    if (window.scrollY !== 0) {
      setIsBackground(true);
      return;
    }

    setIsBackground(false);
  };

  useEffect(() => {
    addEventListener('scroll', scrollWindow);

    return () => removeEventListener('scroll', scrollWindow);
  }, []);

  const isPathActive = (path: string, location: Location) =>
    !!matchPath(location.pathname + location.search, path);

  const isMenuOptionActive = (option: MenuOptions) => {
    if (option === MenuOptions.Home) {
      return isPathActive(`/`, location);
    }
    if (option === MenuOptions.Ranking) {
      return isPathActive(`/ranking`, location);
    }
    if (option === MenuOptions.Tracker) {
      return isPathActive(`/tracker`, location);
    }
    if (option === MenuOptions.Roadmap) {
      return isPathActive(`/roadmap`, location);
    }
  };

  const isHome = isMenuOptionActive(MenuOptions.Home);
  const isRanking = isMenuOptionActive(MenuOptions.Ranking);
  const isTracker = isMenuOptionActive(MenuOptions.Tracker);
  const isRoadMap = isMenuOptionActive(MenuOptions.Roadmap);

  return (
    <>
      <div
        className={classNames(styles.menu, isBackground && styles.isBackground)}
      >
        <div onClick={() => navigate('/')} className={styles.logo}>
          <Logo size={24} />
        </div>
        <div className={styles.centerNavigation}>
          <div
            onClick={() => navigate('/')}
            className={classNames(styles.option, isHome && styles.active)}
          >
            Homepage
          </div>
          {/* <div className={styles.option}>Live Map</div> */}
          <div
            onClick={() => navigate('/ranking')}
            className={classNames(styles.option, isRanking && styles.active)}
          >
            Ranking
          </div>
          <div
            onClick={() => navigate('/tracker')}
            className={classNames(styles.option, isTracker && styles.active)}
          >
            Tracker
          </div>
          <div
            onClick={() => navigate('/roadmap')}
            className={classNames(styles.option, isRoadMap && styles.active)}
          >
            Roadmap
          </div>
        </div>
        <div className={styles.navigation}>
          <div
            onClick={() => navigate('/auth/signin')}
            className={styles.option}
          >
            <FontAwesomeIcon icon={faSignInAlt} />
            Sign In
          </div>
          <FontAwesomeIcon
            className={styles.hamburgerMenu}
            onClick={() => setIsHamburgerMenu(true)}
            icon={faBars}
          />
        </div>
      </div>
      {isHamburgerMenu && (
        <div className={styles.deviceMenu}>
          <FontAwesomeIcon
            onClick={() => setIsHamburgerMenu(false)}
            className={styles.hamburgerMenuClose}
            icon={faClose}
          />
          <div className={styles.deviceOptions}>
            <div className={`${styles.deviceOption} ${styles.active}`}>
              Homepage
            </div>
            <div className={styles.deviceOption}>Features</div>
            <div className={styles.deviceOption}>Stats</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Menu;
