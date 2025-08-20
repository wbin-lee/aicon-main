import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Badge } from './ui/badge';
import { HelpCircle, Calendar, MapPin, Users, Settings, Network } from 'lucide-react';

export function ForumFAQSection() {
  const forumFaqCategories = [
    {
      id: 'general',
      title: '일반 정보',
      icon: HelpCircle,
      color: 'bg-[#5325BA]',
      faqs: [
        {
          question: 'Samsung AI Forum은 언제, 어디서 열리나요?',
          answer: '2025년 3월 15일 (토) 오전 9시부터 오후 2시까지 서울 코엑스 컨벤션센터에서 개최됩니다. 지하철 2호선 삼성역 5,6번 출구에서 도보로 접근 가능합니다.'
        },
        {
          question: 'Samsung AI Forum 참가비는 얼마인가요?',
          answer: 'Samsung AI Forum은 무료로 참여하실 수 있습니다. 단, 사전 등록이 필수이며 선착순으로 마감됩니다.'
        },
        {
          question: '포럼은 어떤 언어로 진행되나요?',
          answer: '모든 세션은 한국어로 진행됩니다. 삼성 내부 전문가들이 직접 발표하며, 질의응답도 한국어로 이루어집니다.'
        }
      ]
    },
    {
      id: 'content',
      title: '포럼 내용',
      icon: Calendar,
      color: 'bg-[#A48CED]',
      faqs: [
        {
          question: '어떤 내용을 다루나요?',
          answer: '삼성의 AI 도입 전략, 실무 적용 사례, 기업 AI 트랜스포메이션 경험을 중심으로 다룹니다. 이론보다는 실제 경험과 사례 위주로 구성됩니다.'
        },
        {
          question: '세션 자료는 제공되나요?',
          answer: '포럼 참가자에게는 발표 자료와 케이스 스터디 자료가 제공됩니다. 포럼 종료 후 이메일로 전체 자료를 발송해 드립니다.'
        },
        {
          question: '네트워킹 시간이 있나요?',
          answer: '네, 포럼 마지막에 삼성 AI 전문가들과 직접 대화할 수 있는 네트워킹 및 Q&A 시간이 1시간 준비되어 있습니다.'
        }
      ]
    },
    {
      id: 'participation',
      title: '참가 안내',
      icon: Users,
      color: 'bg-[#A1BDF8]',
      faqs: [
        {
          question: '누가 참여할 수 있나요?',
          answer: 'AI 도입을 고려하는 기업 실무진, IT 담당자, 스타트업 창업자, AI 관련 업계 종사자 등 누구나 참여 가능합니다.'
        },
        {
          question: '사전 준비사항이 있나요?',
          answer: '특별한 사전 준비는 필요 없습니다. 다만 본인이 속한 조직의 AI 도입 관련 궁금사항을 미리 정리해 오시면 더욱 유익한 시간이 될 것입니다.'
        },
        {
          question: '참가 인원 제한이 있나요?',
          answer: '포럼 특성상 소규모로 진행되며, 선착순 100명으로 제한됩니다. 조기 마감될 수 있으니 빠른 등록을 권장합니다.'
        }
      ]
    },
    {
      id: 'logistics',
      title: '행사 안내',
      icon: Settings,
      color: 'bg-[#6FF28F]',
      faqs: [
        {
          question: '주차장 이용이 가능한가요?',
          answer: '코엑스 주차장을 이용하실 수 있습니다. 다만 토요일 오전 시간대라 주차 공간이 제한적일 수 있으니 대중교통 이용을 권장합니다.'
        },
        {
          question: '식사는 제공되나요?',
          answer: '포럼 중간에 간단한 다과와 음료가 제공됩니다. 점심 시간 이후 포럼이 종료되므로 별도 식사는 제공되지 않습니다.'
        },
        {
          question: '포럼 후 추가 문의는 어떻게 하나요?',
          answer: '포럼 종료 후에도 samsung.ai.forum@samsung.com으로 추가 문의사항을 보내주시면 답변해 드립니다.'
        }
      ]
    }
  ];

  return (
    <section id="forum-faq" className="py-20 bg-transparent">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <HelpCircle className="w-8 h-8 text-[#5325BA]" />
            <h2 className="text-4xl md:text-5xl font-bold" style={{ color: '#5325BA' }}>
              Samsung AI Forum FAQ
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Samsung AI Forum에 대한 자주 묻는 질문들
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid gap-8">
            {forumFaqCategories.map((category, categoryIndex) => {
              const IconComponent = category.icon;
              return (
                <div key={category.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className={`bg-gradient-to-r from-[#5325BA]/5 to-[#5325BA]/10 p-6 border-b border-gray-100`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 ${category.color} rounded-xl flex items-center justify-center text-white shadow-md`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{category.title}</h3>
                        <Badge variant="outline" className="bg-white/80">
                          {category.faqs.length}개 질문
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <Accordion type="single" collapsible className="w-full space-y-3">
                      {category.faqs.map((faq, faqIndex) => (
                        <AccordionItem 
                          key={`${category.id}-${faqIndex}`} 
                          value={`${category.id}-${faqIndex}`}
                          className="border border-gray-200 rounded-lg px-4 hover:border-[#5325BA]/30 transition-colors duration-300"
                        >
                          <AccordionTrigger className="text-left hover:text-[#5325BA] transition-colors duration-300 py-4">
                            <span className="font-semibold text-gray-900 pr-4">
                              {faq.question}
                            </span>
                          </AccordionTrigger>
                          <AccordionContent className="text-gray-600 leading-relaxed pb-4">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
} 