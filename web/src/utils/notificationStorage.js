// 알림 데이터 로컬스토리지 저장, 조회

const STORAGE_KEY = 'notification_history';

//상대 시간 계산 (예: "15분 전", "1시간 전", "어제")
const getRelativeTime = (date) => {
  const now = new Date();
  const diff = now - date;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return '방금 전';
  } else if (minutes < 60) {
    return `${minutes}분 전`;
  } else if (hours < 24) {
    return `${hours}시간 전`;
  } else if (days === 1) {
    return '어제';
  } else if (days < 7) {
    return `${days}일 전`;
  } else {
    return date.toLocaleDateString('ko-KR', {year: 'numeric', month: 'long', day: 'numeric'});
  }
};

// 날짜 포맷팅
const formatTimestamp = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}.${month}.${day} ${hours}:${minutes}`;
};

// 알림 저장
export const saveNotification = (notification) => {
  try {
    const now = new Date();
    const notificationWithTime = {
      ...notification,
      id: Date.now(), // 고유 ID 생성
      timestamp: formatTimestamp(now),
      relativeTime: getRelativeTime(now),
      createdAt: now.toISOString(), // 정렬을 위한 ISO 문자열
    };

    const existingNotifications = loadNotifications();
    const updatedNotifications = [notificationWithTime, ...existingNotifications];

    // 최대 100개까지만 저장
    const limitedNotifications = updatedNotifications.slice(0, 100);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(limitedNotifications));
    return {success: true, notification: notificationWithTime};
  } catch (error) {
    console.error('알림 저장 실패:', error);
    return {success: false, error: error.message};
  }
};

// 알림 조회
export const loadNotifications = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      return [];
    }

    const notifications = JSON.parse(data);

    // 상대 시간 업데이트 (불러올 때마다 갱신)
    return notifications.map((notification) => {
      if (notification.createdAt) {
        const createdAt = new Date(notification.createdAt);
        return {
          ...notification,
          relativeTime: getRelativeTime(createdAt),
        };
      }
      return notification;
    });
  } catch (error) {
    console.error('알림 불러오기 실패:', error);
    return [];
  }
};

// 알림 삭제
export const deleteNotification = (id) => {
  try {
    const notifications = loadNotifications();
    const filtered = notifications.filter((notification) => notification.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return {success: true};
  } catch (error) {
    console.error('알림 삭제 실패:', error);
    return {success: false, error: error.message};
  }
};
