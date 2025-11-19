import {useEffect, useRef} from 'react';
import {initialNotifications} from '../data/notificationData';
import {saveNotification} from '../utils/notificationStorage';

// 10초마다 Morpheus 팝업 알림을 표시하는 커스텀 훅

export function useNotificationPopup(intervalSeconds = 10) {
  const notificationIndexRef = useRef(0);

  useEffect(() => {
    const showNotification = () => {
      const notification = initialNotifications[notificationIndexRef.current];

      if (!notification) {
        return;
      }

      // 알림을 로컬 스토리지에 저장 (실제 팝업이 뜬 시간 기록)
      saveNotification(notification);

      // Morpheus M.pop.alert 사용 가능 여부 확인
      if (typeof window !== 'undefined' && window.M && window.M.pop && window.M.pop.alert) {
        // Morpheus 경고 팝업 표시
        window.M.pop.alert({
          title: notification.typeName || '알림',
          message: notification.title,
          buttons: ['확인'],
          callback: function (index) {
            console.log('알림 확인됨:', index);
          },
        });
      } else {
        // 개발 환경에서 Morpheus가 없을 경우 콘솔 로그
        if (process.env.NODE_ENV === 'development' || import.meta.env?.MODE === 'development') {
          console.log('[개발 모드] 알림 팝업:', notification.title);
        }
      }

      // 다음 알림으로 이동 (순환)
      notificationIndexRef.current = (notificationIndexRef.current + 1) % initialNotifications.length;
    };

    // 지정된 간격(초)마다 알림 표시
    const intervalId = setInterval(showNotification, intervalSeconds * 1000);

    // 컴포넌트 언마운트 시 interval 정리
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalSeconds]);
}
