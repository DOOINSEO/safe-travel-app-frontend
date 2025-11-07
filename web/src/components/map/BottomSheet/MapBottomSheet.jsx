import React, {useState} from 'react';
import {Sheet} from 'react-modal-sheet';

export default function MapBottomSheet() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Sheet isOpen={isOpen} onClose={() => setIsOpen(false)} snapPoints={[0, 0.45, 1]} initialSnap={1}>
      <Sheet.Container
        style={{
          borderTopLeftRadius: '28px',
          borderTopRightRadius: '28px',
          backgroundColor: '#ffffffff',
        }}
      >
        <Sheet.Header style={{height: '24px'}} />
        <Sheet.Content>
          <div className="p-4">
            <h2 className="text-xl font-bold">지역 정보</h2>
            <p className="text-gray-600">바텀시트 기본 구조</p>
          </div>
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
}
