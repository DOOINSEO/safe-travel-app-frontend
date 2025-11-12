import React from 'react';
import {Sheet} from 'react-modal-sheet';
import BottomSheetContent from './content';

export default function MapBottomSheet({isOpen, onClose, selectedPolygon}) {
  return (
    <Sheet isOpen={isOpen} onClose={onClose} snapPoints={[0, 0.45, 1]} initialSnap={1}>
      <Sheet.Container
        style={{
          borderTopLeftRadius: '28px',
          borderTopRightRadius: '28px',
          backgroundColor: '#ffffffff',
        }}
      >
        <Sheet.Header style={{height: '24px'}} />
        <Sheet.Content style={{paddingBottom: 0}}>
          <BottomSheetContent selectedPolygon={selectedPolygon} />
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
}
