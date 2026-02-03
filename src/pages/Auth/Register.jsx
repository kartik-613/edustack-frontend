import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!name || !email || !password) {
      setError("Please fill all fields");
      setLoading(false);
      return;
    }

    try {
      const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const response = await fetch(`${baseUrl}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      alert("Account created successfully. Please login.");
      navigate("/login");
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
        <div className="absolute bottom-1/4 -left-20 w-72 h-72 bg-indigo-500/10 dark:bg-indigo-500/5 blur-[100px] rounded-full"></div>

        <div className="bg-gray-50 dark:bg-gray-900/40 backdrop-blur-2xl border border-gray-200 dark:border-gray-800 rounded-[2.5rem] p-8 sm:p-12 w-full max-w-md shadow-2xl relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black mb-2 tracking-tight">
              Create <span className="text-blue-600 dark:text-blue-500">Account</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 font-medium">Join the EduStack learning platform</p>
          </div>

          {error && <p className="text-red-500 mb-8 bg-red-500/10 p-4 rounded-2xl border border-red-500/20 text-sm font-medium text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
              <input
                type="text"
                required
                placeholder="John Doe"
                className="w-full px-5 py-3.5 rounded-2xl bg-white dark:bg-gray-800/50 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 transition-all shadow-sm"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="john@example.com"
                className="w-full px-5 py-3.5 rounded-2xl bg-white dark:bg-gray-800/50 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 transition-all shadow-sm"
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
                className="w-full px-5 py-3.5 rounded-2xl bg-white dark:bg-gray-800/50 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 transition-all shadow-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Account Type</label>
              <div className="relative">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-2xl bg-white dark:bg-gray-800/50 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 transition-all shadow-sm appearance-none cursor-pointer"
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="admin">Admin (Restricted)</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-4 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black tracking-wide transition-all transform active:scale-95 shadow-xl shadow-blue-500/20 disabled:opacity-50"
            >
              {loading ? "PROCESSING..." : "CREATE ACCOUNT"}
            </button>
          </form>

          <div className="mt-10 text-gray-500 dark:text-gray-400 text-sm font-medium text-center">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-blue-600 dark:text-blue-500 font-black hover:underline"
            >
              Log In
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Register;
