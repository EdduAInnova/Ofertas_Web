import React from 'react';

export const SectionTitle = ({ icon, children }) => (
  <div className="flex justify-center items-center gap-4 mb-12">
    {icon}
    <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-500 text-transparent bg-clip-text pb-2">
      {children}
    </h2>
  </div>
);
