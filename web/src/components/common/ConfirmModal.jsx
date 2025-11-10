import React from 'react';
import { createPortal } from 'react-dom'; // React Portals import

/**
 * 사용자에게 중요한 작업을 재확인받기 위한 공통 모달입니다.
 */
export default function ConfirmModal({
                                         isOpen,
                                         onClose,
                                         onConfirm,
                                         title,
                                         children,
                                         intent = 'destructive',
                                         confirmText = '확인',
                                         cancelText = '취소',
                                     }) {
    if (!isOpen) return null;

    const confirmButtonClasses = intent === 'destructive'
        ? 'bg-red-600 hover:bg-red-700'
        : 'bg-blue-600 hover:bg-blue-700'; // 프로젝트의 기본 Primary 색상으로 변경 가능

    const modalContent = (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={onClose}
        >
            <div
                className="w-11/12 max-w-sm rounded-lg bg-white p-6 shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className="text-lg font-bold">{title}</h3>
                <div className="mt-2 text-sm text-gray-600">{children}</div>
                <div className="mt-6 flex justify-end gap-x-4">
                    <button
                        onClick={onClose}
                        className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`rounded-md px-4 py-2 text-sm font-medium text-white ${confirmButtonClasses}`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}