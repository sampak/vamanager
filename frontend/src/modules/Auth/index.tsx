import { Routes, Route } from 'react-router-dom';

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="signup" element={<>test</>} />
      <Route path="signin" element={<>test</>} />
      <Route path="choose-workspace" element={<>test</>} />
      <Route path="*" element={<>test</>} />
    </Routes>
  );
};

export default AuthRoutes;
