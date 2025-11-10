/**
 * @file 앱의 알림 목록을 표시하는 UI 컴포넌트입니다.
 *       [수정] 양방향 스와이프 삭제 기능과 단일화된 '안전단계변경' 카테고리를 적용했습니다.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '../components/common/PageHeader';
import { Megaphone, BellOff, Trash2 } from 'lucide-react';

// [수정 2] 모든 알림 데이터를 '안전단계변경' 단일 카테고리로 통일합니다.
// typeName은 '안전단계변경', type은 'safety'로 일원화합니다.
const initialNotifications = [
    { id: 1, type: 'safety', typeName: '안전단계변경', title: '현재 위치의 안전 단계가 [여행자제]로 변경되었습니다.', timestamp: '2025.10.31 17:45', relativeTime: '15분 전' },
    { id: 2, type: 'safety', typeName: '안전단계변경', title: '캄팔라 지역이 [특별여행주의보]로 상향 조정되었습니다.', timestamp: '2025.10.31 16:30', relativeTime: '1시간 전' },
    { id: 3, type: 'safety', typeName: '안전단계변경', title: '페루 리마 수도권의 국가비상사태가 해제되어 [여행유의]로 하향 조정되었습니다.', timestamp: '2025.10.30 09:00', relativeTime: '어제' },
];

/**
 * @description 알림 카드의 헤더 UI를 렌더링합니다.
 *              [수정 3] 카테고리가 단일화됨에 따라 분기 로직을 제거하고 UI를 고정합니다.
 */
const NotificationHeader = ({ typeName }) => {
    return (
        <div className="flex items-center gap-2">
            <Megaphone className="h-4 w-4 text-red-600" />
            <span className="text-sm font-bold text-red-600">{typeName}</span>
        </div>
    );
};

export default function Notification() {
    const [notifications, setNotifications] = useState(initialNotifications);

    const handleRemoveNotification = (id) => {
        setNotifications(prev => prev.filter(item => item.id !== id));
    };

    return (
        <div className="flex min-h-screen flex-col bg-gray-50">
            <PageHeader title="알림" backPath="/" />
            <main className="flex-1 overflow-y-auto">
                {notifications.length > 0 ? (
                    <ul className="space-y-3 p-5">
                        <AnimatePresence>
                            {notifications.map((item) => (
                                <NotificationItem
                                    key={item.id}
                                    item={item}
                                    onRemove={handleRemoveNotification}
                                />
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
function NotificationItem({ item, onRemove }) {
    const swipeConfidenceThreshold = 100; // 삭제를 위한 스와이프 거리 임계값

    return (
        <motion.li
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: item.dragDirection === 'left' ? "-100%" : "100%", transition: { duration: 0.3 } }}
            className="relative"
            // dragDirection 상태를 item에 임시로 추가하여 exit 애니메이션 방향을 제어
            custom={item}
        >
            {/* 배경: 스와이프 시 드러나는 삭제 아이콘 영역 */}
            <div className="absolute inset-0 flex items-center justify-between rounded-xl bg-red-500 px-6">
                <Trash2 className="h-6 w-6 text-white" />
                <Trash2 className="h-6 w-6 text-white" />
            </div>

            {/* 전경: 실제 알림 콘텐츠 및 스와이프 대상 */}
            <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(event, info) => {
                    // [수정 1] 스와이프 방향에 상관없이 삭제되도록 Math.abs() 사용
                    // info.offset.x의 절댓값이 임계값을 넘으면 삭제 함수를 호출합니다.
                    if (Math.abs(info.offset.x) > swipeConfidenceThreshold) {
                        // exit 애니메이션 방향 결정을 위해 드래그 방향을 임시 상태로 저장
                        item.dragDirection = info.offset.x < 0 ? 'left' : 'right';
                        onRemove(item.id);
                    }
                }}
                className="relative cursor-pointer rounded-xl bg-white p-4 shadow-sm"
            >
                <div className="flex flex-col">
                    <div className="flex items-center justify-between">
                        {/* typeName만 전달하도록 수정 */}
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