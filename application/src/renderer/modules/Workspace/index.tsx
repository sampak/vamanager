import { Route, Routes } from 'react-router-dom';
import AppLayout from 'renderer/components/AppLayout';
import FlightProgress from 'renderer/components/FlightProgress';
import Pireps from './modules/Pireps';
import Flight from './modules/Flight';

const WorkspaceRoutes = () => {
  return (
    <AppLayout>
      <>
        <Routes>
          <Route path="/pireps" element={<Pireps />} />
          <Route path="/flight" element={<Flight />} />
          <Route
            path="*"
            element={
              <>
                <FlightProgress percent={0} />
              </>
            }
          />
        </Routes>
      </>
    </AppLayout>
  );
};

export default WorkspaceRoutes;
