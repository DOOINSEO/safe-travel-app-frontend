/**
 * @file 앱의 알림 목록을 표시하는 UI 컴포넌트입니다.
 */

import React, {useState, useEffect} from 'react';
// eslint-disable-next-line no-unused-vars
import {motion, AnimatePresence} from 'framer-motion'; // ESLint 오류 해결을 위한 주석 추가
import PageHeader from '../components/common/PageHeader';
import {Megaphone, BellOff, Trash2} from 'lucide-react';
import {loadNotifications, deleteNotification} from '../utils/notificationStorage';

const NotificationHeader = ({typeName}) => {
  return (
    <div className="flex items-center gap-2">
      <Megaphone className="h-4 w-4 text-red-600" />
      <span className="text-sm font-bold text-red-600">{typeName}</span>
    </div>
  );
};

export default function Notification() {
  const [notifications, setNotifications] = useState([]);

  // 로컬 스토리지에서 알림 불러오기
  useEffect(() => {
    const savedNotifications = loadNotifications();
    setNotifications(savedNotifications);
  }, []);

  // 다른 탭/창에서 알림이 추가될 수 있으므로 주기적으로 확인
  useEffect(() => {
    const handleStorageChange = () => {
      const savedNotifications = loadNotifications();
      setNotifications(savedNotifications);
    };

    // storage 이벤트는 다른 탭에서만 발생하므로, 주기적으로 확인
    const intervalId = setInterval(() => {
      handleStorageChange();
    }, 1000); // 1초마다 확인

    // 페이지 포커스 시에도 확인
    window.addEventListener('focus', handleStorageChange);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('focus', handleStorageChange);
    };
  }, []);

  const handleRemoveNotification = (id) => {
    deleteNotification(id);
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <PageHeader title="알림" backPath="/" />
      <main className="flex-1 overflow-y-auto">
        {notifications.length > 0 ? (
          <ul className="space-y-3 p-5">
            <AnimatePresence>
              {notifications.map((item) => (
                <NotificationItem key={item.id} item={item} onRemove={handleRemoveNotification} />
              ))}
            </AnimatePresence>
          </ul>
        ) : (
          <div className="flex flex-col items-center pt-32 text-center">
            <BellOff className="h-12 w-12 text-gray-300" />
            <p className="mt-4 text-base font-medium text-gray-500">수신된 알림 내역이 없습니다.</p>
          </div>
        )}
      </main>
    </div>
  );
}

// 개별 알림 아이템 UI 및 스와이프 제스처를 처리합니다.
function NotificationItem({item, onRemove}) {
  const swipeConfidenceThreshold = 100;

  const [dragDirection, setDragDirection] = useState(null);

  return (
    <motion.li
      layout
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      exit={{
        opacity: 0,
        x: dragDirection === 'left' ? '-100%' : '100%',
        transition: {duration: 0.3},
      }}
      className="relative"
    >
      <div className="absolute inset-0 flex items-center justify-between rounded-xl bg-red-500 px-6">
        <Trash2 className="h-6 w-6 text-white" />
        <Trash2 className="h-6 w-6 text-white" />
      </div>

      <motion.div
        drag="x"
        dragConstraints={{left: 0, right: 0}}
        onDragEnd={(event, info) => {
          if (Math.abs(info.offset.x) > swipeConfidenceThreshold) {
            const direction = info.offset.x < 0 ? 'left' : 'right';
            setDragDirection(direction);
            onRemove(item.id);
          }
        }}
        className="relative cursor-pointer rounded-xl bg-white p-4 shadow-sm"
      >
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <NotificationHeader typeName={item.typeName} />
            <span className="text-xs text-gray-500">{item.relativeTime}</span>
          </div>
          <p className="my-3 text-sm text-gray-800 leading-relaxed">{item.title}</p>
          <span className="self-start text-xs text-gray-400">{item.timestamp}</span>
        </div>
      </motion.div>
    </motion.li>
  );
}
