import React from 'react';

const RISK_LEVELS = ['LOW', 'MODERATE', 'HIGH', 'EXTREME'];

const GRADIENT_COLORS = {
  level1: '#00afbcff', // 1단계: 기본 파란색
  level2: '#d19d00ff', // 2단계: 노란색
  level3: '#df523cff', // 3단계: 빨간색
  level4: '#828282ff', // 4단계: 회색
  default: '#00EEFF', // 기본값: 파란색
};

const getRiskLevelIndex = (riskLevel) => {
  const upperLevel = riskLevel?.toUpperCase();
  const index = RISK_LEVELS.findIndex((level) => level === upperLevel);
  return index >= 0 ? index : 0;
};

const getRiskLevelColor = (index) => {
  const colors = [GRADIENT_COLORS.level1, GRADIENT_COLORS.level2, GRADIENT_COLORS.level3, GRADIENT_COLORS.level4];
  return colors[index] || GRADIENT_COLORS.default;
};

const getRiskLevelLabelColor = (index) => {
  const colors = [GRADIENT_COLORS.level1, GRADIENT_COLORS.level2, GRADIENT_COLORS.level3, GRADIENT_COLORS.level4];
  return colors[index] || GRADIENT_COLORS.default;
};

export default function SafetyGauge({riskData}) {
  const currentIndex = riskData?.riskLevel ? getRiskLevelIndex(riskData.riskLevel) : 0;
  const fillPercentage = ((currentIndex + 1) / RISK_LEVELS.length) * 100;

  return (
    <div className="px-3">
      <div className="bg-white rounded-2xl p-4 pt-2">
        <div className="mb-3">
          {/* 단계 레이블 */}
          <div className="flex justify-between items-center mb-2">
            {RISK_LEVELS.map((level, index) => (
              <div
                key={level}
                className="text-xs font-medium"
                style={{
                  color: index <= currentIndex ? getRiskLevelLabelColor(index) : '#9CA3AF',
                }}
              >
                {level}
              </div>
            ))}
          </div>

          {/* 게이지 바 */}
          <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full transition-all duration-500 ease-out rounded-full"
              style={{
                width: `${fillPercentage}%`,
                backgroundColor: getRiskLevelColor(currentIndex),
              }}
            />
            {/* 단계 구분선 */}
            <div className="absolute inset-0 flex">
              {RISK_LEVELS.map((_, index) => (
                <div key={index} className="flex-1 border-r border-gray-300 last:border-r-0" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
