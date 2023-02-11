import { createContext } from 'react';
import { User } from '@shared/base/User';

type IAuthContext = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const AuthContext = createContext<IAuthContext>({
  user: null,
  setUser: () => {},
});

export default AuthContext;
