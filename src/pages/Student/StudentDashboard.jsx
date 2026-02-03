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
        <div className="min-h-screen flex flex-col bg-[#050505] text-white">
            <Navbar />

            <main className="flex-grow pt-24 pb-12 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Welcome Section */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                        <div className="animate-in fade-in slide-in-from-left-4 duration-700">
                            <h1 className="text-4xl font-bold mb-3">
                                Hey, <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">{user?.name || "Student"}</span>!
                            </h1>
                            <p className="text-gray-500 text-lg">What would you like to study today?</p>
                        </div>
                        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl px-6 py-3 flex items-center gap-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                            <span className="text-sm font-medium text-gray-400 uppercase tracking-widest">Active Session</span>
                        </div>
                    </div>

                    {/* Quick Actions Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        {quickLinks.map((item, index) => (
                            <button
                                key={item.title}
                                onClick={() => navigate(item.link)}
                                className="group p-6 bg-gray-900/40 border border-gray-800 rounded-3xl hover:bg-gray-800/60 hover:border-blue-500/30 transition-all text-left animate-in fade-in slide-in-from-bottom-4 duration-500"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className={`w-12 h-12 ${item.color}/10 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform`}>
                                    {item.icon}
                                </div>
                                <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                                <p className="text-gray-500 text-xs">Explore latest updates</p>
                            </button>
                        ))}
                    </div>

                    {/* Main Content Area */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            <h2 className="text-2xl font-bold flex items-center gap-3">
                                <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
                                Recent Exploration
                            </h2>
                            <div className="p-12 bg-gray-900/20 border-2 border-dashed border-gray-800 rounded-[2.5rem] flex flex-col items-center justify-center text-center">
                                <div className="text-5xl mb-6 opacity-20">📚</div>
                                <p className="text-gray-500 max-w-xs">You haven't viewed any subjects yet. Start by selecting your university!</p>
                                <button
                                    onClick={() => navigate("/universities")}
                                    className="mt-8 px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-bold transition-all shadow-lg shadow-blue-900/20"
                                >
                                    Find University
                                </button>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <h2 className="text-2xl font-bold">Announcements</h2>
                            <div className="space-y-4">
                                {[
                                    { title: "Mid-term PYQs added", time: "2h ago", tag: "New" },
                                    { title: "Subscription sale ends soon", time: "5h ago", tag: "Offer" },
                                    { title: "System maintenance at 2 AM", time: "1d ago", tag: "Info" },
                                ].map((note) => (
                                    <div key={note.title} className="p-5 bg-gray-900/40 border border-gray-800/50 rounded-2xl flex justify-between items-center group cursor-pointer hover:bg-gray-800/40 transition-colors">
                                        <div>
                                            <h4 className="font-bold text-sm mb-1 group-hover:text-blue-400 transition-colors">{note.title}</h4>
                                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">{note.time}</p>
                                        </div>
                                        <span className="text-[10px] bg-gray-800 px-2 py-1 rounded-md text-gray-400 font-bold uppercase">{note.tag}</span>
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
