import AuthLayout from 'components/AuthLayout';
import { Routes, Route } from 'react-router-dom';
import SignIn from './modules/SignIn';
import SignUp from './modules/SignUp';
import Verify from './modules/Verify';
import { useEffect, useState } from 'react';
import CodeContext from 'contexts/code';
import { config } from 'config';
const AuthRoutes = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const queryCompany = urlParams.get('company');
  const [code, setCode] = useState('');

  useEffect(() => {
    if (!queryCompany?.length) return;
    sessionStorage.setItem(config.SESSION_INVITIATION, queryCompany);
  }, [queryCompany]);

  return (
    <CodeContext.Provider value={{ code, setCode }}>
      <AuthLayout>
        <Routes>
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="verify" element={<Verify />} />
          <Route path="*" element={<SignIn />} />
        </Routes>
      </AuthLayout>
    </CodeContext.Provider>
  );
};

export default AuthRoutes;
