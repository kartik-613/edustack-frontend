import React, { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import useFetch from "../../hooks/useFetch";

const Course = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const searchParams = new URLSearchParams(location.search);
  const universityId = searchParams.get("universityId");

  const { data: courses, loading, error } = useFetch(
    `/courses?universityId=${universityId}`,
    [universityId]
  );

  const filteredCourses = useMemo(() => {
    if (!courses) return [];
    return courses.filter(
      (course) =>
        course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [courses, searchQuery]);

  const handleSelectCourse = (course) => {
    navigate(`/branches?universityId=${universityId}&courseId=${course._id}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#020202] text-gray-900 dark:text-white transition-colors">
      <Navbar />

      <main className="flex-grow pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-16 animate-in fade-in slide-in-from-top-4 duration-700">
            <button
              onClick={() => navigate("/universities")}
              className="group flex items-center text-gray-400 hover:text-blue-600 dark:text-gray-500 dark:hover:text-white transition-colors mb-6 text-sm font-bold uppercase tracking-widest"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
              Universities
            </button>
            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
              Select Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">Course</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Explore available degree programs and specializations.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-12 relative group animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 blur-xl group-hover:blur-2xl transition-all duration-500 opacity-50"></div>
            <div className="relative flex items-center bg-gray-50/50 dark:bg-gray-900/40 backdrop-blur-2xl border border-gray-200 dark:border-gray-800 group-hover:border-blue-500/50 rounded-2xl p-1.5 transition-all duration-300">
              <div className="flex-1 flex items-center px-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Find your course..."
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-48 bg-gray-100 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-3xl animate-pulse" />
              ))}
            </div>
          )}

          {error && (
            <div className="p-8 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-center">
              Failed to load courses
            </div>
          )}

          {!loading && filteredCourses?.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course, index) => (
                <button
                  key={course._id}
                  onClick={() => handleSelectCourse(course)}
                  className="group p-8 bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 rounded-[2rem] text-left hover:border-blue-500/30 hover:bg-gray-100 dark:hover:bg-gray-800/40 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 shadow-sm dark:shadow-xl"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform shadow-inner">
                      🎓
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-md border border-gray-200 dark:border-gray-700">
                      {course.duration}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {course.name}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {course.description}
                  </p>
                </button>
              ))}
            </div>
          )}

          {!loading && filteredCourses?.length === 0 && (
            <div className="text-center py-16 bg-gray-50 dark:bg-gray-900/10 border border-dashed border-gray-200 dark:border-gray-800 rounded-[2.5rem] animate-in fade-in slide-in-from-bottom-4">
              <div className="text-5xl mb-6 opacity-30">🎓</div>
              <h3 className="text-lg font-bold text-gray-400 dark:text-gray-500">No courses match "{searchQuery}"</h3>
              <p className="text-sm text-gray-400 dark:text-gray-600 mt-2">Try searching with a broader keyword.</p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-6 px-5 py-2 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-bold transition-colors shadow-sm"
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

export default Course;

