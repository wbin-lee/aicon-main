// import { useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
// import { Button } from './ui/button';
// // import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
// // import { Badge } from './ui/badge';
// import { Calendar, Clock, Copy, Trophy, Medal, Award, Search } from 'lucide-react';
// import { ImageWithFallback } from './figma/ImageWithFallback';

// interface Event {
//   id: string;
//   title: string;
//   description: string;
//   detailedDescription: string;
//   image: string;
//   date: string;
//   time: string;
//   location: string;
//   capacity: string;
//   speaker: string;
//   tags: string[];
// }

// const events: Event[] = [
//   {
//     id: '1',
//     title: 'AI 혁신과 미래 전망',
//     description: 'AI 기술의 현재와 미래, 그리고 우리가 나아가야 할 방향에 대해 논의합니다.',
//     detailedDescription: 'AI 기술의 급속한 발전과 함께 우리 사회는 전례 없는 변화를 맞이하고 있습니다. 이 세션에서는 AI의 현재 기술 수준과 향후 10년간의 발전 방향을 살펴보고, 기업과 개인이 어떻게 대응해야 하는지에 대해 깊이 있게 다룹니다. 머신러닝, 딥러닝, 자연어처리, 컴퓨터 비전 등 핵심 기술들의 최신 동향과 실제 적용 사례를 통해 AI의 미래를 그려봅니다.',
//     image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop&crop=center',
//     date: '9월 15일',
//     time: '09:00 - 10:30',
//     location: 'The UniverSE 메인홀',
//     capacity: '200명',
//     speaker: '김AI 박사 (삼성전자 AI센터)',
//     tags: ['AI', '미래기술', '혁신']
//   },
//   {
//     id: '2',
//     title: '딥러닝 최신 기술 동향',
//     description: '최신 딥러닝 기술과 실제 산업 적용 사례를 살펴보는 심화 세션입니다.',
//     detailedDescription: '딥러닝 기술은 지속적으로 진화하고 있으며, 새로운 아키텍처와 학습 방법론이 끊임없이 등장하고 있습니다. 이 세션에서는 Transformer, BERT, GPT 등 최신 모델들의 핵심 원리와 실제 구현 방법을 다룹니다. 또한 삼성전자에서 실제로 적용하고 있는 딥러닝 솔루션들과 성과를 공유하여 실무에 바로 적용할 수 있는 인사이트를 제공합니다.',
//     image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop&crop=center',
//     date: '9월 15일',
//     time: '11:00 - 12:30',
//     location: 'The UniverSE 세미나실 A',
//     capacity: '150명',
//     speaker: '이딥러닝 수석연구원 (삼성리서치)',
//     tags: ['딥러닝', '기술동향', '실무']
//   },
//   {
//     id: '3',
//     title: 'Computer Vision 혁신',
//     description: '컴퓨터 비전 기술의 최신 발전과 실제 제품 적용 사례를 공유합니다.',
//     detailedDescription: '컴퓨터 비전 기술은 스마트폰, 자동차, 보안 시스템 등 다양한 분야에서 혁신을 이끌고 있습니다. 이 세션에서는 객체 검출, 이미지 분할, 3D 인식 등 핵심 기술들의 최신 동향을 살펴보고, 삼성 갤럭시의 카메라 AI, 스마트 TV의 화질 개선, 반도체 검사 시스템 등 실제 제품에 적용된 혁신적인 사례들을 소개합니다.',
//     image: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=600&h=400&fit=crop&crop=center',
//     date: '9월 17일',
//     time: '09:00 - 10:30',
//     location: 'The UniverSE 메인홀',
//     capacity: '200명',
//     speaker: '박비전 책임연구원 (삼성전자 종합기술원)',
//     tags: ['Computer Vision', '이미지처리', '제품적용']
//   },
//   {
//     id: '4',
//     title: 'MLOps와 프로덕션 배포',
//     description: 'ML 모델의 효율적인 운영과 배포 전략에 대한 실무 중심의 세션입니다.',
//     detailedDescription: 'ML 모델을 실제 서비스에 배포하고 운영하는 것은 연구 개발만큼이나 중요한 과제입니다. 이 세션에서는 MLOps의 핵심 개념부터 시작하여, 모델 버전 관리, 자동화된 테스트, 지속적 배포, 모니터링 등 전체 생명주기 관리 방법을 다룹니다. 삼성전자에서 실제로 사용하고 있는 MLOps 플랫폼과 베스트 프랙티스를 공유하여 실무에 바로 적용할 수 있는 지식을 제공합니다.',
//     image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop&crop=center',
//     date: '9월 17일',
//     time: '11:00 - 12:30',
//     location: 'The UniverSE 세미나실 B',
//     capacity: '120명',
//     speaker: '최운영 시니어 엔지니어 (삼성SDS)',
//     tags: ['MLOps', '배포', '운영']
//   },
//   {
//     id: '5',
//     title: 'AI 윤리와 책임',
//     description: 'AI 기술 발전과 함께 중요해지는 윤리적 고려사항과 책임에 대해 논의합니다.',
//     detailedDescription: 'AI 기술이 사회 전반에 미치는 영향이 커지면서 윤리적 고려사항이 더욱 중요해지고 있습니다. 이 세션에서는 AI 편향성 문제, 개인정보 보호, 투명성과 설명가능성, 그리고 AI의 사회적 책임에 대해 깊이 있게 다룹니다. 또한 삼성전자가 추진하고 있는 책임감 있는 AI 개발 원칙과 실제 적용 사례를 통해 지속가능한 AI 생태계 구축 방안을 모색합니다.',
//     image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&crop=center',
//     date: '9월 17일',
//     time: '14:00 - 15:30',
//     location: 'The UniverSE 세미나실 A',
//     capacity: '150명',
//     speaker: '정윤리 연구위원 (삼성전자 AI윤리위원회)',
//     tags: ['AI윤리', '책임', '사회적영향']
//   },
//   {
//     id: '6',
//     title: '스타트업 AI 성공사례',
//     description: 'AI 기술로 성공한 스타트업들의 실제 사례와 인사이트를 공유합니다.',
//     detailedDescription: 'AI 기술을 바탕으로 혁신적인 서비스를 만들어 성공한 스타트업들의 생생한 경험담을 들어봅니다. 아이디어 발굴부터 MVP 개발, 시장 검증, 투자 유치, 스케일업까지 전 과정에서의 노하우와 실패 경험, 그리고 배운 교훈들을 솔직하게 공유합니다. 또한 삼성벤처투자와 C-Lab의 AI 스타트업 지원 프로그램 소개를 통해 창업을 꿈꾸는 분들에게 실질적인 도움을 제공합니다.',
//     image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop&crop=center',
//     date: '9월 17일',
//     time: '16:00 - 17:30',
//     location: 'The UniverSE 메인홀',
//     capacity: '200명',
//     speaker: '김스타트 대표 (AI스타트업연합)',
//     tags: ['스타트업', '창업', '성공사례']
//   }
// ];

// export function EventsSection() {
//   const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
//   const [copySuccess, setCopySuccess] = useState(false);
//   const [checkingCount, setCheckingCount] = useState(false);
  
//   // Mock leaderboard data
//   const topRankers = [
//     { rank: 1, knoxId: 'john.doe', inviteCount: 23 },
//     { rank: 2, knoxId: 'jane.smith', inviteCount: 18 },
//     { rank: 3, knoxId: 'mike.kim', inviteCount: 15 },
//     { rank: 4, knoxId: 'sarah.lee', inviteCount: 12 },
//     { rank: 5, knoxId: 'david.park', inviteCount: 9 }
//   ];

//   const handleCopyInviteCode = async () => {
//     const inviteCode = `https://dsaiweek2025.com/register?ref=${Math.random().toString(36).substring(2, 8)}`;
//     try {
//       await navigator.clipboard.writeText(inviteCode);
//       setCopySuccess(true);
//       setTimeout(() => setCopySuccess(false), 2000);
//     } catch (err) {
//       console.error('Failed to copy: ', err);
//     }
//   };

//   const handleCheckInviteCount = async () => {
//     setCheckingCount(true);
//     // Mock API call simulation
//     setTimeout(() => {
//       setCheckingCount(false);
//       alert('현재까지 5명의 동료를 초대하셨습니다!');
//     }, 1500);
//   };

//   const getRankIcon = (rank: number) => {
//     switch (rank) {
//       case 1: return <Trophy className="w-5 h-5 text-yellow-500" />;
//       case 2: return <Medal className="w-5 h-5 text-gray-400" />;
//       case 3: return <Award className="w-5 h-5 text-amber-600" />;
//       default: return <span className="w-5 h-5 flex items-center justify-center text-gray-600 font-bold">{rank}</span>;
//     }
//   };

//   return (
//     <section id="events" className="py-20 bg-transparent">
//       <div className="container mx-auto px-6">
//         <div className="text-center mb-16">
//                       <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#5325BA' }}>
//             이벤트
//           </h2>
//           {/* <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             AI CON에서 펼쳐질 다양한 이벤트들을 미리 만나보세요
//           </p> */}
//         </div>

//         {/* 동료 초대왕 이벤트 */}
//         <div className="max-w-4xl mx-auto mb-16">
//           <Card className="overflow-hidden border-2 border-[#5325BA] bg-gradient-to-br from-[#5325BA] to-[#A48CED]">
//             <CardHeader className="text-white">
//               <div className="flex items-center justify-center gap-3">
//                 <Trophy className="w-8 h-8" />
//                 <CardTitle className="text-2xl md:text-3xl text-center">
//                   도전! 동료 초대왕
//                 </CardTitle>
//               </div>
//             </CardHeader>
            
//             <CardContent className="p-8">
//               {/* 이벤트 정보 */}
//               <div className="mb-8">
//                 <div className="grid md:grid-cols-2 gap-6 mb-6">
//                   <div className="bg-white rounded-lg p-4 border border-[#5325BA]/20">
//                     <h4 className="font-bold text-[#5325BA] mb-2 flex items-center gap-2">
//                       <Calendar className="w-4 h-4" />
//                       이벤트 기간
//                     </h4>
//                     <p className="text-gray-700">8월 25일(월) ~ 9월 5일(금)</p>
//                   </div>
//                   <div className="bg-white rounded-lg p-4 border border-[#5325BA]/20">
//                     <h4 className="font-bold text-[#5325BA] mb-2 flex items-center gap-2">
//                       <Clock className="w-4 h-4" />
//                       당첨자 발표
//                     </h4>
//                     <p className="text-gray-700">9월 중순 개별 연락 예정</p>
//                   </div>
//                 </div>
                
//                 <div className="bg-white rounded-lg p-6 mb-6">
//                   <div className="flex items-center gap-6">
//                     <div className="flex-1">
//                       <h4 className="font-bold text-[#5325BA] mb-3 text-lg">🎁 상품</h4>
//                       <p className="text-gray-700 text-lg">
//                         DS AI Week로 가장 동료를 많이 초대한 분께 <span className="font-bold text-[#5325BA]">15만원 상당의 AI 영상 복원권</span>을 드립니다.
//                       </p>
//                     </div>
//                     <div className="flex-shrink-0">
//                       <ImageWithFallback
//                         src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=120&h=120&fit=crop&crop=center"
//                         alt="AI 영상 복원 기술"
//                         className="w-20 h-20 rounded-lg object-cover border border-[#5325BA]/20"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* 참여방법 */}
//               <div className="mb-8">
//                 <h4 className="font-bold text-xl text-[rgba(255,255,255,1)] mb-6 text-center">참여방법</h4>
//                 <div className="grid md:grid-cols-2 gap-4">
//                   <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-[#5325BA]/20">
//                     <div className="bg-[#5325BA] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">1</div>
//                     <div>
//                       <p className="font-medium text-gray-800">하단 '내 초대 코드 복사하기' 클릭</p>
//                     </div>
//                   </div>
//                   <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-[#5325BA]/20">
//                     <div className="bg-[#A48CED] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">2</div>
//                     <div>
//                       <p className="font-medium text-gray-800">주변 동료에게 링크 공유</p>
//                     </div>
//                   </div>
//                   <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-[#5325BA]/20">
//                     <div className="bg-[#6FF28F] text-gray-800 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">3</div>
//                     <div>
//                       <p className="font-medium text-gray-800">공유받은 동료가 참가 신청하기 완료!</p>
//                     </div>
//                   </div>
//                   <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-[#5325BA]/20">
//                     <div className="bg-[#A1BDF8] text-gray-800 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">4</div>
//                     <div>
//                       <p className="font-medium text-gray-800">하단 "내 초대 숫자 확인하기" 클릭</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* 톱 랭킹 */}
//               <div className="mb-8">
//                 <h4 className="font-bold text-xl text-[rgba(255,255,255,1)] mb-6 text-center">🏆 Top 5 초대왕 랭킹</h4>
//                 <div className="bg-white rounded-lg border border-[#5325BA]/20 overflow-hidden">
//                   <div className="bg-[#5325BA]/10 px-6 py-3 border-b border-[#5325BA]/20">
//                     <div className="grid grid-cols-3 font-bold text-[#5325BA]">
//                       <span>순위</span>
//                       <span>Knox ID</span>
//                       <span className="text-right">초대 수</span>
//                     </div>
//                   </div>
//                   <div className="divide-y divide-gray-100">
//                     {topRankers.map((ranker) => (
//                       <div key={ranker.rank} className="px-6 py-4 hover:bg-gray-50">
//                         <div className="grid grid-cols-3 items-center">
//                           <div className="flex items-center gap-2">
//                             {getRankIcon(ranker.rank)}
//                             <span className="font-medium">{ranker.rank}위</span>
//                           </div>
//                           <span className="text-gray-700 font-mono">{ranker.knoxId}</span>
//                           <span className="text-right font-bold text-[#5325BA]">{ranker.inviteCount}명</span>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               {/* 버튼 그룹 */}
//               <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//                 <Button
//                   onClick={handleCopyInviteCode}
//                   size="lg"
//                   className={`border-2 bg-[#5325BA] border-[#5325BA] text-white hover:bg-white hover:text-[#5325BA] hover:border-white px-8 py-4 rounded-xl hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 ${
//                     copySuccess ? 'bg-green-600 hover:bg-green-600' : ''
//                   }`}
//                 >
//                   <Copy className="w-5 h-5 mr-2" />
//                   {copySuccess ? '복사 완료!' : '내 초대 코드 복사하기'}
//                 </Button>
                
//                 <Button
//                   onClick={handleCheckInviteCount}
//                   size="lg"
//                   variant="outline"
//                   disabled={checkingCount}
//                   className="border-2 bg-[#5325BA] border-[#5325BA] text-white hover:bg-white hover:text-[#5325BA] hover:border-white px-8 py-4 rounded-xl hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
//                 >
//                   <Search className="w-5 h-5 mr-2" />
//                   {checkingCount ? '확인 중...' : '내 초대 숫자 확인하기'}
//                 </Button>
//               </div>
              
//               {copySuccess && (
//                 <p className="text-green-600 text-sm mt-4 text-center">초대 코드가 클립보드에 복사되었습니다!</p>
//               )}
//             </CardContent>
//           </Card>
//         </div>

//         {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
//           {events.map((event) => (
//             <Dialog key={event.id}>
//               <DialogTrigger asChild>
//                 <div className="cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
//                   <Card className="h-full">
//                     <CardHeader className="p-0">
//                       <div className="relative overflow-hidden rounded-t-lg">
//                         <ImageWithFallback
//                           src={event.image}
//                           alt={event.title}
//                           className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
//                         />
//                         <div className="absolute top-4 left-4">
//                           <Badge className="bg-[#5325BA] text-white">
//                             {event.date}
//                           </Badge>
//                         </div>
//                       </div>
//                     </CardHeader>
//                     <CardContent className="p-6">
//                       <CardTitle className="text-xl mb-3 group-hover:text-[#5325BA] transition-colors">
//                         {event.title}
//                       </CardTitle>
//                       <p className="text-gray-600 text-sm mb-4 line-clamp-3">
//                         {event.description}
//                       </p>
//                       <div className="flex items-center justify-between">
//                         <div className="flex flex-wrap gap-2">
//                           {event.tags.slice(0, 2).map((tag) => (
//                             <Badge 
//                               key={tag} 
//                               variant="outline" 
//                               className="text-xs border-[#5325BA] text-[#5325BA]"
//                             >
//                               {tag}
//                             </Badge>
//                           ))}
//                         </div>
//                         <ArrowRight className="w-4 h-4 text-[#5325BA] group-hover:translate-x-1 transition-transform" />
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </div>
//               </DialogTrigger>
              
//               <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
//                 <DialogHeader>
//                   <DialogTitle className="text-2xl text-[#5325BA] mb-4">
//                     {event.title}
//                   </DialogTitle>
//                 </DialogHeader>
                
//                 <div className="space-y-6">
//                   <div className="relative overflow-hidden rounded-lg">
//                     <ImageWithFallback
//                       src={event.image}
//                       alt={event.title}
//                       className="w-full h-64 object-cover"
//                     />
//                   </div>
                  
//                   <div className="grid md:grid-cols-2 gap-4 text-sm">
//                     <div className="flex items-center space-x-2">
//                       <Calendar className="w-4 h-4 text-[#5325BA]" />
//                       <span>{event.date}</span>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Clock className="w-4 h-4 text-[#5325BA]" />
//                       <span>{event.time}</span>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <MapPin className="w-4 h-4 text-[#5325BA]" />
//                       <span>{event.location}</span>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Users className="w-4 h-4 text-[#5325BA]" />
//                       <span>정원 {event.capacity}</span>
//                     </div>
//                   </div>
                  
//                   <div>
//                     <h4 className="font-semibold text-lg mb-2">연사</h4>
//                     <p className="text-gray-700">{event.speaker}</p>
//                   </div>
                  
//                   <div>
//                     <h4 className="font-semibold text-lg mb-2">상세 설명</h4>
//                     <p className="text-gray-700 leading-relaxed">
//                       {event.detailedDescription}
//                     </p>
//                   </div>
                  
//                   <div>
//                     <h4 className="font-semibold text-lg mb-2">태그</h4>
//                     <div className="flex flex-wrap gap-2">
//                       {event.tags.map((tag) => (
//                         <Badge 
//                           key={tag} 
//                           variant="outline" 
//                           className="border-[#5325BA] text-[#5325BA]"
//                         >
//                           {tag}
//                         </Badge>
//                       ))}
//                     </div>
//                   </div>
                  

//                 </div>
//               </DialogContent>
//             </Dialog>
//           ))}
//         </div> */}
//       </div>
//     </section>
//   );
// }