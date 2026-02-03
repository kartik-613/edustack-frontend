import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black/80 backdrop-blur-md border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-8 text-center">
        {/* Logo */}
        <h2 className="text-xl font-semibold text-white">
          Edu<span className="text-gray-400">Stack</span>
        </h2>

        {/* Copyright */}
        <p className="text-gray-500 text-sm mt-2">
          © {new Date().getFullYear()} EduStack. All rights reserved.
        </p>

        {/* Footer Links */}
        <div className="flex justify-center gap-6 mt-4 text-gray-400 text-sm">
          {["Privacy", "Terms", "Support"].map((item) => (
            <span
              key={item}
              className="hover:text-white cursor-pointer transition-colors"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
