import React from "react";

const Button = ({
  children,
  variant = "primary", // primary | secondary | outline
  size = "md", // sm | md | lg
  onClick,
  className = "",
}) => {
  const base = "font-semibold rounded-xl transition duration-300 shadow-lg";
  
  const variants = {
    primary: "bg-gray-800 text-white hover:bg-gray-700",
    secondary: "bg-indigo-600 text-white hover:bg-indigo-500",
    outline: "border border-gray-700 text-gray-300 hover:bg-gray-800",
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      onClick={onClick}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
