import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Footer from './Footer';

export default function PageLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-bl from-[#0b0c0f] via-[#101216] to-[#1c355b] text-white px-4 py-10 font-sans relative">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
            <ArrowLeft size={20} /> Volver a los planes
          </Link>
        </div>
        {children}
        <Footer />
      </div>
    </div>
  );
}