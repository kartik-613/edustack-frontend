import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { AuthContext } from "../../context/AuthContext";

const Landing = () => {
  const { devLogin, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleDevLogin = (role) => {
    devLogin(role);
    if (role === "admin") navigate("/admin");
    else if (role === "teacher") navigate("/teacher");
    else navigate("/universities");
  };

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#020202] text-gray-900 dark:text-white pt-24 px-6 transition-colors duration-300 relative overflow-hidden">
        {/* Background Blur Orbs */}
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-500/10 dark:bg-blue-500/5 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-purple-500/10 dark:bg-purple-500/5 blur-[100px] rounded-full"></div>

        <div className="max-w-4xl text-center mb-16 relative z-10 animate-in fade-in slide-in-from-top-8 duration-1000">
          <h1 className="text-5xl sm:text-7xl font-black mb-8 tracking-tighter leading-[1.1]">
            Your Academic Journey,
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
              In One Premium Hub
            </span>
          </h1>

          <p className="text-gray-500 dark:text-gray-400 text-lg sm:text-xl mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            Access university-wise syllabus, curated previous year papers,
            model answers, and expert-crafted notes — meticulously built for excellence.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={() => navigate("/universities")}
              className="px-10 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all transform hover:scale-105 shadow-xl shadow-blue-500/20"
            >
              Start Learning Now
            </button>
            <button className="px-10 py-4 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 font-bold rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-all">
              Explore Library
            </button>
          </div>
        </div>

        {/* DEV LOGIN PANEL */}
        {!isAuthenticated && (
          <div className="mt-8 p-8 bg-gray-50 dark:bg-gray-900/40 backdrop-blur-2xl border border-gray-200 dark:border-gray-800 rounded-[2.5rem] w-full max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 relative z-10 shadow-2xl shadow-black/5">
            <h2 className="text-gray-400 dark:text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-8 text-center">
              Developer Quick Access
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <button
                onClick={() => handleDevLogin("student")}
                className="flex flex-col items-center p-6 bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-2xl hover:border-blue-500 dark:hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/5 transition-all group"
              >
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-500 flex items-center justify-center rounded-xl mb-4 group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <span className="text-gray-900 dark:text-white font-bold">Student</span>
                <span className="text-gray-400 text-[10px] mt-1 text-center">Free Tools + PYQs</span>
              </button>

              <button
                onClick={() => handleDevLogin("teacher")}
                className="flex flex-col items-center p-6 bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-2xl hover:border-purple-500 dark:hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/5 transition-all group"
              >
                <div className="w-12 h-12 bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-500 flex items-center justify-center rounded-xl mb-4 group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <span className="text-gray-900 dark:text-white font-bold">Teacher</span>
                <span className="text-gray-400 text-[10px] mt-1 text-center">Premium Access</span>
              </button>

              <button
                onClick={() => handleDevLogin("admin")}
                className="flex flex-col items-center p-6 bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-2xl hover:border-amber-500 dark:hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/5 transition-all group"
              >
                <div className="w-12 h-12 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-500 flex items-center justify-center rounded-xl mb-4 group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span className="text-gray-900 dark:text-white font-bold">Admin</span>
                <span className="text-gray-400 text-[10px] mt-1 text-center">Full Management</span>
              </button>
            </div>
          </div>
        )}
      </section>

      {/* FEATURES */}
      <section className="bg-gray-50 dark:bg-black py-24 px-6 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black mb-4 tracking-tight">Why <span className="text-blue-600 dark:text-blue-500">EduStack?</span></h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">Everything you need to excel in your university exams, curated and delivered in a premium experience.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Free Access",
                desc: "Browse comprehensive syllabus and 5+ years of PYQs without any cost. Precise pattern analysis at your fingertips.",
                icon: "📚"
              },
              {
                title: "Premium Content",
                desc: "Unlock expert-crafted step-by-step solutions and high-quality study notes with affordable premium plans.",
                icon: "💎"
              },
              {
                title: "University Hierarchy",
                desc: "Navigate through 50+ MP Universities with an intuitive structure built for speed and clarity.",
                icon: "🎯"
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-900 rounded-[2rem] p-10 hover:border-blue-500/20 dark:hover:border-blue-500/10 hover:shadow-2xl hover:shadow-black/[0.02] dark:hover:shadow-white/[0.02] transition-all group"
              >
                <div className="text-5xl mb-8 group-hover:scale-110 transform transition-all duration-500">{item.icon}</div>
                <h3 className="text-gray-900 dark:text-white font-black text-2xl mb-4 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Landing;

