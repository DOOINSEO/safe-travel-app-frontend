import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import CommentSection from '../components/board/CommentSection';
import ConfirmModal from '../components/common/ConfirmModal';
import PostHeader from '../components/board/detail/PostHeader'; // ✨ 분리된 헤더 import
import PostContentView from '../components/board/detail/PostContentView'; // ✨ 분리된 컨텐츠 import
import {Frown, Send} from 'lucide-react';
import {DUMMY_COMMENTS} from '../data/dummyData';
import {EDIT_LOCATIONS, CATEGORIES} from '../data/boardData';
import {getPost} from '../services/postApi';

export default function PostDetailPage() {
  const {postId} = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const initialComments = useMemo(() => DUMMY_COMMENTS.filter((c) => c.postId === parseInt(postId, 10)), [postId]);

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const [editedImages, setEditedImages] = useState([]);
  const [editedCategoryId, setEditedCategoryId] = useState('');
  const [editedLocationId, setEditedLocationId] = useState('');
  const [selectedCountryNameForEdit, setSelectedCountryNameForEdit] = useState('');
  const [availableRegionsForEdit, setAvailableRegionsForEdit] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);

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

  useEffect(() => {
    return () => {
      editedImages.forEach((image) => {
        if (image.previewUrl && image.file) {
          URL.revokeObjectURL(image.previewUrl);
        }
      });
    };
  }, [editedImages]);

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
  const handleStartEdit = () => {
    setEditedContent(post.content);
    setEditedImages(post.images);
    setEditedCategoryId(post.categoryId);
    setEditedLocationId(post.regionId);
    const currentCountry = EDIT_LOCATIONS.find((c) => c.id === post.countryId);
    if (currentCountry) {
      setSelectedCountryNameForEdit(currentCountry.country);
      setAvailableRegionsForEdit(currentCountry.regions);
    }
    setIsEditing(true);
  };
  const handleSaveEdit = () => {
    const finalImages = editedImages.map((img, i) =>
      img.file
        ? {
            imageId: Math.random(),
            postId: post.postId,
            imgPath: img.previewUrl,
            order: i,
          }
        : {...img, order: i}
    );
    const updatedCategory = CATEGORIES.find((c) => c.id === parseInt(editedCategoryId, 10));
    const updatedCountry = EDIT_LOCATIONS.find((c) => c.country === selectedCountryNameForEdit);
    const updatedRegion = updatedCountry?.regions.find((r) => r.id === editedLocationId);
    setPost((prev) => ({
      ...prev,
      content: editedContent,
      images: finalImages,
      categoryId: updatedCategory.id,
      categoryName: updatedCategory.name,
      countryId: updatedCountry.id,
      regionId: updatedRegion.id,
      country: updatedCountry.country,
      region: updatedRegion.name,
    }));
    setIsEditing(false);
  };
  const handleImageDelete = (id) => setEditedImages((prev) => prev.filter((img) => (img.id || img.imageId) !== id));
  const handleImageUpload = (e) => {
    const newImages = Array.from(e.target.files).map((file) => ({
      id: Math.random(),
      previewUrl: URL.createObjectURL(file),
      file,
    }));
    setEditedImages((prev) => [...prev, ...newImages]);
  };
  const handleDeletePost = () => {
    console.log(`Post ID: ${post.postId} 삭제됨`);
    setIsDeleteModalOpen(false);
    navigate('/board');
  };
  const handleCountryChangeForEdit = (e) => {
    const name = e.target.value;
    setSelectedCountryNameForEdit(name);
    const data = EDIT_LOCATIONS.find((c) => c.country === name);
    setAvailableRegionsForEdit(data ? data.regions : []);
    setEditedLocationId('');
  };

  const editedState = {
    editedContent,
    editedImages,
    editedCategoryId,
    editedLocationId,
    selectedCountryNameForEdit,
    availableRegionsForEdit,
  };
  const editHandlers = {
    setEditedContent,
    handleImageDelete,
    handleImageUpload,
    handleSaveEdit,
    handleStartEdit,
    setIsDeleteModalOpen,
    handleLikeToggle,
    handleCountryChangeForEdit,
    setEditedLocationId,
    setEditedCategoryId,
  };

  return (
    <div className="flex h-screen flex-col bg-white">
      <header>
        <PageHeader title="게시물 상세보기" />
      </header>
      <main className="flex-1 overflow-y-auto">
        <div className="p-4">
          <PostHeader post={post} />
          <PostContentView
            post={post}
            comments={comments}
            isEditing={isEditing}
            isOwner={isOwner}
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
