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

            <main>
                <PostList posts={posts} isLoading={isLoading} error={error} />
            </main>

            <button
                onClick={() => navigate('/board/write')}
                className="fixed bottom-6 right-6 z-20 flex items-center gap-2 rounded-full bg-blue-500 px-4 py-3 text-white shadow-lg hover:bg-blue-600"
                aria-label="게시물 작성하기"
            >
                <Plus className="h-5 w-5" />
                <span className="text-sm font-semibold">게시물 작성하기</span>
            </button>
        </div>
    );
}