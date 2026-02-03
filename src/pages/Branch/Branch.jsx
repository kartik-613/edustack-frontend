import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import useFetch from "../../hooks/useFetch";

const Branch = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const universityId = searchParams.get("universityId");
  const courseId = searchParams.get("courseId");

  const { data: branches, loading, error } = useFetch(
    `/branches?universityId=${universityId}&courseId=${courseId}`,
    [universityId, courseId]
  );

  const handleSelectBranch = (branch) => {
    navigate(
      `/semesters?universityId=${universityId}&courseId=${courseId}&branchId=${branch._id}`
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
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
              Select Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">Branch</span>
            </h1>
            <p className="text-gray-500 text-lg">
              Choose your engineering department or specialization.
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
              Failed to load branches
            </div>
          )}

          {!loading && branches?.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {branches.map((branch, index) => (
                <button
                  key={branch._id}
                  onClick={() => handleSelectBranch(branch)}
                  className="group p-8 bg-gray-900/40 border border-gray-800 rounded-[2rem] text-left hover:border-blue-500/30 hover:bg-gray-800/40 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 shadow-xl"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform">
                    🛠️
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                    {branch.name}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {branch.description}
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

export default Branch;

