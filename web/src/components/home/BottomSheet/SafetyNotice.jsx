import React, {useState, useEffect} from 'react';
import FlagIcon from '../../../assets/icons/icon-flag.svg';

// 샘플 데이터
const SampleData = [
  {
    title: '[캄보디아] 캄보디아 등 동남아지역 취업사기·감금 피해 주의',
    url: 'https://0404.go.kr/bbs/safetyNtc/ATC0000000048110/detail',
  },
  {
    title: '[태국] 태국-캄보디아 무력충돌 관련 안전 유의',
    url: 'https://0404.go.kr/bbs/safetyNtc/ATC0000000048051/detail',
  },
  {
    title: "[캄보디아] 5개 재외공관에 대한 테러경보 상향 조치 - 테러경보 '관심'에서 '경계'로 상향",
    url: 'https://0404.go.kr/bbs/safetyNtc/ATC0000000009431/detail',
  },
  {
    title: '[전체국가] 캄보디아 등 동남아지역 취업사기·감금 피해 주의',
    url: 'https://0404.go.kr/bbs/safetyNtc/ATC0000000009648/detail',
  },
];

export default function SafetyNotice() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % SampleData.length);
    }, 3000); // 3초마다

    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    window.open(SampleData[currentIndex].url, '_blank');
  };

  return (
    <div>
      <div className="flex items-center gap-3">
        <img src={FlagIcon} alt="깃발아이콘" className="w-6 h-6 flex-shrink-0" />
        <div className="flex-1 overflow-hidden relative h-6">
          <div key={currentIndex} className="absolute w-full animate-slideUp cursor-pointer" onClick={handleClick}>
            <p className="text-sm font-medium text-black/50 truncate hover:text-black transition-colors">
              {SampleData[currentIndex].title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
