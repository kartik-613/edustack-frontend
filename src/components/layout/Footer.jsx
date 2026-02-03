import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-[#020202] border-t border-gray-100 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <Link to="/" className="text-2xl font-black text-gray-900 dark:text-white group">
              Edu<span className="text-blue-600 dark:text-blue-500 group-hover:text-blue-500 transition-colors">Stack</span>
            </Link>
            <p className="mt-6 text-gray-500 dark:text-gray-400 font-medium leading-relaxed max-w-sm">
              The ultimate academic resource platform for students and teachers.
              Simplify your study routine with our curated notes and archives.
            </p>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-6">Platform</h4>
            <ul className="space-y-4 text-sm font-bold">
              {["Universities", "Courses", "Subjects", "Subscriptions"].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-6">Support</h4>
            <ul className="space-y-4 text-sm font-bold">
              {["Help Center", "Privacy Policy", "Terms of Service", "Contact Us"].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-400 dark:text-gray-500 text-[10px] font-black uppercase tracking-widest">
            © {new Date().getFullYear()} EDUSTACK INC. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8">
            {["TW", "IG", "LI", "GH"].map((social) => (
              <button key={social} className="text-[10px] font-black text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-white transition-colors tracking-tighter">
                {social}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
