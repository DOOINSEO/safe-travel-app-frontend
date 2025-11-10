import { useState, useEffect } from 'react';
import { useDebounce } from './useDebounce';
import { saveEmergencyMessage } from '../services/accountApi';

/**
 * 긴급 메시지의 상태 관리 및 자동 저장 로직을 처리하는 커스텀 훅입니다.
 * @param {string} initialMessage - 서버에서 받아온 초기 메시지
 * @param {boolean} isParentLoading - 부모 컴포넌트의 데이터 로딩 상태
 */
export function useEmergencyMessage(initialMessage, isParentLoading) {
    const [message, setMessage] = useState('');
    const debouncedMessage = useDebounce(message, 1000);

    // 부모의 데이터 로딩이 끝나면 초기 메시지를 설정합니다.
    useEffect(() => {
        if (!isParentLoading) {
            setMessage(initialMessage);
        }
    }, [initialMessage, isParentLoading]);

    // 디바운스된 메시지가 변경될 때마다 자동으로 서버에 저장합니다.
    useEffect(() => {
        // 초기 로딩 중이거나, 메시지가 초기값과 같거나, 비어있으면 저장하지 않습니다.
        if (isParentLoading || debouncedMessage === initialMessage || !debouncedMessage) {
            return;
        }

        const save = async () => {
            try {
                await saveEmergencyMessage(debouncedMessage);
                console.log('메시지가 성공적으로 자동 저장되었습니다.');
            } catch (error) {
                console.error("메시지 자동 저장 실패:", error);
            }
        };
        save();
    }, [debouncedMessage, initialMessage, isParentLoading]);

    return { emergencyMessage: message, setEmergencyMessage: setMessage };
}