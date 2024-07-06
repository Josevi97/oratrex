import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import AuthGuard from './features/authentication/guards/AuthGuard';
import HomePage from './pages/HomePage/HomePage';
import AuthProvider from './features/authentication/providers/AuthProvider';

const Application = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route>
            <Route element={<AuthGuard />}>
              <Route path="/" element={<HomePage />} />
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
