// src/components/mypage/ContactList.jsx

import React, { useState } from 'react';
import { Trash2, Plus } from 'lucide-react';
import { addContact, deleteContact } from '../../services/accountApi';
import { formatPhoneNumber } from '../../utils/formatter';
import AddContactForm from './AddContactForm';
import AlertModal from '../common/AlertModal';

/**
 * 비상 연락처 목록을 관리하고 표시합니다.
 * @param {{ contacts: string[], setContacts: function }} props
 */
export default function ContactList({ contacts, setContacts }) {
    const [isAdding, setIsAdding] = useState(false);

    // AlertModal을 제어하기 위한 상태를 정의합니다.
    const [alertInfo, setAlertInfo] = useState({
        isOpen: false,
        title: '',
        message: '',
    });

    /** 연락처를 삭제하고, 실패 시 알림 모달을 띄웁니다. */
    const handleDelete = async (contactToRemove) => {
        try {
            await deleteContact(contactToRemove);
            setContacts(prev => prev.filter(contact => contact !== contactToRemove));
        } catch (error) {
            console.error("연락처 삭제 실패:", error);
            setAlertInfo({
                isOpen: true,
                title: '오류',
                message: error.message || '연락처 삭제에 실패했습니다.',
            });
        }
    };

    /** 새 연락처를 저장하고, 실패 시 알림 모달을 띄웁니다. */
    const handleSave = async (newContact) => {
        try {
            const formattedContact = formatPhoneNumber(newContact);
            await addContact(formattedContact);
            setContacts(prev => [...prev, formattedContact]);
            setIsAdding(false);
        } catch (error) {
            console.error("연락처 추가 실패:", error);
            setAlertInfo({
                isOpen: true,
                title: '오류',
                message: error.message || '연락처 추가에 실패했습니다.',
            });
        }
    };

    const closeAlert = () => {
        setAlertInfo({ isOpen: false, title: '', message: '' });
    };

    return (
        <>
            <section className="mt-5 flex flex-col gap-y-[10px]">
                {contacts.map((contact, index) => (
                    <div key={index} className="flex h-[54px] items-center justify-between rounded-lg border border-black bg-white px-5">
                        <span className="text-sm text-gray-800">{contact}</span>
                        <button onClick={() => handleDelete(contact)} aria-label={`${contact} 연락처 삭제`}>
                            <Trash2 className="h-5 w-5 text-gray-400 hover:text-red-500" />
                        </button>
                    </div>
                ))}
            </section>

            <section className="mt-4">
                {isAdding ? (
                    <AddContactForm onSave={handleSave} onCancel={() => setIsAdding(false)} />
                ) : (
                    <button onClick={() => setIsAdding(true)} className="flex h-[54px] w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 text-sm text-gray-600 hover:bg-gray-50">
                        <Plus className="h-5 w-5" />
                        연락처 추가하기
                    </button>
                )}
            </section>

            <AlertModal
                isOpen={alertInfo.isOpen}
                onClose={closeAlert}
                title={alertInfo.title}
            >
                {alertInfo.message}
            </AlertModal>
        </>
    );
}