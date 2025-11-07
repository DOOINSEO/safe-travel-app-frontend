import React, { useState } from 'react';
import { AuthInput } from '../auth/AuthInput';
// TODO: accountApi.js에 updatePassword 함수를 만들어 import 해야 합니다.
// import { updatePassword } from '../../services/accountApi';

/**
 * @description 사용자의 비밀번호를 변경하는 폼 컴포넌트입니다.
 *              현재 비밀번호와 새 비밀번호를 입력받아 서버에 변경을 요청합니다.
 */
export default function PasswordChangeForm() {
    // --- 컴포넌트 상태 정의 ---
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // API 요청 상태 관리
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    /**
     * @description '비밀번호 변경' 버튼 클릭 시, 유효성 검사를 거쳐 서버에 변경을 요청하는 핸들러 함수입니다.
     */
    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage('');

        // --- 프론트엔드 유효성 검사 ---
        if (!currentPassword || !newPassword || !confirmPassword) {
            setError('모든 필드를 입력해주세요.');
            return;
        }
        if (newPassword !== confirmPassword) {
            setError('새 비밀번호가 일치하지 않습니다.');
            return;
        }

        setIsSubmitting(true);

        try {
            // --- ⚙️ 백엔드 연동: 비밀번호 변경 ⚙️ ---
            // TODO: 'accountApi.js'에 실제 비밀번호를 변경하는 API 함수를 만들고 여기서 호출해야 합니다.
            // await updatePassword({ currentPassword, newPassword });

            console.log("비밀번호 변경 시도:", { currentPassword, newPassword });
            setSuccessMessage("비밀번호가 성공적으로 변경되었습니다.");

            // 성공 시 입력 필드 초기화
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');

        } catch (err) {
            console.error("비밀번호 변경 실패:", err);
            setError(err.message || "비밀번호 변경에 실패했습니다.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handlePasswordUpdate}>
            <div className="flex flex-col gap-[25px]">
                <AuthInput
                    id="currentPassword"
                    label="현재 비밀번호"
                    type="password"
                    placeholder="현재 비밀번호 입력"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <AuthInput
                    id="newPassword"
                    label="새 비밀번호"
                    type="password"
                    placeholder="새 비밀번호 입력"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <AuthInput
                    id="confirmPassword"
                    label="새 비밀번호 확인"
                    type="password"
                    placeholder="새 비밀번호 다시 입력"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>

            {/* 에러 또는 성공 메시지를 표시하는 영역 */}
            <div className="mt-4 h-5 text-center text-sm">
                {error && <p className="text-red-600">{error}</p>}
                {successMessage && <p className="text-blue-600">{successMessage}</p>}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 h-[56px] w-full rounded-full bg-black text-white font-semibold transition-colors hover:bg-gray-800 disabled:bg-gray-400"
            >
                {isSubmitting ? '변경 중...' : '비밀번호 변경'}
            </button>
        </form>
    );
}