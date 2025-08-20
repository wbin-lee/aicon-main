import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Badge } from './ui/badge';
import { HelpCircle, Calendar, MapPin, Settings, Network } from 'lucide-react';

export function FAQSection() {
  const faqCategories = [
    {
      id: 'general',
      title: '일반 정보',
      icon: HelpCircle,
      color: 'bg-[#5325BA]',
      faqs: [
        {
          question: 'DS AI Week 2025는 언제, 어디서 열리나요?',
          answer: '2025년 3월 15일-21일 일주일간 서울 코엑스 컨벤션센터에서 개최됩니다. 지하철 2호선 삼성역 5,6번 출구 또는 9호선 봉은사역 7번 출구에서 도보로 접근 가능합니다.'
        },
        {
          question: 'AI Week 언어는 무엇인가요?',
          answer: '주요 세션은 한국어로 진행되며, 일부 해외 연사의 키노트는 영어로 진행됩니다. 영어 세션에는 동시통역 서비스가 제공됩니다.'
        }
      ]
    },
    {
      id: 'schedule',
      title: '일정 & 프로그램',
      icon: Calendar,
      color: 'bg-[#A48CED]',
      faqs: [
        {
          question: '세션별 참석 인원 제한이 있나요?',
          answer: '키노트와 메인 세션은 모든 참가자가 참석 가능합니다. 일부 워크샵의 경우 선착순 30-50명으로 제한되며, 현장에서 별도 신청을 받습니다.'
        },
        {
          question: '세션 자료는 어떻게 받을 수 있나요?',
          answer: '등록자에게는 AI Week 전용 앱을 통해 세션 자료가 제공됩니다. 또한 AI Week 종료 후 이메일로 전체 자료집을 발송해 드립니다.'
        },
        {
          question: '온라인으로도 참여할 수 있나요?',
          answer: '아니요, 본 AI Week는 오프라인 전용 행사입니다. 하지만 등록자에게는 주요 세션의 녹화 영상을 이벤트 종료 후 30일간 제공합니다.'
        }
      ]
    },
    {
      id: 'venue',
      title: '장소 & 일정',
      icon: MapPin,
      color: 'bg-[#A1BDF8]',
      faqs: [
        {
          question: '주차장 이용이 가능한가요?',
          answer: '코엑스 지하주차장을 이용하실 수 있습니다. 주차료는 별도이며, 대중교통 이용을 권장드립니다. 주차 공간이 한정되어 있으니 일찍 도착하시기 바랍니다.'
        },
        {
          question: '식사는 어떻게 해결하나요?',
          answer: '점심시간에는 코엑스 몰 내 다양한 식당을 이용하실 수 있습니다. 컨퍼런스 장 내에서도 간단한 다과와 음료가 제공됩니다.'
        }
      ]
    },
    {
      id: 'networking',
      title: '네트워킹 & 부스',
      icon: Network,
      color: 'bg-[#6FF28F]',
      faqs: [
        {
          question: '네트워킹 시간은 언제인가요?',
          answer: '첫째 날 저녁 네트워킹 리셉션(18:00-20:00)과 둘째 날 마지막 세션 후 클로징 네트워킹(16:30-17:30)이 있습니다.'
        },
        {
          question: '부스 전시는 어떤 것들이 있나요?',
          answer: 'AI/ML 관련 기업들의 제품 시연, 채용 부스, 스타트업 피칭 코너 등이 있습니다. 전시 부스는 휴식 시간과 점심시간에 자유롭게 방문하실 수 있습니다.'
        },
        {
          question: '연사와 개별 미팅이 가능한가요?',
          answer: '컨퍼런스 앱을 통해 연사와의 1:1 미팅을 신청할 수 있습니다. 연사별로 제한된 시간이 있어 선착순으로 배정됩니다.'
        }
      ]
    },
    {
      id: 'technical',
      title: '기타',
      icon: Settings,
      color: 'bg-gray-500',
      faqs: [
        {
          question: 'WiFi 사용이 가능한가요?',
          answer: '컨퍼런스 전용 WiFi가 제공됩니다. 접속 정보는 등록 시 안내해 드리며, 안정적인 네트워크 환경을 위해 대역폭을 충분히 확보했습니다.'
        },
        {
          question: '전원 콘센트는 충분한가요?',
          answer: '각 좌석 근처와 휴게 공간에 충분한 전원 콘센트가 준비되어 있습니다. 안전을 위해 개인 노트북과 모바일 기기만 충전 가능합니다.'
        },
        {
          question: '사진/영상 촬영이 가능한가요?',
          answer: '개인적인 기념 촬영은 가능하지만, 세션 중 플래시 촬영은 금지됩니다. SNS 공유는 #DSAI2025 해시태그를 사용해 주세요.'
        }
      ]
    }
  ];

  return (
    <section id="faq" className="py-20 bg-transparent">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#5325BA' }}>
            자주 묻는 질문
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            궁금한 점이 있으시면 아래 FAQ를 확인해 주세요
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Category Grid - F-type Layout */}


          {/* FAQ Accordions by Category */}
          <div className="space-y-8 bg-white p-4 rounded-lg">
            {faqCategories.map((category) => (
              <div key={category.id} className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg ${category.color} text-white`}>
                    <category.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold">{category.title}</h3>
                  <Badge variant="secondary">
                    {category.faqs.length}
                  </Badge>
                </div>

                <Accordion type="single" collapsible className="space-y-2">
                  {category.faqs.map((faq, index) => (
                    <AccordionItem 
                      key={`${category.id}-${index}`} 
                      value={`${category.id}-${index}`}
                      className="border border-gray-200 rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-left font-medium hover:no-underline py-4">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 pb-4 leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>

          {/* Contact Info */}
          <div id="contact" className="mt-16 text-center">
            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-xl font-bold mb-4">추가 문의사항이 있으신가요?</h3>
              <p className="text-gray-600 mb-6">
                FAQ에서 답을 찾지 못한 질문이 있으시면 언제든 연락해 주세요.
              </p>
              <div className="flex justify-center">
                <a 
                  href="mailto:ds_aiweek@samsung.com"
                  className="bg-[#5325BA] text-white px-6 py-3 rounded-lg hover:bg-[#5325BA]/90 transition-colors"
                >
                  이메일 문의
                </a>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                <p>이메일: ds_aiweek@samsung.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}