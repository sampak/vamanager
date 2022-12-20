import { Avatar } from '@mui/material';
import classNames from 'classnames';
import { useContext, useState } from 'react';
import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faPlaneUp,
  faCalendarAlt,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import Logo from 'components/Logo';
import { matchPath, useParams } from 'react-router-dom';
import AuthContext from 'contexts/auth';
import { getLettersFromName } from 'utils/getLettersFromName';
import { useTranslation } from 'react-i18next';
import useLogout from 'hooks/useLogout';

enum MenuOptions {
  Home = 'Home',
  Aircrafts = 'Aircrafts',
  Schedules = 'Schedules',
}

const Sidebar = () => {
  const translation = useTranslation();
  const t = (key: string) => translation.t(`sidebar.${key}`);
  const { workspaceId } = useParams();
  const { user } = useContext(AuthContext);
  const [show, setShow] = useState(false);

  const showedClassName = show ? styles.showed : '';

  // const tutorialCreateAircraft = ? styles.createAircraftAnimation : '';
  const tutorialCreateAircraft = '';

  const isPathActive = (path: string, location: Location) =>
    !!matchPath(location.pathname + location.search, path);

  const isMenuOptionActive = (option: MenuOptions) => {
    if (option === MenuOptions.Home) {
      return isPathActive(`/workspace/${workspaceId}`, location);
    }
    if (option === MenuOptions.Aircrafts) {
      return isPathActive(`/workspace/${workspaceId}/aircrafts`, location);
    }
  };

  const isHome = isMenuOptionActive(MenuOptions.Home);
  const isAircrafts = isMenuOptionActive(MenuOptions.Aircrafts);

  const logout = useLogout();

  return (
    <div
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      className={classNames(styles.menu, showedClassName)}
    >
      <div className={styles.logoContent}>
        <Logo size={24} />
      </div>

      <div className={styles.userContent}>
        <Avatar className={styles.avatar}>{getLettersFromName(user!)}</Avatar>
        <div className={styles.userData}>
          <div className={styles.name}>
            {user?.firstName} {user?.lastName}
          </div>
          <div className={styles.role}>
            {t(`roles.${user?.membership?.role}`)}
          </div>
        </div>
      </div>

      <div className={styles.border}></div>

      <div className={styles.options}>
        <div className={styles.option}>
          <div className={styles.iconBox}>
            <FontAwesomeIcon
              icon={faHouse}
              className={classNames(
                styles.optionIcon,
                isHome && styles.activeIcon
              )}
            />
          </div>
          <div className={styles.optionName}>{t('home')}</div>
        </div>
        <div className={styles.option}>
          <div className={styles.iconBox}>
            <FontAwesomeIcon
              icon={faCalendarAlt}
              className={styles.optionIcon}
            />
          </div>
          <div className={styles.optionName}>{t('schedules')}</div>
        </div>
        <div className={classNames(styles.option)}>
          <div className={styles.iconBox}>
            <FontAwesomeIcon
              icon={faPlaneUp}
              className={classNames(styles.optionIcon, tutorialCreateAircraft)}
            />
          </div>
          <div
            className={classNames(
              styles.optionName,
              tutorialCreateAircraft,
              isAircrafts && styles.activeIcon
            )}
          >
            {t('aircrafts')}
          </div>
        </div>

        <div onClick={() => logout()} className={classNames(styles.option)}>
          <div className={styles.iconBox}>
            <FontAwesomeIcon
              icon={faRightFromBracket}
              className={classNames(styles.optionIcon)}
            />
          </div>
          <div className={classNames(styles.optionName)}>{t('logOut')}</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;