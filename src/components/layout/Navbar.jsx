import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/");
  };

  const menuItems = [
    { name: "Universities", link: "/universities" },
    { name: "Courses", link: "/courses" },
    ...(user?.role === "teacher" || user?.role === "admin" ? [{ name: "Teacher Panel", link: "/teacher" }] : []),
    ...(user?.role === "admin" ? [{ name: "Admin Panel", link: "/admin" }] : []),
  ];

  const getRoleColor = (role) => {
    switch (role) {
      case "admin": return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "teacher": return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      default: return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white/70 dark:bg-black/60 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800/50 z-50 transition-colors">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-gray-900 dark:text-white group transition-colors">
            Edu<span className="text-blue-500 group-hover:text-blue-400 transition-colors">Stack</span>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-8 text-gray-500 dark:text-gray-400">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.link}
                  className="hover:text-blue-600 dark:hover:text-white transition-colors font-medium text-sm"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* User Actions Desktop */}
          <div className="hidden md:flex items-center gap-6">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white transition-all transform active:scale-95 border border-gray-200 dark:border-gray-700"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <div className={`px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${getRoleColor(user?.role)}`}>
                  {user?.role}
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all text-sm font-bold shadow-lg shadow-blue-500/20"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-500 dark:text-gray-400"
            >
              {theme === "dark" ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <button
              className="text-gray-900 dark:text-white p-2"
              onClick={() => setOpen(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 dark:bg-black/80 backdrop-blur-sm z-[60]"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 w-72 h-full bg-white dark:bg-gray-950 shadow-2xl z-[70] transform transition-transform duration-500 ease-out border-l border-gray-100 dark:border-gray-900 ${open ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="p-6 flex justify-between items-center border-b border-gray-100 dark:border-gray-900">
          <span className="text-gray-900 dark:text-white font-bold text-lg">Menu</span>
          <button
            onClick={() => setOpen(false)}
            className="text-gray-400 hover:text-gray-900 dark:hover:text-white p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col h-full justify-between pb-12">
          <ul className="p-6 space-y-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.link}
                  onClick={() => setOpen(false)}
                  className="block py-3 px-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-all font-medium"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="px-6">
            {isAuthenticated ? (
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800">
                  <p className="text-gray-400 text-xs uppercase mb-1">Signed in as</p>
                  <p className="text-gray-900 dark:text-white font-medium">{user?.name}</p>
                  <div className={`mt-2 inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${getRoleColor(user?.role)}`}>
                    {user?.role}
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full py-3 rounded-xl border border-red-500/20 text-red-500 hover:bg-red-500/5 transition-all font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="w-full bg-blue-600 py-3 rounded-xl text-white hover:bg-blue-700 transition-all block text-center font-bold"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

