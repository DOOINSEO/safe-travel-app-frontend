import React from 'react';
import { createPortal } from 'react-dom'; // React Portals import

/**
 * 사용자에게 중요한 작업을 재확인받기 위한 공통 모달입니다.
 * React Portal을 사용하여 접근성을 향상시켰습니다.
 * @param {object} props
 * @param {boolean} props.isOpen
 * @param {function(): void} props.onClose
 * @param {function(): void} props.onConfirm
 * @param {string} props.title
 * @param {React.ReactNode} props.children
 * @param {'destructive' | 'default'} [props.intent='destructive'] - '확인' 버튼의 의도 (destructive: 빨간색, default: 파란색 등)
 * @param {string} [props.confirmText='확인'] - '확인' 버튼의 텍스트
 * @param {string} [props.cancelText='취소'] - '취소' 버튼의 텍스트
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

    // 버튼의 'intent'에 따라 다른 스타일을 적용합니다.
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

    // React Portal을 사용하여 모달을 DOM 트리의 최상단(document.body)에 렌더링합니다.
    // 이는 z-index 문제와 스크린 리더의 포커스 관리에 매우 유리합니다.
    return createPortal(modalContent, document.body);
}