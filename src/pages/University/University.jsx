import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import useFetch from "../../hooks/useFetch";

const University = () => {
  const navigate = useNavigate();
  const { data: universities, loading, error } = useFetch("/universities");

  const handleSelect = (id) => {
    navigate(`/courses?universityId=${id}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#020202] text-white">
      <Navbar />

      <main className="flex-grow pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-in fade-in slide-in-from-top-4 duration-700">
            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
              Select Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">University</span>
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Choose your academic institution to access tailored syllabus, previous year papers, and premium notes.
            </p>
          </div>

          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-64 bg-gray-900/50 border border-gray-800 rounded-[2rem] animate-pulse" />
              ))}
            </div>
          )}

          {error && (
            <div className="p-8 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-center">
              {error}
            </div>
          )}

          {!loading && universities?.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {universities.map((uni, index) => (
                <button
                  key={uni._id}
                  onClick={() => handleSelect(uni._id)}
                  className="group relative p-8 bg-gray-900/40 border border-gray-800 rounded-[2.5rem] text-left hover:border-blue-500/30 hover:bg-gray-800/40 transition-all duration-500 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-8 shadow-2xl"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform">
                      {uni.logo || "🏫"}
                    </div>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                      {uni.name}
                    </h3>
                    <p className="text-gray-500 text-sm mb-6">
                      {uni.city} • {uni.description}
                    </p>
                    <div className="flex items-center text-xs font-bold text-blue-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all">
                      View Courses
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {!loading && universities?.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-6">🏜️</div>
              <h3 className="text-xl font-bold text-gray-400">No universities found.</h3>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default University;

