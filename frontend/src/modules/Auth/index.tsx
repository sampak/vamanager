import AuthLayout from 'components/AuthLayout';
import { Routes, Route } from 'react-router-dom';
import SignIn from './modules/SignIn';
import SignUp from './modules/SignUp';
import Verify from './modules/Verify';
import { useState } from 'react';
import CodeContext from 'contexts/code';
const AuthRoutes = () => {
  const [code, setCode] = useState('');
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
