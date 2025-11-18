import React from 'react';
import PageHeader from '../components/common/PageHeader';
import BoardContent from '../components/board/BoardContent';

export default function BoardPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white">
                <PageHeader title="안전 게시판" />
            </header>

            <main className="pb-20">
                <BoardContent />
            </main>

        </div>
    );
}