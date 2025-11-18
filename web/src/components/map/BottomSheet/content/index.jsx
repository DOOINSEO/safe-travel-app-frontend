import React, {useState} from 'react';
import RegionInfo from '../header/RegionInfo';
import TabMenu from '../tabs/TabMenu';
import NewsContent from './NewsContent';
import BoardContent from './BoardContent';
import InfoContent from './InfoContent';

export default function BottomSheetContent({selectedPolygon}) {
  const [activeTab, setActiveTab] = useState('news');

  return (
    <div className="flex flex-col h-full">
      {/* 헤더 */}
      <RegionInfo selectedPolygon={selectedPolygon} />

      {/* 탭 메뉴*/}
      <TabMenu activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 탭별 컨텐츠 (스크롤) */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'news' && <NewsContent region={selectedPolygon} />}
        {activeTab === 'board' && <BoardContent />}
        {activeTab === 'info' && <InfoContent region={selectedPolygon} />}
      </div>
    </div>
  );
}
