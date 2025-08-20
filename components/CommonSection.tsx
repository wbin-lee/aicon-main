// import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface CommonSectionProps {
  onEventSelect: (eventType: 'forum' | 'conference') => void;
  selectedEvent: 'forum' | 'conference' | null;
}

export function CommonSection({ onEventSelect, selectedEvent }: CommonSectionProps) {
  return (
    <section id="common" className="min-h-screen relative overflow-hidden bg-transparent">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20 flex items-center justify-center min-h-screen">
        <div className="text-center max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: '#5325BA' }}>
              DS AI Week 2025
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
             관심 있는 행사를 선택해주세요
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Samsung AI Forum */}
            <div className={`relative p-8 rounded-3xl border-2 transition-all duration-500 cursor-pointer group transform hover:-translate-y-2 ${
              selectedEvent === 'forum' 
                ? 'border-[#5325BA] bg-white shadow-2xl scale-105 ring-4 ring-[#5325BA]/20' 
                : 'border-gray-200 bg-white/90 hover:border-[#5325BA]/50 hover:shadow-2xl hover:scale-105 shadow-lg'
            }`}>
              {/* Selected Indicator */}
              {selectedEvent === 'forum' && (
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#5325BA] rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}

              <div className="absolute top-4 right-4">
                <Badge variant="secondary" className={`font-medium transition-all duration-300 ${
                  selectedEvent === 'forum' 
                    ? 'bg-[#5325BA] text-white' 
                    : 'bg-[#5325BA]/10 text-[#5325BA]'
                }`}>
                  Day 1
                </Badge>
              </div>
              
              <div className="mb-6">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 mx-auto transition-all duration-300 ${
                  selectedEvent === 'forum' 
                    ? 'bg-[#5325BA] shadow-lg group-hover:scale-110' 
                    : 'bg-[#5325BA] group-hover:scale-110 group-hover:shadow-lg'
                }`}>
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className={`text-2xl font-bold mb-3 transition-colors duration-300 ${
                  selectedEvent === 'forum' ? 'text-[#5325BA]' : 'text-gray-900'
                }`}>Samsung AI Forum</h3>
                <p className="text-gray-600 leading-relaxed mb-3">
                  글로벌 테크 리더의 Insight 공유와 학계&업계<br/>
                  리더들이 전하는 반도체 AI기술의 현재와 미래
                </p>
                <p className="text-[#5325BA] font-semibold text-lg">
                  2025.09.15(월)
                </p>
              </div>

              <Button
                onClick={() => onEventSelect('forum')}
                className={`w-full py-4 text-lg font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                  selectedEvent === 'forum'
                    ? 'bg-[#5325BA] hover:bg-[#5325BA]/90 text-white shadow-lg'
                    : 'bg-[#5325BA]/10 hover:bg-[#5325BA] hover:text-white text-[#5325BA] border border-[#5325BA]/20'
                }`}
              >
                Samsung AI Forum 안내
              </Button>
            </div>

            {/* DS AI Conference */}
            <div className={`relative p-8 rounded-3xl border-2 transition-all duration-500 cursor-pointer group transform hover:-translate-y-2 ${
              selectedEvent === 'conference' 
                ? 'border-[#5325BA] bg-white shadow-2xl scale-105 ring-4 ring-[#5325BA]/20' 
                : 'border-gray-200 bg-white/90 hover:border-[#5325BA]/50 hover:shadow-2xl hover:scale-105 shadow-lg'
            }`}>
              {/* Selected Indicator */}
              {selectedEvent === 'conference' && (
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#5325BA] rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}

              <div className="absolute top-4 right-4">
                <Badge variant="secondary" className={`font-medium transition-all duration-300 ${
                  selectedEvent === 'conference' 
                    ? 'bg-[#5325BA] text-white' 
                    : 'bg-[#5325BA]/10 text-[#5325BA]'
                }`}>
                  Day 3
                </Badge>
              </div>
              
              <div className="mb-6">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 mx-auto transition-all duration-300 ${
                  selectedEvent === 'conference' 
                    ? 'bg-[#5325BA] shadow-lg group-hover:scale-110' 
                    : 'bg-[#5325BA] group-hover:scale-110 group-hover:shadow-lg'
                }`}>
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                </div>
                <h3 className={`text-2xl font-bold mb-3 transition-colors duration-300 ${
                  selectedEvent === 'conference' ? 'text-[#5325BA]' : 'text-gray-900'
                }`}>DS AI Conference</h3>
                <p className="text-gray-600 leading-relaxed mb-3">
                  업무 효율 향상과 비즈니스 성과로 이어진 AI 실전 적용 사례,<br/>
                  글로벌 파트너사와 학계 전문가가 전하는 AI 최신 트렌드
                </p>
                <p className="text-[#5325BA] font-semibold text-lg">
                  2025.09.17(수)
                </p>
              </div>

              <Button
                onClick={() => onEventSelect('conference')}
                className={`w-full py-4 text-lg font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                  selectedEvent === 'conference'
                    ? 'bg-[#5325BA] hover:bg-[#5325BA]/90 text-white shadow-lg'
                    : 'bg-[#5325BA]/10 hover:bg-[#5325BA] hover:text-white text-[#5325BA] border border-[#5325BA]/20'
                }`}
              >
                DS AI Conference 안내
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 