import React, { useState, useEffect } from 'react';
import PageHeader from '../components/common/PageHeader';
import UserProfileSection from '../components/mypage/UserProfileSection';
import EmergencySetupSection from '../components/mypage/EmergencySetupSection';
import MessageEditor from '../components/mypage/MessageEditor';
import ContactList from '../components/mypage/ContactList';
import { getUserAccountData } from '../services/accountApi';
import { useEmergencyMessage } from '../hooks/useEmergencyMessage';

/**
 * '내 정보' 페이지입니다.
 * 사용자 데이터 로딩을 책임지며, 세부 기능 로직(메시지 자동 저장 등)은 커스텀 훅에 위임합니다.
 * UI 렌더링은 각 목적에 맞게 분리된 자식 컴포넌트들을 조립하여 구성합니다.
 */
export default function MyPage() {
    const [userName, setUserName] = useState('사용자');
    const [contacts, setContacts] = useState([]);
    const [initialMessage, setInitialMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const { emergencyMessage, setEmergencyMessage } = useEmergencyMessage(initialMessage, isLoading);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const data = await getUserAccountData();
                setContacts(data.contacts);
                setInitialMessage(data.emergencyMessage);

                // TODO: 로그인 기능 구현 후, 전역 상태에서 실제 사용자 닉네임을 가져와야 합니다.
                setUserName('홍길동');
            } catch (error) {
                console.error("초기 데이터 로딩 실패:", error);
                // TODO: 사용자에게 데이터 로딩 실패를 알리는 UI(예: 토스트 메시지)를 보여주는 것이 좋습니다.
            } finally {
                setIsLoading(false);
            }
        };
        fetchInitialData();
    }, []); // 의존성 배열이 비어있어, 마운트 시 한 번만 실행됩니다.

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white">
                <PageHeader title="내 정보" backPath="/" />
                <div className="flex h-64 items-center justify-center">
                    <p>데이터를 불러오는 중입니다...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <PageHeader title="내 정보" backPath="/" />
            <UserProfileSection userName={userName} />
            <div className="border-b border-gray-200" />

            <main className="flex flex-col px-[20px] pt-5">
                <EmergencySetupSection />
                <MessageEditor
                    emergencyMessage={emergencyMessage}
                    setEmergencyMessage={setEmergencyMessage}
                />
                <ContactList
                    contacts={contacts}
                    setContacts={setContacts} // 연락처 추가/삭제 로직은 ContactList 내부에서 처리될 수 있습니다.
                />
                <div className="h-[15px]" />
            </main>
        </div>
    );
}