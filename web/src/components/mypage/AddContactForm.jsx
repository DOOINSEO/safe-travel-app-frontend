import React, { useState } from 'react';
import { formatPhoneNumber } from '../../utils/formatter';

/**
 * 새 연락처를 입력하고 저장하는 폼 컴포넌트입니다.
 * @param {{ onSave: (newContact: string) => void, onCancel: () => void }} props
 */
export default function AddContactForm({ onSave, onCancel }) {
    const [newContact, setNewContact] = useState('');

    /** 입력 시 숫자만 허용하고, 최대 11자리로 제한합니다. */
    const handleInputChange = (e) => {
        const numericValue = e.target.value.replace(/[^0-9]/g, '');
        if (numericValue.length <= 11) {
            setNewContact(numericValue);
        }
    };

    const handleSaveClick = () => {
        if (newContact.length < 10) {
            alert('올바른 형식의 연락처를 입력해주세요.');
            return;
        }
        onSave(newContact);
    };

    return (
        <div className="flex h-[54px] items-center justify-between rounded-lg border-2 border-dashed border-gray-400 bg-white px-5">
            <input
                type="tel"
                value={formatPhoneNumber(newContact)}
                onChange={handleInputChange}
                placeholder="010-0000-0000"
                className="flex-grow bg-transparent text-sm text-gray-800 focus:outline-none"
                autoFocus
            />
            <div className="flex gap-x-4">
                <button onClick={handleSaveClick} className="text-sm font-semibold text-blue-600">추가</button>
                <button onClick={onCancel} className="text-sm text-gray-500">취소</button>
            </div>
        </div>
    );
}