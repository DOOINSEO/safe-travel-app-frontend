import React from 'react';
import SafetyReport from './SafetyReport';
import SafetyNotice from './SafetyNotice';
import BoardSection from './BoardSection';
import EmergencyButton from '../../common/EmergencyButton';

export default function BottomSheetContent() {
  return (
    <div className="flex flex-col h-full relative">
      {/* 스크롤 기반 */}
      <div className="flex-1 overflow-y-auto pb-20">
        <div className="flex flex-col gap-6 p-5">
          <SafetyReport />
          <SafetyNotice />
          <BoardSection />
        </div>
      </div>

      {/* 원클릭 비상 버튼 - 바텀시트 하단 오른쪽 고정 */}
      <div className="absolute bottom-[170px] right-5 z-50">
        <EmergencyButton />
      </div>
    </div>
  );
}
