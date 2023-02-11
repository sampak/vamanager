import { FC, Props } from './typings';
import styles from './styles.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { getToken } from '../../api/user';
import { useContext, useEffect, useMemo, useState } from 'react';
import userService from '../../api/userService';
import AuthContext from '../../contexts/auth';
import { User } from '@shared/base/User';
// import LoadingScreen from 'components/LoadingScreen';

const ProtectedRoute: FC<Props> = ({ children }) => {
  const access_token = getToken();
  const navigate = useNavigate();
  const { workspaceId } = useParams();
  const { data, refetch, isError, error, isFetching } = userService.useGetMe(
    access_token,
    workspaceId
  );
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!access_token) {
      navigate('/auth/signin');
    }
    setLoading(true);
    refetch();
  }, []);

  useEffect(() => {
    if (!!workspaceId?.length) {
      setLoading(true);
      refetch();
    }
  }, [workspaceId]);

  useEffect(() => {
    if (isFetching) return;
    const user = data?.data as User;

    if (user?.id) {
      if (user.uiConfiguration?.showOnbording) {
        navigate('/onbording/method');
      }

      setUser(user);
      setLoading(false);
    }
  }, [data]);

  const showLoadingScreen = loading || isFetching;
  const showErrorScreen = isError;

  if (showErrorScreen) {
    return <>Error</>;
  }

  if (showLoadingScreen) {
    // return <LoadingScreen />;
    return <>Loading</>
  }

  return children;
};

export default ProtectedRoute;
