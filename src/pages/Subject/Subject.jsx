import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import useFetch from "../../hooks/useFetch";

const Subject = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const universityId = searchParams.get("universityId");
  const courseId = searchParams.get("courseId");
  const branchId = searchParams.get("branchId");
  const semesterId = searchParams.get("semesterId");

  const { data: subjects, loading, error } = useFetch(
    `/subjects?universityId=${universityId}&courseId=${courseId}&branchId=${branchId}&semesterId=${semesterId}`,
    [universityId, courseId, branchId, semesterId]
  );

  const handleSelectSubject = (subject) => {
    navigate(
      `/content?universityId=${universityId}&courseId=${courseId}&branchId=${branchId}&semesterId=${semesterId}&subjectId=${subject._id}`
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#020202] text-white">
      <Navbar />

      <main className="flex-grow pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-16 animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="flex items-center gap-2 text-gray-500 mb-6 text-[10px] font-bold uppercase tracking-widest">
              <button onClick={() => navigate("/universities")} className="hover:text-white transition-colors">Universities</button>
              <span>/</span>
              <button onClick={() => navigate(`/branches?universityId=${universityId}&courseId=${courseId}`)} className="hover:text-white transition-colors">Branch</button>
              <span>/</span>
              <button onClick={() => navigate(`/semesters?universityId=${universityId}&courseId=${courseId}&branchId=${branchId}`)} className="hover:text-white transition-colors">Semester</button>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
              Select <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">Subject</span>
            </h1>
            <p className="text-gray-500 text-lg">
              Unlock syllabus, papers, and notes for your core academic subjects.
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
              Failed to load subjects
            </div>
          )}

          {!loading && subjects?.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {subjects.map((subject, index) => (
                <button
                  key={subject._id}
                  onClick={() => handleSelectSubject(subject)}
                  className="group relative p-8 bg-gray-900/40 border border-gray-800 rounded-[2.5rem] text-left hover:border-blue-500/30 hover:bg-gray-800/40 transition-all duration-500 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-8 shadow-2xl"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-8">
                      <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                        📚
                      </div>
                      <span className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-full font-black uppercase tracking-widest">
                        {subject.code || "SUB"}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                      {subject.name}
                    </h3>
                    <p className="text-gray-500 text-sm mb-6 uppercase font-bold tracking-widest">
                      Subject Theory & Lab
                    </p>
                    <div className="flex items-center text-xs font-bold text-blue-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all">
                      Access Content
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
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

export default Subject;

