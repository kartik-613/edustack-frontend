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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-black via-gray-900 to-gray-800">
      <Navbar />
      <section className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 sm:p-12 w-full max-w-md shadow-2xl text-center">
          <h1 className="text-3xl font-extrabold text-white mb-6">
            Forgot <span className="text-gray-300">Password</span>
          </h1>

          {message && <p className="text-green-500 mb-4">{message}</p>}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-gray-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              type="submit"
              className="mt-4 py-2 rounded-lg bg-gray-400 hover:bg-gray-300 text-white font-semibold transition"
            >
              Send Reset Link
            </button>
          </form>

          <div className="mt-4 text-gray-400 text-sm">
            Remember your password?{" "}
            <button
              onClick={() => navigate("/login")}
              className="hover:text-white transition"
            >
              Login
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
