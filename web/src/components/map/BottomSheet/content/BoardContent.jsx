import React, {useMemo, useState} from 'react';
import FilterBar from '../../../board/FilterBar';
import PostItem from '../../../board/PostItem';
import FloatingWriteButton from '../../../board/FloatingWriteButton';
import {DUMMY_POSTS} from '../../../../data/dummyData';

/**
 * 지도 바텀시트 내부에 표시될 게시판 컨텐츠 컴포넌트입니다.
 * 일반 게시판 페이지와 동일한 UI를 제공하며, 지역 필터링은 API 요청으로 처리됩니다.
 */
export default function BoardContent() {
  const [posts, setPosts] = useState(DUMMY_POSTS);
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

  // 카테고리 필터링 및 정렬만 적용 (지역 필터링은 API에서 처리)
  const filteredAndSortedPosts = useMemo(() => {
    let result = [...posts];

    // 카테고리 필터링
    if (filters.categoryId !== null) {
      result = result.filter((p) => p.categoryId === filters.categoryId);
    }

    // 정렬
    switch (filters.sort) {
      case 'likeCount':
        result.sort((a, b) => b.likeCount - a.likeCount);
        break;
      case 'likeCount,asc':
        result.sort((a, b) => a.likeCount - b.likeCount);
        break;
      case 'createdAt':
      default:
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }
    return result;
  }, [filters, posts]);

  return (
    <>
      <FilterBar
        currentSort={filters.sort}
        onSortChange={handleSortChange}
        onCategoryToggle={handleCategoryToggle}
        activeCategoryId={filters.categoryId}
      />
      <div className="flex flex-col">
        {filteredAndSortedPosts.length > 0 ? (
          filteredAndSortedPosts.map((post) => (
            <PostItem key={post.postId} post={post} handleLikeToggle={handleLikeToggle} />
          ))
        ) : (
          <div className="py-20 text-center text-gray-500">
            <p>조건에 맞는 게시글이 없습니다.</p>
          </div>
        )}
      </div>

      <FloatingWriteButton />
    </>
  );
}
