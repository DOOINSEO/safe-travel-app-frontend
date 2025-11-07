import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '../common/ConfirmModal';
// TODO: accountApi.js에 logout, deleteAccount 함수를 만들어 import 해야 합니다.
// import { logout, deleteAccount } from '../../services/accountApi';

/**
 * @description '계정 관리' 페이지 하단에 위치하는 회원탈퇴 및 로그아웃 액션 버튼들을 제공하는 컴포넌트입니다.
 *              각 액션은 사용자 확인 절차를 포함하여 실수를 방지합니다.
 */
export default function AccountActions() {
    const navigate = useNavigate();
    // 모달의 노출 여부를 관리하는 상태 추가
    const [isModalOpen, setIsModalOpen] = useState(false);

    /**
     * @description '로그아웃' 버튼 클릭 시 실행될 핸들러 함수입니다.
     */
    const handleLogout = async () => {
        // 사용자에게 로그아웃 여부를 다시 한번 확인합니다.
        if (window.confirm("정말 로그아웃 하시겠습니까?")) {
            try {
                // --- ⚙️ 백엔드 연동: 로그아웃 ⚙️ ---
                // TODO: 'accountApi.js'에 실제 로그아웃 API를 호출하는 함수를 만들고 여기서 호출합니다.
                // await logout();

                // TODO: localStorage 등에 저장된 토큰이나 사용자 정보를 제거하는 로직이 필요합니다.
                // localStorage.removeItem('accessToken');

                console.log("로그아웃 성공");
                alert("로그아웃 되었습니다.");
                // 로그아웃 성공 후, 로그인 페이지로 이동합니다.
                navigate('/login');
            } catch (err) {
                console.error("로그아웃 실패:", err);
                alert("로그아웃에 실패했습니다. 다시 시도해주세요.");
            }
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