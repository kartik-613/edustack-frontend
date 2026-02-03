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
    <div className="min-h-screen flex flex-col bg-[#050505] text-white">
      <Navbar />

      <main className="flex-grow pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">{user?.name}</span>
            </h1>
            <p className="text-gray-500">Teacher Overview & Content Management</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {stats.map((stat) => (
              <div key={stat.label} className="p-6 bg-gray-900/50 border border-gray-800 rounded-2xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm font-medium">{stat.label}</span>
                  <span className="text-xl">{stat.icon}</span>
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Action Sections */}
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            Management Tools
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sections.map((item) => (
              <div
                key={item.key}
                onClick={() => navigate(`/teacher/${item.key}`)}
                className="group relative bg-gray-900 border border-gray-800 rounded-3xl p-8 cursor-pointer overflow-hidden transition-all hover:border-blue-500/50 hover:bg-gray-800/80"
              >
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-gray-800 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
                {/* Subtle background glow */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full group-hover:bg-blue-500/10 transition-colors"></div>
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

