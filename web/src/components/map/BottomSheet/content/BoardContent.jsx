import React, {useMemo, useState} from 'react';
// --- 수정된 경로 ---
import FilterBar from '../../../board/FilterBar';
import PostItem from '../../../board/PostItem';
import FloatingWriteButton from '../../../board/FloatingWriteButton';
import {DUMMY_POSTS} from '../../../../data/dummyData';

/**
 * 지도 바텀시트 내부에 표시될 게시판 컨텐츠 컴포넌트입니다.
 * @param {object} props
 * @param {object | null} props.regionData - 지도에서 선택된 지역(폴리곤)의 데이터
 */
export default function BoardContent({regionData}) {
    // DUMMY_POSTS를 state로 관리하여 좋아요 상태 변경을 반영합니다.
    const [posts, setPosts] = useState(DUMMY_POSTS);
    const [filters, setFilters] = useState({
        sort: 'createdAt', categoryId: null,
    });

    const handleSortChange = (sortValue) => {
        setFilters(prev => ({...prev, sort: sortValue}));
    };

    const handleCategoryToggle = (clickedCategoryId) => {
        setFilters(prev => ({
            ...prev, categoryId: prev.categoryId === clickedCategoryId ? null : clickedCategoryId
        }));
    };

    // 게시글 추천 상태를 토글하는 함수
    const handleLikeToggle = (postId) => {
        setPosts(currentPosts => currentPosts.map(p => {
            if (p.postId === postId) {
                return {
                    ...p,
                    isLike: !p.isLike,
                    likeCount: p.isLike ? p.isLike ? p.likeCount - 1 : p.likeCount + 1 : p.likeCount,
                };
            }
            return p;
        }));
    };

    // 선택된 지역에 따라 게시물을 필터링하고 정렬합니다.
    const filteredAndSortedPosts = useMemo(() => {
        if (!regionData) {
            return [];
        }

        // DUMMY_POSTS의 locationId와 GADM 데이터의 id를 일치시켜야 합니다.
        // 현재 더미데이터는 101, 201과 같은 ID를 사용하고 있으므로,
        // GADM 데이터의 id 체계를 확인하고 DUMMY_POSTS의 locationId를 맞춰주어야 합니다.
        // 여기서는 임시로 regionData의 nameKo와 post의 locationName을 비교하여 필터링하겠습니다.
        // (가장 좋은 방법은 ID를 일치시키는 것입니다)
        let result = posts.filter(p => p.locationName.includes(regionData.nameKo));

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
    }, [regionData, filters, posts]);

    if (!regionData) {
        return (<div className="flex h-full items-center justify-center text-gray-500">
                <p>지도에서 지역을 선택하여 게시물을 확인하세요.</p>
            </div>);
    }

    return (<>
            <div className="px-4 pt-2 pb-1">
                <h2 className="text-xl font-bold">{regionData.nameKo} 게시물</h2>
            </div>

            <FilterBar
                currentSort={filters.sort}
                onSortChange={handleSortChange}
                onCategoryToggle={handleCategoryToggle}
                activeCategoryId={filters.categoryId}
            />

            <div className="flex flex-col">
                {filteredAndSortedPosts.length > 0 ? (filteredAndSortedPosts.map(post => (<PostItem
                            key={post.postId}
                            post={post}
                            handleLikeToggle={handleLikeToggle}
                        />))) : (<div className="py-20 text-center text-gray-500">
                        <p>이 지역에 등록된 게시글이 없습니다.</p>
                    </div>)}
            </div>

            <FloatingWriteButton/>
        </>);
}