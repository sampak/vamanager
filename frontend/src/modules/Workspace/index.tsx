import AppLayout from 'components/AppLayout';
import { Routes, Route } from 'react-router-dom';
import AircraftList from './modules/AircraftList';
import AircraftDealer from './modules/AircraftDealer';
import Schedules from './modules/Schedules';
import Users from './modules/Users';
import WelcomeModal from 'components/WelcomeModal';

const WorkspaceRoutes = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const firstExperience = urlParams.get('firstExperience');

  return (
    <AppLayout>
      <>
        <Routes>
          <Route
            path="/aircrafts/*"
            element={
              <Routes>
                <Route path="/dealer" element={<AircraftDealer />} />
                <Route path="*" element={<AircraftList />} />
              </Routes>
            }
          />
          <Route
            path="/schedules/*"
            element={
              <Routes>
                <Route path="*" element={<Schedules />} />
              </Routes>
            }
          />
          <Route
            path="/users/*"
            element={
              <Routes>
                <Route path="*" element={<Users />} />
              </Routes>
            }
          />
          <Route path="*" element={<>test</>} />
        </Routes>

        {firstExperience && <WelcomeModal />}
      </>
    </AppLayout>
  );
};

export default WorkspaceRoutes;
