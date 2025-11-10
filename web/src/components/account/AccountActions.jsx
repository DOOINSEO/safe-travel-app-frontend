/**
 * @file 계정 관리 페이지에 사용되는 회원탈퇴 및 로그아웃 버튼 컴포넌트입니다.
 * @description 사용자가 계정 관련 작업을 수행할 수 있는 UI와 관련 로직을 제공합니다.
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '../common/ConfirmModal';

export default function AccountActions() {
    const navigate = useNavigate();

    // 회원탈퇴 확인 모달의 표시 여부를 관리하는 상태
    const [isModalOpen, setIsModalOpen] = useState(false);

    /**
     * 로그아웃 버튼 클릭 시 실행되는 이벤트 핸들러입니다.
     * 별도의 확인 절차 없이 즉시 로그아웃을 처리하고 로그인 페이지로 이동시킵니다.
     */
    const handleLogout = async () => {
        try {
            // TODO: (백엔드 연동) 실제 로그아웃 API를 호출하는 로직을 구현해야 합니다.
            // 예: await accountApi.logout();

            // TODO: (클라이언트) 로컬 스토리지나 상태 관리 라이브러리에 저장된 인증 토큰 및 사용자 정보를 제거해야 합니다.
            // 예: localStorage.removeItem('accessToken');

            console.log("사용자 로그아웃을 실행합니다.");
            navigate('/login'); // 로그아웃 성공 후, 로그인 페이지로 리디렉션합니다.
        } catch (err) {
            console.error("로그아웃 처리 중 오류가 발생했습니다:", err);
            alert("로그아웃에 실패했습니다. 잠시 후 다시 시도해주세요.");
        }
    };

    /**
     * 회원탈퇴 버튼 클릭 시, 사용자에게 재확인 모달을 표시하는 이벤트 핸들러입니다.
     */
    const handleWithdrawalClick = () => {
        setIsModalOpen(true);
    };

    /**
     * 회원탈퇴 확인 모달에서 '확인' 버튼을 클릭했을 때 실제 탈퇴 로직을 실행하는 핸들러입니다.
     */
    const handleConfirmWithdrawal = async () => {
        setIsModalOpen(false); // UX를 위해 API 요청 전에 모달을 먼저 닫습니다.

        try {
            // TODO: (백엔드 연동) 실제 회원탈퇴 API를 호출하는 로직을 구현해야 합니다.
            // 예: await accountApi.withdrawUser();

            console.log("사용자 회원탈퇴를 실행합니다.");
            alert("회원탈퇴가 정상적으로 처리되었습니다.");
            navigate('/'); // 회원탈퇴 성공 후, 메인 페이지로 리디렉션합니다.
        } catch (err) {
            console.error("회원탈퇴 처리 중 오류가 발생했습니다:", err);
            alert("회원탈퇴에 실패했습니다. 문제가 지속되면 관리자에게 문의해주세요.");
        }
    };

    return (
        <>
            <div className="mt-8 flex justify-center gap-x-4 text-sm text-gray-500">
                <button
                    type="button"
                    onClick={handleWithdrawalClick}
                    className="hover:underline"
                >
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