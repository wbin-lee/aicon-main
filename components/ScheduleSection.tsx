import { useState, forwardRef, useImperativeHandle } from 'react';
import { Calendar, Clock, Users, ArrowRight, MapPin, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { SessionDetailPage } from './SessionDetailPage';

interface Session {
  id?: string;
  time: string;
  title: string;
  type: string;
  speaker: string;
  description: string;
  videoUrl?: string;
  detailedDescription?: string;
  location?: string;
}

interface TimeSlot {
  time: string;
  sessions: Session[];
}

export const ScheduleSection = forwardRef<{ setSelectedDay: (day: 'day1' | 'day3') => void }>((props, ref) => {
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [selectedDay, setSelectedDay] = useState<'day1' | 'day3'>('day1');

  useImperativeHandle(ref, () => ({
    setSelectedDay: (day: 'day1' | 'day3') => {
      setSelectedDay(day);
    }
  }));

  // Create a map to store session IDs
  const getSessionId = (session: Session, timeSlotIndex: number, sessionIndex: number) => {
    // Calculate global session index across all days and time slots
    const day1Sessions = scheduleData.day1.reduce((total, slot) => total + slot.sessions.length, 0);
    const currentDayOffset = selectedDay === 'day3' ? day1Sessions : 0;
    const currentTimeSlotOffset = scheduleData[selectedDay]
      .slice(0, timeSlotIndex)
      .reduce((total, slot) => total + slot.sessions.length, 0);
    return (currentDayOffset + currentTimeSlotOffset + sessionIndex + 1).toString();
  };

  const scheduleData = {
    day1: [
      {
        time: '09:00-10:00',
        sessions: [{
          time: '09:00-10:00',
          title: '등록 및 네트워킹',
          type: 'Registration',
          speaker: '',
          description: '참가자 등록 및 환영 리셉션'
        }]
      },
      {
        time: '10:00-11:00',
        sessions: [{
          time: '10:00-11:00',
          title: 'AI의 미래: 혁신과 도전',
          type: 'Keynote',
          speaker: 'Dr. Sarah Chen',
          description: '글로벌 AI 트렌드와 미래 전망에 대한 키노트 연설',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          detailedDescription: 'AI 기술의 급속한 발전과 함께 우리 사회는 전례 없는 변화를 맞이하고 있습니다. 이번 키노트에서는 글로벌 AI 전문가 Dr. Sarah Chen이 AI의 현재와 미래, 그리고 우리가 직면하고 있는 기술적, 윤리적 도전과제들에 대해 심도 깊게 다룹니다. 머신러닝과 딥러닝의 최신 동향부터 AGI(Artificial General Intelligence)의 가능성까지, AI가 가져올 혁신적 변화와 우리가 준비해야 할 것들을 함께 살펴봅니다.'
        }]
      },
      {
        time: '11:15-12:15',
        sessions: [
          {
            time: '11:15-12:15',
            title: '딥러닝 최신 기술 동향',
            type: 'Tech Talk',
            speaker: 'Prof. Michael Kim',
            description: 'Transformer, Diffusion Model 등 최신 딥러닝 기술 소개',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            detailedDescription: '딥러닝 기술은 지속적으로 진화하고 있으며, 새로운 아키텍처와 학습 방법론이 끊임없이 등장하고 있습니다. 이 세션에서는 Transformer, BERT, GPT 등 최신 모델들의 핵심 원리와 실제 구현 방법을 다룹니다. 또한 Diffusion Model, Vision Transformer, 그리고 Multi-modal AI 등 최신 연구 동향을 살펴보고 실무에 바로 적용할 수 있는 인사이트를 제공합니다.'
          },
          {
            time: '11:15-12:15',
            title: '자연어 처리 기초',
            type: 'Workshop',
            speaker: 'Dr. Anna Lee',
            description: '텍스트 데이터 분석과 NLP 파이프라인 구축',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
            detailedDescription: '자연어 처리는 AI 분야에서 가장 빠르게 발전하는 영역 중 하나입니다. 이 워크샵에서는 텍스트 전처리부터 고급 NLP 모델까지 전체 파이프라인을 실습을 통해 학습합니다.'
          }
        ]
      },
      {
        time: '13:30-14:30',
        sessions: [{
          time: '13:30-14:30',
          title: '데이터 사이언스 실무 적용',
          type: 'Workshop',
          speaker: 'Team DataLab',
          description: '실제 비즈니스에서의 데이터 분석 사례 연구',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
          detailedDescription: '데이터 사이언스를 실제 비즈니스에 적용하는 과정에서 직면하는 다양한 도전과제들과 해결 방안을 다룹니다. 데이터 수집부터 전처리, 모델링, 배포까지 전체 파이프라인을 실제 사례를 통해 살펴보고, ROI 측정, 비즈니스 임팩트 평가 등 실무에서 중요한 요소들을 학습합니다.'
        }]
      },
      {
        time: '14:45-15:45',
        sessions: [{
          time: '14:45-15:45',
          title: 'MLOps와 프로덕션 배포',
          type: 'Tech Talk',
          speaker: 'Alex Johnson',
          description: '머신러닝 모델의 효율적인 운영과 배포 전략',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
          detailedDescription: 'ML 모델을 실제 서비스에 배포하고 운영하는 것은 연구 개발만큼이나 중요한 과제입니다. 이 세션에서는 MLOps의 핵심 개념부터 시작하여, 모델 버전 관리, 자동화된 테스트, 지속적 배포, 모니터링 등 전체 생명주기 관리 방법을 다룹니다. Docker, Kubernetes, MLflow 등 실제 도구들의 사용법과 베스트 프랙티스를 공유합니다.'
        }]
      }
    ],
    day3: [
      {
        time: '09:30-10:30',
        sessions: [{
          time: '09:30-10:30',
          title: 'Computer Vision 혁신',
          type: 'Tech Talk',
          speaker: 'Dr. Lisa Wang',
          description: '최신 컴퓨터 비전 기술과 산업 적용 사례'
        }]
      },
      {
        time: '10:45-11:45',
        sessions: [
          {
            time: '10:45-11:45',
            title: 'NLP와 대화형 AI',
            type: 'Workshop',
            speaker: 'ChatBot Team',
            description: 'GPT, BERT 활용한 자연어 처리 실습'
          },
          {
            time: '10:45-11:45',
            title: '강화학습 실무',
            type: 'Tech Talk',
            speaker: 'Prof. David Kim',
            description: '게임과 로봇 제어에서의 강화학습 적용'
          }
        ]
      },
      {
        time: '13:00-14:00',
        sessions: [{
          time: '13:00-14:00',
          title: 'AI 윤리와 책임',
          type: 'Panel',
          speaker: 'Industry Experts',
          description: 'AI 개발과 운영에서의 윤리적 고려사항'
        }]
      },
      {
        time: '14:15-15:15',
        sessions: [{
          time: '14:15-15:15',
          title: '스타트업 AI 성공사례',
          type: 'Case Study',
          speaker: 'Startup CEOs',
          description: 'AI 스타트업의 성공과 실패 경험 공유'
        }]
      },
      {
        time: '15:30-16:30',
        sessions: [{
          time: '15:30-16:30',
          title: '네트워킹 & 클로징',
          type: 'Networking',
          speaker: '',
          description: '참가자 간 네트워킹 및 컨퍼런스 마무리'
        }]
      }
    ]
  };

  const getTypeColor = (type: string) => {
    const colors = {
      'Keynote': 'bg-[#5325BA] text-white',
      'Tech Talk': 'bg-[#A48CED] text-white',
      'Workshop': 'bg-[#6FF28F] text-gray-900',
      'Panel': 'bg-[#A1BDF8] text-gray-900',
      'Case Study': 'bg-[#94FD7] text-gray-900',
      'Registration': 'bg-gray-200 text-gray-700',
      'Networking': 'bg-gray-200 text-gray-700'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-200 text-gray-700';
  };

  const handleOpenSessionDetail = (session: Session, timeSlotIndex: number, sessionIndex: number) => {
    // Assign ascending ID
    const sessionWithId = {
      ...session,
      id: getSessionId(session, timeSlotIndex, sessionIndex)
    };
    setSelectedSession(sessionWithId);
  };

  // Custom Schedule Card Component
  const ScheduleCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`hover:shadow-lg transition-shadow rounded-lg bg-white shadow-sm ${className}`}>
      {children}
    </div>
  );

  const ScheduleCardContent = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`p-0 ${className}`}>
      {children}
    </div>
  );

  return (
    <>
      {selectedSession && (
        <SessionDetailPage 
          session={selectedSession} 
          onClose={() => setSelectedSession(null)} 
        />
      )}
      <section id="schedule" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#5325BA' }}>
              세션 안내
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              양일간 진행되는 다양한 세션과 워크샵을 통해 
              최신 AI 기술과 실무 노하우를 경험하세요
            </p>
          </div>

        {/* Schedule Tabs */}
        <div className="flex justify-center mb-12">
          <TooltipProvider>
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
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost"
                    className="rounded-full px-8 py-4 flex flex-col items-center min-w-[180px] h-20 border-2 transition-all duration-200 bg-gray-100 border-gray-300 text-gray-500 hover:bg-gray-200 cursor-default"
                    onClick={() => {}} // No functionality
                  >
                    <span className="font-bold text-base text-[16px]">DX AI Forum</span>
                    <span className="text-sm opacity-80">DAY 2. 9월 16일</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs text-center">
                    Day 2는 DX부문 주관 행사로, 상세 내용은 해당 부문 안내 채널을 통해 확인 바랍니다.
                  </p>
                </TooltipContent>
              </Tooltip>
              
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
          </TooltipProvider>
        </div>

        {/* Schedule Display */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {scheduleData[selectedDay].map((timeSlot, index) => (
              <ScheduleCard key={index}>
                <ScheduleCardContent>
                  <div className="flex rounded-lg overflow-hidden border border-purple-200 group hover:shadow-lg transition-all duration-300 cursor-default">
                    {/* Time Section */}
                    <div className="w-40 p-4 bg-[#BEA4ED] group-hover:bg-[#EEE6FB] flex items-center justify-center transition-all duration-300">
                      <div className="text-center">
                        <div className="text-lg font-medium text-gray-800">
                          {timeSlot.time}
                        </div>
                      </div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="flex-1 p-4 bg-white group-hover:bg-gradient-to-r group-hover:from-[#E7DFFB] group-hover:to-[#CDC3F7] transition-all duration-300">
                      {timeSlot.sessions.length === 1 ? (
                        /* Single Seminar Layout */
                        <div className="flex-1">
                          <div className="flex justify-between items-start gap-4">
                            <div className="flex-1">
                              <div className="mb-3">
                                <Badge className={getTypeColor(timeSlot.sessions[0].type)}>
                                  {timeSlot.sessions[0].type}
                                </Badge>
                              </div>
                              
                              <h3 className="text-xl font-bold mb-3 text-gray-900">{timeSlot.sessions[0].title}</h3>
                              
                              {timeSlot.sessions[0].speaker && (
                                <div className="flex items-center text-purple-600">
                                  <Users className="w-4 h-4 mr-2" />
                                  <span className="font-medium">{timeSlot.sessions[0].speaker}</span>
                                </div>
                              )}
                            </div>
                            
                            {timeSlot.sessions[0].type !== 'Registration' && timeSlot.sessions[0].type !== 'Networking' && (
                              <div className="flex-shrink-0">
                                <Button 
                                  className="bg-purple-100 text-purple-600 hover:bg-purple-200 border-0 rounded-full px-4 py-2 text-sm"
                                  onClick={() => handleOpenSessionDetail(timeSlot.sessions[0], index, 0)}
                                >
                                  자세히 보기
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        /* Two Seminars Layout */
                        <div className="flex gap-6">
                          {/* Left Seminar */}
                          <div className="flex-1">
                            <div className="flex justify-between items-start gap-4">
                              <div className="flex-1">
                                <div className="mb-3">
                                  <Badge className={getTypeColor(timeSlot.sessions[0].type)}>
                                    {timeSlot.sessions[0].type}
                                  </Badge>
                                </div>
                                
                                <h3 className="text-xl font-bold mb-3 text-gray-900">{timeSlot.sessions[0].title}</h3>
                                
                                {timeSlot.sessions[0].speaker && (
                                  <div className="flex items-center text-purple-600">
                                    <Users className="w-4 h-4 mr-2" />
                                    <span className="font-medium">{timeSlot.sessions[0].speaker}</span>
                                  </div>
                                )}
                              </div>
                              
                              {timeSlot.sessions[0].type !== 'Registration' && timeSlot.sessions[0].type !== 'Networking' && (
                                <div className="flex-shrink-0">
                                  <Button 
                                    className="bg-purple-100 text-purple-600 hover:bg-purple-200 border-0 rounded-full px-4 py-2 text-sm"
                                    onClick={() => handleOpenSessionDetail(timeSlot.sessions[0], index, 0)}
                                  >
                                    자세히 보기
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {/* Vertical Divider */}
                          <div className="w-px bg-purple-200"></div>
                          
                          {/* Right Seminar */}
                          <div className="flex-1">
                            <div className="flex justify-between items-start gap-4">
                              <div className="flex-1">
                                <div className="mb-3">
                                  <Badge className={getTypeColor(timeSlot.sessions[1].type)}>
                                    {timeSlot.sessions[1].type}
                                  </Badge>
                                </div>
                                
                                <h3 className="text-xl font-bold mb-3 text-gray-900">{timeSlot.sessions[1].title}</h3>
                                
                                {timeSlot.sessions[1].speaker && (
                                  <div className="flex items-center text-purple-600">
                                    <Users className="w-4 h-4 mr-2" />
                                    <span className="font-medium">{timeSlot.sessions[1].speaker}</span>
                                  </div>
                                )}
                              </div>
                              
                              {timeSlot.sessions[1].type !== 'Registration' && timeSlot.sessions[1].type !== 'Networking' && (
                                <div className="flex-shrink-0">
                                  <Button 
                                    className="bg-purple-100 text-purple-600 hover:bg-purple-200 border-0 rounded-full px-4 py-2 text-sm"
                                    onClick={() => handleOpenSessionDetail(timeSlot.sessions[1], index, 1)}
                                  >
                                    자세히 보기
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </ScheduleCardContent>
              </ScheduleCard>
            ))}
          </div>
        </div>

        {/* Venue Info */}

      </div>
    </section>
    </>
  );
});