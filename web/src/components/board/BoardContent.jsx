import React, {useEffect, useMemo, useState} from 'react';
import LocationSelector from './LocationSelector';
import FilterBar from './FilterBar';
import PostItem from './PostItem';
import FloatingWriteButton from './FloatingWriteButton';
import {getPosts} from '../../services/postApi';

export default function BoardContent() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    countryId: null,
    regionId: null,
    sort: 'createdAt',
    categoryId: null,
  });

  const handleCountryChange = (countryId) => {
    setFilters((prev) => ({...prev, countryId, regionId: null}));
  };

  const handleRegionChange = (regionId) => {
    setFilters((prev) => ({...prev, regionId}));
  };

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

  // 게시물 목록 조회 API 호출
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const params = {
          sort: filters.sort,
          categoryId: filters.categoryId,
          page: 0,
          size: 20,
        };

        // 지역이 선택된 경우 regionCode 추가
        if (filters.regionId) {
          params.regionCode = filters.regionId;
        }

        const posts = await getPosts(params);
        setPosts(posts);
      } catch (error) {
        console.error('게시물 목록 조회 실패:', error);
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [filters.sort, filters.categoryId, filters.regionId]);

  const filteredAndSortedPosts = useMemo(() => {
    return posts; // API에서 이미 필터링/정렬된 데이터를 받으므로 그대로 사용
  }, [posts]);

  return (
    <>
      <LocationSelector onCountryChange={handleCountryChange} onRegionChange={handleRegionChange} />
      <FilterBar
        currentSort={filters.sort}
        onSortChange={handleSortChange}
        onCategoryToggle={handleCategoryToggle}
        activeCategoryId={filters.categoryId}
      />
      <div className="flex flex-col">
        {isLoading ? (
          <div className="py-20 text-center text-gray-500">
            <p>게시물을 불러오는 중...</p>
          </div>
        ) : filteredAndSortedPosts.length > 0 ? (
          filteredAndSortedPosts.map((post) => (
            <PostItem
              key={post.postId}
              post={post}
              handleLikeToggle={handleLikeToggle} // 함수 전달
            />
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
