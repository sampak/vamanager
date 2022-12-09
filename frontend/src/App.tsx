import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './translation/i18n';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import './styles/global.scss';
import LandingPageRoutes from 'modules/LandingPage/LandingPage.routes';
import ProtectedRoute from 'components/ProtectedRoute';
import AuthRoutes from 'modules/Auth';
import AxiosInterceptor from 'components/AxiosInterceptor';
const queryClient = new QueryClient();
function App() {
  return (
    <BrowserRouter>
      <AxiosInterceptor>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route
              path="/workspace/*"
              element={
                <ProtectedRoute>
                  <>tet</>
                </ProtectedRoute>
              }
            />
            <Route path="/auth/*" element={<AuthRoutes />} />
            <Route path="/*" element={<LandingPageRoutes />} />
          </Routes>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </AxiosInterceptor>
    </BrowserRouter>
  );
}

export default App;
