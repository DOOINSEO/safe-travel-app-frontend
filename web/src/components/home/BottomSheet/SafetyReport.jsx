import React, {useState, useEffect} from 'react';
import IconRobot from '../../../assets/icons/icon-robot.svg';
import BubbleIcon from '../../../assets/icons/bubble.svg';
import {getRiskByRegion} from '../../../services/riskApi';

// 프놈펜 regionCode (GPS 연결 전 예시 데이터)
const PHNOM_PENH_REGION_CODE = 'KHM-12';

export default function SafetyReport() {
  const [isOpen, setIsOpen] = useState(false);
  const [riskData, setRiskData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 페이지 진입 시 자동으로 API 호출
  useEffect(() => {
    const fetchRiskData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getRiskByRegion(PHNOM_PENH_REGION_CODE);
        if (response.isSuccess && response.data) {
          setRiskData(response.data);
        } else {
          setError('데이터를 불러오는데 실패했습니다.');
        }
      } catch (err) {
        console.error('위험도 평가 조회 실패:', err);
        setError('데이터를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    // 컴포넌트 마운트 시 자동 조회
    fetchRiskData();
  }, []);

  const handleRobotClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="flex items-center gap-2 mt-2 ml-2 mb-1">
        <img
          src={IconRobot}
          alt="로봇아이콘"
          className="w-12 h-12 cursor-pointer flex-shrink-0"
          onClick={handleRobotClick}
        />

        {/* 말풍선 섹션 */}
        <div className="relative inline-block flex-1">
          <img src={BubbleIcon} alt="말풍선" className="w-full" />
          <div className="absolute inset-0 flex items-center justify-start pt-0 pl-9">
            <p className="text-left text-sm text-gray-800">
              <span className="font-bold">프놈펜</span>의 위험도는{' '}
              {riskData?.riskLevel ? (
                <span className="font-bold text-[#df523cff]">{riskData.riskLevel}</span>
              ) : (
                <span className="font-bold">-</span>
              )}
              입니다.{' '}
            </p>
          </div>
        </div>
      </div>
      <div
        className={`transition-all duration-500 ease-out overflow-hidden ${
          isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {/* 텍스트 박스 섹션 */}
        <div className="bg-white rounded-3xl shadow-[0_0_4px_rgba(0,0,0,0.20)] p-4 m-1">
          <h3 className="text-sm font-bold mb-1">안전리포트</h3>
          {loading ? (
            <p className="text-sm text-gray-800 leading-snug">데이터를 불러오는 중...</p>
          ) : error ? (
            <p className="text-sm text-red-600 leading-snug">{error}</p>
          ) : riskData?.resultContext ? (
            <p className="text-sm text-gray-800 leading-snug">{riskData.resultContext}</p>
          ) : (
            <p className="text-sm text-gray-800 leading-snug">로봇 아이콘을 클릭하여 안전 리포트를 확인하세요.</p>
          )}
        </div>
      </div>
    </div>
  );
}
