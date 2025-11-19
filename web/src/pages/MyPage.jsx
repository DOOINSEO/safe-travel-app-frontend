import React, {useState, useEffect} from 'react';
import PageHeader from '../components/common/PageHeader';
import UserProfileSection from '../components/mypage/UserProfileSection';
import EmergencySetupSection from '../components/mypage/EmergencySetupSection';
import MessageEditor from '../components/mypage/MessageEditor';
import ContactInput from '../components/mypage/ContactList';
import {getEmergency, createEmergency, updateEmergency, deleteEmergency} from '../services/accountApi';
import AlertModal from '../components/common/AlertModal';
import {saveEmergencyData, loadEmergencyData, clearEmergencyData} from '../utils/emergencyStorage';

export default function MyPage() {
  const [nickname, setNickname] = useState('');
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

        // 먼저 로컬 스토리지에서 불러오기
        const localData = loadEmergencyData();
        if (localData) {
          setEmergencyMessage(localData.message || '');
          setEmergencyPhone(localData.phone || '');
        }

        // 백엔드에서도 불러오기 (백엔드 연동 유지)
        try {
          const response = await getEmergency();
          const data = response?.data || response;

          if (data) {
            setNickname(data.nickname || '');
            // 백엔드 데이터가 있으면 우선 사용하고, 로컬에도 저장
            if (data.message || data.phone) {
              setEmergencyMessage(data.message || '');
              setEmergencyPhone(data.phone || '');
              saveEmergencyData(data.phone || '', data.message || '');
              setHasExistingData(true);
            } else if (localData && (localData.message || localData.phone)) {
              setHasExistingData(true);
            }
          }
        } catch (apiError) {
          console.error('비상 연락망 API 조회 실패:', apiError);
          // API 실패 시 로컬 데이터만 사용
          if (localData && (localData.message || localData.phone)) {
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

      // 로컬 스토리지에 저장
      const localSaveResult = saveEmergencyData(emergencyPhone, emergencyMessage);
      if (!localSaveResult.success) {
        console.error('로컬 스토리지 저장 실패:', localSaveResult.error);
      }

      // 백엔드에도 저장 (백엔드 연동 유지)
      try {
        if (hasExistingData) {
          await updateEmergency(data);
        } else {
          await createEmergency(data);
        }
      } catch (apiError) {
        console.error('백엔드 저장 실패:', apiError);
        // 백엔드 저장 실패해도 로컬에는 저장되었으므로 성공으로 처리
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

      // 로컬 스토리지에서 삭제
      clearEmergencyData();

      // 백엔드에서도 삭제 (백엔드 연동 유지)
      try {
        await deleteEmergency();
      } catch (apiError) {
        console.error('백엔드 삭제 실패:', apiError);
        // 백엔드 삭제 실패해도 로컬은 삭제되었으므로 계속 진행
      }

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
        <PageHeader title="내 정보" backPath="/" />
        <div className="flex h-64 items-center justify-center">
          <p>데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <PageHeader title="내 정보" backPath="/" />
      <UserProfileSection userName={nickname || '사용자'} />
      <div className="border-b border-gray-200" />

      <main className="flex flex-col px-[20px] pt-5 pb-8">
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
