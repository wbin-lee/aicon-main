import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Calendar, Clock, Users, MapPin, Gift, Camera, Coffee, Trophy, Star, Info } from 'lucide-react';

export function OnSiteEventsSection() {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSiteEvents = [
    {
      id: 1,
      title: 'AI 포토존',
      description: 'AI 기술을 활용한 인터랙티브 포토존에서 특별한 추억을 만들어보세요',
      time: '09:00 - 18:00',
      location: '1층 로비',
      type: 'Photo Zone',
      icon: Camera,
      color: 'bg-[#5325BA]',
      participants: '제한없음',
      detailedDescription: 'AI 기술을 활용한 최첨단 포토존에서 특별한 추억을 만들어보세요. 실시간 AI 필터와 배경 교체 기술을 통해 독특하고 재미있는 사진을 촬영할 수 있습니다.',
      features: [
        '실시간 AI 배경 교체',
        '스타일 전송 필터',
        'AR 이펙트 적용',
        '즉석 프린트 서비스',
        'QR 코드를 통한 사진 다운로드'
      ],
      schedule: [
        { time: '09:00-12:00', activity: '오전 포토 세션' },
        { time: '12:00-13:00', activity: '점심 시간 (서비스 중단)' },
        { time: '13:00-18:00', activity: '오후 포토 세션' }
      ],
      requirements: '스마트폰 또는 카메라 지참',
      benefits: '무료 포토 프린트 2매 제공'
    },
    {
      id: 2,
      title: '네트워킹 라운지',
      description: '참가자들과 자유로운 네트워킹과 커피타임을 즐기실 수 있습니다',
      time: '10:00 - 17:00',
      location: '2층 라운지',
      type: 'Networking',
      icon: Coffee,
      color: 'bg-[#A48CED]',
      participants: '제한없음',
      detailedDescription: '편안한 분위기의 네트워킹 라운지에서 동료들과 자유로운 대화를 나누고, 새로운 인맥을 만들어보세요. 다양한 음료와 간식이 제공됩니다.',
      features: [
        '프리미엄 커피 & 차 무료 제공',
        '각종 간식 및 디저트',
        '편안한 소파 & 테이블',
        '네트워킹 게임 코너',
        '명함 교환 이벤트'
      ],
      schedule: [
        { time: '10:00-12:00', activity: '모닝 커피 타임' },
        { time: '12:00-14:00', activity: '런치 네트워킹' },
        { time: '14:00-17:00', activity: '애프터눈 티 타임' }
      ],
      requirements: '참가자 배지 착용 필수',
      benefits: '네트워킹 이벤트 참여자 전원 기념품 증정'
    },
    {
      id: 3,
      title: 'AI 퀴즈 대회',
      description: 'AI 관련 퀴즈를 풀고 푸짐한 상품을 받아가세요',
      time: '14:00 - 15:00',
      location: '3층 이벤트홀',
      type: 'Quiz',
      icon: Trophy,
      color: 'bg-[#6FF28F]',
      participants: '선착순 50명',
      detailedDescription: 'AI 기술과 관련된 흥미로운 퀴즈 대회에 참여하여 여러분의 지식을 테스트해보세요. 다양한 난이도의 문제와 푸짐한 상품이 준비되어 있습니다.',
      features: [
        '3라운드 진행 (초급, 중급, 고급)',
        '실시간 순위 확인',
        '팀 플레이 가능',
        '객관식 + 주관식 문제',
        '라이브 해설 제공'
      ],
      schedule: [
        { time: '14:00-14:10', activity: '참가자 등록 및 룰 설명' },
        { time: '14:10-14:45', activity: '퀴즈 대회 진행' },
        { time: '14:45-15:00', activity: '시상식 및 상품 증정' }
      ],
      requirements: '현장 등록 필수 (선착순 50명)',
      benefits: '1등 갤럭시 탭, 2등 에어팟, 3등 스타벅스 기프티콘'
    },
    {
      id: 4,
      title: '경품 추첨',
      description: '참가자 전원 대상 경품 추첨 이벤트에 참여하세요',
      time: '17:30 - 18:00',
      location: 'Main Hall',
      type: 'Prize Draw',
      icon: Gift,
      color: 'bg-[#A1BDF8]',
      participants: '참가자 전원',
      detailedDescription: '하루를 마무리하는 대형 경품 추첨 이벤트입니다. 참가자 전원이 자동으로 추첨 대상이 되며, 다양한 상품을 받을 수 있는 기회가 제공됩니다.',
      features: [
        '자동 추첨 시스템',
        '다양한 등급의 상품',
        '실시간 추첨 진행',
        '전체 참가자 대상',
        'AI 기반 공정한 추첨'
      ],
      schedule: [
        { time: '17:30-17:35', activity: '추첨 시스템 준비' },
        { time: '17:35-17:55', activity: '단계별 추첨 진행' },
        { time: '17:55-18:00', activity: '대상 발표 및 마무리' }
      ],
      requirements: '참가자 등록 완료자 자동 참여',
      benefits: '대상: 맥북 프로, 1등: 아이패드, 2등: 갤럭시 버즈'
    }
  ];

  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  return (
    <section id="on-site-events" className="py-20 bg-transparent">
      <div className="container mx-auto px-6 bg-green">
        <div className="text-center mb-16">
                      <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#5325BA' }}>현장 이벤트</h2>
          <p className="text-black/80 max-w-2xl mx-auto">
            AI CON 2025에서 진행되는 다양한 현장 이벤트에 참여하여 
            더욱 풍성한 경험을 만들어보세요
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {onSiteEvents.map((event) => {
            const IconComponent = event.icon;
            return (
              <Card key={event.id} className="bg-white/10 backdrop-blur-md border-white hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-xl flex flex-col h-full">
                <CardHeader className="text-center pb-4">
                  <div className={`mx-auto mb-4 w-16 h-16 ${event.color} rounded-full flex items-center justify-center`}>
                    <IconComponent className="w-8 h-8 text-gray-900" />
                  </div>
                  <div className="space-y-2">
                    <Badge variant="secondary" className="bg-white/20 text-black border-white/30">
                      {event.type}
                    </Badge>
                    <CardTitle className="text-black">{event.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col h-full space-y-4">
                  <p className="text-black/80 text-center flex-shrink-0 h-16 flex items-center justify-center">
                    {event.description}
                  </p>
                  
                  <div className="space-y-3 text-sm flex-shrink-0">
                    <div className="flex items-center space-x-2 text-black/80">
                      <Clock className="w-4 h-4 text-[#6FF28F]" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-black/80">
                      <MapPin className="w-4 h-4 text-[#6FF28F]" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-black/80">
                      <Users className="w-4 h-4 text-[#6FF28F]" />
                      <span>{event.participants}</span>
                    </div>
                  </div>

                  <div className="flex-grow"></div>

                  <Button 
                    className="w-full bg-[#5325BA] hover:bg-[#5325BA]/90 text-white flex-shrink-0"
                    onClick={() => {
                      handleEventClick(event);
                    }}
                  >
                    자세히 보기
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Event Detail Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
            {selectedEvent && (
              <>
                <DialogHeader className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 ${selectedEvent.color} rounded-full flex items-center justify-center`}>
                        <selectedEvent.icon className="w-6 h-6 text-gray-900" />
                      </div>
                      <div>
                        <Badge variant="secondary" className="mb-2">
                          {selectedEvent.type}
                        </Badge>
                        <DialogTitle className="text-2xl font-bold text-left">
                          {selectedEvent.title}
                        </DialogTitle>
                      </div>
                    </div>
                  </div>
                </DialogHeader>

                <div className="space-y-6 mt-6">
                  {/* Basic Info */}
                  <div className="grid md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-[#5325BA]" />
                      <div>
                        <p className="text-sm text-gray-600">시간</p>
                        <p className="font-medium">{selectedEvent.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-5 h-5 text-[#5325BA]" />
                      <div>
                        <p className="text-sm text-gray-600">장소</p>
                        <p className="font-medium">{selectedEvent.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-[#5325BA]" />
                      <div>
                        <p className="text-sm text-gray-600">참가자</p>
                        <p className="font-medium">{selectedEvent.participants}</p>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Description */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <Info className="w-5 h-5 mr-2 text-[#5325BA]" />
                      상세 설명
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {selectedEvent.detailedDescription}
                    </p>
                  </div>

                  {/* Features */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <Star className="w-5 h-5 mr-2 text-[#5325BA]" />
                      주요 특징
                    </h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {selectedEvent.features.map((feature: string, index: number) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-[#6FF28F] rounded-full flex-shrink-0"></div>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Schedule */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-[#5325BA]" />
                      세부 일정
                    </h3>
                    <div className="space-y-3">
                      {selectedEvent.schedule.map((item: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium text-[#5325BA]">{item.time}</span>
                          <span className="text-gray-700">{item.activity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Requirements and Benefits */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <h4 className="font-semibold text-orange-800 mb-2">참가 요건</h4>
                      <p className="text-orange-700 text-sm">{selectedEvent.requirements}</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-green-800 mb-2">혜택</h4>
                      <p className="text-green-700 text-sm">{selectedEvent.benefits}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3 pt-4 border-t">
                    <Button 
                      className="flex-1 bg-[#5325BA] hover:bg-[#5325BA]/90 text-white"
                      onClick={() => {
                        // Handle registration
                        setIsModalOpen(false);
                      }}
                    >
                      참가 신청
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => setIsModalOpen(false)}
                    >
                      닫기
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}