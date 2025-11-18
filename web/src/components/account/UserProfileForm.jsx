import React, {useState, useEffect} from 'react';
import {AuthInput} from '../auth/AuthInput';
import AlertModal from '../common/AlertModal';
import {updateUserProfile} from '../../services/accountApi';
import {formatPhoneNumber} from '../../utils/formatter';

export default function UserProfileForm({initialProfile}) {
  const [isEditing, setIsEditing] = useState(false);
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [nickname, setNickname] = useState('');
  const [alarmEnabled, setAlarmEnabled] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    isOpen: false,
    title: '',
    message: '',
  });

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

  const handlePhoneChange = (e) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, '');
    if (numericValue.length <= 11) {
      setPhone(numericValue);
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dataToUpdate = {
        loginId,
        name,
        phone,
        nickname,
        alarmEnabled: String(alarmEnabled),
      };

      await updateUserProfile(initialProfile.id, dataToUpdate);
      setAlertInfo({isOpen: true, title: '성공', message: '프로필이 성공적으로 저장되었습니다.'});
      setIsEditing(false);
    } catch (error) {
      console.error('프로필 저장 실패:', error);
      setAlertInfo({isOpen: true, title: '오류', message: error.message || '저장에 실패했습니다.'});
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex w-full flex-col items-center px-[20px]">
        <div className="flex w-full flex-col items-center gap-6">
          <AuthInput
            id="loginId"
            label="아이디"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            disabled={!isEditing}
          />
          <AuthInput
            id="password"
            label="비밀번호"
            type="password"
            placeholder="********"
            value={isEditing ? password : '********'}
            onChange={(e) => setPassword(e.target.value)}
            disabled={true}
          />
          <AuthInput
            id="name"
            label="실명"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!isEditing}
          />
          <AuthInput
            id="nickname"
            label="닉네임"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            disabled={!isEditing}
          />
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
            <input
              type="checkbox"
              id="alarmEnabled"
              checked={alarmEnabled}
              onChange={(e) => setAlarmEnabled(e.target.checked)}
              disabled={!isEditing}
              className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black disabled:bg-gray-200"
            />
            <label htmlFor="alarmEnabled" className="text-sm text-gray-700">
              안전 관련 알림 수신
            </label>
          </div>
        </div>

        <div className="mt-8 w-full">
          {isEditing ? (
            <div className="flex w-full gap-x-4">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 rounded-lg bg-gray-200 py-3 text-base font-bold text-gray-700"
              >
                취소
              </button>
              <button type="submit" className="flex-1 rounded-lg bg-black py-3 text-base font-bold text-white">
                저장
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="w-full rounded-lg bg-black py-3 text-base font-bold text-white"
            >
              회원정보 수정하기
            </button>
          )}
        </div>
      </form>

      <AlertModal
        isOpen={alertInfo.isOpen}
        onClose={() => setAlertInfo({isOpen: false, title: '', message: ''})}
        title={alertInfo.title}
      >
        {alertInfo.message}
      </AlertModal>
    </>
  );
}
