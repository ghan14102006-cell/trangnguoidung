import React from 'react';
import { Sparkles, CheckCircle, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounceIn max-w-sm">
      <div className="bg-gray-900/95 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-white/10 backdrop-blur-md">
        <CheckCircle className="w-4 h-4 text-[#ffb6c1] shrink-0" />
        <span className="text-xs font-medium leading-relaxed">{message}</span>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white p-1 ml-auto cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
