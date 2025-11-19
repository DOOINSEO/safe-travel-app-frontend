import React, {useState} from 'react';
import {sendEmergencySMS} from '../../utils/smsService';
import AlertModal from './AlertModal';
import OneClickBtn from '../../assets/icons/OneClickBtn.svg';

export default function EmergencyButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    isOpen: false,
    title: '',
    message: '',
  });

  const handleClick = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      const result = await sendEmergencySMS();

      if (result.success) {
      } else {
        setAlertInfo({
          isOpen: true,
          title: '오류',
          message: result.error || '메시지 앱을 열 수 없습니다.',
        });
      }
    } catch (error) {
      console.error('비상 버튼 클릭 오류:', error);
      setAlertInfo({
        isOpen: true,
        title: '오류',
        message: error.message || '알 수 없는 오류가 발생했습니다.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        disabled={isLoading}
        className="cursor-pointer transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="비상 메시지 전송"
        title="비상 메시지 전송"
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
          </div>
        ) : (
          <img src={OneClickBtn} alt="원클릭 비상 버튼" className="w-auto h-auto" />
        )}
      </button>

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
