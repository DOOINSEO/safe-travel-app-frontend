import React, { useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import { pictograms } from '../data/pictogramData';
import CategoryFilter from '../components/pictogram/CategoryFilter';
import PictogramGrid from '../components/pictogram/PictogramGrid';

/**
 * @description 픽토그램 기능의 메인 페이지 컴포넌트입니다.
 *              카테고리 필터링에 필요한 상태(state)를 관리하며,
 *              `PageHeader`, `CategoryFilter`, `PictogramGrid` 자식 컴포넌트들을 조합하여
 *              전체 페이지 UI를 구성하고 렌더링합니다.
 *
 * @example
 * // App.jsx (라우터)에서 이 페이지 컴포넌트를 사용하는 예시
 * <Route path="/pictogram" element={<Pictogram />} />
 */
export default function Pictogram() {
    // 현재 선택된 카테고리 ID를 저장하는 상태. 기본값은 null (선택 없음).
    const [selectedCategory, setSelectedCategory] = useState(null);

    /**
     * CategoryFilter 컴포넌트에서 카테고리 버튼 클릭 시 호출되는 핸들러 함수입니다.
     * 이미 선택된 카테고리를 다시 클릭하면 선택을 해제(null)하고,
     * 다른 카테고리를 클릭하면 해당 카테고리로 상태를 변경합니다. (토글 기능)
     * @param {string} categoryId - 클릭된 카테고리의 ID
     */
    const handleCategoryClick = (categoryId) => {
        setSelectedCategory(prev => (prev === categoryId ? null : categoryId));
    };

    // 'selectedCategory' 상태에 따라 픽토그램 목록을 필터링합니다.
    // 선택된 카테고리가 있으면(null이 아니면) 해당 카테고리의 아이템만 필터링하고,
    // 없으면(null이면) 전체 픽토그램 목록을 반환합니다.
    const filteredPictograms = selectedCategory
        ? pictograms.filter(p => p.category === selectedCategory)
        : pictograms;

    return (
        <div className="min-h-screen bg-white">
            <PageHeader title="픽토그램" />

            <main className="px-[20px]">
                <CategoryFilter
                    selectedCategory={selectedCategory}
                    onSelectCategory={handleCategoryClick}
                />

                {/*
                  CategoryFilter 컴포넌트에 하단 여백(pb-[13px])이 이미 적용되어 있어,
                  이곳에 별도의 상단 여백을 줄 필요가 없습니다.
                */}
                <PictogramGrid items={filteredPictograms} />
            </main>
        </div>
    );
}