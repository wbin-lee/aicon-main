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

interface TimeSlot {
  time: string;
  sessions: Session[];
}

export function ForumScheduleSection() {
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  // Forum schedule data (Day 1 only)
  const forumScheduleData = [
    {
      time: '09:00-10:00',
      sessions: [{
        time: '09:00-10:00',
        title: 'Samsung AI Forum 개회식',
        type: '개회식',
        speaker: '삼성 AI 팀',
        description: 'Samsung AI Forum 개회 및 환영사',
        detailedDescription: 'Samsung AI Forum의 시작을 알리는 개회식입니다. 삼성의 AI 비전과 이번 포럼의 목표를 소개합니다.'
      }]
    },
    {
      time: '10:00-11:00',
      sessions: [{
        time: '10:00-11:00',
        title: '기업 AI 도입 전략',
        type: '기조연설',
        speaker: '삼성 AI 전략팀장',
        description: '성공적인 기업 AI 도입을 위한 전략과 사례',
        detailedDescription: '삼성의 AI 도입 경험을 바탕으로 기업에서 AI를 성공적으로 도입하기 위한 전략과 실제 사례를 공유합니다.'
      }]
    },
    {
      time: '11:00-12:00',
      sessions: [{
        time: '11:00-12:00',
        title: 'AI 실무 적용 사례',
        type: '사례 발표',
        speaker: '삼성 AI 개발팀',
        description: '실제 업무에서의 AI 활용 사례와 경험',
        detailedDescription: '삼성에서 실제로 AI를 업무에 적용한 사례들과 그 과정에서 얻은 인사이트를 공유합니다.'
      }]
    },
    {
      time: '13:00-14:00',
      sessions: [{
        time: '13:00-14:00',
        title: '네트워킹 및 Q&A',
        type: '네트워킹',
        speaker: '전체 참가자',
        description: '참가자들과의 자유로운 네트워킹 시간',
        detailedDescription: 'Samsung AI Forum 참가자들과 자유롭게 네트워킹하고 질의응답하는 시간입니다.'
      }]
    }
  ];

  const getSessionId = (session: Session, timeSlotIndex: number, sessionIndex: number) => {
    const currentTimeSlotOffset = forumScheduleData
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
      case '개회식': return 'bg-purple-100 text-purple-800';
      case '기조연설': return 'bg-blue-100 text-blue-800';
      case '사례 발표': return 'bg-green-100 text-green-800';
      case '네트워킹': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (selectedSession) {
    return <SessionDetailPage session={selectedSession} onClose={() => setSelectedSession(null)} />;
  }

  return (
    <section id="forum-schedule" className="py-20 bg-transparent">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Calendar className="w-8 h-8 text-[#5325BA]" />
            <h2 className="text-4xl md:text-5xl font-bold" style={{ color: '#5325BA' }}>
              Samsung AI Forum 일정
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            삼성과 함께하는 AI 포럼의 상세 일정을 확인하세요
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* <div className="mb-8">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-[#5325BA] rounded-full"></div>
                <h3 className="text-2xl font-bold text-gray-900">Day 1 - Samsung AI Forum</h3>
                <Badge variant="outline" className="ml-auto">
                  {forumScheduleData.reduce((total, slot) => total + slot.sessions.length, 0)} 세션
                </Badge>
              </div>
              <p className="text-gray-600">기업 AI 도입 전략과 실무 사례를 중심으로 한 포럼</p>
            </div>
          </div> */}

          <div className="space-y-6">
            {forumScheduleData.map((timeSlot, timeSlotIndex) => (
              <div key={timeSlot.time} className="space-y-4">
                {timeSlot.sessions.map((session, sessionIndex) => (
                  <div
                    key={`${timeSlot.time}-${sessionIndex}`}
                    className="flex rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer bg-white"
                    onClick={() => handleOpenSessionDetail(session, timeSlotIndex, sessionIndex)}
                  >
                    {/* Time Section */}
                    <div className="w-32 p-4 bg-[#BEA4ED] flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-sm font-medium text-gray-800">
                          {session.time}
                        </div>
                      </div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="flex-1 p-4 bg-white">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge className={`${getTypeColor(session.type)} border-0 font-medium text-xs`}>
                              {session.type}
                            </Badge>
                            <h3 className="text-lg font-bold text-gray-900">{session.title}</h3>
                          </div>
                          
                          {session.speaker && (
                            <div className="flex items-center gap-2 text-gray-600">
                              <Users className="w-4 h-4" />
                              <span className="font-medium text-sm">{session.speaker}</span>
                            </div>
                          )}
                        </div>
                        
                        {session.type !== 'Registration' && session.type !== 'Networking' && (
                          <div className="flex-shrink-0">
                            <Button 
                              className="bg-gray-100 text-gray-600 hover:bg-purple-200 border-2 rounded-md px-3 py-1 text-sm"
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 