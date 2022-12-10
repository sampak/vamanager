import { FC, Props } from './typings';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import { getToken } from 'api/user';
import { useContext, useEffect, useState } from 'react';
import userService from 'api/userService';
import AuthContext from 'contexts/auth';
import { User } from '@shared/base/User';

const ProtectedRoute: FC<Props> = ({ children }) => {
  const access_token = getToken();
  const navigate = useNavigate();
  const { data, refetch } = userService.useGetMe(access_token);
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!access_token) {
      navigate('/auth/signin');
    }
    refetch();
  }, []);

  useEffect(() => {
    const user = data?.data as User;

    if (user?.id) {
      if (user.showOnbording) {
        navigate('/onbording/method');
      }

      setUser(user);
      setLoading(false);
    }
  }, [data]);

  const content = loading ? <></> : children;

  return content;
};

export default ProtectedRoute;
