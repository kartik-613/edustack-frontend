import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import useFetch from "../../hooks/useFetch";

const AdminUsers = () => {
  const navigate = useNavigate();
  const { data: users, loading, error } = useFetch("/admin/users");

  const getRoleBadge = (role) => {
    switch (role?.toLowerCase()) {
      case "admin": return "bg-red-500/10 text-red-500 border-red-500/20";
      case "teacher": return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      default: return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-white">
      <Navbar />

      <main className="flex-grow pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12 animate-in fade-in slide-in-from-left-4 duration-700">
            <button
              onClick={() => navigate("/admin")}
              className="group flex items-center text-gray-500 hover:text-white transition-colors mb-6 text-sm font-bold uppercase tracking-widest"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
              Command Center
            </button>
            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
              User <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Directory</span>
            </h1>
            <p className="text-gray-500 text-lg">Detailed overview and control of all registered platform users.</p>
          </div>

          {loading && (
            <div className="p-12 bg-gray-900/50 border border-gray-800 rounded-[2.5rem] animate-pulse">
              <div className="h-8 bg-gray-800 rounded mb-4 w-1/4"></div>
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-12 bg-gray-800 rounded opacity-50"></div>
                ))}
              </div>
            </div>
          )}

          {error && (
            <div className="p-8 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-center">
              Failed to load user list
            </div>
          )}

          {!loading && users?.length > 0 && (
            <div className="bg-gray-900/40 border border-gray-800 rounded-[2.5rem] overflow-hidden shadow-2xl backdrop-blur-xl animate-in fade-in scale-in duration-500">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-800/50 bg-gray-800/20">
                      <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-500">User Identification</th>
                      <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Email Address</th>
                      <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Account Role</th>
                      <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Subscription</th>
                      <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/50">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-800/30 transition-colors group">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center font-bold text-gray-400 group-hover:text-white transition-colors">
                              {user.name?.charAt(0)}
                            </div>
                            <span className="font-bold text-gray-200">{user.name}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-gray-400 text-sm">{user.email}</td>
                        <td className="px-8 py-6">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getRoleBadge(user.role)}`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${user.subscription ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" : "bg-gray-600"}`}></div>
                            <span className={`text-xs font-bold ${user.subscription ? "text-emerald-500" : "text-gray-500"}`}>
                              {user.subscription ? "Premium Active" : "Free Tier"}
                            </span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <button className="text-gray-500 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {!loading && users?.length === 0 && (
            <div className="text-center py-20 bg-gray-900/10 border border-dashed border-gray-800 rounded-[2.5rem]">
              <h3 className="text-xl font-bold text-gray-400">No users found.</h3>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminUsers;
