import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './translation/i18n';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import './styles/global.scss';
import LandingPageRoutes from 'modules/LandingPage/LandingPage.routes';
import ProtectedRoute from 'components/ProtectedRoute';
import AuthRoutes from 'modules/Auth';
import AxiosInterceptor from 'components/AxiosInterceptor';
import AuthContext from 'contexts/auth';
import { useState } from 'react';
import { User } from '@shared/base/User';
import OnbordingRoutes from 'modules/Onbording';
import ChooseWorkspace from 'modules/ChooseWorkspace';
import WorkspaceRoutes from 'modules/Workspace';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
function App() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <BrowserRouter>
      <AxiosInterceptor>
        <QueryClientProvider client={queryClient}>
          <AuthContext.Provider
            value={{
              user,
              setUser,
            }}
          >
            <Routes>
              <Route
                path="/workspace/:workspaceId/*"
                element={
                  <ProtectedRoute>
                    <WorkspaceRoutes />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/choose-workspace"
                element={
                  <ProtectedRoute>
                    <ChooseWorkspace />
                  </ProtectedRoute>
                }
              />
              <Route path="/onbording/*" element={<OnbordingRoutes />} />
              <Route path="/auth/*" element={<AuthRoutes />} />
              <Route path="/*" element={<LandingPageRoutes />} />
            </Routes>
            <ReactQueryDevtools />
          </AuthContext.Provider>
        </QueryClientProvider>
      </AxiosInterceptor>
    </BrowserRouter>
  );
}

export default App;
