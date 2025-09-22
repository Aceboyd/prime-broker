import React from 'react';
import { Clock } from 'lucide-react';

const LoginHistory = ({ setActiveTab }) => {
  // Placeholder login history data
  const loginHistory = [
    { id: 1, date: '2025-08-03 14:30', device: 'Chrome on Windows', ip: '192.168.1.1', location: 'New York, USA' },
    { id: 2, date: '2025-08-02 09:15', device: 'Safari on iPhone', ip: '192.168.1.2', location: 'Los Angeles, USA' },
  ];

  const buttonClass = `px-6 py-3 border border-white/20 rounded-lg text-white hover:bg-white/5 transition-all`;

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl font-bold text-white flex items-center">
        <Clock className="w-6 h-6 mr-2" />
        Login History
      </h1>
      <p className="text-gray-400 text-sm">View recent account access</p>
      <div className="glass-effect rounded-2xl p-6 bg-gray-800/50 backdrop-blur-lg">
        {loginHistory.length === 0 ? (
          <p className="text-gray-400">No login history available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-white">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="py-3 px-4">Date & Time</th>
                  <th className="py-3 px-4">Device</th>
                  <th className="py-3 px-4">IP Address</th>
                  <th className="py-3 px-4">Location</th>
                </tr>
              </thead>
              <tbody>
                {loginHistory.map((entry) => (
                  <tr key={entry.id} className="border-b border-white/10">
                    <td className="py-3 px-4">{entry.date}</td>
                    <td className="py-3 px-4">{entry.device}</td>
                    <td className="py-3 px-4">{entry.ip}</td>
                    <td className="py-3 px-4">{entry.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="flex justify-end">
        <button onClick={() => setActiveTab('account')} className={buttonClass}>
          Back to Account
        </button>
      </div>
    </div>
  );
};

export default LoginHistory;