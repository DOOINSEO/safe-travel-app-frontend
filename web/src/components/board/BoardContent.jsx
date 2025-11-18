import React, { useState, useMemo } from 'react';
import LocationSelector from './LocationSelector';
import FilterBar from './FilterBar';
import PostItem from './PostItem';
import FloatingWriteButton from './FloatingWriteButton';
import { DUMMY_POSTS } from '../../data/dummyData';

export default function BoardContent() {
    // DUMMY_POSTS를 state로 관리하여 좋아요 상태 변경을 반영합니다.
    const [posts, setPosts] = useState(DUMMY_POSTS);
    const [filters, setFilters] = useState({
        countryId: null,
        regionId: null,
        sort: 'createdAt',
        categoryId: null,
    });

    const handleCountryChange = (countryId) => {
        setFilters(prev => ({ ...prev, countryId, regionId: null }));
    };

    const handleRegionChange = (regionId) => {
        setFilters(prev => ({ ...prev, regionId }));
    };

    const handleSortChange = (sortValue) => {
        setFilters(prev => ({ ...prev, sort: sortValue }));
    };

    const handleCategoryToggle = (clickedCategoryId) => {
        setFilters(prev => ({
            ...prev,
            categoryId: prev.categoryId === clickedCategoryId ? null : clickedCategoryId
        }));
    };

    // 게시글 추천 상태를 토글하는 함수
    const handleLikeToggle = (postId) => {
        setPosts(currentPosts =>
            currentPosts.map(p => {
                if (p.postId === postId) {
                    return {
                        ...p,
                        isLike: !p.isLike,
                        likeCount: p.isLike ? p.likeCount - 1 : p.likeCount + 1,
                    };
                }
                return p;
            })
        );
    };

    const filteredAndSortedPosts = useMemo(() => {
        let result = [...posts]; // DUMMY_POSTS 대신 state인 posts 사용

        if (filters.regionId) {
            result = result.filter(p => p.locationId === filters.regionId);
        } else if (filters.countryId) {
            result = result.filter(p => p.countryId === filters.countryId);
        }

        if (filters.categoryId) {
            result = result.filter(p => p.categoryId === filters.categoryId);
        }

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
    }, [filters, posts]); // posts가 변경될 때도 리렌더링하도록 의존성 배열에 추가

    return (
        <>
            <LocationSelector
                onCountryChange={handleCountryChange}
                onRegionChange={handleRegionChange}
            />
            <FilterBar
                currentSort={filters.sort}
                onSortChange={handleSortChange}
                onCategoryToggle={handleCategoryToggle}
                activeCategoryId={filters.categoryId}
            />
            <div className="flex flex-col">
                {filteredAndSortedPosts.length > 0 ? (
                    filteredAndSortedPosts.map(post => (
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