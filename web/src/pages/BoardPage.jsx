import React from 'react';
import PageHeader from '../components/common/PageHeader';
import BoardContent from '../components/board/BoardContent';

export default function BoardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 스티키 고정 영역 */}
      <div className="sticky top-0 z-30 bg-white">
        <header className="bg-white">
          <PageHeader title="안전 게시판" backPath="/" />
        </header>
      </div>

      <main className="pb-20">
        <BoardContent />
      </main>
    </div>
  );
}
