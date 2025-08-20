import { useState, forwardRef, useImperativeHandle } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Calendar, MessageSquare } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Speaker {
  name: string;
  role: string;
  company: string;
  image: string;
  bio: string;
  expertise: string[];
  session: string;
  speakerType: '사외 연사' | '사내 연사';
  knoxId?: string;
  social: {
    linkedin: string;
    twitter: string;
    website: string;
  };
}

export const SpeakersSection = forwardRef<{ setSelectedDay: (day: string) => void }>((props, ref) => {
  const [selectedDay, setSelectedDay] = useState('day1');

  useImperativeHandle(ref, () => ({
    setSelectedDay: (day: string) => {
      setSelectedDay(day);
    }
  }));
  const speakersData = {
    day1: [
      {
        name: 'Dr. Sarah Chen',
        role: 'Chief AI Scientist',
        company: 'Google DeepMind',
        image: 'https://images.unsplash.com/photo-1494790108755-2616b9b6b991?w=400',
        bio: '15년간 AI 연구에 매진해온 세계적인 전문가로, 자연어 처리와 컴퓨터 비전 분야의 혁신을 이끌고 있습니다.',
        expertise: ['Natural Language Processing', 'Computer Vision', 'Deep Learning'],
        session: 'AI의 미래: 혁신과 도전',
        speakerType: '사외 연사',
        social: {
          linkedin: '#',
          twitter: '#',
          website: '#'
        }
      },
      {
        name: 'Prof. Michael Kim',
        role: 'Professor of Computer Science',
        company: 'Stanford University',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
        bio: '딥러닝 아키텍처 설계의 선구자로, Transformer 모델 최적화 연구로 유명합니다.',
        expertise: ['Deep Learning', 'Neural Architecture', 'Model Optimization'],
        session: '딥러닝 최신 기술 동향',
        speakerType: '사외 연사',
        social: {
          linkedin: '#',
          twitter: '#',
          website: '#'
        }
      },
      {
        name: 'Alex Johnson',
        role: 'Senior ML Engineer',
        company: 'Netflix',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        bio: '대규모 ML 시스템 구축과 운영의 전문가로, 추천 시스템과 MLOps 분야에서 활동하고 있습니다.',
        expertise: ['MLOps', 'Recommendation Systems', 'Scalable ML'],
        session: 'MLOps와 프로덕션 배포',
        speakerType: '사내 연사',
        knoxId: 'alex.johnson',
        social: {
          linkedin: '#',
          twitter: '#',
          website: '#'
        }
      }
    ],
    day3: [
      {
        name: 'Dr. Lisa Wang',
        role: 'Head of AI Research',
        company: 'Meta Reality Labs',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
        bio: '컴퓨터 비전과 증강현실 분야의 전문가로, 실시간 객체 인식 기술 개발을 이끌고 있습니다.',
        expertise: ['Computer Vision', 'Augmented Reality', 'Real-time Processing'],
        session: 'Computer Vision 혁신',
        speakerType: '사외 연사',
        social: {
          linkedin: '#',
          twitter: '#',
          website: '#'
        }
      },
      {
        name: 'Dr. Emma Rodriguez',
        role: 'AI Ethics Researcher',
        company: 'MIT AI Ethics Lab',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
        bio: 'AI 윤리와 공정성 연구의 권위자로, 책임감 있는 AI 개발을 위한 가이드라인 수립에 기여하고 있습니다.',
        expertise: ['AI Ethics', 'Fairness in ML', 'Responsible AI'],
        session: 'AI 윤리와 책임',
        speakerType: '사내 연사',
        knoxId: 'emma.rodriguez',
        social: {
          linkedin: '#',
          twitter: '#',
          website: '#'
        }
      },
      {
        name: 'James Park',
        role: 'Founder &amp; CEO',
        company: 'AI Startup Hub',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
        bio: '여러 AI 스타트업을 성공적으로 이끈 경험을 바탕으로 창업가들에게 실무 노하우를 전수하고 있습니다.',
        expertise: ['AI Entrepreneurship', 'Product Strategy', 'Team Building'],
        session: '스타트업 AI 성공사례',
        speakerType: '사외 연사',
        social: {
          linkedin: '#',
          twitter: '#',
          website: '#'
        }
      }
    ]
  };

  const currentSpeakers = speakersData[selectedDay as keyof typeof speakersData];

  return (
    <section id="speakers" className="py-20 bg-transparent">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#5325BA' }}>
            연사진
          </h2>
        </div>

        {/* Day Selector */}
        <div className="flex justify-center mb-12">
          <div className="flex gap-4">
            <Button 
              variant="ghost"
              className={`rounded-full px-8 py-4 flex flex-col items-center min-w-[180px] h-20 border-2 transition-all duration-300 transform ${
                selectedDay === 'day1' 
                  ? 'bg-[#5325BA] border-[#5325BA] text-white hover:bg-[#5325BA] shadow-lg scale-105 ring-4 ring-[#5325BA]/20' 
                  : 'bg-white/80 border-[#5325BA]/40 text-gray-700 hover:text-[#5325BA] hover:bg-white hover:border-[#5325BA] hover:shadow-md'
              }`}
              onClick={() => setSelectedDay('day1')}
            >
              <span className="font-bold text-base text-[16px]">DS AI FORUM</span>
              <span className="text-sm opacity-80">DAY 1. 9월 15일</span>
            </Button>
            <Button 
              variant="ghost"
              className={`rounded-full px-8 py-4 flex flex-col items-center min-w-[180px] h-20 border-2 transition-all duration-300 transform ${
                selectedDay === 'day3' 
                  ? 'bg-[#5325BA] border-[#5325BA] text-white hover:bg-[#5325BA] shadow-lg scale-105 ring-4 ring-[#5325BA]/20' 
                  : 'bg-white/80 border-[#5325BA]/40 text-gray-700 hover:text-[#5325BA] hover:bg-white hover:border-[#5325BA] hover:shadow-md'
              }`}
              onClick={() => setSelectedDay('day3')}
            >
              <span className="font-bold text-base text-[16px]">AI CON</span>
              <span className="text-sm opacity-80">DAY 3. 9월 17일</span>
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {currentSpeakers.map((speaker, index) => (
            <Card key={index} className="bg-white group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 shadow-lg flex flex-col h-full">
              <div className="relative">
                <div className="aspect-square overflow-hidden">
                  <ImageWithFallback
                    src={speaker.image}
                    alt={speaker.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                {/* Overlay with Session Info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <Badge className="bg-[#6FF28F] text-gray-900 mb-2">
                      {speaker.session}
                    </Badge>
                  </div>
                </div>
              </div>

              <CardContent className="p-6 flex flex-col flex-grow">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold">{speaker.name}</h3>
                    {/* Speaker Type Badge */}
                    <Badge 
                      variant="secondary" 
                      className={`px-3 py-1 text-xs pointer-events-none ${
                        speaker.speakerType === '사내 연사'
                          ? 'bg-[#5325BA] text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {speaker.speakerType}
                    </Badge>
                  </div>
                  <p className="text-[#5325BA] font-medium">{speaker.role}</p>
                  <p className="text-gray-600">{speaker.company}</p>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
                  {speaker.bio}
                </p>

                {/* Messenger Button for Internal Speakers */}
                {speaker.speakerType === '사내 연사' && speaker.knoxId && (
                  <Button
                    className="w-full bg-[#6FF28F] hover:bg-[#6FF28F]/90 text-gray-900 flex items-center justify-center gap-2 mt-auto"
                    onClick={() => {
                      window.open(`mysingleim://ids=${speaker.knoxId}`, '_self');
                    }}
                  >
                    <MessageSquare className="w-4 h-4" />
                    메신저 보내기
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>


      </div>
    </section>
  );
});