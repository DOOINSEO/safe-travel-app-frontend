import React, {useState, useEffect} from 'react';
import PageHeader from '../components/common/PageHeader';
import EmergencySetupSection from '../components/mypage/EmergencySetupSection';
import MessageEditor from '../components/mypage/MessageEditor';
import ContactInput from '../components/mypage/ContactList';
import {getEmergency, createEmergency, updateEmergency, deleteEmergency} from '../services/accountApi';
import AlertModal from '../components/common/AlertModal';

export default function MyPage() {
  const [emergencyMessage, setEmergencyMessage] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [hasExistingData, setHasExistingData] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    isOpen: false,
    title: '',
    message: '',
  });

  useEffect(() => {
    const fetchEmergencyData = async () => {
      try {
        setIsInitialLoading(true);

        // DB에서 비상 연락망 데이터 조회
        const response = await getEmergency();
        const data = response?.data || response;

        if (data) {
          if (data.message || data.phone) {
            setEmergencyMessage(data.message || '');
            setEmergencyPhone(data.phone || '');
            setHasExistingData(true);
          }
        }
      } catch (error) {
        console.error('비상 연락망 조회 실패:', error);
      } finally {
        setIsInitialLoading(false);
      }
    };

    fetchEmergencyData();
  }, []);

  const handleSave = async () => {
    if (!emergencyMessage && !emergencyPhone) {
      setAlertInfo({isOpen: true, title: '알림', message: '메시지 또는 연락처를 입력해주세요.'});
      return;
    }

    try {
      setIsLoading(true);
      const data = {
        message: emergencyMessage,
        phone: emergencyPhone,
      };

      // DB에 저장
      if (hasExistingData) {
        await updateEmergency(data);
      } else {
        await createEmergency(data);
      }

      setHasExistingData(true);
      setAlertInfo({isOpen: true, title: '성공', message: '비상 연락망이 저장되었습니다.'});
    } catch (error) {
      console.error('비상 연락망 저장 실패:', error);
      setAlertInfo({isOpen: true, title: '오류', message: error.message || '저장에 실패했습니다.'});
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = async () => {
    try {
      setIsLoading(true);

      // DB에서 삭제
      await deleteEmergency();

      setEmergencyMessage('');
      setEmergencyPhone('');
      setHasExistingData(false);
      setAlertInfo({isOpen: true, title: '성공', message: '비상 연락망이 초기화되었습니다.'});
    } catch (error) {
      console.error('비상 연락망 초기화 실패:', error);
      setAlertInfo({isOpen: true, title: '오류', message: error.message || '초기화에 실패했습니다.'});
    } finally {
      setIsLoading(false);
    }
  };

  if (isInitialLoading) {
    return (
      <div className="min-h-screen bg-white">
        <PageHeader title="원클릭 문자 등록" backPath="/" />
        <div className="flex h-64 items-center justify-center">
          <p>데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <PageHeader title="원클릭 문자 등록" backPath="/" />

      <main className="flex flex-col px-[20px] pt-5">
        <EmergencySetupSection />
        <MessageEditor emergencyMessage={emergencyMessage} setEmergencyMessage={setEmergencyMessage} />
        <ContactInput phone={emergencyPhone} onPhoneChange={setEmergencyPhone} />

        <div className="mt-8 w-full">
          <div className="flex w-full gap-x-4">
            <button
              type="button"
              onClick={handleReset}
              disabled={isLoading}
              className="flex-1 rounded-lg bg-gray-200 py-3 text-base font-bold text-gray-700 disabled:opacity-50"
            >
              초기화
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isLoading}
              className="flex-1 rounded-lg bg-black py-3 text-base font-bold text-white disabled:opacity-50"
            >
              저장
            </button>
          </div>
        </div>

        <div className="h-[15px]" />
      </main>

      <AlertModal
        isOpen={alertInfo.isOpen}
        onClose={() => setAlertInfo({isOpen: false, title: '', message: ''})}
        title={alertInfo.title}
      >
        {alertInfo.message}
      </AlertModal>
    </div>
  );
}
