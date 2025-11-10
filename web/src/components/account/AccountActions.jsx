/**
 * @file '계정 관리' 페이지의 회원탈퇴 및 로그아웃 액션 버튼을 제공합니다.
 *       [수정] 로그아웃 시 확인 절차 없이 즉시 실행되도록 변경되었습니다.
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '../common/ConfirmModal';

export default function AccountActions() {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    /**
     * @description '로그아웃' 버튼 클릭 시 즉시 로그아웃 로직을 실행하는 핸들러 함수입니다.
     */
    const handleLogout = async () => {
        try {
            // [수정] window.confirm 확인 절차를 제거했습니다.
            // --- ⚙️ 백엔드 연동: 로그아웃 ⚙️ ---
            // TODO: 'accountApi.js'에 실제 로그아웃 API를 호출하는 함수를 만들고 여기서 호출합니다.
            // await logout();

            // TODO: localStorage 등에 저장된 토큰이나 사용자 정보를 제거합니다.
            // localStorage.removeItem('accessToken');

            console.log("즉시 로그아웃 실행");
            // alert("로그아웃 되었습니다."); // [선택적 제거] 즉각적인 이동을 위해 alert도 제거할 수 있습니다.
            navigate('/login'); // 로그아웃 성공 후, 로그인 페이지로 즉시 이동합니다.
        } catch (err) {
            console.error("로그아웃 실패:", err);
            alert("로그아웃에 실패했습니다. 다시 시도해주세요.");
        }
    };

    /**
     * @description '회원탈퇴' 버튼 클릭 시, 확인 모달을 띄우는 핸들러입니다.
     */
    const handleWithdrawalClick = () => {
        setIsModalOpen(true);
    };

    /**
     * @description 모달의 '확인' 버튼을 눌렀을 때 실제 탈퇴 로직을 실행하는 함수입니다.
     */
    const handleConfirmWithdrawal = async () => {
        setIsModalOpen(false); // 먼저 모달을 닫습니다.
        try {
            // --- ⚙️ 백엔드 연동: 회원탈퇴 ⚙️ ---
            console.log("회원탈퇴 실행");
            alert("회원탈퇴가 완료되었습니다.");
            navigate('/');
        } catch (err) {
            console.error("회원탈퇴 실패:", err);
            alert("회원탈퇴에 실패했습니다.");
        }
    };

    return (
        <>
            <div className="mt-8 flex justify-center gap-x-4 text-sm text-gray-500">
                <button
                    type="button"
                    onClick={handleWithdrawalClick} // 모달을 띄우는 함수로 변경
                    className="hover:underline"
                >
                    회원탈퇴
                </button>
                <span>|</span>
                <button type="button" onClick={handleLogout} className="hover:underline">
                    로그아웃
                </button>
            </div>

            {/* 회원탈퇴 확인 모달 */}
            <ConfirmModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmWithdrawal}
                title="정말 회원탈퇴 하시겠습니까?"
            >
                <p>이 작업은 되돌릴 수 없으며, 모든 정보가 영구적으로 삭제됩니다.</p>
            </ConfirmModal>
        </>
    );
}