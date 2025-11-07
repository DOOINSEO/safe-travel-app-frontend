import React from 'react';

/**
 * @description 중요한 작업을 수행하기 전, 사용자에게 재확인받는 공통 모달 컴포넌트입니다.
 * @param {object} props
 * @param {boolean} props.isOpen - 모달의 노출 여부
 * @param {() => void} props.onClose - '취소' 또는 배경 클릭 시 호출될 함수
 * @param {() => void} props.onConfirm - '확인' 버튼 클릭 시 호출될 함수
 * @param {string} props.title - 모달의 제목
 * @param {React.ReactNode} props.children - 모달의 본문 내용
 */
export default function ConfirmModal({ isOpen, onClose, onConfirm, title, children }) {
    if (!isOpen) return null;

    return (
        // 모달 배경 (어두운 오버레이)
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={onClose} // 배경 클릭 시 모달 닫기
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
                <div className="mt-6 flex justify-end gap-x-4">
                    <button
                        onClick={onClose}
                        className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                    >
                        취소
                    </button>
                    <button
                        onClick={onConfirm}
                        className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                    >
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
}