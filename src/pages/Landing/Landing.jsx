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
      <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 pt-24 px-4">
        <div className="max-w-4xl text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
            Your Academic Journey,
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              All in One Platform
            </span>
          </h1>

          <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
            Access university-wise syllabus, previous year question papers,
            answers and notes — built for students and teachers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/universities")}
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg shadow-blue-900/20"
            >
              Get Started
            </button>
            <button className="px-8 py-3 border border-gray-700 text-gray-300 font-semibold rounded-xl hover:bg-gray-800 transition-all">
              Learn More
            </button>
          </div>
        </div>

        {/* DEV LOGIN PANEL */}
        {!isAuthenticated && (
          <div className="mt-8 p-6 bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl w-full max-w-2xl">
            <h2 className="text-gray-300 text-sm font-medium uppercase tracking-wider mb-4 text-center">
              Developer Access (Bypass Auth)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                onClick={() => handleDevLogin("student")}
                className="flex flex-col items-center p-4 bg-gray-800/50 border border-gray-700 rounded-xl hover:border-blue-500 hover:bg-gray-800 transition-all"
              >
                <div className="w-10 h-10 bg-blue-500/10 text-blue-500 flex items-center justify-center rounded-lg mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <span className="text-white font-medium">Student</span>
                <span className="text-gray-500 text-xs mt-1">Free Access + PYQs</span>
              </button>

              <button
                onClick={() => handleDevLogin("teacher")}
                className="flex flex-col items-center p-4 bg-gray-800/50 border border-gray-700 rounded-xl hover:border-purple-500 hover:bg-gray-800 transition-all"
              >
                <div className="w-10 h-10 bg-purple-500/10 text-purple-500 flex items-center justify-center rounded-lg mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <span className="text-white font-medium">Teacher</span>
                <span className="text-gray-500 text-xs mt-1">Full Premium Access</span>
              </button>

              <button
                onClick={() => handleDevLogin("admin")}
                className="flex flex-col items-center p-4 bg-gray-800/50 border border-gray-700 rounded-xl hover:border-amber-500 hover:bg-gray-800 transition-all"
              >
                <div className="w-10 h-10 bg-amber-500/10 text-amber-500 flex items-center justify-center rounded-lg mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span className="text-white font-medium">Admin</span>
                <span className="text-gray-500 text-xs mt-1">Platform Management</span>
              </button>
            </div>
          </div>
        )}
      </section>

      {/* FEATURES */}
      <section className="bg-black py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Why Choose EduStack?</h2>
            <p className="text-gray-400">Everything you need to excel in your university exams.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Free Access",
                desc: "Browse syllabus and PYQs without any cost. Get insights into your exam patterns.",
                icon: "📚"
              },
              {
                title: "Premium Content",
                desc: "Unlock expert-crafted answers and detailed notes with a flexible subscription.",
                icon: "💎"
              },
              {
                title: "Structured Flow",
                desc: "Find exactly what you need with our intuitive University → Course hierarchy.",
                icon: "🎯"
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 hover:bg-gray-900 transition-all group"
              >
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h3 className="text-white font-bold text-xl mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
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

