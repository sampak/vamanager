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
  faUsers,
  faBook,
  faBuilding,
  faGlobe,
} from '@fortawesome/free-solid-svg-icons';
import Logo from 'components/Logo';
import { matchPath, useNavigate, useParams } from 'react-router-dom';
import AuthContext from 'contexts/auth';
import { getLettersFromName } from 'utils/getLettersFromName';
import { useTranslation } from 'react-i18next';
import useLogout from 'hooks/useLogout';
import { navigateInsideWorkspace } from 'utils/navigateInsideWorkspace';
import SidebarDropdown from 'components/SidebarDropdown';

enum MenuOptions {
  Home = 'Home',
  Aircrafts = 'Aircrafts',
  Schedules = 'Schedules',
  Users = 'Users',
  Pireps = 'Pireps',
}

const Sidebar = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const firstExperience = urlParams.get('firstExperience');
  const navigate = useNavigate();
  const translation = useTranslation();
  const t = (key: string) => translation.t(`sidebar.${key}`);
  const { workspaceId } = useParams();
  const { user } = useContext(AuthContext);
  const [show, setShow] = useState(false);

  const showedClassName = show ? styles.showed : '';

  const tutorialCreateAircraft = firstExperience
    ? styles.createAircraftAnimation
    : '';

  const isPathActive = (path: string, location: Location) =>
    !!matchPath(location.pathname + location.search, path);

  const isMenuOptionActive = (option: MenuOptions) => {
    if (option === MenuOptions.Home) {
      return isPathActive(`/workspace/${workspaceId}`, location);
    }
    if (option === MenuOptions.Aircrafts) {
      return isPathActive(`/workspace/${workspaceId}/aircrafts`, location);
    }
    if (option === MenuOptions.Schedules) {
      return isPathActive(`/workspace/${workspaceId}/schedules`, location);
    }
    if (option === MenuOptions.Users) {
      return isPathActive(`/workspace/${workspaceId}/users`, location);
    }
    if (option === MenuOptions.Pireps) {
      return isPathActive(`/workspace/${workspaceId}/pireps`, location);
    }

    return false;
  };

  const isHome = isMenuOptionActive(MenuOptions.Home);
  const isAircrafts = isMenuOptionActive(MenuOptions.Aircrafts);
  const isSchedules = isMenuOptionActive(MenuOptions.Schedules);
  const isUsers = isMenuOptionActive(MenuOptions.Users);
  const isPireps = isMenuOptionActive(MenuOptions.Pireps);

  const logout = useLogout();

  return (
    <div
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      className={classNames(styles.menu, showedClassName)}
    >
      <div
        onClick={() => navigateInsideWorkspace(navigate, workspaceId!, '')}
        className={styles.logoContent}
      >
        <Logo size={24} />
      </div>

      <div className={styles.userContent}>
        <Avatar className={styles.avatar}>{getLettersFromName(user!)}</Avatar>
        <div className={styles.userData}>
          <div className={styles.name}>
            {user?.firstName} {user?.lastName}
          </div>
          <div className={styles.role}>
            {user?.membership?.airline?.name} -{' '}
            {t(`roles.${user?.membership?.role}`)}
          </div>
        </div>
      </div>

      <div className={styles.border}></div>

      <div className={styles.options}>
        <div
          onClick={() => navigateInsideWorkspace(navigate, workspaceId!, '')}
          className={styles.option}
        >
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
        <div
          onClick={() =>
            navigateInsideWorkspace(navigate, workspaceId!, '/pireps')
          }
          className={styles.option}
        >
          <div className={styles.iconBox}>
            <FontAwesomeIcon
              icon={faBook}
              className={classNames(
                styles.optionIcon,
                isPireps && styles.activeIcon
              )}
            />
          </div>
          <div className={styles.optionName}>{t('pireps')}</div>
        </div>
        <div
          onClick={() =>
            navigateInsideWorkspace(navigate, workspaceId!, '/schedules')
          }
          className={styles.option}
        >
          <div className={styles.iconBox}>
            <FontAwesomeIcon
              icon={faCalendarAlt}
              className={classNames(
                styles.optionIcon,
                isSchedules && styles.activeIcon
              )}
            />
          </div>
          <div className={styles.optionName}>{t('schedules')}</div>
        </div>

        <SidebarDropdown
          className={tutorialCreateAircraft}
          firstExperience={!!firstExperience?.length}
          icon={faGlobe}
          title={t("company")}
          options={[
            {
              icon: faPlaneUp,
              className: tutorialCreateAircraft,
              title: t('aircrafts'),
              onClick: () =>
                navigateInsideWorkspace(navigate, workspaceId!, '/aircrafts'),
              active: isAircrafts,
            },
            {
              icon: faUsers,
              title: t('users'),
              onClick: () =>
                navigateInsideWorkspace(navigate, workspaceId!, '/users'),
              active: isUsers,
            },
          ]}
        />

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
