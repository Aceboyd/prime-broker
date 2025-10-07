import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import User from './pages/User';
import Admin from './pages/Admin';
import Login from './pages/Login';
import './index.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
  <Route path="/" element={<LandingPage />} />
  <Route path="/signin" element={<SignIn />} />
  <Route path="/signup" element={<SignUp />} />
  <Route path="/user-dashboard" element={<User />} />

  {/* Admin */}
  <Route path="/admin" element={<Login />} />
  <Route path="/admin-dashboard" element={<Admin />} />
</Routes>

      </div>
    </Router>
  );
}

export default App;
