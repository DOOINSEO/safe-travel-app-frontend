import { useState, useEffect } from 'react';
import { getUserProfile } from '../services/accountApi'; // 이 부분에서 에러 발생

/**
 * 특정 사용자 ID에 대한 프로필 정보를 비동기적으로 불러오는 커스텀 훅입니다.
 * 데이터, 로딩 상태, 에러 상태를 반환합니다.
 * @param {string} userId - 불러올 사용자의 ID
 */
export function useUserProfile(userId) {
    const [userProfile, setUserProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!userId) {
            setIsLoading(false);
            return;
        }

        const fetchUserData = async () => {
            try {
                const profileData = await getUserProfile(userId);
                setUserProfile(profileData);
            } catch (err) {
                console.error(`사용자(ID: ${userId}) 정보 로딩 실패:`, err);
                setError("사용자 정보를 불러오는데 실패했습니다.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    return { userProfile, isLoading, error };
}