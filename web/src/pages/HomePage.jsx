import React, {useState, useRef, useEffect} from 'react';
import {Sheet} from 'react-modal-sheet';
import Header from '../components/home/Header';
import IconMenu from '../components/home/IconMenu';
import BottomSheetContent from '../components/home/BottomSheet';
import {getRiskByRegion} from '../services/riskApi';
import {useNotificationPopup} from '../hooks/useNotificationPopup';

// 프놈펜 regionCode (GPS 연결 전 예시 데이터)
const PHNOM_PENH_REGION_CODE = 'KHM-12';

// Risk level에 따른 그라데이션 색상 매핑
const GRADIENT_COLORS = {
  level1: '#00EEFF', // 1단계: 기본 파란색
  level2: '#ffc519ff', // 2단계: 노란색
  level3: '#FF6047', // 3단계: 빨간색
  level4: '#585858', // 4단계: 회색
  default: '#00EEFF', // 기본값: 파란색
};

const parseRiskLevel = (riskLevel) => {
  if (!riskLevel) return 'default';

  const levelStr = riskLevel.toUpperCase();

  if (levelStr === 'LOW') return 'level1';
  if (levelStr === 'MODERATE') return 'level2';
  if (levelStr === 'HIGH') return 'level3';
  if (levelStr === 'EXTREME') return 'level4';

  return 'default';
};

export default function HomePage() {
  const [open, setOpen] = useState(true);
  const [snapPoints, setSnapPoints] = useState([0, 0.84, 1]);
  const [initialSnap] = useState(1);
  const [gradientColor, setGradientColor] = useState(GRADIENT_COLORS.default);

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

  // Risk level 조회하여 그라데이션 색상 설정
  useEffect(() => {
    const fetchRiskLevel = async () => {
      try {
        const response = await getRiskByRegion(PHNOM_PENH_REGION_CODE);
        if (response.isSuccess && response.data?.riskLevel) {
          const level = parseRiskLevel(response.data.riskLevel);
          setGradientColor(GRADIENT_COLORS[level] || GRADIENT_COLORS.default);
        }
      } catch (err) {
        console.error('위험도 평가 조회 실패:', err);
      }
    };

    fetchRiskLevel();
  }, []);

  // 10초마다 알림 팝업 표시
  useNotificationPopup(1000);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{background: `linear-gradient(to bottom, white, ${gradientColor})`}}
    >
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
