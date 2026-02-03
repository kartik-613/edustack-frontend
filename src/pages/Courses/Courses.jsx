import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import useFetch from "../../hooks/useFetch";

const Course = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const universityId = searchParams.get("universityId");

  const { data: courses, loading, error } = useFetch(
    `/courses?universityId=${universityId}`,
    [universityId]
  );

  const handleSelectCourse = (course) => {
    navigate(`/branches?universityId=${universityId}&courseId=${course._id}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#020202] text-white">
      <Navbar />

      <main className="flex-grow pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-16 animate-in fade-in slide-in-from-top-4 duration-700">
            <button
              onClick={() => navigate("/universities")}
              className="group flex items-center text-gray-500 hover:text-white transition-colors mb-6 text-sm font-bold uppercase tracking-widest"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
              Universities
            </button>
            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
              Select Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">Course</span>
            </h1>
            <p className="text-gray-500 text-lg">
              Explore available degree programs and specializations.
            </p>
          </div>

          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-48 bg-gray-900/50 border border-gray-800 rounded-3xl animate-pulse" />
              ))}
            </div>
          )}

          {error && (
            <div className="p-8 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-center">
              Failed to load courses
            </div>
          )}

          {!loading && courses?.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course, index) => (
                <button
                  key={course._id}
                  onClick={() => handleSelectCourse(course)}
                  className="group p-8 bg-gray-900/40 border border-gray-800 rounded-[2rem] text-left hover:border-blue-500/30 hover:bg-gray-800/40 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 shadow-xl"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                      🎓
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-gray-800 text-gray-400 rounded-md">
                      {course.duration}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                    {course.name}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {course.description}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Course;

