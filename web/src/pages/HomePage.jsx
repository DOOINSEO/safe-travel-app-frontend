import React from 'react';
import Header from '../components/home/Header';
import IconMenu from '../components/home/IconMenu';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* 헤더 */}
      <Header />

      {/* 아이콘 메뉴 탭 */}
      <IconMenu />
    </div>
  );
}
