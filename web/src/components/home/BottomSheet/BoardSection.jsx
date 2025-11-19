import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {getPosts, toggleLike} from '../../../services/postApi';
import PostItem from '../../board/PostItem';

export default function BoardSection() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // 게시물 목록 조회 (필터 없이 최신 기준 20개)
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const fetchedPosts = await getPosts({
          sort: 'createdAt', // 최신순
          page: 0,
          size: 20, // 20개까지만
        });
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('게시물 목록 조회 실패:', error);
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // 게시글 추천 상태를 토글하는 함수
  const handleLikeToggle = async (postId) => {
    const targetPost = posts.find((p) => p.postId === postId);
    if (!targetPost) return;

    const currentIsLike = targetPost.isLike;

    try {
      await toggleLike(postId, currentIsLike);

      // 성공 시 UI 업데이트
      setPosts((currentPosts) =>
        currentPosts.map((p) => {
          if (p.postId === postId) {
            const newIsLike = !p.isLike;
            return {
              ...p,
              isLike: newIsLike,
              likeCount: newIsLike ? p.likeCount + 1 : p.likeCount - 1,
            };
          }
          return p;
        })
      );
    } catch (error) {
      console.error('좋아요 토글 실패:', error);
    }
  };

  return (
    <div className="flex flex-col">
      {isLoading ? (
        <div className="text-center text-gray-500">
          <p>게시물을 불러오는 중...</p>
        </div>
      ) : posts.length > 0 ? (
        <>
          <div className="flex flex-col">
            {posts.map((post) => (
              <PostItem key={post.postId} post={post} handleLikeToggle={handleLikeToggle} />
            ))}
          </div>
          <div className="bg-white px-5">
            <button
              onClick={() => navigate('/board')}
              className="w-full text-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              게시물 더 보러가기
            </button>
          </div>
        </>
      ) : (
        <div className="py-20 text-center text-gray-500">
          <p>등록된 게시글이 없습니다.</p>
        </div>
      )}
    </div>
  );
}
