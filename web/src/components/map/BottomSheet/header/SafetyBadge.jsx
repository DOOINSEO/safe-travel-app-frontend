import React from 'react';

// 여행 안전 단계
// level1 (1단계: 여행유의) - 초록색
// level2 (2단계: 여행자제) - 노란색
// level3 (3단계: 출국권고, 특별여행주의보) - 빨간색
// level4 (4단계: 여행금지) - 검은색

const SAFETY_BADGE_STYLES = {
  // 기존 호환성 유지
  safe: {
    dot: 'bg-green-500',
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-700',
    label: '여행유의',
  },
  caution: {
    dot: 'bg-yellow-500',
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    text: 'text-yellow-700',
    label: '여행자제',
  },
  warning: {
    dot: 'bg-red-500',
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-700',
    label: '출국권고',
  },
  danger: {
    dot: 'bg-black',
    bg: 'bg-gray-50',
    border: 'border-gray-300',
    text: 'text-gray-900',
    label: '여행금지',
  },
  // 안전단계별 배지 (폴리곤 색상과 동일)
  level1: {
    dot: 'bg-green-500',
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-700',
    label: '여행유의',
  },
  level2: {
    dot: 'bg-yellow-500',
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    text: 'text-yellow-700',
    label: '여행자제',
  },
  level3: {
    dot: 'bg-red-500',
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-700',
    label: '출국권고',
  },
  level4: {
    dot: 'bg-black',
    bg: 'bg-gray-50',
    border: 'border-gray-300',
    text: 'text-gray-900',
    label: '여행금지',
  },
};

export default function SafetyBadge({level = 'level2', showLevel = false}) {
  const style = SAFETY_BADGE_STYLES[level] || SAFETY_BADGE_STYLES.level2;

  return (
    <div
      className={`
        inline-flex items-center
        px-2 py-0.5 
        gap-2
        text-sm
        ${style.bg}
        ${style.border}
        border
        rounded-full
        font-medium
        ${style.text}
      `}
    >
      <span className={`${style.dot} w-2.5 h-2.5 rounded-full`}></span>
      <span>{style.label}</span>
    </div>
  );
}
