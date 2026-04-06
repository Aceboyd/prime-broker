import React, { useEffect, useState } from 'react';
import { ShieldCheck, ChevronDown, User, History, LifeBuoy, LogOut } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

type Header2Props = {
  onKycClick: () => void;
  onTransactions: () => void;
};

type UserProfile = {
  first_name?: string;
  last_name?: string;
  email?: string;
};

const Header2 = ({ onKycClick, onTransactions }: Header2Props) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    let isMounted = true;

    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          'https://prime-api-gm2o.onrender.com/auth/profile',
          {
            headers: {
              Authorization: `Bearer ${token}`,
              accept: 'application/json',
            },
          }
        );

        if (response.data?.success && isMounted) {
          setUser(response.data.data);
        }
      } catch (error: any) {
        console.error('Error fetching user profile:', error.response?.data || error.message);
      }
    };

    fetchUserProfile();
    return () => {
      isMounted = false;
    };
  }, []);

  const initials = user
    ? `${user.first_name?.[0] || ''}${user.last_name?.[0] || ''}`.toUpperCase() || 'U'
    : 'U';
  const displayName = user
    ? `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'User'
    : 'User';
  const displayEmail = user?.email || 'user@email.com';

  const handleLogout = async () => {
    const token = localStorage.getItem('authToken');

    try {
      await axios.post(
        'https://prime-api-gm2o.onrender.com/auth/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        }
      );

      toast.success('Logged out successfully!', {
        position: 'top-right',
        autoClose: 2000,
      });

      localStorage.removeItem('authToken');
      setTimeout(() => {
        window.location.href = '/signin';
      }, 2000);
    } catch (error: any) {
      console.error('Logout failed:', error.response?.data || error.message);
      localStorage.removeItem('authToken');
      window.location.href = '/signin';
    }
  };

  return (
    <div className="hidden lg:flex items-center justify-end px-6 py-3 mb-4 border-b bg-gradient-to-r from-[#111827] via-[#0f172a] to-[#0b1220] border-white/10 text-white">
      <div className="flex items-center gap-3">
        <button
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 transition text-white text-xs font-semibold"
          onClick={onKycClick}
        >
          <ShieldCheck className="w-4 h-4" />
          KYC
        </button>
        <div className="relative">
          <button
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 text-gray-100"
            onClick={() => setUserMenuOpen((prev) => !prev)}
          >
            <span className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm font-semibold">
              {initials}
            </span>
            <span className="text-sm font-medium">{displayName}</span>
            <ChevronDown className="w-4 h-4 text-gray-300" />
          </button>
          {userMenuOpen && (
            <div
              className="absolute right-0 top-full mt-2 w-64 rounded-2xl overflow-hidden border shadow-[0_10px_30px_rgba(0,0,0,0.45)] z-50 text-left bg-gradient-to-b from-[#1f2937] to-[#111827] border-white/10"
            >
              <div className="px-4 py-3 bg-white/5">
                <p className="text-base font-semibold text-white">{displayName}</p>
                <p className="text-sm text-gray-400">{displayEmail}</p>
              </div>
              <div className="py-2">
                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-white/5 text-gray-200">
                  <User className="w-5 h-5" />
                  My Profile
                </button>
                <button
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-white/5 text-gray-200"
                  onClick={onTransactions}
                >
                  <History className="w-5 h-5" />
                  Transaction History
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-white/5 text-gray-200">
                  <LifeBuoy className="w-5 h-5" />
                  Support
                </button>
              </div>
              <div className="border-t border-white/10 py-2">
                <button
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10"
                  onClick={handleLogout}
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header2;
