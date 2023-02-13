import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { QueryClient, QueryClientProvider } from 'react-query';
import AxiosInterceptor from './components/AxiosInterceptor';
import SignIn from './modules/SignIn';
import './styles/global.scss';
import './translation/i18n';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <Router>
      <AxiosInterceptor>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="auth/signin" element={<SignIn />} />
            <Route path="choose-workspace" element={<>choose workspace</>} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <>hello</>
                </ProtectedRoute>
              }
            />
          </Routes>
        </QueryClientProvider>
      </AxiosInterceptor>
    </Router>
  );
}
