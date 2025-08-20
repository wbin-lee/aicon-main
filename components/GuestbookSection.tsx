import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { MessageCircle, Send, Heart, ChevronDown } from 'lucide-react';

interface Comment {
  number: number;
  text: string;
  timestamp: string;
  likes: number;
}

export function GuestbookSection() {
  const [newComment, setNewComment] = useState('');
  const [displayCount, setDisplayCount] = useState(3);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const baseUrl = (import.meta as any).env?.VITE_AICON25_BE_URL || '';
        const response = await fetch(`${baseUrl}/api/guestbook`);
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
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!newComment.trim()) {
      alert('메세지를 적어주세요!');
      return;
    }
    
    if (newComment.length > 200) {
      alert('200자가 넘어요! 좀 줄여주세요!');
      return;
    }

    try {
      const baseUrl = (import.meta as any).env?.VITE_AICON25_BE_URL || '';
      const response = await fetch(`${baseUrl}/api/guestbook`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: newComment.trim()
        })
      });

      if (response.ok) {
        const newCommentData = await response.json();
        setComments([newCommentData, ...comments]);
        setNewComment('');
      } else {
        alert('메시지 등록에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('메시지 등록 중 오류가 발생했습니다.');
    }
  };

  const loadMoreComments = () => {
    setDisplayCount(prev => Math.min(prev + 5, comments.length));
  };

  const displayedComments = comments.slice(0, displayCount);
  const hasMoreComments = displayCount < comments.length;

  const handleLike = async (number: number) => {
    try {
      const baseUrl = (import.meta as any).env?.VITE_AICON25_BE_URL || '';
      const response = await fetch(`${baseUrl}/api/guestbook/${number}/like`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        // Update the local state to reflect the like
        setComments(comments.map(comment => 
          comment.number === number ? { ...comment, likes: comment.likes + 1 } : comment
        ));
      } else {
        alert('좋아요 등록에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error liking comment:', error);
      alert('좋아요 등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <section id="guestbook" className="py-20 bg-transparent">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#5325BA' }}>
            방명록
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            DS AI Week 2025에 대한 기대와 응원의 메시지를 남겨주세요
          </p>
        </div>

        {/* Comment Input Form */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="p-6 bg-white/80 backdrop-blur-sm border border-purple-200">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <MessageCircle className="w-5 h-5 text-[#5325BA]" />
                <span className="font-medium text-[#5325BA]">메시지 남기기</span>
              </div>
              <div className="flex gap-3">
                <Input
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="DS AI Week 2025에 대한 기대와 응원의 메시지를 마구마구 남겨주세요..."
                  className="flex-1 border-purple-200 focus:border-[#5325BA] focus:ring-[#5325BA]"
                  maxLength={200}
                />
                <Button 
                  type="submit"
                  className="bg-[#5325BA] hover:bg-[#5325BA]/90 text-white px-6"
                  disabled={!newComment.trim()}
                >
                  <Send className="w-4 h-4 mr-2" />
                  게시
                </Button>
              </div>
              <p className="text-sm text-gray-500">
                {newComment.length}/200자 | 건전한 댓글 문화를 위해 신중하게 작성해 주세요. 적절하지 않은 댓글은 삭제될 수 있어요.
              </p>
            </form>
          </Card>
        </div>

        {/* Comments Display */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-3">
            {loading ? (
              <div className="text-center py-8">
                <p className="text-gray-500">방명록을 불러오는 중...</p>
              </div>
            ) : (
              displayedComments.map((comment, index) => (
                <Card key={comment.number} className="p-4 bg-white/80 backdrop-blur-sm border border-purple-100 hover:border-purple-200 transition-all duration-200">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs text-[#5325BA] font-medium">
                          {comment.number} 번째 방명록
                        </span>
                        <span className="text-xs text-gray-400">
                          {new Date(comment.timestamp).toLocaleDateString('ko-KR')}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {comment.text}
                      </p>
                    </div>
                    <button
                      onClick={() => handleLike(comment.number)}
                      className="flex items-center gap-1 text-sm text-gray-500 hover:text-[#5325BA] transition-colors flex-shrink-0 mt-1"
                    >
                      <Heart className="w-4 h-4" />
                      <span>{comment.likes}</span>
                    </button>
                  </div>
                </Card>
              ))
            )}
          </div>

          {/* Load More Button */}
          {hasMoreComments && (
            <div className="text-center mt-8">
              <Button 
                onClick={loadMoreComments}
                variant="outline"
                className="border-[#5325BA] text-[#5325BA] hover:bg-[#5325BA] hover:text-white rounded-full px-8 py-3"
              >
                <ChevronDown className="w-4 h-4 mr-2" />
                더 보기 ({comments.length - displayCount}개 더)
              </Button>
            </div>
          )}
        </div>


      </div>
    </section>
  );
}