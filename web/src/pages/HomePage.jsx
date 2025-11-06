import React, {useState, useRef, useEffect} from 'react';
import {Sheet} from 'react-modal-sheet';
import Header from '../components/home/Header';
import IconMenu from '../components/home/IconMenu';
import BottomSheetContent from '../components/home/BottomSheet';

export default function HomePage() {
  const [open, setOpen] = useState(true);
  const [snapPoints, setSnapPoints] = useState([0, 0.84, 1]);
  const [initialSnap] = useState(1);

  const iconMenuRef = useRef(null);

  useEffect(() => {
    const calculateSnapPoints = () => {
      if (iconMenuRef.current) {
        const iconMenuBottom = iconMenuRef.current.getBoundingClientRect().bottom;
        const viewportHeight = window.innerHeight;
        const defaultSnap = (viewportHeight - iconMenuBottom) / viewportHeight;

        setSnapPoints([0, defaultSnap, 1]);
      }
    };

    calculateSnapPoints();
    window.addEventListener('resize', calculateSnapPoints);
    return () => window.removeEventListener('resize', calculateSnapPoints);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-[#00EEFF]">
      <Header />
      <div ref={iconMenuRef}>
        <IconMenu />
      </div>

      <Sheet isOpen={open} onClose={() => {}} snapPoints={snapPoints} initialSnap={initialSnap} disableDrag={true}>
        <Sheet.Container
          style={{
            boxShadow: '0 -4px 16px rgba(0, 0, 0, 0.1)',
            borderTopLeftRadius: '28px',
            borderTopRightRadius: '28px',
            backgroundColor: '#ffffffff',
          }}
        >
          <Sheet.Header disableDrag style={{display: 'none'}} />
          <Sheet.Content style={{paddingBottom: 0}}>
            <BottomSheetContent />
          </Sheet.Content>
        </Sheet.Container>
      </Sheet>
    </div>
  );
}
