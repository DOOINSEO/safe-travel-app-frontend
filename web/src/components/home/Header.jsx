import React from 'react';
import {useNavigate} from 'react-router-dom';
import {UserCircle, Bell} from 'lucide-react';
import Logo from '../../assets/icons/Logo.svg';

export default function Header() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between p-[20px]">
      <div className="flex items-center">
        <img src={Logo} alt="Logo" />
      </div>

      <div className="flex items-center">
        <button className="p-2 text-gray-600" onClick={() => navigate('/notification')}>
          <Bell className="h-6 w-6" />
        </button>
        <button className="p-2 text-gray-600" onClick={() => navigate('/mypage')}>
          <UserCircle className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
