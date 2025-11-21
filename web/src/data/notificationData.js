/**
 * 알림 데이터
 * Notification 페이지와 공유하는 알림 목록
 */
export const initialNotifications = [
  {
    id: 1,
    type: 'safety',
    typeName: '안전단계변경',
    title: '현재 위치의 위험도가 [High]로 변경되었습니다.',
    timestamp: '2025.10.31 17:45',
    relativeTime: '15분 전',
  },
  {
    id: 2,
    type: 'safety',
    typeName: '안전단계변경',
    title: '현재 위치의 위험도가 [Extreme]로 상향 조정되었습니다.',
    timestamp: '2025.10.31 16:30',
    relativeTime: '1시간 전',
  },
  {
    id: 3,
    type: 'safety',
    typeName: '안전단계변경',
    title: '현재 위치의 위험도가 [Low]로 하향 조정되었습니다.',
    timestamp: '2025.10.30 09:00',
    relativeTime: '어제',
  },
];
