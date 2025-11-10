import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import BoardFilters from '../components/board/BoardFilters';
import PostList from '../components/board/PostList';
import { useBoard } from '../hooks/useBoard';

export default function Board() {
    const navigate = useNavigate();
    const { posts, isLoading, error, filters, handleFilterChange } = useBoard();

    return (
        <div className="min-h-screen bg-white">
            <PageHeader title="안전 게시판" backPath="/" />

            <BoardFilters
                activeCategory={filters.category}
                onCategoryClick={(category) => handleFilterChange('category', category)}
            />

            <main className="bg-gray-50 px-4 pt-4 pb-24">
                <PostList posts={posts} isLoading={isLoading} error={error} />
            </main>

            <button
                onClick={() => navigate('/board/write')}
                className="fixed bottom-6 right-6 z-20 flex h-[38px] w-auto items-center justify-center gap-1.5 rounded-full border border-[#026ABF] bg-[#E8F5FF] px-4 py-2 text-sm font-semibold text-[#026ABF] shadow-lg transition-colors hover:bg-[#DDEFFF]"
                aria-label="게시물 작성하기"
            >
                <Plus className="h-4 w-4" />
                <span>게시물 작성하기</span>
            </button>
        </div>
    );
}