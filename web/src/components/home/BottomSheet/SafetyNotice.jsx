import React, {useState, useEffect} from 'react';
import FlagIcon from '../../../assets/icons/icon-flag.svg';

// 샘플 데이터
const SampleData = [
  {
    title: '[탄자니아] 탄자니아 선거 결과 발표 이후 재외국민 신변안전 유의',
    url: 'https://0404.go.kr/bbs/safetyNtc/ATC0000000048141/detail',
  },
  {
    title: '[이스라엘] 이스라엘 초정통파 유대인 단체 대규모 시위로 인한 교통혼잡 및 충돌 우려 관련',
    url: 'https://0404.go.kr/bbs/safetyNtc/ATC0000000048137/detail',
  },
  {
    title: '[페루] 페루 리마 수도권 및 카야오 주 국가비상사태 선포에 따른 재외국민 안전 유의 안내',
    url: 'https://0404.go.kr/bbs/safetyNtc/ATC0000000048130/detail',
  },
  {
    title: '[우간다] 우간다 캄팔라 수도권 흉기(마체테·팡가 등) 사용 강도 관련 (10.28)',
    url: 'https://0404.go.kr/bbs/safetyNtc/ATC0000000048135/detail',
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
