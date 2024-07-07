import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import AuthGuard from './features/authentication/guards/AuthGuard';
import AuthProvider from './features/authentication/providers/AuthProvider';
import UserPage from './pages/UserPage/UserPage';
import HomePage from './pages/HomePage/HomePage';
import Layout from './shared/Layout/Layout';
import CsrfGuard from './core/api/guards/CsrfGuard';

const Application = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* TODO: This should be uncommented */}
          <Route /* element={<CsrfGuard />} */>
            <Route element={<Layout />}>
              <Route element={<AuthGuard />}>
                <Route path="/user" element={<UserPage />} />
              </Route>
              <Route>
                <Route path="/" element={<HomePage />} />
              </Route>
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default Application;
