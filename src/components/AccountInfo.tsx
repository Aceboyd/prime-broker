import React, { useState } from 'react';
import { User, Mail, Phone, Shield, Bell, Save, Edit3 } from 'lucide-react';

const AccountInfo = ({ setActiveTab }) => { // Add setActiveTab as a prop
  const [isEditing, setIsEditing] = useState(false);
  const [accountData, setAccountData] = useState({
    profile: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      country: 'United States',
      timezone: 'UTC-5 (EST)',
    },
    preferences: {
      emailNotifications: true,
      smsNotifications: false,
      tradingAlerts: true,
      newsUpdates: true,
      twoFactorAuth: true,
    },
  });
  const [saveStatus, setSaveStatus] = useState(null);

  const handleInputChange = (section, field, value) => {
    setAccountData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleToggle = (key) => {
    setAccountData((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: !prev.preferences[key],
      },
    }));
  };

  const handleSave = () => {
    setSaveStatus('success');
    setIsEditing(false);
    console.log('Saving account data:', accountData);
    setTimeout(() => setSaveStatus(null), 3000);
  };

  // Reusable styles
  const inputClass = `w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:opacity-60 disabled:cursor-not-allowed`;
  const toggleClass = (isOn) =>
    `w-12 h-6 rounded-full p-1 transition-colors duration-200 ${
      isOn ? 'bg-accent-500' : 'bg-gray-600'
    }`;
  const buttonClass = `flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg text-white hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-800`;

  return (
    <div className="max-w-7xl mx-auto space-y-8 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Account Settings</h1>
          <p className="text-gray-400 text-sm sm:text-base">Manage your account information and preferences</p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={buttonClass}
          aria-label={isEditing ? 'Cancel editing profile' : 'Edit profile'}
        >
          <Edit3 className="w-4 h-4" />
          <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
        </button>
      </div>

      {/* Save Status */}
      {saveStatus === 'success' && (
        <div className="p-4 bg-green-500/20 text-green-400 rounded-lg text-sm">
          Changes saved successfully!
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Information */}
        <div className="glass-effect rounded-2xl p-6 bg-gray-800/50 backdrop-blur-lg">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <User className="w-5 h-5 mr-2" />
            Profile Information
          </h3>

          <div className="space-y-6">
            <div className="flex items-center justify-center mb-6">
              <div
                className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-accent-500 to-secondary-500 rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold text-white"
                aria-label={`Profile avatar for ${accountData.profile.firstName} ${accountData.profile.lastName}`}
              >
                {accountData.profile.firstName[0]}{accountData.profile.lastName[0]}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="firstName">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={accountData.profile.firstName}
                  onChange={(e) => handleInputChange('profile', 'firstName', e.target.value)}
                  disabled={!isEditing}
                  className={inputClass}
                  aria-required="true"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  value={accountData.profile.lastName}
                  onChange={(e) => handleInputChange('profile', 'lastName', e.target.value)}
                  disabled={!isEditing}
                  className={inputClass}
                  aria-required="true"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={accountData.profile.email}
                  onChange={(e) => handleInputChange('profile', 'email', e.target.value)}
                  disabled={!isEditing}
                  className={`${inputClass} pl-12`}
                  aria-required="true"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="phone">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="phone"
                  type="tel"
                  value={accountData.profile.phone}
                  onChange={(e) => handleInputChange('profile', 'phone', e.target.value)}
                  disabled={!isEditing}
                  className={`${inputClass} pl-12`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="country">
                  Country
                </label>
                <select
                  id="country"
                  value={accountData.profile.country}
                  onChange={(e) => handleInputChange('profile', 'country', e.target.value)}
                  disabled={!isEditing}
                  className={inputClass}
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="timezone">
                  Timezone
                </label>
                <select
                  id="timezone"
                  value={accountData.profile.timezone}
                  onChange={(e) => handleInputChange('profile', 'timezone', e.target.value)}
                  disabled={!isEditing}
                  className={inputClass}
                >
                  <option value="UTC-5 (EST)">UTC-5 (EST)</option>
                  <option value="UTC-8 (PST)">UTC-8 (PST)</option>
                  <option value="UTC+0 (GMT)">UTC+0 (GMT)</option>
                  <option value="UTC+1 (CET)">UTC+1 (CET)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Security & Preferences */}
        <div className="space-y-6">
          {/* Security Settings */}
          <div className="glass-effect rounded-2xl p-6 bg-gray-800/50 backdrop-blur-lg">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Security Settings
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div>
                  <h4 className="text-white font-medium">Two-Factor Authentication</h4>
                  <p className="text-gray-400 text-sm">Add an extra layer of security</p>
                </div>
                <button
                  onClick={() => handleToggle('twoFactorAuth')}
                  className={toggleClass(accountData.preferences.twoFactorAuth)}
                  aria-checked={accountData.preferences.twoFactorAuth}
                  role="switch"
                  aria-label="Toggle two-factor authentication"
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                      accountData.preferences.twoFactorAuth ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  ></div>
                </button>
              </div>

              <button
                className="w-full p-4 border border-white/20 rounded-lg text-left hover:bg-white/5 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                onClick={() => setActiveTab('change-password')} // Switch to change-password tab
                aria-label="Change account password"
              >
                <h4 className="text-white font-medium">Change Password</h4>
                <p className="text-gray-400 text-sm">Update your account password</p>
              </button>

              <button
                className="w-full p-4 border border-white/20 rounded-lg text-left hover:bg-white/5 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                onClick={() => setActiveTab('login-history')} // Switch to login-history tab
                aria-label="View login history"
              >
                <h4 className="text-white font-medium">Login History</h4>
                <p className="text-gray-400 text-sm">View recent account access</p>
              </button>
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="glass-effect rounded-2xl p-6 bg-gray-800/50 backdrop-blur-lg">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Notification Preferences
            </h3>

            <div className="space-y-4">
              {[
                { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive updates via email' },
                { key: 'smsNotifications', label: 'SMS Notifications', desc: 'Receive alerts via text message' },
                { key: 'tradingAlerts', label: 'Trading Alerts', desc: 'Price alerts and trading notifications' },
                { key: 'newsUpdates', label: 'News Updates', desc: 'Market news and platform updates' },
              ].map((pref) => (
                <div key={pref.key} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">{pref.label}</h4>
                    <p className="text-gray-400 text-sm">{pref.desc}</p>
                  </div>
                  <button
                    onClick={() => handleToggle(pref.key)}
                    className={toggleClass(accountData.preferences[pref.key])}
                    aria-checked={accountData.preferences[pref.key]}
                    role="switch"
                    aria-label={`Toggle ${pref.label.toLowerCase()}`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                        accountData.preferences[pref.key] ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    ></div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      {isEditing && (
        <div className="flex justify-end">
          <button onClick={handleSave} className={buttonClass} aria-label="Save profile changes">
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountInfo;