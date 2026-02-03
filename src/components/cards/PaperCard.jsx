import React from "react";

const PaperCard = ({ title, year, type, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group p-6 bg-gray-900/40 border border-gray-800 rounded-3xl hover:border-emerald-500/30 hover:bg-gray-800/40 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 shadow-lg text-left"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 bg-emerald-500/10 text-emerald-500 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
          📄
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 bg-gray-800 text-gray-500 rounded-md">
          {year}
        </span>
      </div>
      <h4 className="font-bold text-gray-200 group-hover:text-emerald-400 transition-colors mb-1">{title}</h4>
      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{type}</p>
    </button>
  );
};

export default PaperCard;
