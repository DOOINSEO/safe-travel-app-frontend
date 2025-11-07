import React from 'react';

// 임시값 여행경보 4단계:
// 1. safe (여행유의) - 파란색
// 2. caution (여행자제) - 노란색
// 3. warning (철수권고) - 빨간색
// 4. danger (여행금지) - 검은색

const SAFETY_BADGE_STYLES = {
  safe: {
    dot: 'bg-blue-500',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-700',
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
    label: '철수권고',
  },
  danger: {
    dot: 'bg-black',
    bg: 'bg-gray-50',
    border: 'border-gray-300',
    text: 'text-gray-900',
    label: '여행금지',
  },
};

export default function SafetyBadge({level = 'safe', showLevel = false}) {
  const style = SAFETY_BADGE_STYLES[level] || SAFETY_BADGE_STYLES.safe;

  return (
    <div
      className={`
        inline-flex items-center
        px-3 py-1.5 
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
