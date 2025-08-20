import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { MessageSquare, Utensils, Users2, Clock, MapPin, Send } from 'lucide-react';

export function NetworkingSection() {
  const [lunchModalOpen, setLunchModalOpen] = useState(false);
  const [networkingModalOpen, setNetworkingModalOpen] = useState(false);
  
  const [lunchFormData, setLunchFormData] = useState({
    name: '',
    knoxId: '',
    selectedMeetup: '',
    reason: '',
    discussionTopics: '',
    mealMenu: ''
  });

  const [networkingFormData, setNetworkingFormData] = useState({
    name: '',
    knoxId: '',
    selectedMeetup: '',
    jocodingTopic: '',
    reason: '',
    discussionTopics: ''
  });

  const [existingLunchApplication, setExistingLunchApplication] = useState<any>(null);
  const [existingNetworkingApplication, setExistingNetworkingApplication] = useState<any>(null);
  const [isCheckingLunchApplication, setIsCheckingLunchApplication] = useState(false);
  const [isCheckingNetworkingApplication, setIsCheckingNetworkingApplication] = useState(false);

  const checkExistingLunchApplication = async (knoxId: string) => {
    try {
      setIsCheckingLunchApplication(true);
      const baseUrl = (import.meta as any).env?.VITE_AICON25_BE_URL || '';
      const response = await fetch(`${baseUrl}/api/meetup-application/${knoxId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        // Existing application found
        const applicationData = await response.json();
        
        // Check if this is a lunch meetup application
        if (applicationData.selected_meetup === 'palantir' || applicationData.selected_meetup === 'google-cloud') {
          setExistingLunchApplication(applicationData);
          setLunchFormData({
            name: applicationData.name || '',
            knoxId: applicationData.knox_id || '',
            selectedMeetup: applicationData.selected_meetup || '',
            reason: applicationData.participation_reason || '',
            discussionTopics: applicationData.discussion_topics || '',
            mealMenu: applicationData.allergy_info || ''
          });
        } else {
          // This is a networking meetup application, not a lunch meetup
          alert('런치 밋업 신청 내역이 없어요! 신청서를 작성해주세요');
        }
      } else if (response.status === 404) {
        // No existing application found
        alert('신청한 내역이 없어요! 신청서를 작성해주세요');
      }
    } catch (error) {
      console.error('Error checking existing lunch application:', error);
    } finally {
      setIsCheckingLunchApplication(false);
    }
  };

  const checkExistingNetworkingApplication = async (knoxId: string) => {
    try {
      setIsCheckingNetworkingApplication(true);
      const baseUrl = (import.meta as any).env?.VITE_AICON25_BE_URL || '';
      const response = await fetch(`${baseUrl}/api/meetup-application/${knoxId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        // Existing application found
        const applicationData = await response.json();
        
        // Check if this is a networking meetup application
        if (applicationData.selected_meetup === 'jocoding' || applicationData.selected_meetup === 'first-penguins') {
          setExistingNetworkingApplication(applicationData);
          setNetworkingFormData({
            name: applicationData.name || '',
            knoxId: applicationData.knox_id || '',
            selectedMeetup: applicationData.selected_meetup || '',
            jocodingTopic: applicationData.jocoding_topic || '',
            reason: applicationData.participation_reason || '',
            discussionTopics: applicationData.discussion_topics || ''
          });
        } else {
          // This is a lunch meetup application, not a networking meetup
          alert('네트워킹 밋업 신청 내역이 없어요! 신청서를 작성해주세요');
        }
      } else if (response.status === 404) {
        // No existing application found
        alert('신청한 내역이 없어요! 신청서를 작성해주세요');
      }
    } catch (error) {
      console.error('Error checking existing networking application:', error);
    } finally {
      setIsCheckingNetworkingApplication(false);
    }
  };

  const handleLunchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const baseUrl = (import.meta as any).env?.VITE_AICON25_BE_URL || '';
      
      if (existingLunchApplication) {
        // Update existing application
        const response = await fetch(`${baseUrl}/api/meetup-application/patch/${lunchFormData.knoxId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: lunchFormData.name,
            knox_id: lunchFormData.knoxId,
            selected_meetup: lunchFormData.selectedMeetup,
            participation_reason: lunchFormData.reason,
            discussion_topics: lunchFormData.discussionTopics,
            allergy_info: lunchFormData.mealMenu
          })
        });

        if (response.ok) {
          alert('런치 밋업 신청서가 수정되었습니다!');
          setLunchModalOpen(false);
        } else {
          alert('런치 밋업 신청서 수정에 실패했습니다. 다시 시도해주세요.');
        }
      } else {
        // Create new application
        const response = await fetch(`${baseUrl}/api/meetup-application`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: lunchFormData.name,
            knox_id: lunchFormData.knoxId,
            selected_meetup: lunchFormData.selectedMeetup,
            participation_reason: lunchFormData.reason,
            discussion_topics: lunchFormData.discussionTopics,
            allergy_info: lunchFormData.mealMenu
          })
        });

        if (response.ok) {
          alert('런치 밋업 신청이 완료되었습니다!');
          setLunchModalOpen(false);
          setLunchFormData({
            name: '',
            knoxId: '',
            selectedMeetup: '',
            reason: '',
            discussionTopics: '',
            mealMenu: ''
          });
          setExistingLunchApplication(null);
        } else {
          alert('런치 밋업 신청에 실패했습니다. 다시 시도해주세요.');
        }
      }
    } catch (error) {
      console.error('Error submitting lunch meetup application:', error);
      alert('런치 밋업 신청 중 오류가 발생했습니다.');
    }
  };

  const handleNetworkingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Combine discussion topics with jocoding topic if applicable
    let finalDiscussionTopics = networkingFormData.discussionTopics;
    if (networkingFormData.selectedMeetup === 'jocoding' && networkingFormData.jocodingTopic) {
      const topicMapping = {
        'ai-engineer-growth': 'AI 시대 성장하는 엔지니어가 되기 위해 무엇을 공부할 것인가?',
        'ai-work-integration': '내 업무에 AI를 어떻게 도입하고 쓸 수 있을까?'
      };
      const jocodingTopicText = topicMapping[networkingFormData.jocodingTopic as keyof typeof topicMapping] || networkingFormData.jocodingTopic;
      finalDiscussionTopics = finalDiscussionTopics 
        ? `${finalDiscussionTopics}, ${jocodingTopicText}`
        : jocodingTopicText;
    }

    try {
      const baseUrl = (import.meta as any).env?.VITE_AICON25_BE_URL || '';
      
      if (existingNetworkingApplication) {
        // Update existing application
        const response = await fetch(`${baseUrl}/api/meetup-application/patch/${networkingFormData.knoxId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: networkingFormData.name,
            knox_id: networkingFormData.knoxId,
            selected_meetup: networkingFormData.selectedMeetup,
            participation_reason: networkingFormData.reason,
            discussion_topics: finalDiscussionTopics,
            allergy_info: ''
          })
        });

        if (response.ok) {
          alert('네트워킹 밋업 신청서가 수정되었습니다!');
          setNetworkingModalOpen(false);
        } else {
          alert('네트워킹 밋업 신청서 수정에 실패했습니다. 다시 시도해주세요.');
        }
      } else {
        // Create new application
        const response = await fetch(`${baseUrl}/api/meetup-application`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: networkingFormData.name,
            knox_id: networkingFormData.knoxId,
            selected_meetup: networkingFormData.selectedMeetup,
            participation_reason: networkingFormData.reason,
            discussion_topics: finalDiscussionTopics,
            allergy_info: ''
          })
        });

        if (response.ok) {
          alert('네트워킹 밋업 신청이 완료되었습니다!');
          setNetworkingModalOpen(false);
          setNetworkingFormData({
            name: '',
            knoxId: '',
            selectedMeetup: '',
            jocodingTopic: '',
            reason: '',
            discussionTopics: ''
          });
          setExistingNetworkingApplication(null);
        } else {
          alert('네트워킹 밋업 신청에 실패했습니다. 다시 시도해주세요.');
        }
      }
    } catch (error) {
      console.error('Error submitting networking meetup application:', error);
      alert('네트워킹 밋업 신청 중 오류가 발생했습니다.');
    }
  };

  const networkingEvents = [
    {
      id: 'qna-room',
      title: 'QnA 룸',
      icon: MessageSquare,
      description: '연사와의 심화 토론 및 질의응답 시간',
      details: 'AI 분야 전문가들과 1:1 또는 소그룹으로 깊이 있는 대화를 나눠보세요. 기술적 궁금증부터 커리어 상담까지, 개인별 맞춤 상담이 가능합니다.',
      time: '15:20 - 16:00',
      location: '108호/109호',
      capacity: '현장 참가',
      color: 'bg-[#5325BA]',
      bgGradient: 'from-[#5325BA]/10 to-[#5325BA]/5'
    },
    {
      id: 'lunch-meetup',
      title: '런치 밋업',
      icon: Utensils,
      description: '편안한 식사와 함께하는 네트워킹 시간',
      details: '연사와 함께하는 특별한 런치 밋업입니다. 팔란티어 연사 또는 구글 클라우드 연사와 함께 점심을 즐기며 깊이 있는 대화를 나눠보세요.',
      time: '12:00 - 13:00',
      location: 'B1 카페테리아 내 PDR룸',
      capacity: '참가 신청 후 안내 메일을 받으신 분',
      color: 'bg-[#6FF28F]',
      bgGradient: 'from-[#6FF28F]/10 to-[#6FF28F]/5'
    },
    {
      id: 'networking-meetup',
      title: '네트워킹 밋업',
      icon: Users2,
      description: '공식 네트워킹 리셉션 및 교류회',
      details: '특별한 네트워킹 세션에 참여하세요. 조코딩과 함께하는 성장 중심의 네트워킹 또는 DS 퍼스트 펭귄들과의 자유로운 교류 중 선택할 수 있습니다.',
      time: '14:30 - 16:00',
      location: '206호',
      capacity: '참가 신청 후 안내 메일을 받으신 분',
      color: 'bg-[#A48CED]',
      bgGradient: 'from-[#A48CED]/10 to-[#A48CED]/5'
    }
  ];

  return (
    <section id="networking" className="py-20 bg-transparent">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#5325BA' }}>
            네트워킹
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            AI 전문가들과 의미 있는 연결을 만들어가는 특별한 시간들
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {networkingEvents.map((event, index) => {
              const IconComponent = event.icon;
              return (
                <div key={event.id} className="space-y-4">
                  <Card 
                    className={`bg-white relative overflow-hidden border-2 hover:border-[#5325BA]/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-gradient-to-br ${event.bgGradient} group`}
                  >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute top-4 right-4">
                        <IconComponent className="w-24 h-24 text-gray-400" />
                      </div>
                    </div>
                    
                    <CardHeader className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 ${event.color} rounded-lg flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <Badge 
                          variant="secondary" 
                          className="bg-white/80 text-gray-700 backdrop-blur-sm"
                        >
                          {String(index + 1).padStart(2, '0')}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                        {event.title}
                      </CardTitle>
                      <p className="text-[#5325BA] font-medium text-sm">
                        {event.description}
                      </p>
                    </CardHeader>
                    
                    <CardContent className="space-y-4 relative z-10">
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {event.details}
                      </p>
                      
                      <div className="space-y-3 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-[#5325BA]" />
                          <span className="font-medium text-gray-700">시간:</span>
                          <span className="text-gray-600">{event.time}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-[#5325BA]" />
                          <span className="font-medium text-gray-700">장소:</span>
                          <span className="text-gray-600">{event.location}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm">
                          <Users2 className="w-4 h-4 text-[#5325BA]" />
                          <span className="font-medium text-gray-700">참여:</span>
                          <span className="text-gray-600">{event.capacity}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Application Button for Lunch Meetup */}
                  {event.id === 'lunch-meetup' && (
                    <div className="text-center">
                      <Dialog open={lunchModalOpen} onOpenChange={setLunchModalOpen}>
                        <DialogTrigger asChild>
                          <Button 
                            size="lg" 
                            className="bg-[#6FF28F] hover:bg-[#6FF28F]/90 text-gray-900 px-8 py-4 text-lg font-semibold rounded-2xl hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 border-black"
                          >
                            <Utensils className="w-5 h-5 mr-2" />
                            런치 밋업 신청
                          </Button>
                        </DialogTrigger>
                        
                        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto bg-white">
                          <DialogHeader>
                            <DialogTitle className="text-2xl font-bold text-center" style={{ color: '#5325BA' }}>
                              런치 밋업 신청
                            </DialogTitle>
                            <DialogDescription className="text-center text-gray-600">
                              연사와 함께하는 특별한 런치 밋업에 참여하기 위한 신청서를 작성해주세요.
                            </DialogDescription>
                          </DialogHeader>
                          
                          <form onSubmit={handleLunchSubmit} className="space-y-6 mt-6">
                            {/* Name */}
                            <div>
                              <Label htmlFor="lunch-name" className="text-sm font-medium">이름 *</Label>
                              <Input
                                id="lunch-name"
                                value={lunchFormData.name}
                                onChange={(e) => setLunchFormData(prev => ({ ...prev, name: e.target.value }))}
                                placeholder="홍길동"
                                required
                                className="mt-1"
                              />
                            </div>

                            {/* Knox ID */}
                            <div>
                              <Label htmlFor="lunch-knoxId" className="text-sm font-medium">녹스아이디 *</Label>
                              <div className="flex gap-2">
                                <Input
                                  id="lunch-knoxId"
                                  value={lunchFormData.knoxId}
                                  onChange={(e) => setLunchFormData(prev => ({ ...prev, knoxId: e.target.value }))}
                                  placeholder="knox ID를 입력하세요"
                                  required
                                  className="mt-1 flex-1"
                                />
                                <Button
                                  type="button"
                                  onClick={() => lunchFormData.knoxId && checkExistingLunchApplication(lunchFormData.knoxId)}
                                  disabled={!lunchFormData.knoxId || isCheckingLunchApplication}
                                  className="mt-1 bg-[#5325BA] hover:bg-[#5325BA]/90 text-white px-4"
                                >
                                  {isCheckingLunchApplication ? '확인 중...' : '기존 신청 확인'}
                                </Button>
                              </div>
                              {existingLunchApplication && (
                                <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                                  <p className="text-sm text-green-800">
                                    기존 신청서가 발견되었습니다. 정보를 수정할 수 있습니다.
                                  </p>
                                </div>
                              )}
                            </div>

                            {/* Lunch Meetup Selection */}
                            <div>
                              <Label className="text-sm font-medium">런치 밋업 선택 *</Label>
                              <RadioGroup 
                                value={lunchFormData.selectedMeetup} 
                                onValueChange={(value) => setLunchFormData(prev => ({ ...prev, selectedMeetup: value }))}
                                className="mt-2 space-y-3"
                              >
                                <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
                                  <RadioGroupItem value="palantir" id="lunch-palantir" />
                                  <Label htmlFor="lunch-palantir" className="cursor-pointer flex-1">
                                    <span className="font-medium">팔란티어 연사와 함께하는 런치 밋업</span>
                                  </Label>
                                </div>
                                
                                <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
                                  <RadioGroupItem value="google-cloud" id="lunch-google-cloud" />
                                  <Label htmlFor="lunch-google-cloud" className="cursor-pointer flex-1">
                                    <span className="font-medium">구글 클라우드 연사와 함께하는 런치 밋업</span>
                                  </Label>
                                </div>
                              </RadioGroup>
                            </div>

                            {/* Discussion Topics */}
                            <div>
                              <Label htmlFor="lunch-discussion-topics" className="text-sm font-medium">토론하고 싶은 주제</Label>
                              <Textarea
                                id="lunch-discussion-topics"
                                value={lunchFormData.discussionTopics}
                                onChange={(e) => setLunchFormData(prev => ({ ...prev, discussionTopics: e.target.value }))}
                                placeholder="연사와 토론하고 싶은 주제를 자유롭게 작성해주세요."
                                className="mt-1 min-h-[80px]"
                              />
                            </div>

                            {/* Reason */}
                            <div>
                              <Label htmlFor="lunch-reason" className="text-sm font-medium">밋업 신청하려는 이유 *</Label>
                              <Textarea
                                id="lunch-reason"
                                value={lunchFormData.reason}
                                onChange={(e) => setLunchFormData(prev => ({ ...prev, reason: e.target.value }))}
                                placeholder="런치 밋업에 참여하고 싶은 이유를 자유롭게 작성해주세요."
                                required
                                className="mt-1 min-h-[100px]"
                              />
                            </div>

                            {/* Allergy Info */}
                            <div>
                              <Label className="text-sm font-medium">알러지가 있다면, 저희에게 알려주세요.</Label>
                              <Input 
                                className="mt-1"
                                value={lunchFormData.mealMenu} 
                                onChange={(e) => setLunchFormData(prev => ({ ...prev, mealMenu: e.target.value }))}
                                placeholder="알러지 정보를 입력해주세요 (예: 견과류, 갑각류 등)"
                              />
                            </div>

                            {/* Submit Button */}
                            <div className="flex gap-3 pt-4">
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => setLunchModalOpen(false)}
                                className="flex-1"
                              >
                                취소
                              </Button>
                              <Button
                                type="submit"
                                className="flex-1 bg-[#6FF28F] hover:bg-[#6FF28F]/90 text-gray-900"
                              >
                                <Send className="w-4 h-4 mr-2" />
                                {existingLunchApplication ? '런치 밋업 신청서 수정하기' : '런치 밋업 신청'}
                              </Button>
                            </div>

                            {/* Cancellation Note */}
                            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                              <p className="text-xs text-yellow-800 text-center">
                                만약 신청하신 내역을 취소하고 싶으시면, devrel.ds@samsung.com으로 메일을 보내주시기 바랍니다.
                              </p>
                            </div>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </div>
                  )}

                  {/* Application Button for Networking Meetup */}
                  {event.id === 'networking-meetup' && (
                    <div className="text-center">
                      <Dialog open={networkingModalOpen} onOpenChange={setNetworkingModalOpen}>
                        <DialogTrigger asChild>
                          <Button 
                            size="lg" 
                            className="bg-[#A48CED] hover:bg-[#A48CED]/90 text-white px-8 py-4 text-lg font-semibold rounded-2xl hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 border-black"
                          >
                            <Users2 className="w-5 h-5 mr-2" />
                            네트워킹 밋업 신청
                          </Button>
                        </DialogTrigger>
                        
                        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto bg-white">
                          <DialogHeader>
                            <DialogTitle className="text-2xl font-bold text-center" style={{ color: '#5325BA' }}>
                              네트워킹 밋업 신청
                            </DialogTitle>
                            <DialogDescription className="text-center text-gray-600">
                              네트워킹 리셉션 및 교류회에 참여하기 위한 신청서를 작성해주세요.
                            </DialogDescription>
                          </DialogHeader>
                          
                          <form onSubmit={handleNetworkingSubmit} className="space-y-6 mt-6">
                            {/* Name */}
                            <div>
                              <Label htmlFor="networking-name" className="text-sm font-medium">이름 *</Label>
                              <Input
                                id="networking-name"
                                value={networkingFormData.name}
                                onChange={(e) => setNetworkingFormData(prev => ({ ...prev, name: e.target.value }))}
                                placeholder="홍길동"
                                required
                                className="mt-1"
                              />
                            </div>

                            {/* Knox ID */}
                            <div>
                              <Label htmlFor="networking-knoxId" className="text-sm font-medium">녹스아이디 *</Label>
                              <div className="flex gap-2">
                                <Input
                                  id="networking-knoxId"
                                  value={networkingFormData.knoxId}
                                  onChange={(e) => setNetworkingFormData(prev => ({ ...prev, knoxId: e.target.value }))}
                                  placeholder="knox ID를 입력하세요"
                                  required
                                  className="mt-1 flex-1"
                                />
                                <Button
                                  type="button"
                                  onClick={() => networkingFormData.knoxId && checkExistingNetworkingApplication(networkingFormData.knoxId)}
                                  disabled={!networkingFormData.knoxId || isCheckingNetworkingApplication}
                                  className="mt-1 bg-[#5325BA] hover:bg-[#5325BA]/90 text-white px-4"
                                >
                                  {isCheckingNetworkingApplication ? '확인 중...' : '기존 신청 확인'}
                                </Button>
                              </div>
                              {existingNetworkingApplication && (
                                <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                                  <p className="text-sm text-green-800">
                                    기존 신청서가 발견되었습니다. 정보를 수정할 수 있습니다.
                                  </p>
                                </div>
                              )}
                            </div>

                            {/* Networking Meetup Selection */}
                            <div>
                              <Label className="text-sm font-medium">네트워킹 밋업 선택 *</Label>
                              <RadioGroup 
                                value={networkingFormData.selectedMeetup} 
                                onValueChange={(value) => setNetworkingFormData(prev => ({ ...prev, selectedMeetup: value, jocodingTopic: '' }))}
                                className="mt-2 space-y-3"
                              >
                                <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
                                  <RadioGroupItem value="jocoding" id="networking-jocoding" />
                                  <Label htmlFor="networking-jocoding" className="cursor-pointer flex-1">
                                    <span className="font-medium">조코딩과 함께하는 '어떻게 공부할 것인가, 어떻게 일할 것인가' 네트워킹</span>
                                  </Label>
                                </div>
                                
                                <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
                                  <RadioGroupItem value="first-penguins" id="networking-first-penguins" />
                                  <Label htmlFor="networking-first-penguins" className="cursor-pointer flex-1">
                                    <span className="font-medium">DS 퍼스트 펭귄들과 함께하는 자유 네트워킹</span>
                                  </Label>
                                </div>
                              </RadioGroup>
                            </div>

                            {/* Jocoding Topic Selection */}
                            {networkingFormData.selectedMeetup === 'jocoding' && (
                              <div>
                                <Label className="text-sm font-medium">다음 중 관심 있는 주제를 골라주세요. *</Label>
                                <RadioGroup 
                                  value={networkingFormData.jocodingTopic} 
                                  onValueChange={(value) => setNetworkingFormData(prev => ({ ...prev, jocodingTopic: value }))}
                                  className="mt-2 space-y-3"
                                >
                                  <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
                                    <RadioGroupItem value="ai-engineer-growth" id="networking-ai-engineer-growth" />
                                    <Label htmlFor="networking-ai-engineer-growth" className="cursor-pointer flex-1">
                                      <span className="font-medium">AI 시대 성장하는 엔지니어가 되기 위해 무엇을 공부할 것인가?</span>
                                    </Label>
                                  </div>
                                  
                                  <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
                                    <RadioGroupItem value="ai-work-integration" id="networking-ai-work-integration" />
                                    <Label htmlFor="networking-ai-work-integration" className="cursor-pointer flex-1">
                                      <span className="font-medium">내 업무에 AI를 어떻게 도입하고 쓸 수 있을까?</span>
                                    </Label>
                                  </div>
                                </RadioGroup>
                              </div>
                            )}

                            {/* Discussion Topics */}
                            <div>
                              <Label htmlFor="networking-discussion-topics" className="text-sm font-medium">토론하고 싶은 주제</Label>
                              <Textarea
                                id="networking-discussion-topics"
                                value={networkingFormData.discussionTopics}
                                onChange={(e) => setNetworkingFormData(prev => ({ ...prev, discussionTopics: e.target.value }))}
                                placeholder="네트워킹에서 토론하고 싶은 주제를 자유롭게 작성해주세요."
                                className="mt-1 min-h-[80px]"
                              />
                            </div>

                            {/* Reason */}
                            <div>
                              <Label htmlFor="networking-reason" className="text-sm font-medium">밋업 신청하려는 이유 *</Label>
                              <Textarea
                                id="networking-reason"
                                value={networkingFormData.reason}
                                onChange={(e) => setNetworkingFormData(prev => ({ ...prev, reason: e.target.value }))}
                                placeholder="네트워킹 밋업에 참여하고 싶은 이유를 자유롭게 작성해주세요."
                                required
                                className="mt-1 min-h-[100px]"
                              />
                            </div>

                            {/* Submit Button */}
                            <div className="flex gap-3 pt-4">
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => setNetworkingModalOpen(false)}
                                className="flex-1"
                              >
                                취소
                              </Button>
                              <Button
                                type="submit"
                                className="flex-1 bg-[#A48CED] hover:bg-[#A48CED]/90"
                              >
                                <Send className="w-4 h-4 mr-2" />
                                {existingNetworkingApplication ? '네트워킹 밋업 신청서 수정하기' : '네트워킹 밋업 신청'}
                              </Button>
                            </div>

                            {/* Cancellation Note */}
                            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                              <p className="text-xs text-yellow-800 text-center">
                                만약 신청하신 내역을 취소하고 싶으시면, devrel.ds@samsung.com으로 메일을 보내주시기 바랍니다.
                              </p>
                            </div>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </div>
                  )}
                </div>
              );
            })}
          </div>


        </div>
      </div>
    </section>
  );
}