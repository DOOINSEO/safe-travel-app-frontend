import React, { useState, useEffect } from 'react';
import { AuthInput } from '../auth/AuthInput';
import AlertModal from '../common/AlertModal';
import { updateUserProfile } from '../../services/accountApi';
import { formatPhoneNumber } from '../../utils/formatter';

/**
 * @file 사용자 프로필 정보를 표시하고 수정하는 폼 컴포넌트입니다.
 * @description
 * '조회 모드'와 '수정 모드'를 자체적으로 관리하며,
 * `initialProfile` prop으로 받은 초기 데이터를 기반으로 폼을 렌더링합니다.
 * 사용자 피드백은 AlertModal을 통해 제공됩니다.
 */
export default function UserProfileForm({ initialProfile }) {
    // 폼의 '수정 모드'와 '조회 모드'를 전환하는 상태
    const [isEditing, setIsEditing] = useState(false);

    // 폼 입력 필드를 위한 상태들
    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState(''); // 비밀번호는 수정 시에만 입력받음
    const [name, setName] = useState('');
    const [phone, setPhone] = useState(''); // 전화번호 상태 (숫자만 저장하여 데이터 일관성 유지)
    const [nickname, setNickname] = useState('');
    const [alarmEnabled, setAlarmEnabled] = useState(false);

    // API 요청 결과 등을 사용자에게 알리기 위한 모달 상태
    const [alertInfo, setAlertInfo] = useState({
        isOpen: false,
        title: '',
        message: '',
    });

    // initialProfile prop이 변경될 때마다 폼 상태를 최신 데이터로 동기화합니다.
    useEffect(() => {
        if (initialProfile) {
            setLoginId(initialProfile.loginId ?? '');
            setName(initialProfile.name ?? '');
            // 전화번호에서 숫자 외 문자를 제거하여 상태에 저장합니다.
            setPhone(initialProfile.phone?.replace(/[^0-9]/g, '') ?? '');
            setNickname(initialProfile.nickname ?? '');
            setAlarmEnabled(initialProfile.alarmEnabled ?? false);
            // 보안을 위해 비밀번호 필드는 항상 초기화합니다.
            setPassword('');
        }
    }, [initialProfile]);

    /**
     * 휴대폰 번호 입력 필드의 변경 이벤트 핸들러입니다.
     * 입력값에서 숫자 이외의 문자를 제거하여 최대 11자리까지만 상태에 반영합니다.
     * @param {React.ChangeEvent<HTMLInputElement>} e - 입력 이벤트 객체
     */
    const handlePhoneChange = (e) => {
        const numericValue = e.target.value.replace(/[^0-9]/g, '');
        if (numericValue.length <= 11) {
            setPhone(numericValue);
        }
    };

    /**
     * '취소' 버튼 클릭 이벤트 핸들러입니다.
     * 모든 변경사항을 initialProfile 기준으로 되돌리고 '조회 모드'로 전환합니다.
     */
    const handleCancel = () => {
        if (initialProfile) {
            // useEffect의 로직과 동일하게 상태를 초기값으로 복원합니다.
            setLoginId(initialProfile.loginId ?? '');
            setName(initialProfile.name ?? '');
            setPhone(initialProfile.phone?.replace(/[^0-9]/g, '') ?? '');
            setNickname(initialProfile.nickname ?? '');
            setAlarmEnabled(initialProfile.alarmEnabled ?? false);
            setPassword('');
        }
        setIsEditing(false);
    };

    /**
     * 폼 제출(저장) 이벤트 핸들러입니다.
     * API를 통해 사용자 정보를 업데이트하고, 결과에 따라 알림 모달을 표시합니다.
     * @param {React.FormEvent<HTMLFormElement>} e - 폼 제출 이벤트 객체
     */
    const handleSubmit = async (e) => {
        e.preventDefault(); // 기본 폼 제출 동작(페이지 새로고침)을 방지합니다.

        try {
            // API에 전송할 데이터 객체를 구성합니다.
            const dataToUpdate = { loginId, name, phone, nickname, alarmEnabled };
            // 비밀번호 필드에 값이 있을 경우에만 업데이트 객체에 포함시킵니다.
            if (password) {
                dataToUpdate.password = password;
            }

            // 프로필 업데이트 API를 호출합니다.
            await updateUserProfile(initialProfile.id, dataToUpdate);

            // 성공 시 알림 모달을 표시하고 '조회 모드'로 전환합니다.
            setAlertInfo({ isOpen: true, title: '성공', message: '프로필이 성공적으로 저장되었습니다.' });
            setIsEditing(false);
        } catch (error) {
            console.error('프로필 저장 실패:', error);
            // 실패 시 에러 메시지를 포함한 알림 모달을 표시합니다.
            setAlertInfo({ isOpen: true, title: '오류', message: error.message || '저장에 실패했습니다.' });
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="flex w-full flex-col items-center px-[20px]">
                <div className="flex w-full flex-col items-center gap-6">
                    {/* 각 입력 필드는 isEditing 상태에 따라 활성화/비활성화 됩니다. */}
                    <AuthInput id="loginId" label="아이디" value={loginId} onChange={(e) => setLoginId(e.target.value)} disabled={!isEditing} />
                    <AuthInput
                        id="password"
                        label="비밀번호"
                        type="password"
                        placeholder={isEditing ? '변경할 비밀번호 입력' : '********'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={!isEditing}
                    />
                    <AuthInput id="name" label="실명" value={name} onChange={(e) => setName(e.target.value)} disabled={!isEditing} />
                    <AuthInput id="nickname" label="닉네임" value={nickname} onChange={(e) => setNickname(e.target.value)} disabled={!isEditing} />
                    <AuthInput
                        id="phone"
                        label="휴대폰번호"
                        type="tel"
                        placeholder="010-0000-0000"
                        value={formatPhoneNumber(phone)} // 화면에는 포맷팅된 값을 보여줍니다.
                        onChange={handlePhoneChange}
                        disabled={!isEditing}
                    />

                    <div className="flex w-full items-center gap-2">
                        <input
                            type="checkbox"
                            id="alarmEnabled"
                            checked={alarmEnabled}
                            onChange={(e) => setAlarmEnabled(e.target.checked)}
                            disabled={!isEditing}
                            className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black disabled:bg-gray-200"
                        />
                        <label htmlFor="alarmEnabled" className="text-sm text-gray-700">안전 관련 알림 수신</label>
                    </div>
                </div>

                <div className="mt-8 w-full">
                    {/* 수정 모드(isEditing) 여부에 따라 '저장/취소' 또는 '수정하기' 버튼을 조건부로 렌더링합니다. */}
                    {isEditing ? (
                        <div className="flex w-full gap-x-4">
                            <button type="button" onClick={handleCancel} className="flex-1 rounded-lg bg-gray-200 py-3 text-base font-bold text-gray-700">취소</button>
                            <button type="submit" className="flex-1 rounded-lg bg-black py-3 text-base font-bold text-white">저장</button>
                        </div>
                    ) : (
                        <button type="button" onClick={() => setIsEditing(true)} className="w-full rounded-lg bg-black py-3 text-base font-bold text-white">회원정보 수정하기</button>
                    )}
                </div>
            </form>

            {/* 사용자 피드백을 위한 알림 모달 */}
            <AlertModal
                isOpen={alertInfo.isOpen}
                onClose={() => setAlertInfo({ isOpen: false, title: '', message: '' })}
                title={alertInfo.title}
            >
                {alertInfo.message}
            </AlertModal>
        </>
    );
}