import { Routes, Route } from 'react-router-dom';
import HomeLayout from 'components/HomeLayout';
import Homepage from '.';

const LandingPageRoutes = () => {
  return (
    <HomeLayout>
      <Routes>
        <Route path="*" element={<Homepage />} />
      </Routes>
    </HomeLayout>
  );
};

export default LandingPageRoutes;
