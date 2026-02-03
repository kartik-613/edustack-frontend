import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user, logout } = useContext(AuthContext);
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
      <nav className="fixed top-0 left-0 w-full bg-black/60 backdrop-blur-xl border-b border-gray-800/50 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-white group">
            Edu<span className="text-blue-500 group-hover:text-blue-400 transition-colors">Stack</span>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-8 text-gray-400">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.link}
                  className="hover:text-white transition-colors font-medium text-sm"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* User Actions Desktop */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <div className={`px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${getRoleColor(user?.role)}`}>
                  {user?.role}
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="px-5 py-2 glass-effect bg-gray-800/50 text-white rounded-xl hover:bg-gray-700 transition-all text-sm font-medium border border-gray-700"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 w-72 h-full bg-gray-900 shadow-2xl z-[70] transform transition-transform duration-500 ease-out border-l border-gray-800 ${open ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="p-6 flex justify-between items-center border-b border-gray-800">
          <span className="text-white font-bold text-lg">Menu</span>
          <button
            onClick={() => setOpen(false)}
            className="text-gray-400 hover:text-white p-2"
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
                  className="block py-3 px-4 rounded-xl hover:bg-gray-800 text-gray-300 hover:text-white transition-all font-medium"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="px-6">
            {isAuthenticated ? (
              <div className="space-y-4">
                <div className="p-4 bg-gray-800/50 rounded-2xl border border-gray-700">
                  <p className="text-gray-500 text-xs uppercase mb-1">Signed in as</p>
                  <p className="text-white font-medium">{user?.name}</p>
                  <div className={`mt-2 inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${getRoleColor(user?.role)}`}>
                    {user?.role}
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full py-3 rounded-xl border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-all font-medium"
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

