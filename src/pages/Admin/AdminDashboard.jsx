import React, { useContext } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const globalStats = [
    { label: "Total Users", value: "1,280", delta: "+12%", icon: "👥" },
    { label: "Total Revenue", value: "₹45,200", delta: "+5%", icon: "💰" },
    { label: "Active Subs", value: "320", delta: "+8%", icon: "🎫" },
    { label: "Pending Approvals", value: "14", icon: "🕒" },
  ];

  const adminTools = [
    { name: "User Management", key: "users", icon: "👤", desc: "View and manage all platform users" },
    { name: "Content Moderation", key: "content", icon: "🛡️", desc: "Review and approve academic content" },
    { name: "Subscriptions", key: "subscriptions", icon: "💳", desc: "Manage billing and plans" },
    { name: "University List", key: "universities", icon: "🏫", desc: "Edit university and course data" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#020202] text-white">
      <Navbar />

      <main className="flex-grow pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Systems Control</h1>
              <p className="text-gray-500 font-medium">Platform Administration & Analytics</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-xl">
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
              <span className="text-amber-500 text-sm font-bold uppercase tracking-widest">Admin Access Restricted</span>
            </div>
          </div>

          {/* KPI Dashboard */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {globalStats.map((stat) => (
              <div key={stat.label} className="p-6 bg-gray-900/40 border border-gray-800/50 rounded-3xl backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center text-xl">
                    {stat.icon}
                  </div>
                  {stat.delta && (
                    <span className="text-emerald-500 text-xs font-bold px-2 py-1 bg-emerald-500/10 rounded-lg">
                      {stat.delta}
                    </span>
                  )}
                </div>
                <div className="text-gray-500 text-sm mb-1">{stat.label}</div>
                <div className="text-2xl font-bold">{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Admin Command Center */}
          <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
            <span className="p-1 bg-blue-500/20 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </span>
            Command Center
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {adminTools.map((tool) => (
              <div
                key={tool.key}
                onClick={() => navigate(`/admin/${tool.key}`)}
                className="group flex items-center gap-6 p-6 bg-gray-900/40 border border-gray-800/50 rounded-3xl cursor-pointer hover:bg-gray-800/60 hover:border-blue-500/30 transition-all shadow-xl"
              >
                <div className="flex-shrink-0 w-16 h-16 bg-gray-800 group-hover:bg-blue-500/10 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-all duration-300">
                  {tool.icon}
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-bold group-hover:text-blue-400 transition-colors">{tool.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{tool.desc}</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;

