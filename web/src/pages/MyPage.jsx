import React, { useState, useEffect } from 'react';
import PageHeader from '../components/common/PageHeader';
// 역할에 따라 분리된 하위 UI 컴포넌트들을 import 합니다.
import UserProfileSection from '../components/mypage/UserProfileSection';
import EmergencySetupSection from '../components/mypage/EmergencySetupSection';
import MessageEditor from '../components/mypage/MessageEditor';
import ContactList from '../components/mypage/ContactList';
// 서버 통신을 담당하는 API 서비스와 성능 최적화를 위한 커스텀 훅을 import 합니다.
import { getUserAccountData, saveEmergencyMessage } from '../services/accountApi';
import { useDebounce } from '../hooks/useDebounce';

/**
 * @description '내 정보' 페이지의 메인 컨테이너 컴포넌트입니다.
 *              이 컴포넌트의 주요 책임은 다음과 같습니다:
 *              1. API 서비스를 통해 서버로부터 사용자 데이터를 가져오고 관리합니다.
 *              2. 관리하는 상태(state)와 상태 변경 함수를 각각의 하위 컴포넌트에 props로 전달합니다.
 *              3. 하위 컴포넌트들을 조합하여 전체 페이지의 레이아웃을 구성합니다.
 *
 * @example
 * // App.jsx (라우터)에서 사용
 * <Route path="/mypage" element={<MyPage />} />
 */
export default function MyPage() {
    // --- 컴포넌트 상태 정의 ---
    const [userName, setUserName] = useState('사용자');
    const [emergencyMessage, setEmergencyMessage] = useState('');
    const [contacts, setContacts] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // 초기 데이터 로딩 상태

    // --- 커스텀 훅 사용: 메시지 자동 저장을 위한 디바운싱 ---
    // 사용자가 'emergencyMessage'를 입력할 때마다 바로 API를 호출하지 않고,
    // 타이핑을 멈춘 후 1초(1000ms)가 지나면 'debouncedMessage'가 업데이트됩니다.
    // 이를 통해 불필요한 서버 요청을 최소화하여 성능을 최적화합니다.
    const debouncedMessage = useDebounce(emergencyMessage, 1000);

    // --- 데이터 로딩 및 자동 저장 로직 (useEffect) ---

    // 1. 페이지가 처음 로드될 때, 서버에서 사용자 관련 데이터를 가져옵니다.
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                // --- ⚙️ 백엔드 연동: 초기 데이터 로딩 ⚙️ ---
                // 'services/accountApi.js'에 정의된 함수를 호출합니다.
                // 백엔드 API 명세가 변경되면, 이 컴포넌트가 아닌 `accountApi.js` 파일만 수정하면 됩니다.
                const data = await getUserAccountData();

                // 가져온 데이터로 컴포넌트 상태를 업데이트합니다.
                setContacts(data.contacts);
                setEmergencyMessage(data.emergencyMessage);

                // --- ⚙️ 백엔드 연동: 사용자 닉네임 ⚙️ ---
                // TODO: 현재는 '홍길동'으로 하드코딩되어 있습니다.
                //       로그인 기능 구현 후, 전역 상태(Context, Zustand 등)에 저장된
                //       실제 사용자 닉네임 정보를 가져와 `setUserName`으로 설정해야 합니다.
                setUserName('홍길동');

            } catch (error) {
            console.error("초기 데이터를 불러오는 중 에러 발생:", error);
        } finally {
            setIsLoading(false);
        }
    };
    fetchInitialData();
}, []); // 의존성 배열이 비어있으므로, 이 effect는 컴포넌트가 처음 마운트될 때 단 한 번만 실행됩니다.

// 2. 디바운싱된 메시지(debouncedMessage)가 변경될 때마다 자동으로 서버에 저장합니다.
useEffect(() => {
    // 초기 데이터 로딩 중이거나, 메시지가 비어있으면 저장 로직을 실행하지 않습니다.
    if (isLoading || !debouncedMessage) return;

    const saveMessage = async () => {
        try {
            // --- ⚙️ 백엔드 연동: 메시지 자동 저장 ⚙️ ---
            // TODO: (미래의 작업) 현재는 메시지만 저장하고 있습니다.
            //       기획에 따라 '위치 정보'를 가져오는 로직을 추가하고,
            //       `saveEmergencyMessage` 함수에 두 번째 인자로 위치 정보를 전달해야 합니다.
            await saveEmergencyMessage(debouncedMessage);
            console.log('메시지가 성공적으로 자동 저장되었습니다.');
        } catch (error) {
            console.error("메시지 자동 저장 중 에러 발생:", error);
        }
    };
    saveMessage();
}, [debouncedMessage, isLoading]); // `debouncedMessage`가 변경될 때마다 이 effect가 실행됩니다.

// --- 렌더링 로직 ---

// 초기 데이터 로딩 중일 때 보여줄 UI
if (isLoading) {
    return (
        <div className="min-h-screen bg-white">
            <PageHeader title="내 정보" backPath="/" />
            <div className="flex h-64 items-center justify-center"><p>데이터를 불러오는 중입니다...</p></div>
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

            {/*
                  MessageEditor 컴포넌트에 현재 메시지 값(state)과
                  그 값을 변경할 수 있는 함수(setState)를 props로 전달합니다. (상태 끌어올리기)
                */}
            <MessageEditor
                emergencyMessage={emergencyMessage}
                setEmergencyMessage={setEmergencyMessage}
            />

            {/*
                  ContactList 컴포넌트에 현재 연락처 목록(state)과
                  목록을 변경할 수 있는 함수(setState)를 props로 전달합니다.
                */}
            <ContactList
                contacts={contacts}
                setContacts={setContacts}
            />

            <div className="h-[15px]" />
        </main>
    </div>
);
}

// --- 훅(Hook) 제거에 대한 안내 ---
// `useDebounce` 훅은 자동 저장 기능의 성능 최적화를 위해 사용됩니다.
// 만약 이 기능이 필요 없다면, 아래 3가지 부분을 제거해도 UI는 정상적으로 렌더링됩니다.
// 1. `import { useDebounce } from '../hooks/useDebounce';`
// 2. `const debouncedMessage = useDebounce(emergencyMessage, 1000);`
// 3. 메시지 자동 저장을 위한 두 번째 `useEffect` 블록 전체
// (단, 이 경우 메시지가 입력될 때마다 서버에 요청을 보내게 되므로 주의가 필요합니다.)