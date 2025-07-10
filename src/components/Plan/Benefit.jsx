import React from 'react';

export default function Benefit({ title, children, color = 'green' }) {
  return (
    <div className="bg-white/5 p-4 rounded-lg border border-white/10 h-full">
      <h3 className={`font-bold text-lg text-${color}-400 mb-2`}>{title}</h3>
      <p className="text-gray-300 text-sm">{children}</p>
    </div>
  );
}