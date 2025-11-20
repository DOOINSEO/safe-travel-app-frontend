import React from 'react';

export default function TabMenu({activeTab, onTabChange}) {
  const tabs = [
    {id: 'news', label: '뉴스'},
    {id: 'board', label: '안전 게시판'},
    {id: 'info', label: '정보'},
  ];

  return (
    <div className="flex border-b border-black/15">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`
            flex-1 py-2 mx-9 text-[14px] font-medium
            ${activeTab === tab.id ? 'text-[#00398b] border-b-2 border-[#00398b]' : 'text-[#5e5e5e]'}
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
