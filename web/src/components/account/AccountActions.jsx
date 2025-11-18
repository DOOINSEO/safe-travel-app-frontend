/**
 * @file 계정 관리 페이지에 사용되는 회원탈퇴 및 로그아웃 버튼 컴포넌트입니다.
 * @description 사용자가 계정 관련 작업을 수행할 수 있는 UI와 관련 로직을 제공합니다.
 */
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import ConfirmModal from '../common/ConfirmModal';
import {deleteUser} from '../../services/accountApi';
import useAuthStore from '../../stores/authStore';

export default function AccountActions({userId}) {
  const navigate = useNavigate();
  const {logout} = useAuthStore();

  // 회원탈퇴 확인 모달의 표시 여부를 관리하는 상태
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleWithdrawalClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmWithdrawal = async () => {
    setIsModalOpen(false);
    try {
      await deleteUser(userId);
      logout();
      navigate('/');
    } catch (error) {
      console.error('회원탈퇴 실패:', error);
    }
  };

  return (
    <>
      <div className="mt-8 flex justify-center gap-x-4 text-sm text-gray-500">
        <button type="button" onClick={handleWithdrawalClick} className="hover:underline">
          회원탈퇴
        </button>
        <span>|</span>
        <button type="button" onClick={handleLogout} className="hover:underline">
          로그아웃
        </button>
      </div>

      {/* 회원탈퇴 재확인 모달 */}
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmWithdrawal}
        title="정말 탈퇴하시겠습니까?"
      >
        <p>계정을 삭제하면 모든 정보가 영구적으로 사라지며, 이 작업은 되돌릴 수 없습니다.</p>
      </ConfirmModal>
    </>
  );
}
