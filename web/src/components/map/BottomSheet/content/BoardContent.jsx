import React, {useEffect, useMemo, useState} from 'react';
import FilterBar from '../../../board/FilterBar';
import PostItem from '../../../board/PostItem';
import FloatingWriteButton from '../../../board/FloatingWriteButton';
import {getPosts} from '../../../../services/postApi';

/**
 * 지도 바텀시트 내부에 표시될 게시판 컨텐츠 컴포넌트입니다.
 * 일반 게시판 페이지와 동일한 UI를 제공하며, 지역 필터링은 API 요청으로 처리됩니다.
 */
export default function BoardContent({region}) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    sort: 'createdAt',
    categoryId: null,
  });

  const handleSortChange = (sortValue) => {
    setFilters((prev) => ({...prev, sort: sortValue}));
  };

  const handleCategoryToggle = (clickedCategoryId) => {
    setFilters((prev) => ({
      ...prev,
      categoryId: prev.categoryId === clickedCategoryId ? null : clickedCategoryId,
    }));
  };

  // 게시글 추천 상태를 토글하는 함수
  const handleLikeToggle = (postId) => {
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
  };

  // 게시물 목록 조회 API 호출 (지역 기반)
  useEffect(() => {
    const fetchPosts = async () => {
      if (!region || !region.id) {
        setPosts([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const posts = await getPosts({
          regionCode: region.id,
          sort: filters.sort,
          categoryId: filters.categoryId,
          page: 0,
          size: 20,
        });
        setPosts(posts);
      } catch (error) {
        console.error('게시물 목록 조회 실패:', error);
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [region, filters.sort, filters.categoryId]);

  const filteredAndSortedPosts = useMemo(() => {
    return posts;
  }, [posts]);

  return (
    <>
      <FilterBar
        currentSort={filters.sort}
        onSortChange={handleSortChange}
        onCategoryToggle={handleCategoryToggle}
        activeCategoryId={filters.categoryId}
      />
      {!region ? (
        <div className="flex h-full items-center justify-center text-gray-500">
          <p>지도에서 지역을 선택하여 게시물을 확인하세요.</p>
        </div>
      ) : (
        <div className="flex flex-col">
          {isLoading ? (
            <div className="py-20 text-center text-gray-500">
              <p>게시물을 불러오는 중...</p>
            </div>
          ) : filteredAndSortedPosts.length > 0 ? (
            filteredAndSortedPosts.map((post) => (
              <PostItem key={post.postId} post={post} handleLikeToggle={handleLikeToggle} />
            ))
          ) : (
            <div className="py-20 text-center text-gray-500">
              <p>이 지역에 등록된 게시글이 없습니다.</p>
            </div>
          )}
        </div>
      )}

      <FloatingWriteButton />
    </>
  );
}
