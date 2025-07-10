import React from 'react';
import { Facebook, Instagram, Twitter, Github } from 'lucide-react';

const SocialIcon = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-400 hover:text-purple-400 transition-all duration-300 transform hover:scale-110"
  >
    {children}
  </a>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-8 mt-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-4">
        <div className="flex items-center gap-6">
          <SocialIcon href="https://www.facebook.com/Edduainnova"><Facebook size={20} /></SocialIcon>
          <SocialIcon href="https://www.instagram.com/edduainnova/"><Instagram size={20} /></SocialIcon>
          <SocialIcon href="https://x.com/EdduAInnova"><Twitter size={20} /></SocialIcon>
          <SocialIcon href="https://github.com/EdduAInnova"><Github size={20} /></SocialIcon>
        </div>
        <p className="text-sm text-gray-500">
          Copyright © {currentYear} EdduAInnova
        </p>
      </div>
    </footer>
  );
}