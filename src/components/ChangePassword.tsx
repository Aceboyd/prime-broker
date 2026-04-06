import React, { useState } from 'react';
import { Lock } from 'lucide-react';

const ChangePassword = ({ setActiveTab }) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      setError('New password and confirmation do not match');
      return;
    }
    // Placeholder for API call
    console.log('Change password:', formData);
    setSuccess('Password updated successfully!');
    setError(null);
    setTimeout(() => setActiveTab('account'), 2000); // Return to account tab after success
  };

  const inputClass = `w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`;
  const buttonClass = `flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg text-white hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-800`;

  return (
    <div className="max-w-md mx-auto space-y-6 p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl font-bold text-white flex items-center">
        <Lock className="w-6 h-6 mr-2" />
        Change Password
      </h1>
      {error && <div className="p-4 bg-red-500/20 text-red-400 rounded-lg text-sm">{error}</div>}
      {success && <div className="p-4 bg-green-500/20 text-green-400 rounded-lg text-sm">{success}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-300 mb-2">
            Current Password
          </label>
          <input
            id="currentPassword"
            name="currentPassword"
            type="password"
            value={formData.currentPassword}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>
        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300 mb-2">
            New Password
          </label>
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            value={formData.newPassword}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
            Confirm New Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => setActiveTab('account')}
            className="px-6 py-3 border border-white/20 rounded-lg text-white hover:bg-white/5 transition-all"
          >
            Cancel
          </button>
          <button type="submit" className={buttonClass}>
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;