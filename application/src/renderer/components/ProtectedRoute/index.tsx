import { FC, Props } from './typings';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getToken } from '../../api/user';
import { useContext, useEffect, useMemo, useState } from 'react';
import userService from '../../api/userService';
import AuthContext from '../../contexts/auth';
import { User } from '@shared/base/User';
import LoadingScreen from '../LoadingScreen';
import { EventsType } from '../../../dto/Events';

const ProtectedRoute: FC<Props> = ({ children }) => {
  const access_token = getToken();
  const location = useLocation();
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
      return;
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
      setUser(user);
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    if (
      location.pathname !== '/choose-workspace' &&
      !workspaceId &&
      access_token
    ) {
      window.electron.ipcRenderer.sendMessage(EventsType.SEND_TOKEN, {
        token: access_token,
      });
      navigate('/choose-workspace');
    }
  }, [location, workspaceId]);

  const showLoadingScreen = loading || isFetching;
  const showErrorScreen = isError;

  if (showErrorScreen) {
    return <>Error</>;
  }

  if (showLoadingScreen) {
    return <LoadingScreen />;
  }

  return children;
};

export default ProtectedRoute;
