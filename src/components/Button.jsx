import React from 'react';

const Button = ({ onClick, children, variant = "primary", className = "", disabled = false }) => {
  const baseStyle = "px-6 py-3 rounded-lg font-bold transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-md border-b-4 border-emerald-800",
    secondary: "bg-amber-100 text-amber-900 hover:bg-amber-200 border-2 border-amber-300",
    outline: "bg-transparent border-2 border-stone-400 text-stone-600 hover:bg-stone-100"
  };
  return (
    <button onClick={onClick} disabled={disabled} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

export default Button;