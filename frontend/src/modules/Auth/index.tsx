import AuthLayout from 'components/AuthLayout';
import { Routes, Route } from 'react-router-dom';
import SignIn from './modules/SignIn';
import SignUp from './modules/SignUp';

const AuthRoutes = () => {
  return (
    <AuthLayout>
      <Routes>
        <Route path="signup" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="choose-workspace" element={<>test</>} />
        <Route path="*" element={<SignIn />} />
      </Routes>
    </AuthLayout>
  );
};

export default AuthRoutes;
