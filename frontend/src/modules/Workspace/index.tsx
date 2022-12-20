import AppLayout from 'components/AppLayout';
import { Routes, Route } from 'react-router-dom';

const WorkspaceRoutes = () => {
  return (
    <AppLayout>
      <Routes>
        <Route path="*" element={<>test</>} />
      </Routes>
    </AppLayout>
  );
};

export default WorkspaceRoutes;
