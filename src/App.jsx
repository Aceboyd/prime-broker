import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LandingPage from './pages/LandingPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import User from './pages/User';
import Admin from './pages/Admin';
import Login from './pages/Login';
import './index.css';

// ProtectedRoute component to restrict access
const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const token = requireAdmin
    ? localStorage.getItem('adminToken')
    : localStorage.getItem('authToken') || localStorage.getItem('adminToken');
  return token ? children : <Navigate to={requireAdmin ? '/admin' : '/signin'} replace />;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/user-dashboard"
            element={
              <ProtectedRoute>
                <User />
              </ProtectedRoute>
            }
          />
          {/* Admin */}
          <Route path="/admin" element={<Login />} />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute requireAdmin={true}>
                <Admin />
              </ProtectedRoute>
            }
          />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
        />
      </div>
    </Router>
  );
}

export default App;