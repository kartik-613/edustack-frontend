import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { SubscriptionContext } from "../../context/SubscriptionContext";
import useFetch from "../../hooks/useFetch";

const Content = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isSubscribed } = useContext(SubscriptionContext);
  const [activeTab, setActiveTab] = useState("syllabus");
  const [selectedVideo, setSelectedVideo] = useState(null);

  const searchParams = new URLSearchParams(location.search);
  const universityId = searchParams.get("universityId");
  const courseId = searchParams.get("courseId");
  const branchId = searchParams.get("branchId");
  const semesterId = searchParams.get("semesterId");
  const subjectId = searchParams.get("subjectId");

  const { data: content, loading, error } = useFetch(
    `/content?subjectId=${subjectId}`,
    [subjectId]
  );

  const filteredContent = content?.filter((item) => item.type === activeTab);

  const tabs = [
    { id: "syllabus", label: "Syllabus", icon: "📋" },
    { id: "pyqs", label: "PYQs", icon: "📄" },
    { id: "videos", label: "Lectures", icon: "🎥", premium: true },
    { id: "practicals", label: "Practicals", icon: "🧪", premium: true },
    { id: "answers", label: "Answers", icon: "✅", premium: true },
    { id: "notes", label: "Notes", icon: "💡", premium: true },
  ];

  const handleAction = (item) => {
    if (item.isPremium && !isSubscribed) {
      alert("This is premium content. Please subscribe to access.");
      return;
    }

    if (item.type === "videos") {
      setSelectedVideo(item);
    } else {
      alert(`Downloading ${item.title}...`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#020202] text-white">
      <Navbar />

      <main className="flex-grow pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="flex items-center gap-2 text-gray-500 mb-6 text-[10px] font-bold uppercase tracking-widest">
              <button onClick={() => navigate("/universities")} className="hover:text-white transition-colors">Universities</button>
              <span>/</span>
              <button
                onClick={() => navigate(`/branches?universityId=${universityId}&courseId=${courseId}`)}
                className="hover:text-white transition-colors"
              >
                Branch
              </button>
              <span>/</span>
              <button
                onClick={() => navigate(`/subjects?universityId=${universityId}&courseId=${courseId}&branchId=${branchId}&semesterId=${semesterId}`)}
                className="hover:text-white transition-colors"
              >
                Subject
              </button>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
              Study <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">Materials</span>
            </h1>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 p-1 bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl w-fit mb-12">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setSelectedVideo(null); }}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-900/40"
                    : "text-gray-500 hover:text-white hover:bg-gray-800"
                  }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
                {tab.premium && (
                  <span className="text-[8px] bg-amber-500/20 text-amber-500 border border-amber-500/20 px-1.5 py-0.5 rounded-md ml-1">
                    PRO
                  </span>
                )}
              </button>
            ))}
          </div>

          {loading && (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-24 bg-gray-900/50 border border-gray-800 rounded-3xl animate-pulse" />
              ))}
            </div>
          )}

          {error && (
            <div className="p-8 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-center">
              Failed to load content. Make sure the backend is running.
            </div>
          )}

          {!loading && activeTab === "videos" && selectedVideo && (
            <div className="mb-12 animate-in fade-in zoom-in duration-500">
              <div className="aspect-video w-full bg-black rounded-[2.5rem] border border-gray-800 overflow-hidden shadow-2xl relative">
                <iframe
                  className="w-full h-full"
                  src={selectedVideo.videoUrl}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="mt-6 flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">{selectedVideo.title}</h2>
                  <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mt-1">Unit {selectedVideo.unit} • Video Lecture</p>
                </div>
              </div>
            </div>
          )}

          {!loading && filteredContent?.length > 0 && (
            <div className={['videos', 'practicals'].includes(activeTab) ? 'space-y-12' : 'grid grid-cols-1 md:grid-cols-2 gap-4'}>
              {['videos', 'practicals'].includes(activeTab) ? (
                // Grouping by unit
                [1, 2, 3, 4, 5].map(unit => {
                  const unitItems = filteredContent.filter(item => item.unit === unit);
                  if (unitItems.length === 0) return null;
                  return (
                    <div key={unit} className="animate-in fade-in slide-in-from-bottom-4">
                      <h3 className="text-base font-bold mb-6 flex items-center gap-3 text-gray-500 tracking-widest uppercase">
                        <span className="w-8 h-[1px] bg-gray-800"></span>
                        UNIT {unit}
                      </h3>
                      {activeTab === 'videos' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {unitItems.map((video) => (
                            <div
                              key={video._id}
                              onClick={() => handleAction(video)}
                              className={`group relative aspect-video bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden cursor-pointer hover:border-blue-500/50 transition-all ${selectedVideo?._id === video._id ? 'border-blue-500 ring-2 ring-blue-500/20' : ''}`}
                            >
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white scale-75 group-hover:scale-100 transition-transform">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                  </svg>
                                </div>
                              </div>
                              <div className="absolute bottom-4 left-4 right-4 text-left">
                                <h4 className="font-bold text-sm truncate group-hover:text-blue-400 transition-colors">{video.title}</h4>
                                <p className="text-[10px] text-gray-500 font-bold uppercase mt-1">
                                  {video.isPremium ? "💎 Premium" : "Free Access"}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {unitItems.map((item) => (
                            <div
                              key={item._id}
                              className="group flex items-center justify-between p-6 bg-gray-900/40 border border-gray-800 rounded-[1.5rem] hover:border-blue-500/30 hover:bg-gray-800/40 transition-all animate-in fade-in slide-in-from-bottom-2 shadow-sm"
                            >
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                                  🧪
                                </div>
                                <div>
                                  <h4 className="font-bold group-hover:text-blue-400 transition-colors">{item.title}</h4>
                                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">
                                    Lab Manual • {item.isPremium ? "Premium Material" : "Public Content"}
                                  </p>
                                </div>
                              </div>
                              <button
                                onClick={() => handleAction(item)}
                                className={`p-3 rounded-xl transition-all ${item.isPremium && !isSubscribed
                                    ? "bg-gray-800 text-gray-600 grayscale"
                                    : "bg-blue-600/10 text-blue-500 hover:bg-blue-600 hover:text-white"
                                  }`}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })
              ) : (
                filteredContent.map((item, index) => (
                  <div
                    key={item._id}
                    className="group flex items-center justify-between p-6 bg-gray-900/40 border border-gray-800 rounded-[1.5rem] hover:border-blue-500/30 hover:bg-gray-800/40 transition-all animate-in fade-in slide-in-from-bottom-2 shadow-sm"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                        {item.isPremium ? "💎" : "📄"}
                      </div>
                      <div>
                        <h4 className="font-bold group-hover:text-blue-400 transition-colors">{item.title}</h4>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">
                          Format: PDF • {item.isPremium ? "Premium Material" : "Public Content"}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleAction(item)}
                      className={`p-3 rounded-xl transition-all ${item.isPremium && !isSubscribed
                          ? "bg-gray-800 text-gray-600 grayscale"
                          : "bg-blue-600/10 text-blue-500 hover:bg-blue-600 hover:text-white"
                        }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {!loading && filteredContent?.length === 0 && (
            <div className="text-center py-20 bg-gray-900/10 border border-dashed border-gray-800 rounded-[2.5rem]">
              <div className="text-5xl mb-6 opacity-30">📂</div>
              <h3 className="text-lg font-bold text-gray-500">No {activeTab} available yet.</h3>
              <p className="text-sm text-gray-600 mt-2">Check back later or try another category.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Content;
