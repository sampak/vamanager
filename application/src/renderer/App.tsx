import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { QueryClient, QueryClientProvider } from 'react-query';
import AxiosInterceptor from './components/AxiosInterceptor';
import SignIn from './modules/SignIn';
import './styles/global.scss';
import './translation/i18n';
import { useEffect, useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import { EventsType } from '../dto/Events';
import styles from './styles.module.scss';
import DownloadUpdate from './components/DownloadUpdate';
import Layout from './components/Layout';
import ChooseWorkspace from './modules/ChooseWorkspace';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  const [isUpdate, setIsUpdate] = useState(false);
  const [checkingIsUpdate, setCheckingIsUpdate] = useState(true);
  const [downloadState, setDownloadState] = useState({
    total: 0,
    downloaded: 0,
    percent: 0,
  });

  window.electron.ipcRenderer.on(
    EventsType.SEND_DOWNLOAD_STATUS,
    (data: { isAvailable: boolean }) => {
      setIsUpdate(data.isAvailable);
      setCheckingIsUpdate(false);
    }
  );

  window.electron.ipcRenderer.on(
    EventsType.SEND_DOWNLOAD_PROGRESS,
    (data: { total: number; downloaded: number; percent: number }) => {
      setDownloadState(data);
    }
  );

  if (checkingIsUpdate) {
    return (
      <div className={styles.updateWrapper}>
        <LoadingScreen
          logoClassName={styles.logo}
          className={styles.update}
          text="Checking for updates"
        />
      </div>
    );
  }

  if (isUpdate) {
    return (
      <DownloadUpdate
        downloaded={downloadState.downloaded}
        percent={downloadState.percent}
        size={downloadState.total}
      />
    );
  }

  return (
    <Router>
      <AxiosInterceptor>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Routes>
              <Route path="auth/signin" element={<SignIn />} />
              <Route
                path="choose-workspace"
                element={
                  <ProtectedRoute>
                    <ChooseWorkspace />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/workspace/:workspaceId/*"
                element={
                  <ProtectedRoute>
                    <>hello</>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <ChooseWorkspace />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Layout>
        </QueryClientProvider>
      </AxiosInterceptor>
    </Router>
  );
}
