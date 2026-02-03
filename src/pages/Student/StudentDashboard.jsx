import React, { useContext } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const quickLinks = [
        { title: "Browse Universities", icon: "🏫", link: "/universities", color: "bg-blue-500" },
        { title: "My Subscriptions", icon: "💎", link: "/subscriptions", color: "bg-purple-500" },
        { title: "Recent PYQs", icon: "📄", link: "/content?type=pyq", color: "bg-emerald-500" },
        { title: "Study Notes", icon: "💡", link: "/content?type=notes", color: "bg-amber-500" },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-[#020202] text-gray-900 dark:text-white transition-colors duration-300">
            <Navbar />

            <main className="flex-grow pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Welcome Section */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 relative">
                        <div className="animate-in fade-in slide-in-from-left-4 duration-700 relative z-10">
                            <h1 className="text-4xl sm:text-5xl font-black mb-4 tracking-tight leading-tight">
                                Hey, <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">{user?.name || "Student"}</span>!
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400 text-lg sm:text-xl font-medium">What's the learning goal for today?</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-2xl px-6 py-3 flex items-center gap-3 shadow-sm z-10 transition-colors">
                            <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                            <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Active Session</span>
                        </div>
                    </div>

                    {/* Quick Actions Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20 relative z-10">
                        {quickLinks.map((item, index) => (
                            <button
                                key={item.title}
                                onClick={() => navigate(item.link)}
                                className="group p-8 bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 rounded-[2rem] hover:bg-white dark:hover:bg-gray-800 transition-all text-left animate-in fade-in slide-in-from-bottom-4 duration-500 shadow-sm hover:shadow-xl hover:shadow-blue-500/5"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className={`w-14 h-14 ${item.color}/10 rounded-2xl flex items-center justify-center text-3xl mb-8 transform group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-inner`}>
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-black mb-2 tracking-tight">{item.title}</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-[10px] font-bold uppercase tracking-widest">Latest Updates &bull; 2026</p>
                            </button>
                        ))}
                    </div>

                    {/* Main Content Area */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
                        <div className="lg:col-span-2 space-y-10">
                            <div className="flex items-center gap-4">
                                <div className="w-1.5 h-8 bg-blue-600 dark:bg-blue-500 rounded-full"></div>
                                <h2 className="text-2xl font-black tracking-tight">Recent Exploration</h2>
                            </div>
                            <div className="p-16 bg-gray-50/50 dark:bg-gray-900/10 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-[3rem] flex flex-col items-center justify-center text-center transition-colors">
                                <div className="text-6xl mb-8 opacity-20 transform hover:scale-110 transition-transform cursor-default">📚</div>
                                <p className="text-gray-500 dark:text-gray-400 max-w-sm text-lg font-medium leading-relaxed">Your study history is currently empty. Start by exploring our extensive university catalog!</p>
                                <button
                                    onClick={() => navigate("/universities")}
                                    className="mt-10 px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all shadow-xl shadow-blue-500/20 transform active:scale-95"
                                >
                                    Browse Universities
                                </button>
                            </div>
                        </div>

                        <div className="space-y-10">
                            <h2 className="text-2xl font-black tracking-tight">Announcements</h2>
                            <div className="space-y-6">
                                {[
                                    { title: "Mid-term PYQs added", time: "2h ago", tag: "New", icon: "🔥" },
                                    { title: "Subscription sale ends", time: "5h ago", tag: "Offer", icon: "💎" },
                                    { title: "System maintenance", time: "1d ago", tag: "Info", icon: "🛠️" },
                                ].map((note) => (
                                    <div key={note.title} className="p-6 bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800/50 rounded-3xl flex justify-between items-center group cursor-pointer hover:bg-white dark:hover:bg-gray-800/60 transition-all shadow-sm">
                                        <div className="flex items-center gap-4">
                                            <div className="text-xl opacity-80 group-hover:scale-125 transition-transform">{note.icon}</div>
                                            <div>
                                                <h4 className="font-black text-sm mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{note.title}</h4>
                                                <p className="text-[9px] text-gray-400 dark:text-gray-500 uppercase font-black tracking-[0.2em]">{note.time}</p>
                                            </div>
                                        </div>
                                        <span className="text-[9px] bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 px-3 py-1.5 rounded-xl text-gray-400 dark:text-gray-500 font-black uppercase tracking-wider shadow-sm">{note.tag}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default StudentDashboard;
