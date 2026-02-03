import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import useFetch from "../../hooks/useFetch";

const University = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const { data: universities, loading, error } = useFetch("/universities");

  const filteredUniversities = useMemo(() => {
    if (!universities) return [];
    return universities.filter(
      (uni) =>
        uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        uni.city.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [universities, searchQuery]);

  const handleSelect = (id) => {
    navigate(`/courses?universityId=${id}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#020202] text-gray-900 dark:text-white transition-colors">
      <Navbar />

      <main className="flex-grow pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-in fade-in slide-in-from-top-4 duration-700">
            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
              Select Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">University</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Choose your academic institution to access tailored syllabus, previous year papers, and premium notes.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-16 relative group animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 blur-xl group-hover:blur-2xl transition-all duration-500 opacity-50"></div>
            <div className="relative flex items-center bg-gray-50/50 dark:bg-gray-900/40 backdrop-blur-2xl border border-gray-200 dark:border-gray-800 group-hover:border-blue-500/50 rounded-2xl p-2 transition-all duration-300">
              <div className="flex-1 flex items-center px-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search by University name or city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-none focus:ring-0 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 px-4 py-3 text-lg font-medium"
                />
              </div>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-xl transition-colors mr-2 text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-64 bg-gray-100 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-[2rem] animate-pulse" />
              ))}
            </div>
          )}

          {error && (
            <div className="p-8 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-center">
              {error}
            </div>
          )}

          {!loading && filteredUniversities?.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredUniversities.map((uni, index) => (
                <button
                  key={uni._id}
                  onClick={() => handleSelect(uni._id)}
                  className="group relative p-8 bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 rounded-[2.5rem] text-left hover:border-blue-500/30 hover:bg-gray-100 dark:hover:bg-gray-800/40 transition-all duration-500 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-8 shadow-sm dark:shadow-2xl"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-inner rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 group-hover:border-blue-500/30 transition-all">
                      {uni.logo || "🏫"}
                    </div>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {uni.name}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                      {uni.city} • {uni.description}
                    </p>
                    <div className="flex items-center text-xs font-bold text-blue-600 dark:text-blue-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all">
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

          {!loading && filteredUniversities?.length === 0 && (
            <div className="text-center py-20 bg-gray-50 dark:bg-gray-900/10 border border-dashed border-gray-200 dark:border-gray-800 rounded-[3rem] animate-in fade-in slide-in-from-bottom-4">
              <div className="text-6xl mb-6 opacity-30">🏜️</div>
              <h3 className="text-xl font-bold text-gray-400 dark:text-gray-500">No results found for "{searchQuery}"</h3>
              <p className="text-gray-400 dark:text-gray-600 mt-2">Try searching with a different university name or city.</p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-8 px-6 py-2 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold transition-colors shadow-sm"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default University;

