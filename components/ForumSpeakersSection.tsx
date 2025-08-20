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

export function ForumSpeakersSection() {
  const [currentSet, setCurrentSet] = useState(0);

  // 14 random speakers
  const allSpeakers: Speaker[] = [
    {
      name: '김현수',
      role: 'AI 전략팀장',
      company: '삼성전자',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      speakerType: '사내 연사',
      description: '삼성전자 AI 전략 수립과 실행을 담당하며, 10년 이상의 AI 연구 경험을 보유하고 있습니다. 차세대 AI 기술 트렌드와 삼성의 AI 비전에 대해 이야기합니다.'
    },
    {
      name: '박지영',
      role: 'AI 개발팀 리더',
      company: '삼성전자',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      speakerType: '사내 연사',
      description: '삼성전자 AI 개발팀을 이끌며 실제 제품에 적용되는 AI 기술 개발을 담당합니다. 실무진의 관점에서 AI 기술의 상용화 과정과 도전 과제를 공유합니다.'
    },
    {
      name: '이승호',
      role: 'AI 연구소장',
      company: '삼성전자',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      speakerType: 'Keynote',
      description: '삼성전자 AI 연구소를 총괄하며 AI 기술의 미래 방향성을 제시합니다. 글로벌 AI 트렌드와 삼성의 혁신적인 AI 연구 성과에 대한 키노트를 진행합니다.'
    },
    {
      name: '최민정',
      role: 'ML Engineer',
      company: '삼성전자',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
      speakerType: '사내 연사',
      description: '머신러닝 모델 개발과 최적화를 전문으로 하며, 삼성 제품의 AI 성능 향상을 위한 핵심 기술을 개발합니다. 실제 프로덕션 환경에서의 ML 구현 경험을 나눕니다.'
    },
    {
      name: '정태윤',
      role: 'Data Scientist',
      company: '삼성전자',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
      speakerType: '패널 토론',
      description: '빅데이터 분석과 AI 모델링 전문가로서 데이터 기반 의사결정을 지원합니다. 데이터 사이언스의 실무 적용과 AI 윤리에 대한 패널 토론에 참여합니다.'
    },
    {
      name: '강혜진',
      role: 'AI Product Manager',
      company: '삼성전자',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
      speakerType: '사내 연사',
      description: 'AI 제품의 기획과 출시를 담당하며, 사용자 중심의 AI 서비스 개발을 이끕니다. AI 제품 매니지먼트와 시장 전략에 대한 인사이트를 제공합니다.'
    },
    {
      name: 'Dr. Sarah Chen',
      role: 'AI Research Director',
      company: 'Stanford AI Lab',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
      speakerType: 'Keynote',
      description: 'Stanford AI Lab의 연구 책임자로서 차세대 AI 기술 연구를 이끌고 있습니다. AI의 미래와 혁신적인 연구 방향에 대한 키노트 강연을 진행합니다.'
    },
    {
      name: 'Prof. Michael Kim',
      role: 'Deep Learning Professor',
      company: 'MIT',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
      speakerType: '사외 연사',
      description: 'MIT의 딥러닝 전문 교수로서 최신 딥러닝 기술 동향과 연구 성과를 소개합니다. 학계의 최신 연구와 산업 적용 방안에 대해 논의합니다.'
    },
    {
      name: 'Dr. Anna Lee',
      role: 'NLP Researcher',
      company: 'Google DeepMind',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400',
      speakerType: '사외 연사',
      description: 'Google DeepMind의 자연어 처리 연구 전문가로서 대화형 AI와 언어 모델의 최신 발전 사항을 다룹니다. GPT와 같은 대규모 언어 모델의 발전 방향을 제시합니다.'
    },
    {
      name: 'Alex Johnson',
      role: 'MLOps Engineer',
      company: 'OpenAI',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      speakerType: '패널 토론',
      description: 'OpenAI에서 MLOps 시스템을 구축하고 운영하는 전문가입니다. 대규모 AI 모델의 배포와 운영에 대한 실무 경험과 베스트 프랙티스를 공유합니다.'
    },
    {
      name: 'Dr. Lisa Wang',
      role: 'Computer Vision Lead',
      company: 'Tesla',
      image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400',
      speakerType: '사외 연사',
      description: 'Tesla의 컴퓨터 비전 팀을 이끌며 자율주행 기술의 핵심인 시각 인식 AI를 개발합니다. 실제 자동차에 적용되는 컴퓨터 비전 기술의 혁신 사례를 소개합니다.'
    },
    {
      name: '윤서준',
      role: 'AI Ethics Researcher',
      company: 'KAIST',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      speakerType: '패널 토론',
      description: 'AI 윤리와 책임 있는 AI 개발을 연구하는 전문가입니다. AI 기술의 사회적 영향과 윤리적 고려사항에 대한 중요한 관점을 제시합니다.'
    },
    {
      name: '송미라',
      role: 'AI Startup CEO',
      company: 'TechVenture AI',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
      speakerType: '사외 연사',
      description: 'AI 스타트업을 성공적으로 이끌며 혁신적인 AI 솔루션을 개발하고 있습니다. 스타트업 관점에서의 AI 비즈니스 모델과 성공 전략을 공유합니다.'
    },
    {
      name: '황동혁',
      role: 'Robotics AI Engineer',
      company: 'Boston Dynamics',
      image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400',
      speakerType: '패널 토론',
      description: 'Boston Dynamics에서 로봇 AI 기술을 개발하며 물리적 세계와 상호작용하는 AI 시스템을 구축합니다. 로봇공학과 AI의 융합 기술에 대해 논의합니다.'
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
    <section id="forum-speakers" className="py-20 bg-transparent">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <MessageSquare className="w-8 h-8 text-[#5325BA]" />
            <h2 className="text-4xl md:text-5xl font-bold" style={{ color: '#5325BA' }}>
              Samsung AI Forum 연사
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            삼성의 AI 전문가들과 함께하는 특별한 시간
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
                        className={`${getSpeakerTypeBadgeColor(speaker.speakerType)} font-medium border-0 shadow-sm`}
                      >
                        {speaker.speakerType}
                      </Badge>
                    </div>

                    {/* Hover Overlay with Speaker Info and Description */}
                    <div className="absolute inset-0 bg-[#5325BA]/95 text-white p-6 flex flex-col justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="text-center">
                        <h3 className="text-xl font-bold mb-2">{speaker.name}</h3>
                        <p className="text-[#6FF28F] font-semibold text-sm mb-1">{speaker.role}</p>
                        <p className="text-white/90 text-sm font-medium mb-4">{speaker.company}</p>
                        <p className="text-white/95 text-sm leading-relaxed">{speaker.description}</p>
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