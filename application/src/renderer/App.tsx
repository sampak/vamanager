import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Airport from '@shared/base/Airport';
import ProtectedRoute from './components/ProtectedRoute';
import { QueryClient, QueryClientProvider } from 'react-query';

function Hello() {
  const t: Airport | null = null;
  return (
    <div>
      <div className="Hello">
        <img width="200" alt="icon" src={icon} />
      </div>
      <h1>electron-react-boilerplate</h1>
      <div className="Hello">
        <a
          href="https://electron-react-boilerplate.js.org/"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="books">
              📚
            </span>
            Read our docs
          </button>
        </a>
        <a
          href="https://github.com/sponsors/electron-react-boilerplate"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="folded hands">
              🙏
            </span>
            Donate
          </button>
        </a>
      </div>
    </div>
  );
}

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
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="auth/signin" element={<>Login</>} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Hello />
              </ProtectedRoute>
            }
          />
        </Routes>
      </QueryClientProvider>
    </Router>
  );
}
