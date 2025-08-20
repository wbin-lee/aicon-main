import { useState } from 'react';
import { Calendar, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
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

// interface TimeSlot {
//   time: string;
//   sessions: Session[];
// }

export function ConferenceScheduleSection() {
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  // Conference schedule data (Day 3 only)
  const conferenceScheduleData = [
    {
      time: '09:00-10:00',
      sessions: [{
        time: '09:00-10:00',
        title: '등록 및 환영 인사',
        type: '등록',
        speaker: 'DS AI Conference 운영팀',
        description: '참가자 등록 및 컨퍼런스 개회',
        detailedDescription: 'DS AI Conference 2025의 시작을 알리는 등록 및 개회식입니다.'
      }]
    },
    {
      time: '10:00-11:00',
      sessions: [{
        time: '10:00-11:00',
        title: 'AI의 미래: 혁신과 도전',
        type: '키노트',
        speaker: 'Dr. Sarah Chen',
        description: 'AI 기술의 현재와 미래 전망',
        detailedDescription: '인공지능 기술의 현재 상황을 분석하고, 앞으로의 발전 방향과 해결해야 할 과제들을 살펴봅니다.',
        location: '메인 오디토리움'
      }]
    },
    {
      time: '11:00-12:00',
      sessions: [
        {
                  time: '11:00-12:00',
        title: 'LLM 기반 서비스 구축하기',
        type: '기술 세션',
        speaker: '김민준',
        description: '대규모 언어 모델을 활용한 실제 서비스 개발 경험',
        detailedDescription: 'GPT와 같은 대규모 언어 모델을 실제 서비스에 적용하는 방법과 주의사항, 최적화 기법을 다룹니다.',
        location: '컨퍼런스 홀 A'
        },
        {
                  time: '11:00-12:00',
        title: '컴퓨터 비전의 최신 동향',
        type: '기술 세션',
        speaker: '박소영',
        description: '이미지 인식과 처리 기술의 발전',
        detailedDescription: '딥러닝 기반 컴퓨터 비전 기술의 최신 동향과 실제 적용 사례를 소개합니다.',
        location: '컨퍼런스 홀 B'
        },
        {
                  time: '11:00-12:00',
        title: '강화학습 실무 적용',
        type: '워크샵',
        speaker: 'Prof. David Kim',
        description: '게임과 로봇 제어에서의 강화학습 활용',
        detailedDescription: '강화학습 알고리즘을 실제 게임 AI와 로봇 제어에 적용하는 방법을 실습을 통해 학습합니다.',
        location: '워크샵룸 C'
        }
      ]
    },
    {
      time: '13:00-14:00',
      sessions: [{
        time: '13:00-14:00',
        title: '점심 시간',
        type: '휴식',
        speaker: '-',
        description: '네트워킹 및 점심 식사',
        detailedDescription: '참가자들과의 네트워킹 시간 및 점심 식사 시간입니다.'
      }]
    },
    {
      time: '14:00-15:00',
      sessions: [
        {
          time: '14:00-15:00',
          title: 'AI 윤리와 책임',
          type: '패널 토론',
          speaker: '이정호, 최유진, 강민수',
          description: 'AI 기술 발전과 함께 고려해야 할 윤리적 이슈',
          detailedDescription: 'AI 기술이 사회에 미치는 영향과 개발자, 기업, 정부가 고려해야 할 윤리적 책임을 토론합니다.'
        },
        {
          time: '14:00-15:00',
          title: 'MLOps 실전 가이드',
          type: '워크샵',
          speaker: '정현우',
          description: '머신러닝 모델의 운영과 배포 실무',
          detailedDescription: '머신러닝 모델을 실제 운영 환경에 배포하고 관리하는 MLOps 실무 경험을 공유합니다.'
        }
      ]
    },
    {
      time: '15:00-16:00',
      sessions: [{
        time: '15:00-16:00',
        title: '폐회식 및 네트워킹',
        type: '폐회식',
        speaker: '전체 참가자',
        description: 'DS AI Conference 2025 마무리 및 네트워킹',
        detailedDescription: 'DS AI Conference 2025의 마무리와 참가자들 간의 자유로운 네트워킹 시간입니다.'
      }]
    }
  ];

  const getSessionId = (session: Session, timeSlotIndex: number, sessionIndex: number) => {
    const currentTimeSlotOffset = conferenceScheduleData
      .slice(0, timeSlotIndex)
      .reduce((total, slot) => total + slot.sessions.length, 0);
    return (currentTimeSlotOffset + sessionIndex + 1).toString();
  };

  const handleOpenSessionDetail = (session: Session, timeSlotIndex: number, sessionIndex: number) => {
    const sessionWithId = {
      ...session,
      id: getSessionId(session, timeSlotIndex, sessionIndex)
    };
    setSelectedSession(sessionWithId);
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case '등록': return 'bg-gray-100 text-gray-800';
      case '키노트': return 'bg-purple-100 text-purple-800';
      case '기술 세션': return 'bg-blue-100 text-blue-800';
      case '패널 토론': return 'bg-green-100 text-green-800';
      case '워크샵': return 'bg-orange-100 text-orange-800';
      case '휴식': return 'bg-yellow-100 text-yellow-800';
      case '폐회식': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (selectedSession) {
    return <SessionDetailPage session={selectedSession} onClose={() => setSelectedSession(null)} />;
  }

  return (
    <section id="schedule" className="py-20 bg-transparent">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Calendar className="w-8 h-8 text-[#5325BA]" />
            <h2 className="text-4xl md:text-5xl font-bold" style={{ color: '#5325BA' }}>
              DS AI Conference 일정
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            데이터 사이언스 AI 컨퍼런스의 상세 일정을 확인하세요
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* <div className="mb-8">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-[#5325BA] rounded-full"></div>
                <h3 className="text-2xl font-bold text-gray-900">Day 3 - DS AI Conference</h3>
                <Badge variant="outline" className="ml-auto">
                  {conferenceScheduleData.reduce((total, slot) => total + slot.sessions.length, 0)} 세션
                </Badge>
              </div>
              <p className="text-gray-600">AI 기술과 연구 동향을 중심으로 한 컨퍼런스</p>
            </div>
          </div> */}

          <div className="space-y-6">
            {conferenceScheduleData.map((timeSlot, timeSlotIndex) => (
              <div key={timeSlot.time} className="flex rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 bg-white">
                {/* Time Section */}
                <div className="w-32 p-4 bg-[#BEA4ED] flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-800">
                      {timeSlot.time}
                    </div>
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="flex-1 bg-white flex">
                  {timeSlot.sessions.map((session, sessionIndex) => (
                    <div key={`${timeSlot.time}-${sessionIndex}`} className="flex-1 relative">
                      {/* Vertical divider (except for last session) */}
                      {sessionIndex < timeSlot.sessions.length - 1 && (
                        <div className="absolute right-0 top-0 bottom-0 w-px bg-gray-200"></div>
                      )}
                      
                      <div 
                        className="p-4 h-full cursor-pointer hover:bg-gray-50 transition-colors duration-300"
                        onClick={() => handleOpenSessionDetail(session, timeSlotIndex, sessionIndex)}
                      >
                        <div className="flex items-center justify-between h-full">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              {timeSlot.sessions.length < 3 && (
                                <Badge className={`${getTypeColor(session.type)} border-0 font-medium text-xs`}>
                                  {session.type}
                                </Badge>
                              )}
                              <h3 className="text-lg font-bold text-gray-900">{session.title}</h3>
                            </div>
                            
                            {session.speaker && session.speaker !== '-' && (
                              <div className="flex items-center gap-2 text-gray-600">
                                <Users className="w-4 h-4" />
                                <span className="font-medium text-sm">{session.speaker}</span>
                              </div>
                            )}
                          </div>
                          
                          {session.type !== '등록' && session.type !== '휴식' && session.type !== '폐회식' && (
                            <div className="flex-shrink-0 ml-2">
                              <Button 
                                className="bg-gray-100 text-gray-600 hover:bg-purple-200 border-2 border-gray-600 rounded-md px-3 py-1 text-sm"
                              >
                                자세히 보기
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 