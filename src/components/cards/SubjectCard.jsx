import React from "react";

const SubjectCard = ({ title, semester, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group relative p-8 bg-gray-900/40 border border-gray-800 rounded-[2rem] text-left hover:border-blue-500/30 hover:bg-gray-800/40 transition-all duration-300 animate-in fade-in scale-in duration-500 shadow-xl overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
            📚
          </div>
          {semester && (
            <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full font-black uppercase tracking-widest">
              Sem {semester}
            </span>
          )}
        </div>
        <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        <p className="text-gray-500 text-xs font-medium uppercase tracking-widest">
          Academic Module
        </p>
      </div>
    </button>
  );
};

export default SubjectCard;
