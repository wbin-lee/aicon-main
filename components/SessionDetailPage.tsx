import { useState, useEffect } from 'react';
import { ArrowLeft, Play, Trash2, MessageCircle, X } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Separator } from './ui/separator';

interface Comment {
  id: number;
  session_id: string;
  parent_comment: number;
  nickname: string;
  content: string;
  is_reply: string;
  replies_count: string;
  parent_comment_id: number;
  replies: string;
  created_at: string;
  updated_at: string;
}

interface Session {
  time: string;
  title: string;
  type: string;
  speaker: string;
  description: string;
  videoUrl?: string;
  detailedDescription?: string;
  id?: string; // Add session ID for API calls
  location?: string; // Add session location
}

interface SessionDetailPageProps {
  session: Session;
  onClose: () => void;
}

export function SessionDetailPage({ session, onClose }: SessionDetailPageProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState({ nickname: '', password: '', content: '' });
  const [deletePassword, setDeletePassword] = useState('');
  const [deletingCommentId, setDeletingCommentId] = useState<number | null>(null);

  // Fetch comments for this session
  useEffect(() => {
    const fetchComments = async () => {
      if (!session.id) return;
      
      try {
        setLoading(true);
        const baseUrl = (import.meta as any).env?.VITE_AICON25_BE_URL || '';
        const response = await fetch(`${baseUrl}/api/sessions/${session.id}/comments`);
        if (response.ok) {
          const data = await response.json();
          setComments(data);
        } else {
          console.error('Failed to fetch comments');
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [session.id]);

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

  const handleAddComment = async () => {
    if (!newComment.nickname || !newComment.password || !newComment.content) {
      return;
    }

    if (!session.id) {
      alert('세션 정보를 찾을 수 없습니다.');
      return;
    }

    try {
      const baseUrl = (import.meta as any).env?.VITE_AICON25_BE_URL || '';
      const response = await fetch(`${baseUrl}/api/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_id: session.id,
          nickname: newComment.nickname,
          password: newComment.password,
          content: newComment.content
        })
      });

      if (response.ok) {
        const newCommentData = await response.json();
        setComments(prev => [...prev, newCommentData]);
        setNewComment({ nickname: '', password: '', content: '' });
      } else {
        alert('댓글 등록에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('댓글 등록 중 오류가 발생했습니다.');
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    if (!deletePassword) return;

    try {
      const baseUrl = (import.meta as any).env?.VITE_AICON25_BE_URL || '';
      const response = await fetch(`${baseUrl}/api/comments/${commentId}/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: deletePassword
        })
      });

      if (response.ok) {
        setComments(prev => prev.filter(c => c.id !== commentId));
        setDeletePassword('');
        setDeletingCommentId(null);
      } else {
        alert('비밀번호가 일치하지 않습니다.');
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('댓글 삭제 중 오류가 발생했습니다.');
    }
  };

  const formatTimestamp = (dateString: string) => {
    return new Date(dateString).toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  useEffect(() => {
    // Handle escape key to close
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Browser back button integration
  useEffect(() => {
    // Push a new state when the session detail page opens
    window.history.pushState({ sessionDetail: true }, '', window.location.href);

    // Listen for browser back button
    const handlePopState = (event: PopStateEvent) => {
      // If we're going back from the session detail page, close it
      if (!event.state || !event.state.sessionDetail) {
        onClose();
      }
    };

    window.addEventListener('popstate', handlePopState);

    // Cleanup
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                돌아가기
              </Button>
              <div className="h-6 w-px bg-gray-300" />
              <h1 className="text-2xl font-bold text-[#5325BA]">
                {session.title}
              </h1>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-600 hover:text-gray-900"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          <div className="mt-2 text-gray-600">
            {session.speaker && `${session.speaker} | `}{session.time} | {session.location} |
            <Badge className={`ml-2 ${getTypeColor(session.type)}`}>
              {session.type}
            </Badge>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8 max-w-6xl">
        <div className="space-y-8">
          {/* Detailed Description */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-2xl mb-4 text-gray-900">세션 소개</h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              {session.detailedDescription || session.description}
            </p>
          </div>

          {/* Content Section - Aligned Left and Right */}
          <div className="flex flex-col lg:flex-row gap-8">
                        {/* Video Section - Left */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-2xl font-semibold">
                  <Play className="w-6 h-6 text-[#5325BA]" />
                  <span>다시 보기</span>
                </div>
                <Button
                  className="bg-[#5325BA] hover:bg-[#5325BA]/90 text-white px-8 py-3 text-lg"
                  onClick={() => {
                    alert('아직 연사님의 허락을 받고 있는 중이에요. 잠시만 기다려 주세요.');
                  }}
                >
                  발표 자료 보기
                </Button>
              </div>
              <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden shadow-lg">
                {session.videoUrl ? (
                  <video 
                    controls 
                    className="w-full h-full"
                    poster="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop&crop=center"
                  >
                    <source src={session.videoUrl} type="video/mp4" />
                    브라우저가 비디오를 지원하지 않습니다.
                  </video>
                ) : (
                  <div className="flex items-center justify-center h-full text-white">
                    <div className="text-center">
                      <Play className="w-20 h-20 mx-auto mb-4 opacity-50" />
                      <p className="text-xl">다시 보기 영상은 행사 이후 공개됩니다</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Comments Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 text-2xl font-semibold">
              <MessageCircle className="w-6 h-6 text-[#5325BA]" />
              <span>댓글 ({comments.length})</span>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">댓글을 불러오는 중...</p>
                </div>
              ) : (
                comments.map((comment) => (
                <div key={comment.id} className="p-6 border rounded-lg bg-white shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-3">
                      <span className="font-semibold text-[#5325BA] text-lg">{comment.nickname}</span>
                      <span className="text-sm text-gray-500">
                        {formatTimestamp(comment.created_at)}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => setDeletingCommentId(comment.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-base">{comment.content}</p>
                  
                  {/* Delete Comment */}
                  {deletingCommentId === comment.id && (
                    <div className="mt-4 pt-4 border-t flex items-center space-x-3">
                      <Input
                        type="password"
                        placeholder="비밀번호 입력"
                        value={deletePassword}
                        onChange={(e) => setDeletePassword(e.target.value)}
                        className="flex-1"
                      />
                      <Button className="bg-[#5325BA] hover:bg-[#5325BA]/90 text-white"
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        삭제
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setDeletingCommentId(null);
                          setDeletePassword('');
                        }}
                      >
                        취소
                      </Button>
                    </div>
                  )}
                </div>
                ))
              )}
              
              {!loading && comments.length === 0 && (
                <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg">
                  <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-30" />
                  <p className="text-lg">첫 번째 댓글을 작성해보세요!</p>
                </div>
              )}
            </div>

            {/* Add Comment */}
            <div className="bg-white p-6 border rounded-lg shadow-sm">
              <h4 className="font-semibold text-lg mb-4">댓글 작성</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor="nickname" className="text-sm font-medium">닉네임</Label>
                  <Input
                    id="nickname"
                    value={newComment.nickname}
                    onChange={(e) => setNewComment(prev => ({ ...prev, nickname: e.target.value }))}
                    placeholder="닉네임을 입력하세요"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="password" className="text-sm font-medium">비밀번호</Label>
                  <Input
                    id="password"
                    type="password"
                    value={newComment.password}
                    onChange={(e) => setNewComment(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="삭제용 비밀번호"
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="mb-4">
                <Label htmlFor="content" className="text-sm font-medium">댓글 내용</Label>
                <Textarea
                  id="content"
                  value={newComment.content}
                  onChange={(e) => setNewComment(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="댓글을 입력하세요"
                  className="min-h-[100px] mt-1"
                />
              </div>
              <Button 
                onClick={handleAddComment}
                className="bg-[#5325BA] hover:bg-[#5325BA]/90 text-white"
                disabled={!newComment.nickname || !newComment.password || !newComment.content}
              >
                댓글 작성
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}