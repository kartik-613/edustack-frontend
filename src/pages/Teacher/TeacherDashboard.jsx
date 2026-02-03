import React, { useContext } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const stats = [
    { label: "Uploaded Content", value: "24", icon: "📄" },
    { label: "Student Views", value: "1.2k", icon: "👁️" },
    { label: "Approval Status", value: "Pending (2)", icon: "⏳" },
  ];

  const sections = [
    { name: "Syllabus", key: "syllabus", icon: "📖", color: "blue", desc: "Manage academic curriculum" },
    { name: "PYQs", key: "pyqs", icon: "📝", color: "purple", desc: "Previous year question papers" },
    { name: "Answers", key: "answers", icon: "✅", color: "green", desc: "Solved paper solutions" },
    { name: "Notes", key: "notes", icon: "💡", color: "amber", desc: "Handwritten & digital notes" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#020202] text-gray-900 dark:text-white transition-colors duration-300">
      <Navbar />

      <main className="flex-grow pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-16 animate-in fade-in slide-in-from-top-4 duration-700">
            <h1 className="text-4xl font-black mb-3 tracking-tight">
              Welcome back, <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-500">{user?.name}</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 font-medium text-lg">Teacher Overview & Content Management</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16 relative z-10">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="p-8 bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800 rounded-[2.5rem] shadow-sm transform hover:-translate-y-1 transition-all animate-in fade-in slide-in-from-bottom-4 duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-gray-400 dark:text-gray-500 text-[10px] font-black uppercase tracking-widest">{stat.label}</span>
                  <span className="text-2xl bg-white dark:bg-gray-800 p-3 rounded-2xl shadow-sm">{stat.icon}</span>
                </div>
                <div className="text-3xl font-black tracking-tight">{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Action Sections */}
          <div className="flex items-center gap-4 mb-10">
            <div className="w-1.5 h-8 bg-purple-600 dark:bg-purple-500 rounded-full"></div>
            <h2 className="text-2xl font-black tracking-tight">Management Tools</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {sections.map((item, index) => (
              <div
                key={item.key}
                onClick={() => navigate(`/teacher/${item.key}`)}
                className="group relative bg-gray-50 dark:bg-gray-900/20 border border-gray-200 dark:border-gray-800 rounded-[2.5rem] p-10 cursor-pointer overflow-hidden transition-all hover:bg-white dark:hover:bg-gray-800/80 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5 animate-in fade-in slide-in-from-bottom-8 duration-500"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-sm">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-black mb-2 tracking-tight">{item.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-relaxed">{item.desc}</p>
                </div>
                {/* Subtle background glow */}
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-blue-500/5 blur-[80px] rounded-full group-hover:bg-blue-500/10 transition-colors"></div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TeacherDashboard;
