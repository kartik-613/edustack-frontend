import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login, devLogin } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDevLogin = (role) => {
    devLogin(role);
    if (role === "admin") navigate("/admin");
    else if (role === "teacher") navigate("/teacher");
    else navigate("/universities");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email || !password) {
      setError("Please fill all fields");
      setLoading(false);
      return;
    }

    try {
      const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      login(data.token, data.user);

      if (data.user.role === "admin") navigate("/admin");
      else if (data.user.role === "teacher") navigate("/teacher");
      else navigate("/universities");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#020202] text-gray-900 dark:text-white transition-colors duration-300">
      <Navbar />
      <section className="flex-1 flex items-center justify-center px-6 py-24 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-1/4 -right-20 w-72 h-72 bg-blue-500/10 dark:bg-blue-500/5 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-1/4 -left-20 w-72 h-72 bg-indigo-500/10 dark:indigo-500/5 blur-[100px] rounded-full"></div>

        <div className="bg-gray-50 dark:bg-gray-900/40 backdrop-blur-2xl border border-gray-200 dark:border-gray-800 rounded-[2.5rem] p-8 sm:p-12 w-full max-w-md shadow-2xl relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black mb-2 tracking-tight">
              Welcome <span className="text-blue-600 dark:text-blue-500">Back</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 font-medium">Login to your EduStack account</p>
          </div>

          {error && <p className="text-red-500 mb-8 bg-red-500/10 p-4 rounded-2xl border border-red-500/20 text-sm font-medium text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="admin@edustack.com"
                className="w-full px-5 py-4 rounded-2xl bg-white dark:bg-gray-800/50 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 transition-all shadow-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full px-5 py-4 rounded-2xl bg-white dark:bg-gray-800/50 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 transition-all shadow-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-4 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black tracking-wide transition-all transform active:scale-95 shadow-xl shadow-blue-500/20 disabled:opacity-50"
            >
              {loading ? "AUTHENTICATING..." : "SIGN IN"}
            </button>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
            </div>
            <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest">
              <span className="bg-gray-50 dark:bg-gray-900 px-4 text-gray-400 dark:text-gray-500">Fast Access</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <button onClick={() => handleDevLogin("student")} className="py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-[10px] font-black uppercase tracking-wider hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm">Student</button>
            <button onClick={() => handleDevLogin("teacher")} className="py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-[10px] font-black uppercase tracking-wider hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm">Teacher</button>
            <button onClick={() => handleDevLogin("admin")} className="py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-[10px] font-black uppercase tracking-wider hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm">Admin</button>
          </div>

          <div className="flex justify-between mt-10 text-gray-500 dark:text-gray-400 text-sm font-medium">
            <button
              onClick={() => navigate("/forgot-password")}
              className="hover:text-blue-600 dark:hover:text-white transition"
            >
              Forgot Password?
            </button>
            <button
              onClick={() => navigate("/register")}
              className="text-blue-600 dark:text-blue-500 font-black hover:underline"
            >
              Create Account
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Login;
