import { removeToken } from 'api/user';
import AuthContext from 'contexts/auth';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useLogout() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const logout = async () => {
    removeToken();
    localStorage.clear();
    navigate('/auth/signin');
    setUser(null);
  };

  return logout;
}
