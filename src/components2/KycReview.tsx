import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { ShieldCheck, ShieldX, FileImage, User as UserIcon } from 'lucide-react';
import { toast } from 'react-toastify';
import { API_BASE_URL, User } from '../types';

const statusStyles: Record<User['kyc_status'], string> = {
  approved: 'bg-green-500/20 text-green-200',
  rejected: 'bg-red-500/20 text-red-200',
  pending: 'bg-yellow-500/20 text-yellow-200',
};

const emptyDoc = {
  label: 'Not provided',
  url: null as string | null,
};

const KycReview = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | User['kyc_status']>('all');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get(`${API_BASE_URL}/admin/users`, {
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
      });
      if (res.data.success) {
        setUsers(res.data.data);
        if (res.data.data?.length && !selectedUserId) {
          setSelectedUserId(res.data.data[0].id);
        }
      } else {
        toast.error('Failed to fetch users');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error fetching users');
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return users.filter((user) => {
      const matchesStatus = statusFilter === 'all' ? true : user.kyc_status === statusFilter;
      const matchesSearch =
        term.length === 0 ||
        `${user.first_name} ${user.last_name}`.toLowerCase().includes(term) ||
        user.email?.toLowerCase().includes(term) ||
        user.phone?.toLowerCase().includes(term);
      return matchesStatus && matchesSearch;
    });
  }, [users, searchTerm, statusFilter]);

  const selectedUser = filteredUsers.find((u) => u.id === selectedUserId) || filteredUsers[0] || null;

  const documents = selectedUser?.kyc_documents
    ? [
        {
          label: 'ID Front',
          url:
            selectedUser.kyc_documents.front_url ??
            selectedUser.kyc_documents.id_document_url ??
            null,
        },
        {
          label: 'ID Back',
          url:
            selectedUser.kyc_documents.back_url ??
            selectedUser.kyc_documents.proof_of_address_url ??
            null,
        },
      ]
    : [
        { label: 'ID Front', ...emptyDoc },
        { label: 'ID Back', ...emptyDoc },
      ];

  return (
    <div className="w-full max-w-full md:max-w-[calc(100vw-320px)] mx-auto rounded-2xl p-4 md:p-6 shadow-xl bg-white/5 border border-white/10 backdrop-blur">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">KYC Review</h2>
          <p className="text-white/60 text-sm">Review submitted documents and verify users.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search users..."
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-sm"
            />
          </div>
          <div className="mb-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | User['kyc_status'])}
              className="w-full px-3 py-2 bg-slate-900 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-sm"
            >
              <option value="all" className="bg-slate-900 text-white">All Status</option>
              <option value="pending" className="bg-slate-900 text-white">Pending</option>
              <option value="approved" className="bg-slate-900 text-white">Approved</option>
              <option value="rejected" className="bg-slate-900 text-white">Rejected</option>
            </select>
          </div>

          {loading ? (
            <p className="text-gray-400 text-sm">Loading users...</p>
          ) : filteredUsers.length === 0 ? (
            <p className="text-gray-400 text-sm">No users found.</p>
          ) : (
            <div className="space-y-2 max-h-[520px] overflow-auto pr-2">
              {filteredUsers.map((user) => (
                <button
                  key={user.id}
                  onClick={() => setSelectedUserId(user.id)}
                  className={`w-full text-left rounded-xl border px-3 py-3 transition-all ${
                    selectedUser?.id === user.id
                      ? 'border-blue-400/60 bg-blue-500/10'
                      : 'border-white/10 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white text-sm font-semibold">
                        {user.first_name} {user.last_name}
                      </p>
                      <p className="text-white/60 text-xs truncate">{user.email}</p>
                    </div>
                    <span className={`text-[10px] px-2 py-1 rounded-full ${statusStyles[user.kyc_status]}`}>
                      {user.kyc_status}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          {selectedUser ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    <UserIcon className="w-6 h-6 text-white/70" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-lg">
                      {selectedUser.first_name} {selectedUser.last_name}
                    </p>
                    <p className="text-white/60 text-sm">{selectedUser.email}</p>
                  </div>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full ${statusStyles[selectedUser.kyc_status]}`}>
                  {selectedUser.kyc_status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {documents.map((doc) => (
                  <div key={doc.label} className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-white text-sm font-semibold">{doc.label}</p>
                      <FileImage className="w-4 h-4 text-white/50" />
                    </div>
                    <div className="aspect-video rounded-lg bg-black/30 border border-white/10 flex items-center justify-center overflow-hidden">
                      {doc.url ? (
                        <img
                          src={doc.url}
                          alt={doc.label}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center text-white/50 text-xs">
                          <p>No document uploaded yet</p>
                          <p className="text-[10px]">Placeholder will auto-update</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-white text-sm font-semibold mb-2">Notes</p>
                <textarea
                  placeholder="Add internal review notes (optional)"
                  className="w-full min-h-[96px] px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-sm"
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  className="px-4 py-2 rounded-lg bg-green-600/80 text-white text-sm font-semibold flex items-center gap-2 hover:bg-green-500 transition-all"
                  type="button"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Approve (placeholder)
                </button>
                <button
                  className="px-4 py-2 rounded-lg bg-red-600/80 text-white text-sm font-semibold flex items-center gap-2 hover:bg-red-500 transition-all"
                  type="button"
                >
                  <ShieldX className="w-4 h-4" />
                  Reject (placeholder)
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-400 text-sm">Select a user to review KYC documents.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default KycReview;
