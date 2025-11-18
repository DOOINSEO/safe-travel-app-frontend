import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import CommentSection from '../components/board/CommentSection';
import ConfirmModal from '../components/common/ConfirmModal';
import PostHeader from '../components/board/detail/PostHeader';
import PostContentView from '../components/board/detail/PostContentView';
import {Frown, Send} from 'lucide-react';
import {DUMMY_COMMENTS} from '../data/dummyData';
import {getPost, deletePost} from '../services/postApi';
import {usePostEdit} from '../hooks/usePostEdit';

export default function PostDetailPage() {
  const {postId} = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const initialComments = useMemo(() => DUMMY_COMMENTS.filter((c) => c.postId === parseInt(postId, 10)), [postId]);

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);

  // 수정 관련 로직을 커스텀 훅으로 분리
  const editHook = usePostEdit(
    post,
    (updatedPost) => setPost(updatedPost),
    (errorMessage) => setError(errorMessage)
  );

  // 현재 사용자 ID 가져오기
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setCurrentUserId(parseInt(userId, 10));
    } else {
      // userInfo에서 userId 가져오기 시도
      const userInfoStr = localStorage.getItem('userInfo');
      if (userInfoStr) {
        try {
          const userInfo = JSON.parse(userInfoStr);
          if (userInfo.userId) {
            setCurrentUserId(parseInt(userInfo.userId, 10));
          }
        } catch (e) {
          console.error('userInfo 파싱 실패:', e);
        }
      }
    }
  }, []);

  // 게시물 상세 조회 API 호출
  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) {
        setIsLoading(false);
        setError('게시물 ID가 없습니다.');
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const post = await getPost(postId);
        setPost(post);
      } catch (err) {
        console.error('게시물 조회 실패:', err);
        setError(err.message || '게시물을 불러오는데 실패했습니다.');
        setPost(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  // 로딩 중
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <PageHeader title="게시물 상세보기" />
        <div className="flex h-64 items-center justify-center">
          <p className="text-gray-500">게시물을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 에러 또는 게시물 없음
  if (error || !post) {
    return (
      <div className="min-h-screen bg-white">
        <PageHeader title="오류" />
        <div className="flex flex-col items-center justify-center pt-20 text-center">
          <Frown className="h-16 w-16 text-gray-400" />
          <h2 className="mt-4 text-xl font-semibold">게시글을 찾을 수 없습니다.</h2>
          <p className="mt-2 text-gray-500">{error || '삭제되었거나 잘못된 경로입니다.'}</p>
        </div>
      </div>
    );
  }

  const isOwner = currentUserId && post.userId === currentUserId;

  const handleLikeToggle = () => {
    setPost((prev) => {
      const newIsLike = !prev.isLike;
      return {
        ...prev,
        isLike: newIsLike,
        likeCount: newIsLike ? prev.likeCount + 1 : prev.likeCount - 1,
      };
    });
  };
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() === '') return;
    const newCommentData = {
      commentId: Math.random(),
      postId: post.postId,
      userId: currentUserId || 0,
      userNickname: 'CurrentUser',
      content: newComment,
      createdAt: new Date().toISOString(),
    };
    setComments((prev) => [...prev, newCommentData]);
    setNewComment('');
  };

  const handleDeletePost = async () => {
    if (!post) return;

    try {
      setError(null);
      
      await deletePost(post.postId);
      
      // 성공 시 게시판으로 이동
      setIsDeleteModalOpen(false);
      navigate('/board');
    } catch (err) {
      console.error('게시물 삭제 실패:', err);
      setError(err.message || '게시물 삭제에 실패했습니다.');
      setIsDeleteModalOpen(false);
    }
  };

  const editedState = {
    editedContent: editHook.editedContent,
    editedImages: editHook.editedImages,
    editedCategoryId: editHook.editedCategoryId,
    editedLocationId: editHook.editedLocationId,
    selectedCountryNameForEdit: editHook.selectedCountryNameForEdit,
    availableRegionsForEdit: editHook.availableRegionsForEdit,
  };
  const editHandlers = {
    setEditedContent: editHook.setEditedContent,
    handleImageDelete: editHook.handleImageDelete,
    handleImageUpload: editHook.handleImageUpload,
    handleSaveEdit: editHook.handleSaveEdit,
    handleStartEdit: editHook.handleStartEdit,
    setIsDeleteModalOpen,
    handleLikeToggle,
    handleCountryChangeForEdit: editHook.handleCountryChangeForEdit,
    setEditedLocationId: editHook.setEditedLocationId,
    setEditedCategoryId: editHook.setEditedCategoryId,
  };

  return (
    <div className="flex h-screen flex-col bg-white">
      <header>
        <PageHeader title="게시물 상세보기" />
      </header>
      <main className="flex-1 overflow-y-auto">
        <div className="p-4">
          <PostHeader post={post} />
          {error && (
            <div className="mb-4 rounded-md border border-red-400 bg-red-100 p-3 text-sm text-red-700">
              {error}
            </div>
          )}
          <PostContentView
            post={post}
            comments={comments}
            isEditing={editHook.isEditing}
            isOwner={isOwner}
            isSaving={editHook.isSaving}
            editedState={editedState}
            editHandlers={editHandlers}
            fileInputRef={fileInputRef}
          />
          <CommentSection comments={comments} setComments={setComments} currentUserId={currentUserId} />
        </div>
      </main>
      <footer className="border-t bg-white p-2">
        <form onSubmit={handleCommentSubmit} className="flex items-center space-x-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글을 입력하세요..."
            className="flex-1 rounded-full border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600 disabled:bg-gray-300"
            disabled={!newComment.trim()}
            aria-label="댓글 전송"
          >
            <Send size={18} />
          </button>
        </form>
      </footer>
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeletePost}
        title="게시물 삭제 확인"
        intent="destructive"
        confirmText="삭제"
      >
        정말로 이 게시물을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
      </ConfirmModal>
    </div>
  );
}
