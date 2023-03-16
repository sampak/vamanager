import { FC, Props } from './typings';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import AuthContext from 'contexts/auth';
import { useTranslation } from 'react-i18next';
import useGoogleAnalytics from 'hooks/useGoogleAnalytics';

const AppHeader: FC<Props> = ({ children }) => {
  const location = useLocation();
  const translation = useTranslation();
  const analytics = useGoogleAnalytics();

  const t = (key: string) => translation.t(`headers.${key}`);

  const [title, setTitle] = useState('');

  const { user } = useContext(AuthContext);

  const paths = [
    { key: 'signin', title: t('signin') },
    { key: 'signup', title: t('signup') },
    { key: 'choose-workspace', title: t('choose') },
    { key: 'method', title: t('method') },
    { key: 'join', title: t('join') },
    { key: 'details', title: t('details') },
    { key: 'configuration', title: t('configuration') },
    { key: 'base', title: t('base') },
    { key: 'schedules', title: t('schedules') },
    { key: 'aircrafts', title: t('aircrafts') },
    { key: 'dealer', title: t('dealer') },
    { key: 'verify', title: t('verify') },
    { key: 'users', title: t('users') },
    { key: 'pirep', title: t('pirep') },
    { key: 'pireps', title: t('pireps') },
  ];

  const getPath = () => {
    const pathname = location.pathname.split('/');
    const searchPath = pathname[pathname.length - 1];
    const searchPathSecond = pathname[pathname.length - 2];

    const path = paths.find(
      (path) => path.key === searchPath || path.key === searchPathSecond
    );
    if (path?.title && !!searchPath.length) {
      return `VAManager - ${path.title}`;
    }

    if (
      pathname.find((path) => path === 'workspace') &&
      user?.membership?.airline?.name
    ) {
      return `VAManager - ${user?.membership?.airline?.name}`;
    }

    return 'VAManager - Homepage';
  };

  useEffect(() => {
    setTitle(getPath());
  }, [location, user]);

  useEffect(() => {
    if (!analytics) return;
    if (process.env.NODE_ENV === 'production') {
      analytics.page();
    }
  }, [analytics]);

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </>
  );
};

export default AppHeader;
