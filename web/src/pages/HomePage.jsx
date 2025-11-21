import React, {useState, useRef, useEffect} from 'react';
import {Sheet} from 'react-modal-sheet';
import Header from '../components/home/Header';
import IconMenu from '../components/home/IconMenu';
import BottomSheetContent from '../components/home/BottomSheet';
import {getRiskByRegion} from '../services/riskApi';
import {initialNotifications} from '../data/notificationData';
import {saveNotification} from '../utils/notificationStorage';

// 초기 지역 (GPS 연결 전)
const INITIAL_REGION_CODE = 'KHM-13';

// Risk level에 따른 그라데이션 색상 매핑
const GRADIENT_COLORS = {
  level1: '#00EEFF', // 1단계: 기본 파란색
  level2: '#ffc519ff', // 2단계: 노란색
  level3: '#FF6047', // 3단계: 빨간색
  level4: '#828282ff', // 4단계: 회색
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
  const [snapPoints, setSnapPoints] = useState([0, 0.88, 1]);
  const [initialSnap] = useState(1);
  const [gradientColor, setGradientColor] = useState(GRADIENT_COLORS.default);
  const [riskData, setRiskData] = useState(null);
  const [currentRegionCode, setCurrentRegionCode] = useState(INITIAL_REGION_CODE);

  const iconMenuRef = useRef(null);

  useEffect(() => {
    const calculateSnapPoints = () => {
      if (iconMenuRef.current) {
        const iconMenuBottom = iconMenuRef.current.getBoundingClientRect().bottom;
        const viewportHeight = window.innerHeight;
        const defaultSnap = (viewportHeight - iconMenuBottom) / viewportHeight;
        const adjustedSnap = Math.min(defaultSnap + 0.02, 0.95);

        setSnapPoints([0, adjustedSnap, 1]);
      }
    };

    calculateSnapPoints();
    window.addEventListener('resize', calculateSnapPoints);
    return () => window.removeEventListener('resize', calculateSnapPoints);
  }, []);

  // Risk level 조회하여 그라데이션 색상 설정 및 하위 컴포넌트에 전달
  useEffect(() => {
    const fetchRiskLevel = async () => {
      try {
        const response = await getRiskByRegion(currentRegionCode);
        if (response.isSuccess && response.data) {
          setRiskData(response.data);
          if (response.data.riskLevel) {
            const level = parseRiskLevel(response.data.riskLevel);
            setGradientColor(GRADIENT_COLORS[level] || GRADIENT_COLORS.default);
          }
        }
      } catch (err) {
        console.error('위험도 평가 조회 실패:', err);
      }
    };

    fetchRiskLevel();
  }, [currentRegionCode]);

  // 홈 화면 최초 접속 시 5초 후 id:1 알림 딱 한 번 표시 및 지역 코드 변경
  useEffect(() => {
    const timer = setTimeout(() => {
      const notification = initialNotifications.find((n) => n.id === 1);

      if (!notification) {
        return;
      }

      // 지역 코드 KHM-12로 변경
      setCurrentRegionCode('KHM-12');
      saveNotification(notification);

      if (typeof window !== 'undefined' && window.M && window.M.pop && window.M.pop.alert) {
        // Morpheus 경고 팝업 표시
        window.M.pop.alert({
          title: notification.typeName || '알림',
          message: notification.title,
          buttons: ['확인'],
          callback: function (index) {
            console.log('알림 확인됨:', index);
          },
        });
      } else {
        // 개발 환경에서 Morpheus가 없을 경우 콘솔 로그
        if (process.env.NODE_ENV === 'development' || import.meta.env?.MODE === 'development') {
        }
      }
    }, 5000); // 5초 후 실행

    // 컴포넌트 언마운트 시 타이머 정리
    return () => {
      clearTimeout(timer);
    };
  }, []); // 빈 배열로 최초 마운트 시 한 번만 실행

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
            <BottomSheetContent riskData={riskData} />
          </Sheet.Content>
        </Sheet.Container>
      </Sheet>
    </div>
  );
}
