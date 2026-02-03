import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import useFetch from "../../hooks/useFetch";

const TeacherContent = () => {
  const { type } = useParams(); // syllabus, pyqs, answers, notes, videos, practicals
  const navigate = useNavigate();
  const [showUpload, setShowUpload] = useState(false);
  const [uploadData, setUploadData] = useState({ title: "", unit: "", subjectId: "" });
  const [isUploading, setIsUploading] = useState(false);

  const { data: contents, loading, error } = useFetch(`/content/teacher?type=${type}`, [type]);
  const { data: subjects } = useFetch("/subjects");

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!uploadData.title || !uploadData.subjectId) {
      alert("Please fill required fields");
      return;
    }

    setIsUploading(true);
    try {
      const token = localStorage.getItem("token");
      const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5001/api";
      const response = await fetch(`${baseUrl}/content/upload`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          ...uploadData,
          type,
          fileUrl: "#", // Mock file URL
          videoUrl: type === 'videos' ? "https://www.youtube.com/embed/bcSW30g_W8w" : ""
        })
      });

      if (response.ok) {
        alert("Content uploaded and sent for approval!");
        setShowUpload(false);
        window.location.reload();
      }
    } catch (err) {
      alert("Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-white">
      <Navbar />

      <main className="flex-grow pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="animate-in fade-in slide-in-from-left-4 duration-700">
              <button
                onClick={() => navigate("/teacher")}
                className="group flex items-center text-gray-500 hover:text-white transition-colors mb-6 text-sm font-bold uppercase tracking-widest"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                </svg>
                Dashboard
              </button>
              <h1 className="text-4xl md:text-5xl font-black mb-3">
                Manage <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400 capitalize">{type}</span>
              </h1>
              <p className="text-gray-500 text-lg">Organize, review, and add new academic materials.</p>
            </div>

            <button
              onClick={() => setShowUpload(true)}
              className="bg-indigo-600 hover:bg-indigo-700 px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-indigo-900/20 flex items-center gap-2 animate-in fade-in scale-in duration-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
              </svg>
              Upload New {type?.slice(0, -1) || "Content"}
            </button>
          </div>

          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-48 bg-gray-900/50 border border-gray-800 rounded-3xl animate-pulse" />
              ))}
            </div>
          )}

          {!loading && contents?.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contents.map((item, index) => (
                <div
                  key={item._id}
                  className="group p-8 bg-gray-900/40 border border-gray-800 rounded-[2rem] hover:border-indigo-500/30 hover:bg-gray-800/40 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 shadow-xl"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-14 h-14 bg-indigo-500/10 text-indigo-400 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      {item.approved ? "✅" : "⏳"}
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${item.approved ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                      {item.approved ? 'Published' : 'Pending Approval'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-6">
                    Unit {item.unit || "N/A"} • {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                  <div className="flex gap-2">
                    <button className="flex-1 py-3 bg-gray-800 hover:bg-indigo-600 rounded-xl font-bold transition-all text-sm">
                      View
                    </button>
                    <button className="p-3 bg-gray-800 hover:bg-red-500/20 text-gray-500 hover:text-red-500 rounded-xl transition-colors">
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && contents?.length === 0 && (
            <div className="text-center py-24 bg-gray-900/10 border-2 border-dashed border-gray-800 rounded-[3rem]">
              <div className="text-6xl mb-6 opacity-20">📁</div>
              <h3 className="text-2xl font-bold text-gray-500">No {type} found</h3>
              <p className="text-gray-600 mt-2 mb-8">You haven't uploaded any content in this category yet.</p>
              <button
                onClick={() => setShowUpload(true)}
                className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-bold transition-all"
              >
                Start Uploading
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-gray-900 border border-gray-800 rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-300">
            <h2 className="text-2xl font-bold mb-6">Upload {type?.slice(0, -1)}</h2>
            <form onSubmit={handleUpload} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Subject</label>
                <select
                  required
                  className="w-full px-5 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors text-sm text-white appearance-none"
                  value={uploadData.subjectId}
                  onChange={(e) => setUploadData({ ...uploadData, subjectId: e.target.value })}
                >
                  <option value="">Select Subject</option>
                  {subjects?.map(s => <option key={s._id} value={s._id}>{s.name} ({s.code})</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Unit 1 Introduction"
                  className="w-full px-5 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors text-sm"
                  value={uploadData.title}
                  onChange={(e) => setUploadData({ ...uploadData, title: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Unit Number</label>
                <input
                  type="number"
                  placeholder="1, 2, 3..."
                  className="w-full px-5 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors text-sm"
                  value={uploadData.unit}
                  onChange={(e) => setUploadData({ ...uploadData, unit: e.target.value })}
                />
              </div>

              <div className="p-8 border-2 border-dashed border-gray-800 rounded-2xl flex flex-col items-center justify-center text-center hover:border-indigo-500/50 transition-colors cursor-pointer group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">📤</div>
                <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">Select {type === 'videos' ? 'Thumbnail' : 'PDF File'}</p>
              </div>

              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setShowUpload(false)} className="flex-1 py-4 bg-gray-800 hover:bg-gray-700 rounded-xl font-bold transition-colors">Cancel</button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="flex-1 py-4 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-bold transition-colors shadow-lg shadow-indigo-900/20 disabled:opacity-50"
                >
                  {isUploading ? "Uploading..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default TeacherContent;
