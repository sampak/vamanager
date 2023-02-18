import { Route, Routes } from 'react-router-dom';
import AppLayout from 'renderer/components/AppLayout';

const WorkspaceRoutes = () => {
  return (
    <AppLayout>
      <>
        <Routes>
          <Route path="/aircrafts" element={<>test aircrafts</>} />
          <Route path="*" element={<>test</>} />
        </Routes>
      </>
    </AppLayout>
  );
};

export default WorkspaceRoutes;
