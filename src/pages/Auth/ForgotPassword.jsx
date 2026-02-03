import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setMessage(`Password reset link sent to ${email}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#020202] text-gray-900 dark:text-white transition-colors duration-300">
      <Navbar />
      <section className="flex-1 flex items-center justify-center px-6 py-24 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-1/4 -right-20 w-72 h-72 bg-blue-500/10 dark:bg-blue-500/5 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-1/4 -left-20 w-72 h-72 bg-indigo-500/10 dark:bg-indigo-500/5 blur-[100px] rounded-full"></div>

        <div className="bg-gray-50 dark:bg-gray-900/40 backdrop-blur-2xl border border-gray-200 dark:border-gray-800 rounded-[2.5rem] p-8 sm:p-12 w-full max-w-md shadow-2xl relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700 text-center">
          <h1 className="text-3xl font-black mb-2 tracking-tight">
            Forgot <span className="text-blue-600 dark:text-blue-500">Password?</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium mb-10">We'll help you get back to your account</p>

          {message && (
            <div className="mb-8 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl text-green-600 dark:text-green-500 text-sm font-bold">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="space-y-2 text-left">
              <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="Enter your registered email"
                className="w-full px-5 py-4 rounded-2xl bg-white dark:bg-gray-800/50 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 transition-all shadow-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="mt-4 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black tracking-wide transition-all transform active:scale-95 shadow-xl shadow-blue-500/20"
            >
              SEND RESET LINK
            </button>
          </form>

          <div className="mt-10 text-gray-500 dark:text-gray-400 text-sm font-medium">
            Remember your password?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-blue-600 dark:text-blue-500 font-black hover:underline"
            >
              Login Now
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
