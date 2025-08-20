'use client';

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { ArrowRight, X } from 'lucide-react';

interface FloatingRegisterButtonProps {
  onNavigate: (section: string) => void;
}

export function FloatingRegisterButton({ onNavigate }: FloatingRegisterButtonProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 800;
      setIsVisible(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed right-6 bottom-6 z-40 transition-all duration-300 ${
        isMinimized ? 'scale-75' : 'scale-100'
      }`}
    >
      {isMinimized ? (
        // Minimized State
        <Button
          onClick={() => setIsMinimized(false)}
          className="w-14 h-14 rounded-full bg-[#5325BA] hover:bg-[#5325BA]/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <ArrowRight className="w-6 h-6" />
        </Button>
      ) : (
        // Expanded State
        <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-4 max-w-sm">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-bold text-gray-900 mb-1">지금 신청하세요!</h3>
              <p className="text-sm text-gray-600">DS AI Week 2025 참가 신청</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(true)}
              className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="space-y-2 mb-4">
            <div className="text-sm text-gray-600">
              AI 전문가들과 함께하는 특별한 기회
            </div>
            <div className="text-xs text-[#5325BA]">
              ✨ 사내 직원 누구나 참가 가능
            </div>
          </div>

          <Button 
            onClick={() => onNavigate('register')}
            className="w-full bg-[#5325BA] hover:bg-[#5325BA]/90 hover:scale-105 hover:shadow-lg text-white transition-all duration-300 ease-in-out transform hover:-translate-y-1"
          >
            참가 신청하기
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
}