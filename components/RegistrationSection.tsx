import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
// import { Checkbox } from './ui/checkbox';
// import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { CheckCircle } from 'lucide-react';

export function RegistrationSection() {
  const [selectedForm, setSelectedForm] = useState<'forum' | 'conference' | 'both' | null>(null);
  const [participationType, setParticipationType] = useState<string>('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [forumFormData, setForumFormData] = useState({
    name: '',
    knoxId: '',
    streamingParticipation: ''
  });
  const [existingForumApplication, setExistingForumApplication] = useState<any>(null);
  const [isCheckingApplication, setIsCheckingApplication] = useState(false);
  const [existingConferenceApplication, setExistingConferenceApplication] = useState<any>(null);
  const [isCheckingConferenceApplication, setIsCheckingConferenceApplication] = useState(false);
  const [existingBothEventsApplication, setExistingBothEventsApplication] = useState<any>(null);
  const [isCheckingBothEventsApplication, setIsCheckingBothEventsApplication] = useState(false);

  const [conferenceFormData, setConferenceFormData] = useState({
    name: '',
    knoxId: '',
    participation: '',
    transportation: '',
    firstSession: '',
    firstSessionQuestion: '',
    secondSession: '',
    secondSessionQuestion: '',
    reason: '',
    messageToOrganizers: '',
    recommender: ''
  });

  const [bothEventsFormData, setBothEventsFormData] = useState({
    name: '',
    knoxId: '',
    participation: '',
    transportation: '',
    firstSession: '',
    firstSessionQuestion: '',
    secondSession: '',
    secondSessionQuestion: '',
    reason: '',
    messageToOrganizers: ''
  });

  const checkExistingForumApplication = async (knoxId: string) => {
    try {
      setIsCheckingApplication(true);
      const baseUrl = (import.meta as any).env?.VITE_AICON25_BE_URL || '';
      const response = await fetch(`${baseUrl}/api/saif-participation/check/${knoxId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data) {
          // Existing application found, fetch the details
          const detailsResponse = await fetch(`${baseUrl}/api/saif-participation/${knoxId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          
          if (detailsResponse.ok) {
            const applicationData = await detailsResponse.json();
            setExistingForumApplication(applicationData);
            setForumFormData({
              name: applicationData.name || '',
              knoxId: applicationData.knox_id || '',
              streamingParticipation: applicationData.streaming_participation ? 'yes' : 'no'
            });
          }
        } else {
          // No existing application found
          alert('신청한 내역이 없어요! 신청서를 작성해주세요');
        }
      }
    } catch (error) {
      console.error('Error checking existing application:', error);
    } finally {
      setIsCheckingApplication(false);
    }
  };

  const handleForumSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!forumFormData.name || !forumFormData.knoxId || !forumFormData.streamingParticipation) {
      alert('모든 필수 항목을 입력해주세요.');
      return;
    }

    try {
      const baseUrl = (import.meta as any).env?.VITE_AICON25_BE_URL || '';
      
      if (existingForumApplication) {
        // Update existing application
        const response = await fetch(`${baseUrl}/api/saif-participation/${forumFormData.knoxId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: forumFormData.name,
            knox_id: forumFormData.knoxId,
            streaming_participation: forumFormData.streamingParticipation === 'yes'
          }),
        });

        if (response.status === 200 || response.status === 201) {
          setSuccessMessage('Samsung AI Forum 신청서가 수정되었습니다!\n\n9월 15일 DS 스트리밍 초대 링크가 발송될 예정입니다.');
          setShowSuccessModal(true);
        } else {
          alert('신청서 수정에 실패했습니다. 다시 시도해주세요.');
        }
      } else {
        // Create new application
        const response = await fetch(`${baseUrl}/api/saif-participation`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: forumFormData.name,
            knox_id: forumFormData.knoxId,
            streaming_participation: forumFormData.streamingParticipation === 'yes'
          }),
        });

        if (response.status === 200 || response.status === 201) {
          setSuccessMessage('Samsung AI Forum 신청이 완료되었습니다!\n\n9월 15일 DS 스트리밍 초대 링크가 발송될 예정입니다.');
          setShowSuccessModal(true);
          setForumFormData({ name: '', knoxId: '', streamingParticipation: '' });
          setExistingForumApplication(null);
        } else {
          console.log(response);
          alert('신청에 실패했습니다. 다시 시도해주세요.');
        }
      }
    } catch (error) {
      console.error('Error submitting Samsung AI Forum application:', error);
      alert('신청 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const handleForumDelete = async () => {
    if (!existingForumApplication || !forumFormData.knoxId) {
      alert('삭제할 신청서가 없습니다.');
      return;
    }

    if (!confirm('정말로 신청서를 삭제하시겠습니까?')) {
      return;
    }

    try {
      const baseUrl = (import.meta as any).env?.VITE_AICON25_BE_URL || '';
      const response = await fetch(`${baseUrl}/api/saif-participation/${forumFormData.knoxId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200 || response.status === 204) {
        setSuccessMessage('Samsung AI Forum 신청서가 삭제되었습니다.');
        setShowSuccessModal(true);
        setForumFormData({ name: '', knoxId: '', streamingParticipation: '' });
        setExistingForumApplication(null);
      } else {
        alert('신청서 삭제에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('Error deleting Samsung AI Forum application:', error);
      alert('신청서 삭제 중 오류가 발생했습니다.');
    }
  };

  const checkExistingConferenceApplication = async (knoxId: string) => {
    try {
      setIsCheckingConferenceApplication(true);
      const baseUrl = (import.meta as any).env?.VITE_AICON25_BE_URL || '';
      const response = await fetch(`${baseUrl}/api/aicon-participation/check/${knoxId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data) {
          // Existing application found, fetch the details
          const detailsResponse = await fetch(`${baseUrl}/api/aicon-participation/${knoxId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          
          if (detailsResponse.ok) {
            const applicationData = await detailsResponse.json();
            setExistingConferenceApplication(applicationData);
            setConferenceFormData({
              name: applicationData.name || '',
              knoxId: applicationData.knox_id || '',
              participation: applicationData.participation || '',
              transportation: applicationData.transportation || '',
              firstSession: applicationData.first_session || '',
              firstSessionQuestion: applicationData.first_session_question || '',
              secondSession: applicationData.second_session || '',
              secondSessionQuestion: applicationData.second_session_question || '',
              reason: applicationData.reason || '',
              messageToOrganizers: applicationData.message_to_organizers || '',
              recommender: applicationData.recommender || ''
            });
          }
        } else {
          // No existing application found
          alert('신청한 내역이 없어요! 신청서를 작성해주세요');
        }
      }
    } catch (error) {
      console.error('Error checking existing conference application:', error);
    } finally {
      setIsCheckingConferenceApplication(false);
    }
  };

  const handleConferenceDelete = async () => {
    if (!existingConferenceApplication || !conferenceFormData.knoxId) {
      alert('삭제할 신청서가 없습니다.');
      return;
    }

    if (!confirm('정말로 신청서를 삭제하시겠습니까?')) {
      return;
    }

    try {
      const baseUrl = (import.meta as any).env?.VITE_AICON25_BE_URL || '';
      const response = await fetch(`${baseUrl}/api/aicon-participation/${conferenceFormData.knoxId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200 || response.status === 204) {
        setSuccessMessage('DS AI Conference 신청서가 삭제되었습니다.');
        setShowSuccessModal(true);
        setConferenceFormData({
          name: '',
          knoxId: '',
          participation: '',
          transportation: '',
          firstSession: '',
          firstSessionQuestion: '',
          secondSession: '',
          secondSessionQuestion: '',
          reason: '',
          messageToOrganizers: '',
          recommender: ''
        });
        setExistingConferenceApplication(null);
      } else {
        alert('신청서 삭제에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('Error deleting DS AI Conference application:', error);
      alert('신청서 삭제 중 오류가 발생했습니다.');
    }
  };

  const checkExistingBothEventsApplication = async (knoxId: string) => {
    try {
      setIsCheckingBothEventsApplication(true);
      const baseUrl = (import.meta as any).env?.VITE_AICON25_BE_URL || '';
      const response = await fetch(`${baseUrl}/api/saif-participation/check/${knoxId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data) {
          // Existing application found, fetch the details
          const detailsResponse = await fetch(`${baseUrl}/api/saif-participation/${knoxId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          
          if (detailsResponse.ok) {
            const applicationData = await detailsResponse.json();
            setExistingBothEventsApplication(applicationData);
            setBothEventsFormData({
              name: applicationData.name || '',
              knoxId: applicationData.knox_id || '',
              participation: applicationData.participation || '',
              transportation: applicationData.transportation || '',
              firstSession: applicationData.first_session || '',
              firstSessionQuestion: applicationData.first_session_question || '',
              secondSession: applicationData.second_session || '',
              secondSessionQuestion: applicationData.second_session_question || '',
              reason: applicationData.reason || '',
              messageToOrganizers: applicationData.message_to_organizers || ''
            });
          }
        } else {
          // No existing application found
          alert('신청한 내역이 없어요! 신청서를 작성해주세요');
        }
      }
    } catch (error) {
      console.error('Error checking existing both events application:', error);
    } finally {
      setIsCheckingBothEventsApplication(false);
    }
  };

  const handleBothEventsDelete = async () => {
    if (!existingBothEventsApplication || !bothEventsFormData.knoxId) {
      alert('삭제할 신청서가 없습니다.');
      return;
    }

    if (!confirm('정말로 신청서를 삭제하시겠습니까?')) {
      return;
    }

    try {
      const baseUrl = (import.meta as any).env?.VITE_AICON25_BE_URL || '';
      const response = await fetch(`${baseUrl}/api/aicon-participation/${bothEventsFormData.knoxId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200 || response.status === 204) {
        setSuccessMessage('Samsung AI Forum + DS AI Conference 신청서가 삭제되었습니다.');
        setShowSuccessModal(true);
        setBothEventsFormData({
          name: '',
          knoxId: '',
          participation: '',
          transportation: '',
          firstSession: '',
          firstSessionQuestion: '',
          secondSession: '',
          secondSessionQuestion: '',
          reason: '',
          messageToOrganizers: ''
        });
        setExistingBothEventsApplication(null);
      } else {
        alert('신청서 삭제에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('Error deleting both events application:', error);
      alert('신청서 삭제 중 오류가 발생했습니다.');
    }
  };

  const handleConferenceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = [
      'name', 'knoxId', 'participation', 'firstSession', 'secondSession', 'reason'
    ];
    
    // Add transportation validation for offline participation
    if (conferenceFormData.participation === 'offline') {
      requiredFields.push('transportation');
    }
    
    for (const field of requiredFields) {
      if (!conferenceFormData[field as keyof typeof conferenceFormData]) {
        alert('모든 필수 항목을 입력해주세요.');
        return;
      }
    }

    try {
      const baseUrl = (import.meta as any).env?.VITE_AICON25_BE_URL || '';
      
      if (existingConferenceApplication) {
        // Update existing application
        const response = await fetch(`${baseUrl}/api/aicon-participation/${conferenceFormData.knoxId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: conferenceFormData.name,
            knox_id: conferenceFormData.knoxId,
            participation: conferenceFormData.participation,
            transportation: conferenceFormData.transportation,
            first_session: conferenceFormData.firstSession,
            first_session_question: conferenceFormData.firstSessionQuestion,
            second_session: conferenceFormData.secondSession,
            second_session_question: conferenceFormData.secondSessionQuestion,
            reason: conferenceFormData.reason,
            message_to_organizers: conferenceFormData.messageToOrganizers,
            recommender: conferenceFormData.recommender
          }),
        });

        if (response.status === 200 || response.status === 201) {
          // Set success message based on participation type
          const message = conferenceFormData.participation === 'online' 
            ? 'DS AI Conference 신청서가 수정되었습니다!\n\n9월 17일 DS 스트리밍 초대 링크가 발송될 예정입니다.'
            : 'DS AI Conference 신청서가 수정되었습니다!\n\n9월 5일에 참가 확정 안내 메일이 발송될 예정입니다.';
          
          setSuccessMessage(message);
          setShowSuccessModal(true);
        } else {
          alert('신청서 수정에 실패했습니다. 다시 시도해주세요.');
        }
      } else {
        // Create new application
        const response = await fetch(`${baseUrl}/api/aicon-participation`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: conferenceFormData.name,
            knox_id: conferenceFormData.knoxId,
            participation: conferenceFormData.participation,
            transportation: conferenceFormData.transportation,
            first_session: conferenceFormData.firstSession,
            first_session_question: conferenceFormData.firstSessionQuestion,
            second_session: conferenceFormData.secondSession,
            second_session_question: conferenceFormData.secondSessionQuestion,
            reason: conferenceFormData.reason,
            message_to_organizers: conferenceFormData.messageToOrganizers,
            recommender: conferenceFormData.recommender
          }),
        });

        if (response.status === 200 || response.status === 201) {
          // Set success message based on participation type
          const message = conferenceFormData.participation === 'online' 
            ? 'DS AI Conference 신청이 완료되었습니다!\n\n9월 17일 DS 스트리밍 초대 링크가 발송될 예정입니다.'
            : 'DS AI Conference 신청이 완료되었습니다!\n\n9월 5일에 참가 확정 안내 메일이 발송될 예정입니다.';
          
          setSuccessMessage(message);
          setShowSuccessModal(true);
          
          // Reset form
          setConferenceFormData({
            name: '',
            knoxId: '',
            participation: '',
            transportation: '',
            firstSession: '',
            firstSessionQuestion: '',
            secondSession: '',
            secondSessionQuestion: '',
            reason: '',
            messageToOrganizers: '',
            recommender: ''
          });
          setParticipationType('');
          setExistingConferenceApplication(null);
        } else {
          console.log(response);
          alert('신청에 실패했습니다. 다시 시도해주세요.');
        }
      }
    } catch (error) {
      console.error('Error submitting DS AI Conference application:', error);
      alert('신청 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const handleBothSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = [
      'name', 'knoxId', 'participation', 'firstSession', 'secondSession', 'reason'
    ];
    
    // Add transportation validation for offline participation
    if (bothEventsFormData.participation === 'offline') {
      requiredFields.push('transportation');
    }
    
    for (const field of requiredFields) {
      if (!bothEventsFormData[field as keyof typeof bothEventsFormData]) {
        alert('모든 필수 항목을 입력해주세요.');
        return;
      }
    }

    try {
      const baseUrl = (import.meta as any).env?.VITE_AICON25_BE_URL || '';
      
      if (existingBothEventsApplication) {
        // Update existing application - only update DS AI Conference part
        const aiconResponse = await fetch(`${baseUrl}/api/aicon-participation/${bothEventsFormData.knoxId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: bothEventsFormData.name,
            knox_id: bothEventsFormData.knoxId,
            participation: bothEventsFormData.participation,
            transportation: bothEventsFormData.transportation,
            first_session: bothEventsFormData.firstSession,
            first_session_question: bothEventsFormData.firstSessionQuestion,
            second_session: bothEventsFormData.secondSession,
            second_session_question: bothEventsFormData.secondSessionQuestion,
            reason: bothEventsFormData.reason,
            message_to_organizers: bothEventsFormData.messageToOrganizers,
            recommender: ''
          }),
        });

        if (aiconResponse.status === 200 || aiconResponse.status === 201) {
          // Set success message based on participation type
          const message = bothEventsFormData.participation === 'online' 
            ? 'Samsung AI Forum과 DS AI Conference 신청서가 수정되었습니다!\n\n9월 15일과 17일 각각 DS 스트리밍 초대 링크가 발송될 예정입니다.'
            : 'Samsung AI Forum과 DS AI Conference 신청서가 수정되었습니다!\n\n9월 15일에 Samsung AI Forum을 위한 DS 스트리밍 초대링크가 발송될 예정이며, 9월 5일에 DS AI Conference 참가 확정 안내 메일이 발송될 예정입니다.';
          
          setSuccessMessage(message);
          setShowSuccessModal(true);
        } else {
          alert('신청서 수정에 실패했습니다. 다시 시도해주세요.');
        }
      } else {
        // Create new applications - call both APIs simultaneously
        const [saifResponse, aiconResponse] = await Promise.all([
          // Samsung AI Forum API call
          fetch(`${baseUrl}/api/saif-participation`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: bothEventsFormData.name,
              knox_id: bothEventsFormData.knoxId,
              streaming_participation: true
            }),
          }),
          // DS AI Conference API call
          fetch(`${baseUrl}/api/aicon-participation`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: bothEventsFormData.name,
              knox_id: bothEventsFormData.knoxId,
              participation: bothEventsFormData.participation,
              transportation: bothEventsFormData.transportation,
              first_session: bothEventsFormData.firstSession,
              first_session_question: bothEventsFormData.firstSessionQuestion,
              second_session: bothEventsFormData.secondSession,
              second_session_question: bothEventsFormData.secondSessionQuestion,
              reason: bothEventsFormData.reason,
              message_to_organizers: bothEventsFormData.messageToOrganizers,
              recommender: ''
            }),
          })
        ]);

        if ((saifResponse.status === 200 || saifResponse.status === 201) && 
            (aiconResponse.status === 200 || aiconResponse.status === 201)) {
          // Set success message based on participation type
          const message = bothEventsFormData.participation === 'online' 
            ? 'Samsung AI Forum과 DS AI Conference 신청이 완료되었습니다!\n\n9월 15일과 17일 각각 DS 스트리밍 초대 링크가 발송될 예정입니다.'
            : 'Samsung AI Forum과 DS AI Conference 신청이 완료되었습니다!\n\n9월 15일에 Samsung AI Forum을 위한 DS 스트리밍 초대링크가 발송될 예정이며, 9월 5일에 DS AI Conference 참가 확정 안내 메일이 발송될 예정입니다.';
          
          setSuccessMessage(message);
          setShowSuccessModal(true);
          
          // Reset form
          setBothEventsFormData({
            name: '',
            knoxId: '',
            participation: '',
            transportation: '',
            firstSession: '',
            firstSessionQuestion: '',
            secondSession: '',
            secondSessionQuestion: '',
            reason: '',
            messageToOrganizers: ''
          });
          setParticipationType('');
          setExistingBothEventsApplication(null);
        } else {
          console.log('SAIF Response:', saifResponse);
          console.log('AICON Response:', aiconResponse);
          alert('신청에 실패했습니다. 다시 시도해주세요.');
        }
      }
    } catch (error) {
      console.error('Error submitting both events application:', error);
      alert('신청 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const renderBothEventsForm = () => (
    <Card className="max-w-2xl mx-auto bg-white">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Samsung AI Forum + DS AI Conference 양일 신청서</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleBothSubmit}>
          <div className="space-y-6">
            <div>
              <Label htmlFor="both-name" className="text-base font-semibold">이름 * <span className="text-xs text-red-500">필수</span></Label>
              <Input 
                id="both-name" 
                placeholder="홍길동" 
                value={bothEventsFormData.name}
                onChange={(e) => setBothEventsFormData({...bothEventsFormData, name: e.target.value})}
                required
              />
            </div>

            <div>
              <Label htmlFor="both-knoxId" className="text-base font-semibold">Knox ID * <span className="text-xs text-red-500">필수</span></Label>
              <div className="flex gap-2">
                <Input 
                  id="both-knoxId" 
                  placeholder="knox ID를 입력하세요" 
                  value={bothEventsFormData.knoxId}
                  onChange={(e) => setBothEventsFormData({...bothEventsFormData, knoxId: e.target.value})}
                  required
                  className="flex-1"
                />
                <Button
                  type="button"
                  onClick={() => bothEventsFormData.knoxId && checkExistingBothEventsApplication(bothEventsFormData.knoxId)}
                  disabled={!bothEventsFormData.knoxId || isCheckingBothEventsApplication}
                  className="bg-[#5325BA] hover:bg-[#5325BA]/90 text-white px-4"
                >
                  {isCheckingBothEventsApplication ? '확인 중...' : '기존 신청 확인'}
                </Button>
              </div>
              {existingBothEventsApplication && (
                <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800">
                    기존 신청서가 발견되었습니다. 정보를 수정하거나 삭제할 수 있습니다.
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <Label className="text-base font-semibold">DS AI Conference 온/오프라인 참가 여부 * <span className="text-xs text-red-500">필수</span></Label>
              <RadioGroup 
                value={bothEventsFormData.participation} 
                onValueChange={(value) => setBothEventsFormData({...bothEventsFormData, participation: value})} 
                className="space-y-1"
              >
                <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-[#5325BA]/30 transition-all duration-200 cursor-pointer">
                  <RadioGroupItem value="offline" id="both-participation-offline" className="w-5 h-5 border-2 border-[#5325BA] data-[state=checked]:bg-[#5325BA] data-[state=checked]:border-[#5325BA]" />
                  <Label htmlFor="both-participation-offline" className="cursor-pointer flex-1 font-medium">오프라인 참가</Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-[#5325BA]/30 transition-all duration-200 cursor-pointer">
                  <RadioGroupItem value="online" id="both-participation-online" className="w-5 h-5 border-2 border-[#5325BA] data-[state=checked]:bg-[#5325BA] data-[state=checked]:border-[#5325BA]" />
                  <Label htmlFor="both-participation-online" className="cursor-pointer flex-1 font-medium">온라인 참가</Label>
                </div>
              </RadioGroup>

              {/* Offline Warning */}
              {bothEventsFormData.participation === 'offline' && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-3">
                  <div className="flex items-start space-x-2">
                    <div className="text-yellow-600 mt-0.5">⚠️</div>
                    <div className="text-sm text-yellow-800">
                      <p className="font-medium">한정된 인원만 오프라인 참석이 가능해요. 꼭 참석이 가능하신 경우만 오프라인 참석 신청을 부탁드려요!</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Transportation Poll - Only shown when offline participation is selected */}
            {bothEventsFormData.participation === 'offline' && (
          <div className="space-y-4 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="space-y-3">
              <Label className="text-base font-semibold text-blue-900">어디 배차를 희망하세요? *</Label>
              
              {/* Alert Message */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <div className="flex items-start space-x-2">
                  <div className="text-yellow-600 mt-0.5">⚠️</div>
                  <div className="text-sm text-yellow-800">
                    <p className="font-medium mb-1">주차장 이용이 어려워요, 셔틀버스 및 대중교통 이용 부탁드려요.</p>
                    <p>희망하시는 배차대로 안될 수도 있어요. 참가자 선정 시, 다시 알려드릴게요.</p>
                  </div>
                </div>
              </div>

                  <RadioGroup 
                    value={bothEventsFormData.transportation}
                    onValueChange={(value) => setBothEventsFormData({...bothEventsFormData, transportation: value})}
                    className="grid grid-cols-2 gap-2"
                  >
                    <div className="flex items-center space-x-3 p-2 rounded-lg border border-blue-200 hover:bg-blue-100 hover:border-[#5325BA]/30 transition-all duration-200 cursor-pointer">
                      <RadioGroupItem value="H" id="both-pickup-hwaseong-h1" className="w-4 h-4 border-2 border-[#5325BA] data-[state=checked]:bg-[#5325BA] data-[state=checked]:border-[#5325BA]" />
                      <Label htmlFor="both-pickup-hwaseong-h1" className="cursor-pointer flex-1 font-medium text-sm">화성 H1</Label>
                    </div>
                    <div className="flex items-center space-x-3 p-2 rounded-lg border border-blue-200 hover:bg-blue-100 hover:border-[#5325BA]/30 transition-all duration-200 cursor-pointer">
                      <RadioGroupItem value="K" id="both-pickup-giheung-k1" className="w-4 h-4 border-2 border-[#5325BA] data-[state=checked]:bg-[#5325BA] data-[state=checked]:border-[#5325BA]" />
                      <Label htmlFor="both-pickup-giheung-k1" className="cursor-pointer flex-1 font-medium text-sm">기흥 K1</Label>
                    </div>
                    <div className="flex items-center space-x-3 p-2 rounded-lg border border-blue-200 hover:bg-blue-100 hover:border-[#5325BA]/30 transition-all duration-200 cursor-pointer">
                      <RadioGroupItem value="P" id="both-pickup-pyeongtaek-p1" className="w-4 h-4 border-2 border-[#5325BA] data-[state=checked]:bg-[#5325BA] data-[state=checked]:border-[#5325BA]" />
                      <Label htmlFor="both-pickup-pyeongtaek-p1" className="cursor-pointer flex-1 font-medium text-sm">평택 P1</Label>
                    </div>
                    <div className="flex items-center space-x-3 p-2 rounded-lg border border-blue-200 hover:bg-blue-100 hover:border-[#5325BA]/30 transition-all duration-200 cursor-pointer">
                      <RadioGroupItem value="O" id="both-pickup-onyang" className="w-4 h-4 border-2 border-[#5325BA] data-[state=checked]:bg-[#5325BA] data-[state=checked]:border-[#5325BA]" />
                      <Label htmlFor="both-pickup-onyang" className="cursor-pointer flex-1 font-medium text-sm">온양</Label>
                    </div>
                    <div className="flex items-center space-x-3 p-2 rounded-lg border border-blue-200 hover:bg-blue-100 hover:border-[#5325BA]/30 transition-all duration-200 cursor-pointer">
                      <RadioGroupItem value="F" id="both-pickup-future-tech-campus" className="w-4 h-4 border-2 border-[#5325BA] data-[state=checked]:bg-[#5325BA] data-[state=checked]:border-[#5325BA]" />
                      <Label htmlFor="both-pickup-future-tech-campus" className="cursor-pointer flex-1 font-medium text-sm">미래기술캠퍼스</Label>
                    </div>
                    <div className="flex items-center space-x-3 p-2 rounded-lg border border-blue-200 hover:bg-blue-100 hover:border-[#5325BA]/30 transition-all duration-200 cursor-pointer">
                      <RadioGroupItem value="D" id="both-pickup-ds-cube" className="w-4 h-4 border-2 border-[#5325BA] data-[state=checked]:bg-[#5325BA] data-[state=checked]:border-[#5325BA]" />
                      <Label htmlFor="both-pickup-ds-cube" className="cursor-pointer flex-1 font-medium text-sm">DS큐브</Label>
                    </div>
                    <div className="flex items-center space-x-3 p-2 rounded-lg border border-blue-200 hover:bg-blue-100 hover:border-[#5325BA]/30 transition-all duration-200 cursor-pointer">
                      <RadioGroupItem value="W" id="both-pickup-walk-public-transport" className="w-4 h-4 border-2 border-[#5325BA] data-[state=checked]:bg-[#5325BA] data-[state=checked]:border-[#5325BA]" />
                      <Label htmlFor="both-pickup-walk-public-transport" className="cursor-pointer flex-1 font-medium text-sm">도보/대중교통</Label>
                    </div>
              </RadioGroup>
            </div>
          </div>
        )}

            <div className="space-y-4">
              <Label className="text-base font-semibold">듣고싶은 강연 (1) * <span className="text-xs text-red-500">필수</span></Label>
              <RadioGroup 
                value={bothEventsFormData.firstSession}
                onValueChange={(value) => setBothEventsFormData({...bothEventsFormData, firstSession: value})}
                className="space-y-1"
              >
                <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-[#5325BA]/30 transition-all duration-200 cursor-pointer">
                  <RadioGroupItem value="UD" id="both-seminar1-option1" className="w-5 h-5 border-2 border-[#5325BA] data-[state=checked]:bg-[#5325BA] data-[state=checked]:border-[#5325BA]" />
                  <Label htmlFor="both-seminar1-option1" className="cursor-pointer flex-1 font-medium">AI의 미래: 혁신과 도전</Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-[#5325BA]/30 transition-all duration-200 cursor-pointer">
                  <RadioGroupItem value="101" id="both-seminar1-option2" className="w-5 h-5 border-2 border-[#5325BA] data-[state=checked]:bg-[#5325BA] data-[state=checked]:border-[#5325BA]" />
                  <Label htmlFor="both-seminar1-option2" className="cursor-pointer flex-1 font-medium">딥러닝 최신 기술 동향</Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-[#5325BA]/30 transition-all duration-200 cursor-pointer">
                  <RadioGroupItem value="102" id="both-seminar1-option3" className="w-5 h-5 border-2 border-[#5325BA] data-[state=checked]:bg-[#5325BA] data-[state=checked]:border-[#5325BA]" />
                  <Label htmlFor="both-seminar1-option3" className="cursor-pointer flex-1 font-medium">Machine Learning 실무 적용</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="both-speaker-question-1" className="text-base font-semibold">해당 강연자에게 묻고싶은 궁금한 점이 있나요?</Label>
              <Textarea 
                id="both-speaker-question-1" 
                placeholder="선택하신 강연의 연사에게 궁금한 점이나 질문하고 싶은 내용을 자유롭게 작성해주세요." 
                className="min-h-[100px]"
                value={bothEventsFormData.firstSessionQuestion}
                onChange={(e) => setBothEventsFormData({...bothEventsFormData, firstSessionQuestion: e.target.value})}
              />
            </div>

            <div className="space-y-4">
              <Label className="text-base font-semibold">듣고싶은 강연 (2) * <span className="text-xs text-red-500">필수</span></Label>
              <RadioGroup 
                value={bothEventsFormData.secondSession}
                onValueChange={(value) => setBothEventsFormData({...bothEventsFormData, secondSession: value})}
                className="space-y-1"
              >
                <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-[#5325BA]/30 transition-all duration-200 cursor-pointer">
                  <RadioGroupItem value="UD" id="both-seminar2-option1" className="w-5 h-5 border-2 border-[#5325BA] data-[state=checked]:bg-[#5325BA] data-[state=checked]:border-[#5325BA]" />
                  <Label htmlFor="both-seminar2-option1" className="cursor-pointer flex-1 font-medium">Computer Vision 혁신</Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-[#5325BA]/30 transition-all duration-200 cursor-pointer">
                  <RadioGroupItem value="101" id="both-seminar2-option2" className="w-5 h-5 border-2 border-[#5325BA] data-[state=checked]:bg-[#5325BA] data-[state=checked]:border-[#5325BA]" />
                  <Label htmlFor="both-seminar2-option2" className="cursor-pointer flex-1 font-medium">MLOps와 프로덕션 배포</Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-[#5325BA]/30 transition-all duration-200 cursor-pointer">
                  <RadioGroupItem value="102" id="both-seminar2-option3" className="w-5 h-5 border-2 border-[#5325BA] data-[state=checked]:bg-[#5325BA] data-[state=checked]:border-[#5325BA]" />
                  <Label htmlFor="both-seminar2-option3" className="cursor-pointer flex-1 font-medium">자연어 처리 기술 발전</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="both-speaker-question-2" className="text-base font-semibold">해당 강연자에게 묻고싶은 궁금한 점이 있나요?</Label>
              <Textarea 
                id="both-speaker-question-2" 
                placeholder="선택하신 강연의 연사에게 궁금한 점이나 질문하고 싶은 내용을 자유롭게 작성해주세요." 
                className="min-h-[100px]"
                value={bothEventsFormData.secondSessionQuestion}
                onChange={(e) => setBothEventsFormData({...bothEventsFormData, secondSessionQuestion: e.target.value})}
              />
            </div>



            <div>
              <Label htmlFor="both-reason" className="text-base font-semibold">DS AI Week에 참가하고 싶은 이유 * <span className="text-xs text-red-500">필수</span></Label>
              <Textarea 
                id="both-reason" 
                placeholder="DS AI Week에 참가하고 싶은 이유를 자유롭게 작성해주세요." 
                className="min-h-[120px]"
                value={bothEventsFormData.reason}
                onChange={(e) => setBothEventsFormData({...bothEventsFormData, reason: e.target.value})}
                required
              />
            </div>

            <div>
              <Label htmlFor="both-feedback" className="text-base font-semibold">DS AI Week 운영진에게 바라는 점</Label>
              <Textarea 
                id="both-feedback" 
                placeholder="DS AI Week 운영진에게 바라는 점이나 제안사항을 작성해주세요." 
                className="min-h-[120px]"
                value={bothEventsFormData.messageToOrganizers}
                onChange={(e) => setBothEventsFormData({...bothEventsFormData, messageToOrganizers: e.target.value})}
              />
            </div>

        {/* <div>
          <Label htmlFor="both-invitation-id" className="text-base font-semibold">동료 초대왕 이벤트 아이디</Label>
          <Input id="both-invitation-id" placeholder="동료 초대왕 이벤트 아이디를 입력하세요" />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="both-terms" />
          <Label htmlFor="both-terms" className="text-sm">
            <span className="text-red-500">*</span> 개인정보처리방침 및 이용약관에 동의합니다
          </Label>
        </div> */}

            <Button 
              type="submit"
              size="lg" 
              className="w-full bg-gradient-to-r from-[#5325BA] to-[#6FF28F] hover:from-[#5325BA]/90 hover:to-[#6FF28F]/90 hover:scale-105 hover:shadow-xl text-white py-3 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
            >
              {existingBothEventsApplication ? 'Samsung AI Forum + DS AI Conference 신청서 수정하기' : 'Samsung AI Forum + DS AI Conference 양일 신청하기'}
            </Button>

            {existingBothEventsApplication && (
              <div className="flex gap-3">
                <Button 
                  type="button"
                  onClick={handleBothEventsDelete}
                  size="lg" 
                  variant="destructive"
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 transition-all duration-300"
                >
                  신청서 삭제하기
                </Button>
              </div>
            )}

            <p className="text-xs text-gray-500 text-center">
              {existingBothEventsApplication 
                ? '신청서 수정 완료 후 각각의 확인 이메일이 발송됩니다.' 
                : '양일 신청 완료 후 각각의 확인 이메일이 발송됩니다.'
              }
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );

  const renderForumForm = () => (
    <Card className="max-w-2xl mx-auto bg-white">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Samsung AI Forum 신청서</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleForumSubmit}>
          <div className="space-y-6">
            <div>
              <Label htmlFor="forum-name">이름 * <span className="text-xs text-red-500">필수</span></Label>
              <Input 
                id="forum-name" 
                placeholder="홍길동" 
                value={forumFormData.name}
                onChange={(e) => setForumFormData({...forumFormData, name: e.target.value})}
                required
              />
            </div>

            <div>
              <Label htmlFor="forum-knoxId">Knox ID * <span className="text-xs text-red-500">필수</span></Label>
              <div className="flex gap-2">
                <Input 
                  id="forum-knoxId" 
                  placeholder="knox ID를 입력하세요" 
                  value={forumFormData.knoxId}
                  onChange={(e) => setForumFormData({...forumFormData, knoxId: e.target.value})}
                  required
                  className="flex-1"
                />
                <Button
                  type="button"
                  onClick={() => forumFormData.knoxId && checkExistingForumApplication(forumFormData.knoxId)}
                  disabled={!forumFormData.knoxId || isCheckingApplication}
                  className="bg-[#5325BA] hover:bg-[#5325BA]/90 text-white px-4"
                >
                  {isCheckingApplication ? '확인 중...' : '기존 신청 확인'}
                </Button>
              </div>
              {existingForumApplication && (
                <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800">
                    기존 신청서가 발견되었습니다. 정보를 수정하거나 삭제할 수 있습니다.
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <Label className="text-base font-semibold">온라인 스트리밍 신청 * <span className="text-xs text-red-500">필수</span></Label>
              <RadioGroup 
                value={forumFormData.streamingParticipation} 
                onValueChange={(value) => setForumFormData({...forumFormData, streamingParticipation: value})}
                className="space-y-1"
              >
                <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-[#5325BA]/30 transition-all duration-200 cursor-pointer">
                  <RadioGroupItem value="yes" id="streaming-yes" className="w-5 h-5 border-2 border-[#5325BA] data-[state=checked]:bg-[#5325BA] data-[state=checked]:border-[#5325BA]" />
                  <Label htmlFor="streaming-yes" className="cursor-pointer flex-1 font-medium">온라인 스트리밍 참가</Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-[#5325BA]/30 transition-all duration-200 cursor-pointer">
                  <RadioGroupItem value="no" id="streaming-no" className="w-5 h-5 border-2 border-[#5325BA] data-[state=checked]:bg-[#5325BA] data-[state=checked]:border-[#5325BA]" />
                  <Label htmlFor="streaming-no" className="cursor-pointer flex-1 font-medium">온라인 스트리밍 불참</Label>
                </div>
              </RadioGroup>
            </div>

            {/* <div>
              <Label htmlFor="forum-invitation-id">동료 초대왕 이벤트 아이디</Label>
              <Input id="forum-invitation-id" placeholder="동료 초대왕 이벤트 아이디를 입력하세요" />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="forum-terms" />
              <Label htmlFor="forum-terms" className="text-sm">
                <span className="text-red-500">*</span> 개인정보처리방침 및 이용약관에 동의합니다
              </Label>
            </div> */}

            <Button 
              type="submit"
              size="lg" 
              className="w-full bg-[#5325BA] hover:bg-[#5325BA]/90 hover:scale-105 hover:shadow-xl text-white py-3 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
            >
              {existingForumApplication ? 'Samsung AI Forum 신청서 수정하기' : 'Samsung AI Forum 신청하기'}
            </Button>

            {existingForumApplication && (
              <div className="flex gap-3">
                <Button 
                  type="button"
                  onClick={handleForumDelete}
                  size="lg" 
                  variant="destructive"
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 transition-all duration-300"
                >
                  신청서 삭제하기
                </Button>
              </div>
            )}

            <p className="text-xs text-gray-500 text-center">
              {existingForumApplication 
                ? '신청서 수정 완료 후 확인 이메일이 발송됩니다.' 
                : '신청 완료 후 확인 이메일이 발송됩니다.'
              }
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );

  const renderConferenceForm = () => (
    <Card className="max-w-2xl mx-auto bg-white">
      <CardHeader>
        <CardTitle className="text-center text-2xl">DS AI Conference 신청서</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleConferenceSubmit}>
          <div className="space-y-6">
            <div>
              <Label htmlFor="conf-name" className="text-base font-semibold">이름 * <span className="text-xs text-red-500">필수</span></Label>
              <Input 
                id="conf-name" 
                placeholder="홍길동" 
                value={conferenceFormData.name}
                onChange={(e) => setConferenceFormData({...conferenceFormData, name: e.target.value})}
                required
              />
            </div>

            <div>
              <Label htmlFor="conf-knoxId" className="text-base font-semibold">Knox ID * <span className="text-xs text-red-500">필수</span></Label>
              <div className="flex gap-2">
                <Input 
                  id="conf-knoxId" 
                  placeholder="knox ID를 입력하세요" 
                  value={conferenceFormData.knoxId}
                  onChange={(e) => setConferenceFormData({...conferenceFormData, knoxId: e.target.value})}
                  required
                  className="flex-1"
                />
                <Button
                  type="button"
                  onClick={() => conferenceFormData.knoxId && checkExistingConferenceApplication(conferenceFormData.knoxId)}
                  disabled={!conferenceFormData.knoxId || isCheckingConferenceApplication}
                  className="bg-[#5325BA] hover:bg-[#5325BA]/90 text-white px-4"
                >
                  {isCheckingConferenceApplication ? '확인 중...' : '기존 신청 확인'}
                </Button>
              </div>
              {existingConferenceApplication && (
                <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800">
                    기존 신청서가 발견되었습니다. 정보를 수정하거나 삭제할 수 있습니다.
                  </p>
                </div>
              )}
            </div>



            <div className="space-y-4">
              <Label className="text-base font-semibold">온/오프라인 참가 여부 * <span className="text-xs text-red-500">필수</span></Label>
              <RadioGroup 
                value={conferenceFormData.participation} 
                onValueChange={(value) => setConferenceFormData({...conferenceFormData, participation: value})} 
                className="space-y-1"
              >
                <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-[#5325BA]/30 transition-all duration-200 cursor-pointer">
                  <RadioGroupItem value="offline" id="participation-offline" className="w-5 h-5 border-2 border-[#5325BA] data-[state=checked]:bg-[#5325BA] data-[state=checked]:border-[#5325BA]" />
                  <Label htmlFor="participation-offline" className="cursor-pointer flex-1 font-medium">오프라인 참가</Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-[#5325BA]/30 transition-all duration-200 cursor-pointer">
                  <RadioGroupItem value="online" id="participation-online" className="w-5 h-5 border-2 border-[#5325BA] data-[state=checked]:bg-[#5325BA] data-[state=checked]:border-[#5325BA]" />
                  <Label htmlFor="participation-online" className="cursor-pointer flex-1 font-medium">온라인 참가</Label>
                </div>
              </RadioGroup>

              {/* Offline Warning */}
              {conferenceFormData.participation === 'offline' && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-3">
                  <div className="flex items-start space-x-2">
                    <div className="text-yellow-600 mt-0.5">⚠️</div>
                    <div className="text-sm text-yellow-800">
                      <p className="font-medium">한정된 인원만 오프라인 참석이 가능해요. 꼭 참석이 가능하신 경우만 오프라인 참석 신청을 부탁드려요!</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Transportation Poll - Only shown when offline participation is selected */}
            {conferenceFormData.participation === 'offline' && (
              <div className="space-y-4 bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="space-y-3">
                  <Label className="text-base font-semibold text-blue-900">어디 배차를 희망하세요? * <span className="text-xs text-red-500">필수</span></Label>
                  
                  {/* Alert Message */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                    <div className="flex items-start space-x-2">
                      <div className="text-yellow-600 mt-0.5">⚠️</div>
                      <div className="text-sm text-yellow-800">
                        <p className="font-medium mb-1">주차장 이용이 어려워요, 셔틀버스 및 대중교통 이용 부탁드려요.</p>
                        <p>희망하시는 배차대로 안될 수도 있어요. 참가자 선정 시, 다시 알려드릴게요.</p>
                      </div>
                    </div>
                  </div>

                  <RadioGroup 
                    value={conferenceFormData.transportation}
                    onValueChange={(value) => setConferenceFormData({...conferenceFormData, transportation: value})}
                    className="grid grid-cols-2 gap-2"
                  >
                    <div className="flex items-center space-x-3 p-2 rounded-lg border border-blue-200 hover:bg-blue-100 hover:border-[#5325BA]/30 transition-all duration-200 cursor-pointer">
                      <RadioGroupItem value="H" id="pickup-hwaseong-h1" className="w-4 h-4 border-2 border-[#5325BA] data-[state=checked]:bg-[#5325BA] data-[state=checked]:border-[#5325BA]" />
                      <Label htmlFor="pickup-hwaseong-h1" className="cursor-pointer flex-1 font-medium text-sm">화성 H1</Label>
                    </div>
                    <div className="flex items-center space-x-3 p-2 rounded-lg border border-blue-200 hover:bg-blue-100 hover:border-[#5325BA]/30 transition-all duration-200 cursor-pointer">
                      <RadioGroupItem value="K" id="pickup-giheung-k1" className="w-4 h-4 border-2 border-[#5325BA] data-[state=checked]:bg-[#5325BA] data-[state=checked]:border-[#5325BA]" />
                      <Label htmlFor="pickup-giheung-k1" className="cursor-pointer flex-1 font-medium text-sm">기흥 K1</Label>
                    </div>
                    <div className="flex items-center space-x-3 p-2 rounded-lg border border-blue-200 hover:bg-blue-100 hover:border-[#5325BA]/30 transition-all duration-200 cursor-pointer">
                      <RadioGroupItem value="P" id="pickup-pyeongtaek-p1" className="w-4 h-4 border-2 border-[#5325BA] data-[state=checked]:bg-[#5325BA] data-[state=checked]:border-[#5325BA]" />
                      <Label htmlFor="pickup-pyeongtaek-p1" className="cursor-pointer flex-1 font-medium text-sm">평택 P1</Label>
                    </div>
                    <div className="flex items-center space-x-3 p-2 rounded-lg border border-blue-200 hover:bg-blue-100 hover:border-[#5325BA]/30 transition-all duration-200 cursor-pointer">
                      <RadioGroupItem value="O" id="pickup-onyang" className="w-4 h-4 border-2 border-[#5325BA] data-[state=checked]:bg-[#5325BA] data-[state=checked]:border-[#5325BA]" />
                      <Label htmlFor="pickup-onyang" className="cursor-pointer flex-1 font-medium text-sm">온양</Label>
                    </div>
                    <div className="flex items-center space-x-3 p-2 rounded-lg border border-blue-200 hover:bg-blue-100 hover:border-[#5325BA]/30 transition-all duration-200 cursor-pointer">
                      <RadioGroupItem value="F" id="pickup-future-tech-campus" className="w-4 h-4 border-2 border-[#5325BA] data-[state=checked]:bg-[#5325BA] data-[state=checked]:border-[#5325BA]" />
                      <Label htmlFor="pickup-future-tech-campus" className="cursor-pointer flex-1 font-medium text-sm">미래기술캠퍼스</Label>
                    </div>
                    <div className="flex items-center space-x-3 p-2 rounded-lg border border-blue-200 hover:bg-blue-100 hover:border-[#5325BA]/30 transition-all duration-200 cursor-pointer">
                      <RadioGroupItem value="D" id="pickup-ds-cube" className="w-4 h-4 border-2 border-[#5325BA] data-[state=checked]:bg-[#5325BA] data-[state=checked]:border-[#5325BA]" />
                      <Label htmlFor="pickup-ds-cube" className="cursor-pointer flex-1 font-medium text-sm">DS큐브</Label>
                    </div>
                    <div className="flex items-center space-x-3 p-2 rounded-lg border border-blue-200 hover:bg-blue-100 hover:border-[#5325BA]/30 transition-all duration-200 cursor-pointer">
                      <RadioGroupItem value="W" id="pickup-walk-public-transport" className="w-4 h-4 border-2 border-[#5325BA] data-[state=checked]:bg-[#5325BA] data-[state=checked]:border-[#5325BA]" />
                      <Label htmlFor="pickup-walk-public-transport" className="cursor-pointer flex-1 font-medium text-sm">도보/대중교통</Label>
                    </div>
              </RadioGroup>
            </div>
          </div>
        )}

            <div className="space-y-4">
              <Label className="text-base font-semibold">듣고싶은 강연 (1) * <span className="text-xs text-red-500">필수</span></Label>
              <RadioGroup 
                value={conferenceFormData.firstSession}
                onValueChange={(value) => setConferenceFormData({...conferenceFormData, firstSession: value})}
                className="space-y-1"
              >
                <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-[#5325BA]/30 transition-all duration-200 cursor-pointer">
                  <RadioGroupItem value="UD" id="seminar1-option1" className="w-5 h-5 border-2 border-[#5325BA] data-[state=checked]:bg-[#5325BA] data-[state=checked]:border-[#5325BA]" />
                  <Label htmlFor="seminar1-option1" className="cursor-pointer flex-1 font-medium">AI의 미래: 혁신과 도전</Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-[#5325BA]/30 transition-all duration-200 cursor-pointer">
                  <RadioGroupItem value="101" id="seminar1-option2" className="w-5 h-5 border-2 border-[#5325BA] data-[state=checked]:bg-[#5325BA] data-[state-checked]:border-[#5325BA]" />
                  <Label htmlFor="seminar1-option2" className="cursor-pointer flex-1 font-medium">딥러닝 최신 기술 동향</Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-[#5325BA]/30 transition-all duration-200 cursor-pointer">
                  <RadioGroupItem value="102" id="seminar1-option3" className="w-5 h-5 border-2 border-[#5325BA] data-[state=checked]:bg-[#5325BA] data-[state=checked]:border-[#5325BA]" />
                  <Label htmlFor="seminar1-option3" className="cursor-pointer flex-1 font-medium">Machine Learning 실무 적용</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="conf-speaker-question-1" className="text-base font-semibold">해당 강연자에게 묻고싶은 궁금한 점이 있나요?</Label>
              <Textarea 
                id="conf-speaker-question-1" 
                placeholder="선택하신 강연의 연사에게 궁금한 점이나 질문하고 싶은 내용을 자유롭게 작성해주세요." 
                className="min-h-[100px]"
                value={conferenceFormData.firstSessionQuestion}
                onChange={(e) => setConferenceFormData({...conferenceFormData, firstSessionQuestion: e.target.value})}
              />
            </div>

            <div className="space-y-4">
              <Label className="text-base font-semibold">듣고싶은 강연 (2) * <span className="text-xs text-red-500">필수</span></Label>
              <RadioGroup 
                value={conferenceFormData.secondSession}
                onValueChange={(value) => setConferenceFormData({...conferenceFormData, secondSession: value})}
                className="space-y-1"
              >
                <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-[#5325BA]/30 transition-all duration-200 cursor-pointer">
                  <RadioGroupItem value="UD" id="seminar2-option1" className="w-5 h-5 border-2 border-[#5325BA] data-[state=checked]:bg-[#5325BA] data-[state=checked]:border-[#5325BA]" />
                  <Label htmlFor="seminar2-option1" className="cursor-pointer flex-1 font-medium">Computer Vision 혁신</Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-[#5325BA]/30 transition-all duration-200 cursor-pointer">
                  <RadioGroupItem value="101" id="seminar2-option2" className="w-5 h-5 border-2 border-[#5325BA] data-[state=checked]:bg-[#5325BA] data-[state=checked]:border-[#5325BA]" />
                  <Label htmlFor="seminar2-option2" className="cursor-pointer flex-1 font-medium">MLOps와 프로덕션 배포</Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-[#5325BA]/30 transition-all duration-200 cursor-pointer">
                  <RadioGroupItem value="102" id="seminar2-option3" className="w-5 h-5 border-2 border-[#5325BA] data-[state=checked]:bg-[#5325BA] data-[state=checked]:border-[#5325BA]" />
                  <Label htmlFor="seminar2-option3" className="cursor-pointer flex-1 font-medium">자연어 처리 기술 발전</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="conf-speaker-question-2" className="text-base font-semibold">해당 강연자에게 묻고싶은 궁금한 점이 있나요?</Label>
              <Textarea 
                id="conf-speaker-question-2" 
                placeholder="선택하신 강연의 연사에게 궁금한 점이나 질문하고 싶은 내용을 자유롭게 작성해주세요." 
                className="min-h-[100px]"
                value={conferenceFormData.secondSessionQuestion}
                onChange={(e) => setConferenceFormData({...conferenceFormData, secondSessionQuestion: e.target.value})}
              />
            </div>





            <div>
              <Label htmlFor="conf-reason" className="text-base font-semibold">DS AI Conference에 참가하고 싶은 이유 * <span className="text-xs text-red-500">필수</span></Label>
              <Textarea 
                id="conf-reason" 
                placeholder="DS AI Conference에 참가하고 싶은 이유를 자유롭게 작성해주세요." 
                className="min-h-[120px]"
                value={conferenceFormData.reason}
                onChange={(e) => setConferenceFormData({...conferenceFormData, reason: e.target.value})}
                required
              />
            </div>

            <div>
              <Label htmlFor="conf-feedback" className="text-base font-semibold">DS AI Conference 운영진에게 바라는 점</Label>
              <Textarea 
                id="conf-feedback" 
                placeholder="DS AI Conference 운영진에게 바라는 점이나 제안사항을 작성해주세요." 
                className="min-h-[120px]"
                value={conferenceFormData.messageToOrganizers}
                onChange={(e) => setConferenceFormData({...conferenceFormData, messageToOrganizers: e.target.value})}
              />
            </div>

            {/* <div>
              <Label htmlFor="conf-recommender" className="text-base font-semibold">추천인</Label>
              <Input 
                id="conf-recommender" 
                placeholder="추천인을 입력하세요 (선택사항)" 
                value={conferenceFormData.recommender}
                onChange={(e) => setConferenceFormData({...conferenceFormData, recommender: e.target.value})}
              />
            </div> */}

        {/* <div>
          <Label htmlFor="conf-invitation-id" className="text-base font-semibold">동료 초대왕 이벤트 아이디</Label>
          <Input id="conf-invitation-id" placeholder="동료 초대왕 이벤트 아이디를 입력하세요" />
        </div> */}

        {/* <div className="flex items-center space-x-2">
          <Checkbox id="conf-terms" />
          <Label htmlFor="conf-terms" className="text-sm">
            <span className="text-red-500">*</span> 개인정보처리방침 및 이용약관에 동의합니다
          </Label>
        </div> */}

            <Button 
              type="submit"
              size="lg" 
              className="w-full bg-[#5325BA] hover:bg-[#5325BA]/90 hover:scale-105 hover:shadow-xl text-white py-3 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
            >
              {existingConferenceApplication ? 'DS AI Conference 신청서 수정하기' : 'DS AI Conference 신청하기'}
            </Button>

            {existingConferenceApplication && (
              <div className="flex gap-3">
                <Button 
                  type="button"
                  onClick={handleConferenceDelete}
                  size="lg" 
                  variant="destructive"
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 transition-all duration-300"
                >
                  신청서 삭제하기
                </Button>
              </div>
            )}

            <p className="text-xs text-gray-500 text-center">
              {existingConferenceApplication 
                ? '신청서 수정 완료 후 확인 이메일이 발송됩니다.' 
                : '신청 완료 후 확인 이메일이 발송됩니다.'
              }
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );

  return (
    <section id="register" className="py-20 bg-transparent">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#5325BA' }}>
            참가 신청
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            DS AI Week 2025에 참가 신청하고 AI 전문가들과 함께하세요
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Event Selection Buttons */}
          {!selectedForm && (
            <div className="space-y-6 mb-12">
              {/* Combined Button - Biggest */}
              <div className="flex justify-center">
                <Button 
                  size="lg" 
                  onClick={() => setSelectedForm('both')}
                  className="bg-gradient-to-r from-[#5325BA] to-[#6FF28F] hover:from-[#5325BA]/90 hover:to-[#6FF28F]/90 hover:scale-105 hover:shadow-xl text-white py-10 px-12 transition-all duration-300 ease-in-out transform hover:-translate-y-1 w-full max-w-[664px] h-auto text-xl"
                >
                  <div className="text-center w-full">
                    <div className="font-bold text-xl mb-2">Samsung AI Forum + DS AI Conference 양일 신청</div>
                    <div className="text-sm opacity-90 mb-1">온/오프라인</div>
                    <div className="text-sm opacity-90">2025년 9월 15일(월) + 17일(수)</div>
                  </div>
                </Button>
              </div>
              
              {/* Individual Event Buttons */}
              <div className="flex flex-col lg:flex-row gap-6 justify-center items-center">
                <Button 
                  size="lg" 
                  onClick={() => setSelectedForm('forum')}
                  className="bg-[#5325BA] hover:bg-[#5325BA]/90 hover:scale-105 hover:shadow-xl text-white py-8 px-10 transition-all duration-300 ease-in-out transform hover:-translate-y-1 min-w-[320px] h-auto"
                >
                  <div className="text-center w-full">
                    <div className="font-bold text-lg mb-2">Samsung AI Forum 신청</div>
                    <div className="text-sm opacity-90 mb-1">온라인 전용</div>
                    <div className="text-sm opacity-90">2025년 9월 15일(월)</div>
                  </div>
                </Button>
                <Button 
                  size="lg" 
                  onClick={() => setSelectedForm('conference')}
                  className="bg-[#6FF28F] hover:bg-[#6FF28F]/90 hover:scale-105 hover:shadow-xl text-gray-900 py-8 px-10 transition-all duration-300 ease-in-out transform hover:-translate-y-1 min-w-[320px] h-auto"
                >
                  <div className="text-center w-full">
                    <div className="font-bold text-lg mb-2">DS AI Conference 신청</div>
                    <div className="text-sm opacity-80 mb-1">온/오프라인</div>
                    <div className="text-sm opacity-80">2025년 9월 17일(수)</div>
                  </div>
                </Button>
              </div>
            </div>
          )}

          {/* Back Button */}
          {selectedForm && (
            <div className="text-center mb-8">
              <Button 
                variant="outline" 
                onClick={() => setSelectedForm(null)}
                className="border-[#5325BA] text-[#5325BA] hover:bg-[#5325BA] hover:text-white"
              >
                ← 신청서 선택으로 돌아가기
              </Button>
            </div>
          )}

          {/* Forms */}
          {selectedForm === 'forum' && renderForumForm()}
          {selectedForm === 'conference' && renderConferenceForm()}
          {selectedForm === 'both' && renderBothEventsForm()}
        </div>
      </div>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="max-w-md bg-white">
          <DialogHeader>
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <DialogTitle className="text-center text-xl font-bold text-gray-900">
              신청 완료
            </DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-4">
            <p className="text-gray-600 whitespace-pre-line">
              {successMessage}
            </p>
            <Button 
              onClick={() => setShowSuccessModal(false)}
              className="w-full bg-[#5325BA] hover:bg-[#5325BA]/90"
            >
              확인
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}