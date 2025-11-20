import React from 'react';
import SafetyReport from './SafetyReport';
import SafetyGauge from './SafetyGauge';
import SafetyNotice from './SafetyNotice';
import BoardSection from './BoardSection';
import EmergencyButton from '../../common/EmergencyButton';

export default function BottomSheetContent() {
  return (
    <div className="flex flex-col h-full relative">
      {/* 스크롤 기반 */}
      <div className="flex-1 overflow-y-auto pb-20">
        <div className="flex flex-col">
          {/* Sticky 고정 영역 */}
          <div className="sticky top-0 z-10 bg-white" style={{borderTopLeftRadius: '28px', borderTopRightRadius: '28px'}}>
            <div className="p-4">
              <SafetyReport />
            </div>
            <SafetyGauge />
          </div>
          
          {/* 스크롤 가능한 컨텐츠 */}
          <div className="px-5 py-2">
            <SafetyNotice />
          </div>
          <div className="p-1">
            <BoardSection />
          </div>
        </div>
      </div>

      {/* 원클릭 비상 버튼 - 바텀시트 하단 오른쪽 고정 */}
      <div className="absolute bottom-[170px] right-5 z-50">
        <EmergencyButton />
      </div>
    </div>
  );
}
