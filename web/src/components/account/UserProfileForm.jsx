import React, { useState, useEffect } from 'react';
import { AuthInput } from '../auth/AuthInput';
import AlertModal from '../common/AlertModal';
import { updateUserProfile } from '../../services/accountApi';
import { formatPhoneNumber } from '../../utils/formatter';

/**
 * 사용자 프로필을 표시하고 수정하는 폼 컴포넌트입니다.
 * '조회 모드'와 '수정 모드'를 내부적으로 관리하며, 알림은 인앱 모달을 사용합니다.
 * @param {{ initialProfile: object | null }} props
 */
export default function UserProfileForm({ initialProfile }) {
    // '조회/수정' 모드를 제어하는 상태
    const [isEditing, setIsEditing] = useState(false);

    // 폼 필드 상태
    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState(''); // 상태에는 항상 순수 숫자만 저장
    const [nickname, setNickname] = useState('');
    const [alarmEnabled, setAlarmEnabled] = useState(false);

    // 알림 모달을 제어하는 상태
    const [alertInfo, setAlertInfo] = useState({
        isOpen: false,
        title: '',
        message: '',
    });

    // 외부에서 받은 프로필 데이터가 변경되면 폼 상태를 업데이트
    useEffect(() => {
        if (initialProfile) {
            setLoginId(initialProfile.loginId ?? '');
            setName(initialProfile.name ?? '');
            setPhone(initialProfile.phone?.replace(/[^0-9]/g, '') ?? '');
            setNickname(initialProfile.nickname ?? '');
            setAlarmEnabled(initialProfile.alarmEnabled ?? false);
            setPassword('');
        }
    }, [initialProfile]);

    /** 휴대폰 번호 입력 시 숫자만 상태에 저장하는 핸들러 */
    const handlePhoneChange = (e) => {
        const numericValue = e.target.value.replace(/[^0-9]/g, '');
        if (numericValue.length <= 11) {
            setPhone(numericValue);
        }
    };

    /** '취소' 버튼 클릭 시 변경사항을 되돌리고 조회 모드로 전환 */
    const handleCancel = () => {
        if (initialProfile) {
            setLoginId(initialProfile.loginId ?? '');
            setName(initialProfile.name ?? '');
            setPhone(initialProfile.phone?.replace(/[^0-9]/g, '') ?? '');
            setNickname(initialProfile.nickname ?? '');
            setAlarmEnabled(initialProfile.alarmEnabled ?? false);
            setPassword('');
        }
        setIsEditing(false);
    };

    /** '저장' 버튼 클릭 시 API를 호출하여 정보 업데이트 */
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const dataToUpdate = { loginId, name, phone, nickname, alarmEnabled };
            if (password) {
                dataToUpdate.password = password;
            }

            await updateUserProfile(initialProfile.id, dataToUpdate);

            setAlertInfo({ isOpen: true, title: '성공', message: '프로필이 성공적으로 저장되었습니다.' });
            setIsEditing(false); // 저장 후 조회 모드로 전환
        } catch (error) {
            console.error('프로필 저장 실패:', error);
            setAlertInfo({ isOpen: true, title: '오류', message: error.message || '저장에 실패했습니다.' });
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="flex w-full flex-col items-center px-[20px]">
                <div className="flex w-full flex-col items-center gap-6">
                    <AuthInput id="loginId" label="아이디" value={loginId} onChange={(e) => setLoginId(e.target.value)} disabled={!isEditing} />
                    <AuthInput
                        id="password"
                        label="비밀번호"
                        type="password"
                        placeholder={isEditing ? '' : '********'}
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
                        value={formatPhoneNumber(phone)}
                        onChange={handlePhoneChange}
                        disabled={!isEditing}
                    />

                    <div className="flex w-full items-center gap-2">
                        <input type="checkbox" id="alarmEnabled" checked={alarmEnabled} onChange={(e) => setAlarmEnabled(e.target.checked)} disabled={!isEditing} className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black disabled:bg-gray-200" />
                        <label htmlFor="alarmEnabled" className="text-sm text-gray-700">안전 관련 알림 수신</label>
                    </div>
                </div>

                <div className="mt-8 w-full">
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