import React, { useState, useEffect } from 'react';
import { AuthInput } from '../auth/AuthInput';
// [추가] formatPhoneNumber 함수를 import 합니다.
import { formatPhoneNumber } from '../../utils/formatter';
// TODO: accountApi.js에 updateUserProfile 함수를 만들어 import 해야 합니다.
// import { updateUserProfile } from '../../services/accountApi';

/**
 * @description 사용자 개인정보(아이디, 이름, 닉네임, 전화번호)를 수정하는 폼 컴포넌트입니다.
 *              '수정 모드' 상태를 통해 일반 보기 모드와 편집 모드를 전환할 수 있습니다.
 * @param {object} props - 컴포넌트 props
 * @param {object} props.initialProfile - 부모 컴포넌트로부터 전달받은 초기 사용자 프로필 데이터
 */
export default function UserProfileForm({ initialProfile }) {
    // --- 컴포넌트 상태 정의 ---
    const [isEditing, setIsEditing] = useState(false);
    const [loginId, setLoginId] = useState(initialProfile.loginId || '');
    const [name, setName] = useState(initialProfile.name || '');
    const [nickname, setNickname] = useState(initialProfile.nickname || '');
    const [phone, setPhone] = useState(initialProfile.phone || '');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    // initialProfile이 변경될 때 상태를 동기화하는 로직
    useEffect(() => {
        setLoginId(initialProfile.loginId || '');
        setName(initialProfile.name || '');
        setNickname(initialProfile.nickname || '');
        setPhone(initialProfile.phone || '');
    }, [initialProfile]);

    /**
     * @description 전화번호 입력 시 숫자만 남기는 핸들러 함수입니다.
     */
    const handlePhoneChange = (e) => {
        const numericValue = e.target.value.replace(/[^0-9]/g, '');
        // 11자리를 초과하는 입력은 막습니다.
        if (numericValue.length <= 11) {
            setPhone(numericValue);
        }
    };

    /**
     * @description '저장' 버튼 클릭 시, 변경된 프로필 정보를 서버에 전송하는 핸들러 함수입니다.
     */
    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const formattedPhone = formatPhoneNumber(phone); // 전송 전에 포맷팅

            // --- ⚙️ 백엔드 연동: 개인정보 수정 ⚙️ ---
            // TODO: 'accountApi.js'에 실제 사용자 정보를 수정하는 API 함수를 만들고 여기서 호출해야 합니다.
            //       이때 formattedPhone 변수를 전달해야 합니다.
            // const updatedProfile = await updateUserProfile({ loginId, name, nickname, phone: formattedPhone });

            // [수정] phone 대신 formattedPhone을 사용하도록 변경합니다.
            console.log("수정할 프로필 정보:", { loginId, name, nickname, phone: formattedPhone });

            alert("프로필 정보가 성공적으로 수정되었습니다.");
            setIsEditing(false);

        } catch (err) {
            console.error("프로필 수정 실패:", err);
            setError(err.message || "정보 수정에 실패했습니다.");
        } finally {
            setIsSubmitting(false);
        }
    };

    /**
     * @description '취소' 버튼 클릭 시, 모든 변경사항을 되돌리고 '보기 모드'로 전환합니다.
     */
    const handleCancel = () => {
        setLoginId(initialProfile.loginId || '');
        setName(initialProfile.name || '');
        setNickname(initialProfile.nickname || '');
        setPhone(initialProfile.phone || '');
        setIsEditing(false);
        setError(null);
    };

    return (
        // 컴포넌트 스스로 좌우 여백(px-[40px])을 관리합니다.
        <form onSubmit={handleProfileUpdate} className="px-[40px]">
            <div className="flex flex-col gap-[25px]">
                <AuthInput
                    id="loginId"
                    label="아이디"
                    type="text"
                    value={loginId}
                    onChange={(e) => setLoginId(e.target.value)}
                    disabled={!isEditing}
                />
                <AuthInput
                    id="name"
                    label="이름"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={!isEditing}
                />
                <AuthInput
                    id="nickname"
                    label="닉네임"
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    disabled={!isEditing}
                />
                <AuthInput
                    id="phone"
                    label="전화번호"
                    type="tel"
                    placeholder="전화번호 입력"
                    // 화면에는 포맷팅된 값이 보이도록 value를 수정합니다.
                    value={formatPhoneNumber(phone)}
                    // 입력 처리는 숫자만 받는 핸들러로 변경합니다.
                    onChange={handlePhoneChange}
                    disabled={!isEditing}
                />
            </div>

            {/* 에러 메시지 표시 영역 */}
            {error && <p className="mt-4 text-center text-sm text-red-600">{error}</p>}

            {/* --- [핵심 수정] 사라졌던 버튼 렌더링 로직을 다시 추가합니다. --- */}
            <div className="mt-8">
                {isEditing ? (
                    // 수정 모드일 때: 취소/저장 버튼
                    <div className="flex gap-x-4">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="h-[56px] flex-1 rounded-full bg-gray-200 text-gray-800 font-semibold transition-colors hover:bg-gray-300"
                        >
                            취소
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="h-[56px] flex-1 rounded-full bg-black text-white font-semibold transition-colors hover:bg-gray-800 disabled:bg-gray-400"
                        >
                            {isSubmitting ? '저장 중...' : '저장'}
                        </button>
                    </div>
                ) : (
                    // 보기 모드일 때: 회원정보 수정하기 버튼
                    <button
                        type="button"
                        onClick={() => setIsEditing(true)}
                        className="h-[56px] w-full rounded-full bg-black text-white font-semibold transition-colors hover:bg-gray-800"
                    >
                        회원정보 수정하기
                    </button>
                )}
            </div>
        </form>
    );
}