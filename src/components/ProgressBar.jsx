import React from 'react';

const ProgressBar = ({ current, total }) => (
  <div className="w-full bg-stone-200 rounded-full h-3 mb-6">
    <div 
      className="bg-emerald-500 h-3 rounded-full transition-all duration-500"
      style={{ width: `${(current / total) * 100}%` }}
    ></div>
  </div>
);

export default ProgressBar;