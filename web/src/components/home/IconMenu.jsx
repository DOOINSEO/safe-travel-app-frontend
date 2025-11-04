import React from 'react';
import {useNavigate} from 'react-router-dom';
import IconMap from '../../assets/icons/icon-map.svg';
import IconMessage from '../../assets/icons/icon-message.svg';
import IconBoard from '../../assets/icons/icon-board.svg';
import IconPictogram from '../../assets/icons/icon-pictogram.svg';

function MenuItem({icon, label, onClick}) {
  return (
    <div
      className="flex flex-col items-center gap-2 flex-1 cursor-pointer"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="w-[60px] h-[60px] flex items-center justify-center rounded-[16px] shadow-[0_0_5px_rgba(0,0,0,0.1)] bg-white">
        <img src={icon} alt={label} className="w-8 h-8" />
      </div>
      <span className="text-[12px] font-medium text-black/40">{label}</span>
    </div>
  );
}

export default function IconMenu() {
  const navigate = useNavigate();

  const menuItems = [
    {icon: IconMap, label: '안전 지도', path: '/map'},
    {icon: IconMessage, label: '자동 문자 작성', path: '/myinfo'},
    {icon: IconBoard, label: '안전 게시판', path: '/board'},
    {icon: IconPictogram, label: '픽토그램', path: '/pictogram'},
  ];

  return (
    <div className="flex items-center justify-between w-full px-[10px]">
      {menuItems.map((item, index) => (
        <MenuItem key={index} icon={item.icon} label={item.label} onClick={() => navigate(item.path)} />
      ))}
    </div>
  );
}
