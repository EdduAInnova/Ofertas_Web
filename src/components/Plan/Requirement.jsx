import React from 'react';

export default function Requirement({ icon, title, children }) {
  return (
    <div className="bg-yellow-900/20 border border-yellow-500/30 p-4 rounded-lg flex items-start gap-4">
      <div className="text-yellow-400 mt-1">{icon}</div>
      <div>
        <h3 className="font-bold text-yellow-400">{title}</h3>
        <p className="text-gray-300 text-sm">{children}</p>
      </div>
    </div>
  );
}