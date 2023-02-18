import { Route, Routes } from 'react-router-dom';
import AppLayout from 'renderer/components/AppLayout';
import Pireps from './modules/Pireps';

const WorkspaceRoutes = () => {
  return (
    <AppLayout>
      <>
        <Routes>
          <Route path="/pireps" element={<Pireps />} />
          <Route path="*" element={<>test</>} />
        </Routes>
      </>
    </AppLayout>
  );
};

export default WorkspaceRoutes;
