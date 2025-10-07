import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const AdminLogin = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        'https://prime-api-gm2o.onrender.com/auth/admin/login',
        { email, password },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      if (response?.data?.success) {
        const { token, data } = response.data;

        // ✅ Store admin info and token
        localStorage.setItem('token', token);
        localStorage.setItem('admin', JSON.stringify(data));

        // ✅ Update app state
        setUser(data);

        toast.success(`Welcome back, ${data.first_name}!`);

        // ✅ Navigate after short delay (smooth UX)
        setTimeout(() => {
          navigate('/admin-dashboard');
        }, 1000);
      } else {
        toast.error('Login failed. Please check your credentials.');
      }
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        'Unable to login. Please try again.';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <Toaster />
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Admin Login
        </h2>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Admin Email"
          className="border border-gray-700 bg-gray-700 text-white p-2 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
          required
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border border-gray-700 bg-gray-700 text-white p-2 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
          required
        />

        <button
          type="submit"
          className={`bg-blue-600 hover:bg-blue-700 text-white p-2 w-full rounded transition-all ${
            isLoading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
