import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './translation/i18n';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import './styles/global.scss';
import LandingPageRoutes from 'modules/LandingPage/LandingPage.routes';
import ProtectedRoute from 'components/ProtectedRoute';
import AuthRoutes from 'modules/Auth';
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
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
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
