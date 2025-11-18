/**
 * @file 사용자에게 정보를 전달하기 위한 공통 알림 모달 컴포넌트입니다.
 *       '확인' 버튼 하나만 있으며, 클릭 시 모달이 닫힙니다.
 */

import React from 'react';

export default function AlertModal({isOpen, onClose, title, children}) {
    if (!isOpen) return null;

    return (<div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={onClose}
        >
            <div
                className="w-11/12 max-w-sm rounded-lg bg-white p-6 shadow-xl"
                onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫힘 방지
            >
                <h3 className="text-lg font-bold">{title}</h3>
                <div className="mt-2 text-sm text-gray-600">
                    {children}
                </div>
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={onClose}
                        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        확인
                    </button>
                </div>
            </div>
        </div>);
}