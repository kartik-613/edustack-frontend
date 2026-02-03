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
        <div className="min-h-screen bg-white dark:bg-[#020202] text-gray-900 dark:text-white flex flex-col items-center justify-center p-6 relative overflow-hidden transition-colors duration-300">
            {/* Background Decoration */}
            <div className="absolute top-1/4 -right-40 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/5 blur-[120px] rounded-full"></div>

            <div className="text-center mb-16 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <h1 className="text-5xl font-black mb-4 tracking-tighter text-gray-900 dark:text-white">
                    Edu<span className="text-blue-600 dark:text-blue-500">Stack</span>
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-lg max-w-md mx-auto font-medium">
                    Welcome! Please select your role to continue to your personalized dashboard.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl relative z-10">
                {roles.map((role, index) => (
                    <button
                        key={role.id}
                        onClick={() => handleRoleSelect(role.id)}
                        className={`group relative p-10 rounded-[3rem] bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 hover:border-blue-500/30 transition-all duration-500 text-left overflow-hidden shadow-sm dark:shadow-2xl hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-8`}
                        style={{ animationDelay: `${index * 150}ms` }}
                    >
                        {/* Background Glow */}
                        <div className={`absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br ${role.color} opacity-0 group-hover:opacity-10 blur-[80px] transition-opacity duration-500`}></div>

                        <div className="relative z-10">
                            <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${role.color} flex items-center justify-center text-4xl mb-8 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-xl`}>
                                {role.icon}
                            </div>

                            <h2 className="text-3xl font-black mb-3 tracking-tight text-gray-900 dark:text-white">
                                {role.title}
                            </h2>
                            <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-10 font-medium">
                                {role.desc}
                            </p>

                            <div className="flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-500 bg-blue-50 dark:bg-blue-500/10 w-fit px-6 py-3 rounded-2xl border border-blue-100 dark:border-blue-500/20 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-sm">
                                Continue
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            <div className="mt-20 text-gray-400 dark:text-gray-600 text-[10px] font-black uppercase tracking-[0.3em] z-10">
                Secure Academic Environment &copy; 2026 EduStack Inc.
            </div>
        </div>
    );
};

export default RoleSelection;
