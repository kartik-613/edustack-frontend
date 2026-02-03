import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import useFetch from "../../hooks/useFetch";

const AdminContent = () => {
  const navigate = useNavigate();
  const { data: contents, loading, error } = useFetch("/content/admin");

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5001/api";
      const response = await fetch(`${baseUrl}/content/${id}/approve`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (response.ok) {
        alert("Content approved successfully!");
        window.location.reload();
      }
    } catch (err) {
      alert("Failed to approve content");
    }
  };

  const handleReject = (id) => {
    alert(`Content rejected (Soft delete functionality can be added here)`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-white">
      <Navbar />

      <main className="flex-grow pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12 animate-in fade-in slide-in-from-left-4 duration-700">
            <button
              onClick={() => navigate("/admin")}
              className="group flex items-center text-gray-500 hover:text-white transition-colors mb-6 text-sm font-bold uppercase tracking-widest"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
              Command Center
            </button>
            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
              Content <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500">Moderation</span>
            </h1>
            <p className="text-gray-500 text-lg">Review and approve academic materials uploaded by teachers.</p>
          </div>

          {loading && (
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-24 bg-gray-900/50 border border-gray-800 rounded-3xl animate-pulse" />
              ))}
            </div>
          )}

          {error && (
            <div className="p-8 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-center">
              Failed to load moderation queue
            </div>
          )}

          {!loading && contents?.length > 0 && (
            <div className="space-y-4">
              {contents.map((item, index) => (
                <div
                  key={item._id}
                  className="group flex flex-col md:flex-row md:items-center justify-between p-6 bg-gray-900/40 border border-gray-800 rounded-[2rem] hover:border-amber-500/30 hover:bg-gray-800/40 transition-all animate-in fade-in slide-in-from-bottom-2 shadow-sm"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center gap-6 mb-4 md:mb-0">
                    <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      📄
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="text-lg font-bold group-hover:text-amber-400 transition-colors">{item.title}</h4>
                        <span className="text-[10px] bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded-md font-black uppercase tracking-widest">
                          {item.type}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 font-medium">
                        Subject Code: <span className="text-gray-300">{item.subjectId?.code || "N/A"}</span> • {item.subjectId?.name || "Unknown Subject"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleReject(item._id)}
                      className="px-6 py-3 bg-gray-800 hover:bg-red-500/20 text-gray-400 hover:text-red-500 rounded-xl font-bold transition-all text-sm border border-transparent hover:border-red-500/20"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleApprove(item._id)}
                      className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-black font-bold rounded-xl transition-all text-sm shadow-lg shadow-amber-900/20"
                    >
                      Approve & Publish
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && contents?.length === 0 && (
            <div className="text-center py-20 bg-gray-900/10 border-2 border-dashed border-gray-800 rounded-[3rem]">
              <div className="text-6xl mb-6 opacity-20">✅</div>
              <h3 className="text-xl font-bold text-gray-500">Queue is empty!</h3>
              <p className="text-gray-600 mt-2">All uploaded content has been reviewed.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminContent;
