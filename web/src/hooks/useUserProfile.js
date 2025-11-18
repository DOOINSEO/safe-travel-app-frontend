import { useState, useEffect } from 'react';
import { getUserProfile } from '../services/accountApi';

export function useUserProfile(userId) {
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const targetUserId = userId || localStorage.getItem('userId');
      
      if (!targetUserId) {
        setIsLoading(false);
        setError('사용자 ID가 없습니다.');
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const response = await getUserProfile(targetUserId);
        
        // API 응답 구조: {message, data: {...}, isSuccess}
        const data = response?.data || response;
        setUserProfile(data);
      } catch (err) {
        console.error('사용자 정보 로딩 실패:', err);
        setError(err.message || '사용자 정보를 불러오는데 실패했습니다.');
        setUserProfile(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  return { userProfile, isLoading, error };
}