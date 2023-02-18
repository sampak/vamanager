import { Avatar, Rating } from '@mui/material';
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
} from '@fortawesome/free-solid-svg-icons';
import Logo from '../Logo';
import {
  Location,
  matchPath,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import AuthContext from '../../contexts/auth';
import { getLettersFromName } from '../../utils/getLettersFromName';
import { useTranslation } from 'react-i18next';
import { navigateInsideWorkspace } from '../../utils/navigateInsideWorkspace';

enum MenuOptions {
  Home = 'Home',
  Pireps = 'Pireps',
}

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const translation = useTranslation();
  const t = (key: string) => translation.t(`sidebar.${key}`);
  const { workspaceId } = useParams();
  const { user } = useContext(AuthContext);

  const showedClassName = styles.showed;

  const isPathActive = (path: string, location: Location) =>
    !!matchPath(location.pathname + location.search, path);

  const isMenuOptionActive = (option: MenuOptions) => {
    if (option === MenuOptions.Home) {
      return isPathActive(`/workspace/${workspaceId}`, location);
    }
    if (option === MenuOptions.Pireps) {
      return isPathActive(`/workspace/${workspaceId}/aircrafts`, location);
    }
  };

  const isHome = isMenuOptionActive(MenuOptions.Home);
  const isPireps = isMenuOptionActive(MenuOptions.Pireps);

  const elo = ((user?.membership?.rating as number) / 1000) * 100;
  const stars = (elo * 5) / 100;

  return (
    <div className={classNames(styles.menu, showedClassName)}>
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
            <Rating
              className={styles.stars}
              name="read-only"
              value={stars}
              precision={0.5}
              readOnly
            />
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
              icon={faCalendarAlt}
              className={classNames(
                styles.optionIcon,
                isPireps && styles.activeIcon
              )}
            />
          </div>
          <div className={styles.optionName}>{t('pireps')}</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
