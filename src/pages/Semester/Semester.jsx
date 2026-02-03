import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import useFetch from "../../hooks/useFetch";

const Semester = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const universityId = searchParams.get("universityId");
  const courseId = searchParams.get("courseId");
  const branchId = searchParams.get("branchId");

  const { data: semesters, loading, error } = useFetch(
    `/semesters?universityId=${universityId}&courseId=${courseId}&branchId=${branchId}`,
    [universityId, courseId, branchId]
  );

  const handleSelectSemester = (semester) => {
    navigate(
      `/subjects?universityId=${universityId}&courseId=${courseId}&branchId=${branchId}&semesterId=${semester._id}`
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
              <button onClick={() => navigate(`/courses?universityId=${universityId}`)} className="hover:text-white transition-colors">Courses</button>
              <span>/</span>
              <button onClick={() => navigate(`/branches?universityId=${universityId}&courseId=${courseId}`)} className="hover:text-white transition-colors">Branch</button>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
              Select <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">Semester</span>
            </h1>
            <p className="text-gray-500 text-lg">
              Choose your current semester to view specific subjects and materials.
            </p>
          </div>

          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-32 bg-gray-900/50 border border-gray-800 rounded-[2rem] animate-pulse" />
              ))}
            </div>
          )}

          {error && (
            <div className="p-8 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-center">
              Failed to load semesters
            </div>
          )}

          {!loading && semesters?.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {semesters.map((semester, index) => (
                <button
                  key={semester._id}
                  onClick={() => handleSelectSemester(semester)}
                  className="group p-6 bg-gray-900/40 border border-gray-800 rounded-3xl text-center hover:border-blue-500/30 hover:bg-gray-800/40 transition-all duration-300 animate-in fade-in scale-in duration-500 shadow-lg hover:shadow-blue-500/5"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="text-3xl mb-4 group-hover:scale-125 transition-transform duration-500">
                    🗓️
                  </div>
                  <h3 className="text-lg font-bold group-hover:text-blue-400 transition-colors">
                    {semester.name}
                  </h3>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">
                    Academic Term
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

export default Semester;

