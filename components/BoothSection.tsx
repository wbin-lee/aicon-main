import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { MapPin, Info, Lightbulb, Camera, Building, Users2, ExternalLink } from 'lucide-react';

interface BoothInfo {
  id: string;
  name: string;
  department: string;
  description: string;
  category: string;
  position: {
    top: string;
    left: string;
    width: string;
    height: string;
  };
  serviceLinks?: {
    name: string;
    url: string;
  }[];
}

// Booth data based on the actual floor plan image
const boothsData: BoothInfo[] = [
  // 포스터세션 1-10 (개별 부스)
  {
    id: 'poster-booth-1',
    name: '포스터세션1',
    department: 'AI Vision Lab',
    description: '컴퓨터 비전과 딥러닝을 활용한 이미지 인식 기술 연구 성과를 소개합니다.',
    category: 'research',
    position: { top: '5%', left: '5%', width: '4.2%', height: '8%' }
  },
  {
    id: 'poster-booth-2',
    name: '포스터세션2',
    department: 'NLP Research Team',
    description: '자연어 처리와 대화형 AI 모델 개발에 대한 최신 연구를 전시합니다.',
    category: 'research',
    position: { top: '5%', left: '9.2%', width: '4.2%', height: '8%' }
  },
  {
    id: 'poster-booth-3',
    name: '포스터세션3',
    department: 'ML Platform Team',
    description: '머신러닝 플랫폼과 AutoML 솔루션의 연구 개발 현황을 소개합니다.',
    category: 'research',
    position: { top: '5%', left: '13.4%', width: '4.2%', height: '8%' }
  },
  {
    id: 'poster-booth-4',
    name: '포스터세션4',
    department: 'Edge AI Lab',
    description: '엣지 디바이스를 위한 경량화 AI 모델과 최적화 기술을 전시합니다.',
    category: 'research',
    position: { top: '5%', left: '17.6%', width: '4.2%', height: '8%' }
  },
  {
    id: 'poster-booth-5',
    name: '포스터세션5',
    department: 'Robotics AI Team',
    description: '로봇 제어와 자율 시스템을 위한 AI 기술 연구 성과를 소개합니다.',
    category: 'research',
    position: { top: '5%', left: '21.8%', width: '4.2%', height: '8%' }
  },
  {
    id: 'poster-booth-6',
    name: '포스터세션6',
    department: 'AI Security Lab',
    description: 'AI 보안과 프라이버시 보호 기술에 대한 연구 결과를 전시합니다.',
    category: 'research',
    position: { top: '5%', left: '26%', width: '4.2%', height: '8%' }
  },
  {
    id: 'poster-booth-7',
    name: '포스터세션7',
    department: 'Quantum AI Lab',
    description: '양자 컴퓨팅과 AI의 융합 기술 연구 성과를 소개합니다.',
    category: 'research',
    position: { top: '5%', left: '30.2%', width: '4.2%', height: '8%' }
  },
  {
    id: 'poster-booth-8',
    name: '포스터세션8',
    department: 'Healthcare AI Team',
    description: '의료 진단과 헬스케어를 위한 AI 기술 연구 성과를 전시합니다.',
    category: 'research',
    position: { top: '5%', left: '34.4%', width: '4.2%', height: '8%' }
  },
  {
    id: 'poster-booth-9',
    name: '포스터세션9',
    department: 'Autonomous Systems Lab',
    description: '자율주행과 무인 시스템을 위한 AI 기술 개발 현황을 소개합니다.',
    category: 'research',
    position: { top: '5%', left: '38.6%', width: '4.2%', height: '8%' }
  },
  {
    id: 'poster-booth-10',
    name: '포스터세션10',
    department: 'Green AI Research',
    description: '친환경 AI와 에너지 효율적인 모델 개발 연구 성과를 전시합니다.',
    category: 'research',
    position: { top: '5%', left: '42.8%', width: '4.2%', height: '8%' }
  },
  // 과제부스 1-8 (개별 부스)
  {
    id: 'department-booth-1',
    name: '과제부스1',
    department: 'Memory사업부',
    description: 'DRAM, NAND Flash 등 메모리 제품의 AI 기반 품질 관리 및 최적화 기술을 소개합니다.',
    category: 'department',
    position: { top: '5%', left: '50%', width: '5.5%', height: '8%' },
    serviceLinks: [
      { name: 'AI 품질 관리 시스템', url: 'https://example.com/memory-ai-quality' },
      { name: '메모리 최적화 솔루션', url: 'https://example.com/memory-optimization' }
    ]
  },
  {
    id: 'department-booth-2',
    name: '과제부스2',
    department: 'System LSI사업부',
    description: 'AP, 센서, DDI 등 시스템 반도체의 AI 설계 자동화 및 성능 최적화 기술을 전시합니다.',
    category: 'department',
    position: { top: '5%', left: '55.5%', width: '5.5%', height: '8%' },
    serviceLinks: [
      { name: 'AI 설계 자동화 도구', url: 'https://example.com/system-lsi-automation' }
    ]
  },
  {
    id: 'department-booth-3',
    name: '과제부스3',
    department: 'Foundry사업부',
    description: '파운드리 공정 개발과 수율 향상을 위한 AI 기반 솔루션을 소개합니다.',
    category: 'department',
    position: { top: '5%', left: '61%', width: '5.5%', height: '8%' },
    serviceLinks: [
      { name: 'AI 공정 최적화 시스템', url: 'https://example.com/foundry-process-optimization' },
      { name: '수율 예측 AI 모델', url: 'https://example.com/foundry-yield-prediction' }
    ]
  },
  {
    id: 'department-booth-4',
    name: '과제부스4',
    department: '패키징솔루션사업부',
    description: '반도체 패키징 기술의 AI 기반 공정 최적화 및 불량 예측 시스템을 전시합니다.',
    category: 'department',
    position: { top: '5%', left: '66.5%', width: '5.5%', height: '8%' },
    serviceLinks: [
      { name: '패키징 공정 AI 솔루션', url: 'https://example.com/packaging-ai-solution' }
    ]
  },
  {
    id: 'department-booth-5',
    name: '과제부스5',
    department: 'DS 품질혁신센터',
    description: '전사 품질 혁신을 위한 AI 기반 품질 예측 및 분석 시스템을 소개합니다.',
    category: 'department',
    position: { top: '5%', left: '72%', width: '5.5%', height: '8%' },
    serviceLinks: [
      { name: 'AI 품질 예측 시스템', url: 'https://example.com/quality-prediction' },
      { name: '품질 분석 AI 플랫폼', url: 'https://example.com/quality-analysis-platform' }
    ]
  },
  {
    id: 'department-booth-6',
    name: '과제부스6',
    department: 'DS 기술총괄',
    description: 'DS부문 전체 기술 전략과 차세대 반도체 기술 개발을 위한 AI 활용 사례를 전시합니다.',
    category: 'department',
    position: { top: '5%', left: '77.5%', width: '5.5%', height: '8%' },
    serviceLinks: [
      { name: 'AI 기술 전략 가이드', url: 'https://example.com/ai-technology-strategy' }
    ]
  },
  {
    id: 'department-booth-7',
    name: '과제부스7',
    department: 'DS 설비기술센터',
    description: '반도체 제조 설비의 AI 기반 예지보전 및 자동화 기술을 소개합니다.',
    category: 'department',
    position: { top: '5%', left: '83%', width: '5.5%', height: '8%' },
    serviceLinks: [
      { name: 'AI 예지보전 시스템', url: 'https://example.com/predictive-maintenance' },
      { name: '설비 자동화 AI 솔루션', url: 'https://example.com/equipment-automation' }
    ]
  },
  {
    id: 'department-booth-8',
    name: '과제부스8',
    department: 'DS 생산기술연구소',
    description: '차세대 반도체 생산 기술과 AI 기반 공정 혁신 연구 성과를 전시합니다.',
    category: 'department',
    position: { top: '5%', left: '88.5%', width: '5.5%', height: '8%' },
    serviceLinks: [
      { name: 'AI 공정 혁신 연구', url: 'https://example.com/ai-process-innovation' }
    ]
  },
  // 파트너부스 1
  {
    id: 'partner-booth-1',
    name: '파트너부스1',
    department: '외부 파트너사',
    description: '삼성전자와 협력하는 AI 파트너사들의 혁신적인 솔루션을 소개합니다.',
    category: 'partner',
    position: { top: '18%', left: '11%', width: '6%', height: '8%' }
  },
  // 파트너부스 2
  {
    id: 'partner-booth-2',
    name: '파트너부스2',
    department: '외부 파트너사',
    description: '파트너사의 AI 기술과 협업 사례를 소개하는 두 번째 파트너 부스입니다.',
    category: 'partner',
    position: { top: '28%', left: '20%', width: '6%', height: '8%' }
  },
  // 파트너부스 3
  {
    id: 'partner-booth-3',
    name: '파트너부스3',
    department: '외부 파트너사',
    description: '파트너사의 AI 기술과 협업 사례를 소개하는 세 번째 파트너 부스입니다.',
    category: 'partner',
    position: { top: '28%', left: '26%', width: '6%', height: '8%' }
  },
  // AI 이벤트부스
  {
    id: 'ai-event-booth',
    name: 'AI이벤트부스',
    department: 'AI 센터',
    description: 'AI 기술 체험 및 인터랙티브 이벤트를 진행합니다. 최신 AI 기술을 직접 체험해보세요.',
    category: 'tech',
    position: { top: '18%', left: '35%', width: '12%', height: '8%' }
  },
  // 포토부스
  {
    id: 'photo-booth',
    name: '포토부스',
    department: '이벤트팀',
    description: 'AI Week 기념 사진을 촬영할 수 있는 포토존입니다. 특별한 추억을 남겨보세요.',
    category: 'photo',
    position: { top: '45%', left: '5%', width: '12%', height: '10%' }
  }

];

const getCategoryColor = (category: string) => {
  const colors = {
    research: 'bg-[#5325BA] text-white',
    department: 'bg-[#A48CED] text-white',
    tech: 'bg-[#6FF28F] text-gray-900',
    partner: 'bg-orange-500 text-white',
    photo: 'bg-pink-500 text-white',
    demo: 'bg-blue-500 text-white'
  };
  return colors[category as keyof typeof colors] || 'bg-gray-400 text-white';
};

const getCategoryIcon = (category: string) => {
  const icons = {
    research: Info,
    department: Building,
    tech: Lightbulb,
    partner: Users2,
    photo: Camera,
    demo: MapPin
  };
  return icons[category as keyof typeof icons] || Info;
};

export function BoothSection() {
  const [hoveredBooth, setHoveredBooth] = useState<BoothInfo | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleBoothHover = (booth: BoothInfo, event: React.MouseEvent) => {
    setHoveredBooth(booth);
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handleBoothLeave = () => {
    setHoveredBooth(null);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (hoveredBooth) {
      setMousePosition({ x: event.clientX, y: event.clientY });
    }
  };

  return (
    <section id="booth" className="py-20 bg-transparent">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#5325BA' }}>
            현장 부스 안내
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            다양한 AI 기술과 솔루션을 직접 체험하고 전문가들과 소통할 수 있는 부스를 둘러보세요
          </p>
        </div>



        {/* Interactive Map */}
        <div className="max-w-5xl mx-auto">
          <Card className="overflow-hidden shadow-2xl">
            <div 
              className="relative bg-pink-100 h-[600px] overflow-hidden border-4 border-gray-400"
              onMouseMove={handleMouseMove}
            >
                {/* Floor Plan Background - Recreation of the uploaded image */}
                <div className="absolute inset-0">

                  {/* 포스터세션 1-10 (Individual booths) */}
                  <div className="absolute top-[5%] left-[5%] w-[4.2%] h-[8%] bg-[#5325BA] border-2 border-white rounded flex items-center justify-center">
                    <span className="text-white font-bold text-xs">1</span>
                  </div>
                  <div className="absolute top-[5%] left-[9.2%] w-[4.2%] h-[8%] bg-[#5325BA] border-2 border-white rounded flex items-center justify-center">
                    <span className="text-white font-bold text-xs">2</span>
                  </div>
                  <div className="absolute top-[5%] left-[13.4%] w-[4.2%] h-[8%] bg-[#5325BA] border-2 border-white rounded flex items-center justify-center">
                    <span className="text-white font-bold text-xs">3</span>
                  </div>
                  <div className="absolute top-[5%] left-[17.6%] w-[4.2%] h-[8%] bg-[#5325BA] border-2 border-white rounded flex items-center justify-center">
                    <span className="text-white font-bold text-xs">4</span>
                  </div>
                  <div className="absolute top-[5%] left-[21.8%] w-[4.2%] h-[8%] bg-[#5325BA] border-2 border-white rounded flex items-center justify-center">
                    <span className="text-white font-bold text-xs">5</span>
                  </div>
                  <div className="absolute top-[5%] left-[26%] w-[4.2%] h-[8%] bg-[#5325BA] border-2 border-white rounded flex items-center justify-center">
                    <span className="text-white font-bold text-xs">6</span>
                  </div>
                  <div className="absolute top-[5%] left-[30.2%] w-[4.2%] h-[8%] bg-[#5325BA] border-2 border-white rounded flex items-center justify-center">
                    <span className="text-white font-bold text-xs">7</span>
                  </div>
                  <div className="absolute top-[5%] left-[34.4%] w-[4.2%] h-[8%] bg-[#5325BA] border-2 border-white rounded flex items-center justify-center">
                    <span className="text-white font-bold text-xs">8</span>
                  </div>
                  <div className="absolute top-[5%] left-[38.6%] w-[4.2%] h-[8%] bg-[#5325BA] border-2 border-white rounded flex items-center justify-center">
                    <span className="text-white font-bold text-xs">9</span>
                  </div>
                  <div className="absolute top-[5%] left-[42.8%] w-[4.2%] h-[8%] bg-[#5325BA] border-2 border-white rounded flex items-center justify-center">
                    <span className="text-white font-bold text-xs">10</span>
                  </div>

                  {/* 과제부스 1-8 (Individual booths) */}
                  <div className="absolute top-[5%] left-[50%] w-[5.5%] h-[8%] bg-[#A48CED] border-2 border-white rounded flex items-center justify-center">
                    <span className="text-white font-bold text-xs">1</span>
                  </div>
                  <div className="absolute top-[5%] left-[55.5%] w-[5.5%] h-[8%] bg-[#A48CED] border-2 border-white rounded flex items-center justify-center">
                    <span className="text-white font-bold text-xs">2</span>
                  </div>
                  <div className="absolute top-[5%] left-[61%] w-[5.5%] h-[8%] bg-[#A48CED] border-2 border-white rounded flex items-center justify-center">
                    <span className="text-white font-bold text-xs">3</span>
                  </div>
                  <div className="absolute top-[5%] left-[66.5%] w-[5.5%] h-[8%] bg-[#A48CED] border-2 border-white rounded flex items-center justify-center">
                    <span className="text-white font-bold text-xs">4</span>
                  </div>
                  <div className="absolute top-[5%] left-[72%] w-[5.5%] h-[8%] bg-[#A48CED] border-2 border-white rounded flex items-center justify-center">
                    <span className="text-white font-bold text-xs">5</span>
                  </div>
                  <div className="absolute top-[5%] left-[77.5%] w-[5.5%] h-[8%] bg-[#A48CED] border-2 border-white rounded flex items-center justify-center">
                    <span className="text-white font-bold text-xs">6</span>
                  </div>
                  <div className="absolute top-[5%] left-[83%] w-[5.5%] h-[8%] bg-[#A48CED] border-2 border-white rounded flex items-center justify-center">
                    <span className="text-white font-bold text-xs">7</span>
                  </div>
                  <div className="absolute top-[5%] left-[88.5%] w-[5.5%] h-[8%] bg-[#A48CED] border-2 border-white rounded flex items-center justify-center">
                    <span className="text-white font-bold text-xs">8</span>
                  </div>

                  {/* 파트너부스1 */}
                  <div className="absolute top-[18%] left-[11%] w-[6%] h-[8%] bg-orange-500 border-2 border-white rounded flex items-center justify-center">
                    <span className="text-white font-bold text-xs">1</span>
                  </div>

                  {/* AI이벤트부스 */}
                  <div className="absolute top-[18%] left-[35%] w-[12%] h-[8%] bg-green-300 border-2 border-green-600 rounded flex items-center justify-center">
                    <span className="text-green-900 font-bold text-sm">AI이벤트부스</span>
                  </div>

                  {/* 파트너부스2 */}
                  <div className="absolute top-[28%] left-[20%] w-[6%] h-[8%] bg-orange-500 border-2 border-white rounded flex items-center justify-center">
                    <span className="text-white font-bold text-xs">2</span>
                  </div>

                  {/* 파트너부스3 */}
                  <div className="absolute top-[28%] left-[26%] w-[6%] h-[8%] bg-orange-500 border-2 border-white rounded flex items-center justify-center">
                    <span className="text-white font-bold text-xs">3</span>
                  </div>

                  {/* 등록부스 (Facility) */}
                  <div className="absolute top-[38%] left-[35%] w-[12%] h-[18%] bg-blue-200 border-2 border-blue-400 rounded flex items-center justify-center">
                    <span className="text-blue-900 font-bold text-sm">등록부스</span>
                  </div>

                  {/* 엘리베이터 (Elevator) */}
                  <div className="absolute top-[18%] left-[20%] w-[12%] h-[8%] bg-gray-300 border-2 border-gray-500 rounded flex items-center justify-center">
                    <span className="text-gray-900 font-bold text-sm">엘리베이터</span>
                  </div>

                  {/* 포토부스 */}
                  <div className="absolute top-[45%] left-[5%] w-[12%] h-[10%] bg-pink-500 border-2 border-white rounded flex items-center justify-center">
                    <span className="text-white font-bold text-sm">포토부스</span>
                  </div>

                  {/* 출입구 (Entrance) */}
                  <div className="absolute top-[58%] left-[5%] w-[42%] h-[10%] bg-gray-300 border-2 border-gray-600 rounded flex items-center justify-center">
                    <span className="text-green-900 font-bold">출입구</span>
                  </div>

                  {/* 유디홀 (UDI Hall) - Large facility area */}
                  <div className="absolute top-[15%] left-[55%] w-[39%] h-[75%] bg-gray-300 border-2 border-gray-500 rounded-lg flex items-center justify-center">
                    <span className="text-green-800 font-bold text-2xl">유디홀</span>
                  </div>

                  {/* Legend */}
                  <div className="absolute bottom-8 left-14 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-500">
                    {/* <h4 className="font-bold text-sm mb-3 text-gray-800">부스 범례</h4> */}
                    <div className="grid grid-cols-2 gap-x-6">
                      {/* Left Column - 3 items */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-[#5325BA] rounded border border-white"></div>
                          <span className="text-sm text-gray-700">포스터세션 (1-10)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-[#A48CED] rounded border border-white"></div>
                          <span className="text-sm text-gray-700">과제부스 (1-8)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-orange-500 rounded border border-white"></div>
                          <span className="text-sm text-gray-700">파트너부스 (1-3)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-green-300 rounded border border-green-600"></div>
                          <span className="text-sm text-gray-700">AI이벤트부스</span>
                        </div>
                      </div>
                      
                      {/* Right Column - 4 items */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-pink-500 rounded border border-white"></div>
                          <span className="text-sm text-gray-700">포토부스</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-blue-200 rounded border border-blue-400"></div>
                          <span className="text-sm text-gray-700">등록부스</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-gray-300 rounded border border-gray-500"></div>
                          <span className="text-sm text-gray-700">시설 (엘리베이터, 유디홀)</span>
                        </div>
                        {/* Empty space to align with right column bottom */}
                        <div className="h-6"></div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Interactive Booth Overlays */}
                <div className="absolute inset-0">
                  {boothsData.map(booth => (
                    <div
                      key={booth.id}
                      className="absolute cursor-pointer transition-all duration-300 hover:bg-[#6FF28F]/30 hover:border-2 hover:border-[#6FF28F] rounded hover:shadow-lg z-10"
                      style={{
                        top: booth.position.top,
                        left: booth.position.left,
                        width: booth.position.width,
                        height: booth.position.height
                      }}
                      onMouseEnter={(e) => handleBoothHover(booth, e)}
                      onMouseLeave={handleBoothLeave}
                    />
                  ))}
                </div>

                {/* Tooltip */}
                {hoveredBooth && (
                  <div
                    className="fixed z-50 pointer-events-none"
                    style={{
                      left: mousePosition.x + 15,
                      top: mousePosition.y - 10,
                      transform: 'translateY(-100%)'
                    }}
                  >
                    <Card className="bg-white shadow-xl border-2 border-[#5325BA] max-w-xs">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`w-6 h-6 rounded-full ${getCategoryColor(hoveredBooth.category)} flex items-center justify-center`}>
                            {React.createElement(getCategoryIcon(hoveredBooth.category), { className: "w-3 h-3" })}
                          </div>
                          <h3 className="font-bold text-lg text-gray-900">{hoveredBooth.name}</h3>
                        </div>
                        <div className="mb-2">
                          <span className="text-sm font-medium text-[#5325BA]">부서: </span>
                          <span className="text-sm text-gray-700">{hoveredBooth.department}</span>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {hoveredBooth.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                )}
            </div>
          </Card>

          {/* Category Filter Badges */}
          <div className="flex flex-wrap justify-center gap-4 mt-8 mb-8">
            {/* Show All Button */}
            <Badge 
              className={`px-4 py-2 text-sm flex items-center gap-2 cursor-pointer transition-all duration-200 ${
                selectedCategory === null 
                  ? 'bg-[#5325BA] text-white shadow-lg' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setSelectedCategory(null)}
            >
              <MapPin className="w-4 h-4" />
              전체보기
            </Badge>
            
            {/* Research Category */}
            <Badge 
              className={`px-4 py-2 text-sm flex items-center gap-2 cursor-pointer transition-all duration-200 ${
                selectedCategory === 'research' 
                  ? 'bg-[#5325BA] text-white shadow-lg' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setSelectedCategory('research')}
            >
              <Info className="w-4 h-4" />
              포스터세션
            </Badge>
            
            {/* Department Category */}
            <Badge 
              className={`px-4 py-2 text-sm flex items-center gap-2 cursor-pointer transition-all duration-200 ${
                selectedCategory === 'department' 
                  ? 'bg-[#A48CED] text-white shadow-lg' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setSelectedCategory('department')}
            >
              <Building className="w-4 h-4" />
              과제부스
            </Badge>
            
            {/* Partner Category */}
            <Badge 
              className={`px-4 py-2 text-sm flex items-center gap-2 cursor-pointer transition-all duration-200 ${
                selectedCategory === 'partner' 
                  ? 'bg-orange-500 text-white shadow-lg' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setSelectedCategory('partner')}
            >
              <Users2 className="w-4 h-4" />
              파트너부스
            </Badge>
          </div>

          {/* Booth List */}
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {boothsData
              .filter(booth => selectedCategory === null || booth.category === selectedCategory)
              .map(booth => {
                const IconComponent = getCategoryIcon(booth.category);
                return (
                  <Card key={booth.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-[#5325BA] bg-white relative">
                    {/* Service Links Icon - Only show for department booths with links */}
                    {booth.category === 'department' && booth.serviceLinks && booth.serviceLinks.length > 0 && (
                      <div className="absolute top-3 right-3">
                        <div className="relative group">
                          <div className="w-8 h-8 bg-[#5325BA] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#5325BA]/90 transition-colors">
                            <ExternalLink className="w-4 h-4 text-white" />
                          </div>
                          
                          {/* Service Links Dropdown */}
                          <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                            <div className="p-3">
                              <h4 className="font-semibold text-sm text-gray-800 mb-2">서비스 링크</h4>
                              <div className="space-y-2">
                                {booth.serviceLinks.map((link, index) => (
                                  <a
                                    key={index}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block p-2 text-sm text-gray-700 hover:bg-gray-50 rounded transition-colors"
                                  >
                                    <div className="flex items-center gap-2">
                                      <ExternalLink className="w-3 h-3 text-[#5325BA]" />
                                      <span>{link.name}</span>
                                    </div>
                                  </a>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-full ${getCategoryColor(booth.category)} flex items-center justify-center`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{booth.name}</h3>
                          <p className="text-sm text-[#5325BA] font-medium">{booth.department}</p>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {booth.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
          
          {/* No Results Message */}
          {selectedCategory && boothsData.filter(booth => booth.category === selectedCategory).length === 0 && (
            <div className="mt-12 text-center py-12">
              <p className="text-gray-500 text-lg">선택한 카테고리에 해당하는 부스가 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}