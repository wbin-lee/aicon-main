import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';

interface Speaker {
  name: string;
  role: string;
  company: string;
  image: string;
  speakerType: '사내 연사' | '사외 연사' | '패널 토론' | 'Keynote';
  description: string;
}

export function ConferenceSpeakersSection() {
  const [currentSet, setCurrentSet] = useState(0);

  // 14 random speakers for DS AI Conference
  const allSpeakers: Speaker[] = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Chief AI Scientist',
      company: 'Google DeepMind',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b9b6b991?w=400',
      speakerType: 'Keynote',
      description: 'Google DeepMind의 수석 AI 과학자로서 AGI 연구를 이끌고 있습니다. 차세대 AI 기술의 발전 방향과 인류에게 미칠 영향에 대한 통찰력 있는 키노트를 제공합니다.'
    },
    {
      name: 'Dr. Lisa Wang',
      role: 'Head of AI Research',
      company: 'Meta Reality Labs',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      speakerType: '사외 연사',
      description: 'Meta Reality Labs에서 AI 연구를 총괄하며 메타버스와 AI의 융합 기술을 개발합니다. VR/AR 환경에서의 AI 활용과 미래 인터랙션 기술에 대해 발표합니다.'
    },
    {
      name: 'Dr. Emma Rodriguez',
      role: 'AI Ethics Researcher',
      company: 'MIT AI Ethics Lab',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
      speakerType: '패널 토론',
      description: 'MIT AI 윤리 연구소에서 AI의 윤리적 개발과 사회적 책임에 대해 연구합니다. AI 기술이 사회에 미치는 영향과 윤리적 가이드라인에 대한 토론을 진행합니다.'
    },
    {
      name: '김민준',
      role: 'Senior ML Engineer',
      company: 'Naver AI Lab',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      speakerType: '사내 연사',
      description: 'Naver AI Lab의 시니어 머신러닝 엔지니어로서 검색과 추천 시스템의 AI 기술을 개발합니다. 대규모 서비스에서의 ML 시스템 구축 경험을 공유합니다.'
    },
    {
      name: '박소영',
      role: 'Computer Vision Lead',
      company: 'Kakao Brain',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
      speakerType: '사내 연사',
      description: 'Kakao Brain에서 컴퓨터 비전 팀을 이끌며 이미지 인식과 생성 AI 기술을 개발합니다. 최신 컴퓨터 비전 기술의 실제 적용 사례와 혁신을 소개합니다.'
    },
    {
      name: '정현우',
      role: 'MLOps Engineer',
      company: 'LINE AI',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      speakerType: '사내 연사',
      description: 'LINE AI에서 MLOps 플랫폼을 구축하고 운영하며 AI 모델의 안정적인 서비스 배포를 담당합니다. 프로덕션 환경에서의 MLOps 베스트 프랙티스를 공유합니다.'
    },
    {
      name: 'Prof. James Miller',
      role: 'AI Professor',
      company: 'Carnegie Mellon University',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
      speakerType: 'Keynote',
      description: 'Carnegie Mellon University의 AI 교수로서 강화학습과 로봇공학 분야의 세계적 권위자입니다. AI 기술의 학문적 발전과 실제 응용에 대한 깊이 있는 통찰을 제공합니다.'
    },
    {
      name: 'Dr. Rachel Kim',
      role: 'Robotics AI Lead',
      company: 'Boston Dynamics',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
      speakerType: '사외 연사',
      description: 'Boston Dynamics에서 로봇 AI 기술 개발을 주도하며 물리적 환경에서 동작하는 지능형 로봇을 만듭니다. 로봇공학과 AI의 융합을 통한 혁신 사례를 발표합니다.'
    },
    {
      name: '이지훈',
      role: 'AI Platform Engineer',
      company: 'Coupang',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
      speakerType: '사내 연사',
      description: 'Coupang에서 AI 플랫폼 인프라를 구축하며 대규모 이커머스 서비스의 AI 시스템을 운영합니다. 실제 비즈니스에서의 AI 플랫폼 구축과 운영 노하우를 전달합니다.'
    },
    {
      name: 'Dr. Maria Garcia',
      role: 'NLP Research Scientist',
      company: 'Microsoft Research',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400',
      speakerType: '패널 토론',
      description: 'Microsoft Research에서 자연어 처리 연구를 담당하며 다국어 AI 모델 개발에 전념하고 있습니다. 언어 AI의 최신 발전과 글로벌 확장에 대한 토론을 이끕니다.'
    },
    {
      name: '조성민',
      role: 'AI Strategy Director',
      company: 'LG AI Research',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      speakerType: '사내 연사',
      description: 'LG AI Research에서 AI 전략 수립을 담당하며 가전과 AI의 융합을 통한 스마트 홈 생태계를 구축합니다. IoT와 AI의 결합을 통한 미래 생활 변화를 제시합니다.'
    },
    {
      name: 'Dr. Kevin Zhang',
      role: 'Computer Vision Researcher',
      company: 'NVIDIA Research',
      image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400',
      speakerType: '사외 연사',
      description: 'NVIDIA Research에서 컴퓨터 비전과 GPU 가속 AI 연구를 수행합니다. 고성능 컴퓨팅을 활용한 AI 모델 최적화와 차세대 비전 기술의 발전 방향을 소개합니다.'
    },
    {
      name: '한수진',
      role: 'AI Product Manager',
      company: 'SK Telecom',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
      speakerType: '패널 토론',
      description: 'SK Telecom에서 AI 제품 기획과 출시를 담당하며 통신과 AI의 융합 서비스를 개발합니다. 5G와 AI의 결합을 통한 새로운 비즈니스 모델에 대해 논의합니다.'
    },
    {
      name: 'Dr. Thomas Anderson',
      role: 'Quantum AI Researcher',
      company: 'IBM Quantum',
      image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400',
      speakerType: '사외 연사',
      description: 'IBM Quantum에서 양자 컴퓨팅과 AI의 융합 연구를 수행합니다. 양자 AI의 가능성과 미래 컴퓨팅 패러다임의 변화에 대한 혁신적인 관점을 제시합니다.'
    }
  ];

  // Group speakers into sets of 6
  const speakerSets = [];
  for (let i = 0; i < allSpeakers.length; i += 6) {
    speakerSets.push(allSpeakers.slice(i, i + 6));
  }

  const totalSets = speakerSets.length;

  const nextSet = () => {
    setCurrentSet((prev) => (prev + 1) % totalSets);
  };

  const prevSet = () => {
    setCurrentSet((prev) => (prev - 1 + totalSets) % totalSets);
  };

  const currentSpeakers = speakerSets[currentSet] || [];

  const getSpeakerTypeBadgeColor = (speakerType: string) => {
    switch (speakerType) {
      case '사내 연사':
        return 'bg-green-100 text-green-800';
      case '사외 연사':
        return 'bg-blue-100 text-blue-800';
      case '패널 토론':
        return 'bg-orange-100 text-orange-800';
      case 'Keynote':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section id="speakers" className="py-20 bg-transparent">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <MessageSquare className="w-8 h-8 text-[#5325BA]" />
            <h2 className="text-4xl md:text-5xl font-bold" style={{ color: '#5325BA' }}>
              DS AI Conference 연사진
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            AI 기술의 최전선에서 활동하는 전문가들을 만나보세요
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Navigation and Speaker Grid */}
          <div className="relative">
            {/* Left Arrow - Fixed positioning */}
            <Button
              onClick={prevSet}
              className="absolute left-0 z-10 bg-white hover:bg-gray-50 border-2 border-[#5325BA] text-[#5325BA] rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300"
              style={{ top: '290px', transform: 'translateX(-16px)' }}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>

            {/* Right Arrow - Fixed positioning */}
            <Button
              onClick={nextSet}
              className="absolute right-0 z-10 bg-white hover:bg-gray-50 border-2 border-[#5325BA] text-[#5325BA] rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300"
              style={{ top: '290px', transform: 'translateX(16px)' }}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>

            {/* Speaker Grid - Fixed height container */}
            <div className="px-12" style={{ minHeight: '400px' }}>
              <div className="grid grid-cols-3 gap-6">
              {currentSpeakers.map((speaker, index) => (
                <Card key={index} className="group overflow-hidden border-2 border-gray-100 hover:border-[#5325BA]/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-white relative">
                  <div className="relative aspect-square overflow-hidden">
                    <ImageWithFallback
                      src={speaker.image}
                      alt={speaker.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    <div className="absolute top-4 right-4">
                      <Badge 
                        variant="secondary"
                        className={`${
                          getSpeakerTypeBadgeColor(speaker.speakerType)
                        } font-medium border-0 shadow-sm`}
                      >
                        {speaker.speakerType}
                      </Badge>
                    </div>

                    {/* Hover Overlay with Speaker Info and Description */}
                    <div className="absolute inset-0 bg-white p-6 flex flex-col justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="text-center">
                        <h3 className="text-xl font-bold mb-2">{speaker.name}</h3>
                        <p className="text-[#5325BA] font-semibold text-sm mb-1">{speaker.role}</p>
                        <p className="text-sm font-medium mb-4">{speaker.company}</p>
                        <p className="text-sm leading-relaxed">{speaker.description}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
              </div>
            </div>

            {/* Set Indicator */}
            <div className="flex justify-center mt-8 gap-2">
              {speakerSets.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSet(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSet 
                      ? 'bg-[#5325BA] scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 