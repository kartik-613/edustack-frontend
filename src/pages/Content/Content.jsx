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
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#020202] text-gray-900 dark:text-white transition-colors duration-300">
      <Navbar />

      <main className="flex-grow pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500 mb-6 text-[10px] font-bold uppercase tracking-widest">
              <button onClick={() => navigate("/universities")} className="hover:text-blue-600 dark:hover:text-white transition-colors">Universities</button>
              <span>/</span>
              <button
                onClick={() => navigate(`/branches?universityId=${universityId}&courseId=${courseId}`)}
                className="hover:text-blue-600 dark:hover:text-white transition-colors"
              >
                Branch
              </button>
              <span>/</span>
              <button
                onClick={() => navigate(`/subjects?universityId=${universityId}&courseId=${courseId}&branchId=${branchId}&semesterId=${semesterId}`)}
                className="hover:text-blue-600 dark:hover:text-white transition-colors"
              >
                Subject
              </button>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
              Study <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">Materials</span>
            </h1>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 p-1.5 bg-gray-50 dark:bg-gray-900/50 backdrop-blur-2xl border border-gray-200 dark:border-gray-800 rounded-3xl w-fit mb-12 shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setSelectedVideo(null); }}
                className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                  : "text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-gray-800"
                  }`}
              >
                <span className="text-sm">{tab.icon}</span>
                {tab.label}
                {tab.premium && (
                  <span className="text-[8px] bg-amber-500/10 text-amber-600 dark:text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded-lg ml-2 font-black">
                    PRO
                  </span>
                )}
              </button>
            ))}
          </div>

          {loading && (
            <div className="space-y-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-28 bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 rounded-[2rem] animate-pulse shadow-sm" />
              ))}
            </div>
          )}

          {error && (
            <div className="p-10 bg-red-500/5 border border-red-500/10 rounded-[2.5rem] text-red-500 text-center font-medium">
              Failed to load content. Please check your connection.
            </div>
          )}

          {!loading && activeTab === "videos" && selectedVideo && (
            <div className="mb-16 animate-in fade-in zoom-in duration-700">
              <div className="aspect-video w-full bg-black rounded-[3rem] border border-gray-200 dark:border-gray-800 overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] dark:shadow-2xl relative">
                <iframe
                  className="w-full h-full"
                  src={selectedVideo.videoUrl}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="mt-8 flex justify-between items-start">
                <div>
                  <h2 className="text-3xl font-black tracking-tight">{selectedVideo.title}</h2>
                  <p className="text-gray-400 dark:text-gray-500 font-black uppercase tracking-[0.2em] text-[10px] mt-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                    Unit {selectedVideo.unit} &bull; High Definition Lecture
                  </p>
                </div>
              </div>
            </div>
          )}

          {!loading && filteredContent?.length > 0 && (
            <div className={['videos', 'practicals'].includes(activeTab) ? 'space-y-16' : 'grid grid-cols-1 md:grid-cols-2 gap-6'}>
              {['videos', 'practicals'].includes(activeTab) ? (
                // Grouping by unit
                [1, 2, 3, 4, 5].map(unit => {
                  const unitItems = filteredContent.filter(item => item.unit === unit);
                  if (unitItems.length === 0) return null;
                  return (
                    <div key={unit} className="animate-in fade-in slide-in-from-bottom-4 relative z-10">
                      <div className="flex items-center gap-4 mb-8">
                        <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 tracking-[0.3em] uppercase">
                          UNIT {unit}
                        </h3>
                        <div className="flex-grow h-[1px] bg-gray-100 dark:bg-gray-800"></div>
                      </div>

                      {activeTab === 'videos' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                          {unitItems.map((video) => (
                            <div
                              key={video._id}
                              onClick={() => handleAction(video)}
                              className={`group relative aspect-video bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-[2rem] overflow-hidden cursor-pointer hover:border-blue-500/50 transition-all shadow-sm ${selectedVideo?._id === video._id ? 'border-blue-500 ring-4 ring-blue-500/10' : ''}`}
                            >
                              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent"></div>
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white scale-75 group-hover:scale-100 transition-transform shadow-xl">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 ml-1.5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                  </svg>
                                </div>
                              </div>
                              <div className="absolute bottom-6 left-6 right-6 text-left">
                                <h4 className="font-black text-white text-base truncate group-hover:text-blue-300 transition-colors uppercase tracking-tight">{video.title}</h4>
                                <p className="text-[9px] text-gray-300 font-black uppercase mt-1.5 tracking-widest flex items-center gap-2">
                                  {video.isPremium ? (
                                    <span className="text-amber-400">💎 Premium</span>
                                  ) : (
                                    <span className="text-blue-400">Public</span>
                                  )}
                                  &bull; Click to Play
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {unitItems.map((item) => (
                            <div
                              key={item._id}
                              className="group flex items-center justify-between p-8 bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 rounded-[2.5rem] hover:border-blue-500/30 hover:bg-white dark:hover:bg-gray-800/60 transition-all animate-in fade-in slide-in-from-bottom-2 shadow-sm hover:shadow-xl hover:shadow-blue-500/5"
                            >
                              <div className="flex items-center gap-6">
                                <div className="w-14 h-14 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform">
                                  🧪
                                </div>
                                <div>
                                  <h4 className="font-black text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors tracking-tight">{item.title}</h4>
                                  <p className="text-[10px] text-gray-400 dark:text-gray-500 font-black uppercase tracking-[0.2em] mt-2">
                                    Format: Lab Manual &bull; {item.isPremium ? "Premium Material" : "Public Content"}
                                  </p>
                                </div>
                              </div>
                              <button
                                onClick={() => handleAction(item)}
                                className={`p-4 rounded-2xl transition-all shadow-sm ${item.isPremium && !isSubscribed
                                  ? "bg-gray-100 dark:bg-gray-800 text-gray-300 dark:text-gray-600 grayscale cursor-not-allowed"
                                  : "bg-blue-600 dark:bg-blue-600 text-white hover:bg-blue-700 hover:scale-105"
                                  }`}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
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
                    className="group flex items-center justify-between p-8 bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 rounded-[2.5rem] hover:border-blue-500/30 hover:bg-white dark:hover:bg-gray-800/60 transition-all animate-in fade-in slide-in-from-bottom-2 shadow-sm hover:shadow-xl hover:shadow-blue-500/5"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 bg-white dark:bg-gray-800 rounded-[1.5rem] flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform">
                        {item.isPremium ? "💎" : "📄"}
                      </div>
                      <div>
                        <h4 className="font-black text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors tracking-tight">{item.title}</h4>
                        <p className="text-[10px] text-gray-400 dark:text-gray-500 font-black uppercase tracking-[0.2em] mt-2">
                          Format: PDF &bull; {item.isPremium ? "Premium Material" : "Public Content"}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleAction(item)}
                      className={`p-4 rounded-2xl transition-all shadow-sm ${item.isPremium && !isSubscribed
                        ? "bg-gray-100 dark:bg-gray-800 text-gray-300 dark:text-gray-600 grayscale cursor-not-allowed"
                        : "bg-blue-600 dark:bg-blue-600 text-white hover:bg-blue-700 hover:scale-105"
                        }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {!loading && filteredContent?.length === 0 && (
            <div className="text-center py-24 bg-gray-50 dark:bg-gray-900/10 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-[3rem]">
              <div className="text-6xl mb-8 opacity-20 transform hover:scale-110 transition-transform cursor-default">📂</div>
              <h3 className="text-xl font-black text-gray-400 dark:text-gray-500 tracking-tight uppercase">No {activeTab} available yet</h3>
              <p className="text-gray-400 dark:text-gray-500 font-medium mt-3">Try choosing another category or check back later.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Content;
