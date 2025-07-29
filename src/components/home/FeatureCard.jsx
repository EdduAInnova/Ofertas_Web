import React from 'react';

export const FeatureCard = ({ icon, title, children }) => (
  <div className="bg-white/5 p-6 rounded-lg border border-white/10 transform transition-all duration-300 hover:bg-white/10 hover:-translate-y-1 hover:border-purple-400 hover:shadow-[0_0_20px_rgba(192,132,252,0.25)]">
    <div className="flex items-center gap-4 mb-3">
      {icon}
      <h3 className="font-bold text-xl text-blue-400">{title}</h3>
    </div>
    <p className="text-gray-400">{children}</p>
  </div>
);
