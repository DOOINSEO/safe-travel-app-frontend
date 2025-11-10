/**
 * @file 사용자에게 정보를 전달하기 위한 공통 알림 모달 컴포넌트입니다.
 *       '확인' 버튼 하나만 있으며, 클릭 시 모달이 닫힙니다.
 */

import React from 'react';

export default function AlertModal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;

    return (
        // 모달 배경 (어두운 오버레이)
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            // 배경 클릭 시 모달이 닫히지 않도록 onClick 이벤트를 제거할 수 있습니다 (사용자 액션 강제).
            // 여기서는 편의를 위해 배경 클릭 시 닫히도록 유지합니다.
            onClick={onClose}
        >
            {/* 모달 컨텐츠 */}
            <div
                className="w-11/12 max-w-sm rounded-lg bg-white p-6 shadow-xl"
                onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫힘 방지
            >
                <h3 className="text-lg font-bold">{title}</h3>
                <div className="mt-2 text-sm text-gray-600">
                    {children}
                </div>
                <div className="mt-6 flex justify-end">
                    {/* [수정] '확인' 버튼만 있도록 변경하고, 클릭 시 onClose 함수를 호출합니다. */}
                    <button
                        onClick={onClose}
                        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
}