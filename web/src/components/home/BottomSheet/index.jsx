import React from 'react';
import SafetyReport from './SafetyReport';
import SafetyNotice from './SafetyNotice';
import BoardSection from './BoardSection';

export default function BottomSheetContent() {
  return (
    <div className="flex flex-col h-full">
      {/* 스크롤 기반 */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-6 p-5">
          <SafetyReport />
          <SafetyNotice />
          <BoardSection />
        </div>
      </div>
    </div>
  );
}
