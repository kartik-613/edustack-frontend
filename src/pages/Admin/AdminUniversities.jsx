import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import useFetch from "../../hooks/useFetch";

const AdminUniversities = () => {
    const navigate = useNavigate();
    const { data: universities, loading, error } = useFetch("/universities");

    return (
        <div className="min-h-screen flex flex-col bg-[#050505] text-white">
            <Navbar />

            <main className="flex-grow pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div className="animate-in fade-in slide-in-from-left-4 duration-700">
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
                                Manage <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Universities</span>
                            </h1>
                            <p className="text-gray-500 text-lg">Add, edit, or remove academic institutions and their associated courses.</p>
                        </div>

                        <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-blue-900/20 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                            </svg>
                            Add University
                        </button>
                    </div>

                    {loading && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="h-48 bg-gray-900/50 border border-gray-800 rounded-3xl animate-pulse" />
                            ))}
                        </div>
                    )}

                    {!loading && universities?.map((uni) => (
                        <div key={uni.id} className="flex items-center justify-between p-6 bg-gray-900/40 border border-gray-800 rounded-3xl mb-4 hover:bg-gray-800/40 transition-all group">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                                    {uni.logo}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold group-hover:text-blue-400 transition-colors">{uni.name}</h3>
                                    <p className="text-gray-500 text-sm">{uni.city} • {uni.description}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                </button>
                                <button className="p-3 bg-gray-800 hover:bg-red-500/20 text-gray-400 hover:text-red-500 rounded-xl transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default AdminUniversities;
