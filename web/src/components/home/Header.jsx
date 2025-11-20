import React from 'react';
import {useNavigate} from 'react-router-dom';
import {UserCircle, Bell} from 'lucide-react';
import Logo from '../../assets/icons/Logo.svg';

export default function Header() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between p-4 py-3">
      <div className="flex items-center">
        <img src={Logo} alt="Logo" className="p-2" />
      </div>

      <div className="flex items-center">
        <button className="p-2 text-gray-800" onClick={() => navigate('/notification')}>
          <Bell className="h-6 w-6" strokeWidth={1.5} />
        </button>
        <button className="p-2 text-gray-800" onClick={() => navigate('/account')}>
          <UserCircle className="h-6 w-6" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
