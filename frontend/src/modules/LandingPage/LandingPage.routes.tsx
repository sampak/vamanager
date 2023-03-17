import { Routes, Route } from 'react-router-dom';
import HomeLayout from 'components/HomeLayout';
import Homepage from '.';
import Ranking from './modules/Ranking';
import Tracker from './modules/Tracker';
import NotFound from 'components/NotFound';
import RoadMap from './modules/RoadMap';

const LandingPageRoutes = () => {
  return (
    <HomeLayout>
      <Routes>
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/tracker" element={<Tracker />} />
        <Route path="/roadmap" element={<RoadMap />} />
        <Route path="/" element={<Homepage />} />
        {/* @ts-ignore */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HomeLayout>
  );
};

export default LandingPageRoutes;
