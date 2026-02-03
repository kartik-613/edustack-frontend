import React from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-11/12 max-w-lg relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
          onClick={onClose}
        >
          ✕
        </button>

        {title && <h2 className="text-xl font-bold text-white mb-4">{title}</h2>}
        <div className="text-gray-300">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
