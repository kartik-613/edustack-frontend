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
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      <section className="flex-1 flex items-center justify-center px-4 py-24">
        <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 sm:p-12 w-full max-w-md shadow-2xl relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl -mr-16 -mt-16"></div>

          <h1 className="text-3xl font-bold text-white mb-2 text-center">
            Welcome Back
          </h1>
          <p className="text-gray-500 text-center mb-8">Login to your EduStack account</p>

          {error && <p className="text-red-500 mb-6 bg-red-500/10 p-3 rounded-xl border border-red-500/20 text-sm text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="admin@edustack.com"
                className="w-full px-4 py-3 rounded-xl bg-gray-800/50 text-white border border-gray-700 focus:outline-none focus:border-blue-500 transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-gray-800/50 text-white border border-gray-700 focus:outline-none focus:border-blue-500 transition-colors"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all transform active:scale-95 shadow-lg shadow-blue-900/20 disabled:opacity-50"
            >
              {loading ? "Authenticating..." : "Sign In"}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-800"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-gray-900 px-2 text-gray-500 font-bold">Development Bypass</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <button onClick={() => handleDevLogin("student")} className="py-2 bg-gray-800 border border-gray-700 rounded-lg text-[10px] font-bold uppercase hover:bg-gray-700 transition-colors">Student</button>
            <button onClick={() => handleDevLogin("teacher")} className="py-2 bg-gray-800 border border-gray-700 rounded-lg text-[10px] font-bold uppercase hover:bg-gray-700 transition-colors">Teacher</button>
            <button onClick={() => handleDevLogin("admin")} className="py-2 bg-gray-800 border border-gray-700 rounded-lg text-[10px] font-bold uppercase hover:bg-gray-700 transition-colors">Admin</button>
          </div>

          <div className="flex justify-between mt-8 text-gray-400 text-sm">
            <button
              onClick={() => navigate("/forgot-password")}
              className="hover:text-white transition"
            >
              Forgot Password?
            </button>
            <button
              onClick={() => navigate("/register")}
              className="text-blue-500 font-bold hover:text-blue-400 transition"
            >
              Sign Up
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Login;
