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
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#020202] text-gray-900 dark:text-white transition-colors duration-300">
      <Navbar />

      <main className="flex-grow pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-6 animate-in fade-in slide-in-from-top-4 duration-700">
            <div>
              <h1 className="text-4xl font-black mb-2 tracking-tight">Systems Control</h1>
              <p className="text-gray-500 dark:text-gray-400 font-medium text-lg">Platform Administration & Analytics</p>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl shadow-sm">
              <span className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.5)]"></span>
              <span className="text-amber-600 dark:text-amber-500 text-[10px] font-black uppercase tracking-[0.2em]">Admin Access Restricted</span>
            </div>
          </div>

          {/* KPI Dashboard */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20 relative z-10">
            {globalStats.map((stat, index) => (
              <div
                key={stat.label}
                className="p-8 bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800 rounded-[2.5rem] shadow-sm transform hover:-translate-y-1 transition-all animate-in fade-in slide-in-from-bottom-4 duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center text-2xl shadow-sm">
                    {stat.icon}
                  </div>
                  {stat.delta && (
                    <span className="text-emerald-600 dark:text-emerald-500 text-[10px] font-black px-3 py-1.5 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                      {stat.delta}
                    </span>
                  )}
                </div>
                <div className="text-gray-500 dark:text-gray-400 text-[10px] font-black uppercase tracking-widest mb-2">{stat.label}</div>
                <div className="text-3xl font-black tracking-tight">{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Admin Command Center */}
          <div className="flex items-center gap-4 mb-10">
            <div className="w-1.5 h-8 bg-blue-600 dark:bg-blue-500 rounded-full"></div>
            <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
              Command Center
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            {adminTools.map((tool, index) => (
              <div
                key={tool.key}
                onClick={() => navigate(`/admin/${tool.key}`)}
                className="group flex items-center gap-8 p-8 bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800 rounded-[2.5rem] cursor-pointer hover:bg-white dark:hover:bg-gray-800 transition-all shadow-sm hover:shadow-xl hover:shadow-blue-500/5 animate-in fade-in slide-in-from-bottom-8 duration-500"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex-shrink-0 w-20 h-20 bg-white dark:bg-gray-800 rounded-[1.5rem] flex items-center justify-center text-4xl shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  {tool.icon}
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-black mb-2 tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors uppercase">{tool.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">{tool.desc}</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500 pr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
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
