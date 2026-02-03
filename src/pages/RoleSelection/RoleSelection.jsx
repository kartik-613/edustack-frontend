import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const RoleSelection = () => {
    const navigate = useNavigate();
    const { devLogin } = useContext(AuthContext);

    const handleRoleSelect = (role) => {
        devLogin(role);
        if (role === "admin") navigate("/admin");
        else if (role === "teacher") navigate("/teacher");
        else navigate("/student");
    };

    const roles = [
        {
            id: "student",
            title: "Student",
            desc: "Access syllabus, PYQs, and premium notes.",
            icon: "🎓",
            color: "from-blue-500 to-cyan-500",
            shadow: "shadow-blue-500/20"
        },
        {
            id: "teacher",
            title: "Teacher",
            desc: "Manage content, upload notes and syllabus.",
            icon: "👨‍🏫",
            color: "from-purple-500 to-indigo-500",
            shadow: "shadow-indigo-500/20"
        },
        {
            id: "admin",
            title: "Admin",
            desc: "Platform management and user moderation.",
            icon: "🛡️",
            color: "from-amber-500 to-orange-500",
            shadow: "shadow-amber-500/20"
        }
    ];

    return (
        <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center p-6 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black">
            <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <h1 className="text-5xl font-black text-white mb-4 tracking-tighter">
                    Edu<span className="text-blue-500">Stack</span>
                </h1>
                <p className="text-gray-400 text-lg max-w-md mx-auto">
                    Welcome! Please select your role to continue to your personalized dashboard.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
                {roles.map((role, index) => (
                    <button
                        key={role.id}
                        onClick={() => handleRoleSelect(role.id)}
                        className={`group relative p-8 rounded-[2.5rem] bg-gray-900/40 border border-gray-800 hover:border-white/20 transition-all duration-500 text-left overflow-hidden shadow-2xl ${role.shadow} hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-8`}
                        style={{ animationDelay: `${index * 150}ms` }}
                    >
                        {/* Background Glow */}
                        <div className={`absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br ${role.color} opacity-0 group-hover:opacity-10 blur-[80px] transition-opacity duration-500`}></div>

                        <div className="relative z-10">
                            <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${role.color} flex items-center justify-center text-4xl mb-8 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-xl`}>
                                {role.icon}
                            </div>

                            <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">
                                {role.title}
                            </h2>
                            <p className="text-gray-400 leading-relaxed mb-8">
                                {role.desc}
                            </p>

                            <div className="flex items-center text-sm font-bold text-white uppercase tracking-widest bg-white/5 w-fit px-4 py-2 rounded-full border border-white/5 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                Continue
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            <div className="mt-20 text-gray-600 text-sm font-medium animate-pulse">
                Secure Academic Environment &copy; 2026 EduStack Inc.
            </div>
        </div>
    );
};

export default RoleSelection;
