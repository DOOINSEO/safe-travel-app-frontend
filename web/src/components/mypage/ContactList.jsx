import React, { useState } from 'react';
import { Trash2, Plus } from 'lucide-react';
import { addContact, deleteContact } from '../../services/accountApi';
// 유틸리티 함수를 import 합니다.
import { formatPhoneNumber } from '../../utils/formatter';

/**
 * @description '내 정보' 페이지에서 비상 연락처 목록을 표시하고, 추가/삭제하는 UI와 로직을 모두 담당하는 컴포넌트입니다.
 *              내부적으로 '추가 모드' 상태를 관리하여, 동적으로 입력 UI를 보여줍니다.
 * @param {object} props - 컴포넌트 props
 * @param {string[]} props.contacts - 화면에 표시될 연락처 문자열 배열
 * @param {React.Dispatch<React.SetStateAction<string[]>>} props.setContacts - 부모 컴포넌트(MyPage.jsx)의 연락처 상태를 업데이트하는 함수
 */
export default function ContactList({ contacts, setContacts }) {
    // --- 컴포넌트 내부 상태 ---
    const [isAddingContact, setIsAddingContact] = useState(false); // '연락처 추가' UI의 노출 여부
    const [newContact, setNewContact] = useState(''); // 새로 추가할 연락처의 숫자 값

    // --- 이벤트 핸들러 함수들 ---

    /**
     * @description 특정 연락처를 삭제합니다. API를 호출하고 성공 시 화면 상태를 업데이트합니다.
     */
    const handleDeleteContact = async (contactToRemove) => {
        try {
            // --- ⚙️ 백엔드 연동: 연락처 삭제 ⚙️ ---
            // TODO: 백엔드 API가 하이픈 없는 순수 숫자 형식을 요구한다면, 여기서 변환 후 전송해야 합니다.
            // 예: await deleteContact(contactToRemove.replace(/-/g, ''));
            await deleteContact(contactToRemove);
            setContacts(prevContacts => prevContacts.filter(contact => contact !== contactToRemove));
        } catch (error) {
            console.error("연락처 삭제 중 에러 발생:", error);
            alert('연락처 삭제에 실패했습니다.');
        }
    };

    /**
     * @description 새로 입력된 연락처를 저장합니다. API를 호출하고 성공 시 화면 상태를 업데이트합니다.
     */
    const handleSaveNewContact = async () => {
        const formattedContact = formatPhoneNumber(newContact);
        if (formattedContact.length < 12) {
            alert('올바른 형식의 연락처를 입력해주세요.');
            return;
        }
        try {
            // --- ⚙️ 백엔드 연동: 연락처 추가 ⚙️ ---
            // TODO: 백엔드 API가 순수 숫자 형식을 요구한다면, 여기서 변환 후 전송해야 합니다.
            // 예: await addContact(newContact); // 하이픈 없는 숫자 문자열 전송
            await addContact(formattedContact); // 현재는 하이픈 포함된 문자열 전송
            setContacts(prevContacts => [...prevContacts, formattedContact]);
            setIsAddingContact(false);
            setNewContact('');
        } catch (error) {
            console.error("연락처 추가 중 에러 발생:", error);
            alert('연락처 추가에 실패했습니다.');
        }
    };

    /**
     * @description 연락처 입력창의 내용이 변경될 때 호출됩니다. 숫자만 입력받도록 처리합니다.
     */
    const handleNewContactChange = (e) => {
        const numericValue = e.target.value.replace(/[^0-9]/g, '');
        if (numericValue.length <= 11) {
            setNewContact(numericValue);
        }
    };

    // '연락처 추가' UI를 토글하는 간단한 핸들러 함수들
    const handleAddClick = () => setIsAddingContact(true);
    const handleCancelAdd = () => { setIsAddingContact(false); setNewContact(''); };

    return (
        <>
            {/* 등록된 연락처 목록을 렌더링하는 섹션 */}
            <section className="mt-5 flex flex-col gap-y-[10px]">
                {contacts.map((contact, index) => (
                    <div key={index} className="flex h-[54px] items-center justify-between rounded-lg border border-black bg-white px-5">
                        <span className="text-sm text-gray-800">{contact}</span>
                        <button onClick={() => handleDeleteContact(contact)} aria-label={`${contact} 연락처 삭제`}>
                            <Trash2 className="h-5 w-5 text-gray-400 hover:text-red-500" />
                        </button>
                    </div>
                ))}
            </section>

            {/* '연락처 추가하기' UI를 렌더링하는 섹션 */}
            <section className="mt-4">
                {isAddingContact ? (
                    // '추가 모드'일 때 보여줄 입력 폼
                    <div className="flex h-[54px] items-center justify-between rounded-lg border-2 border-dashed border-gray-400 bg-white px-5">
                        <input
                            type="tel" // 모바일에서 숫자 키패드가 나타나도록 tel 타입 사용
                            value={formatPhoneNumber(newContact)} // 화면에는 하이픈이 포함된 형식을 보여줌
                            onChange={handleNewContactChange} // 실제 값 변경은 숫자만 처리
                            placeholder="010-0000-0000"
                            className="flex-grow bg-transparent text-sm text-gray-800 focus:outline-none"
                            autoFocus // 폼이 나타날 때 자동으로 포커스
                        />
                        <div className="flex gap-x-4">
                            <button onClick={handleSaveNewContact} className="text-sm font-semibold text-blue-600">추가</button>
                            <button onClick={handleCancelAdd} className="text-sm text-gray-500">취소</button>
                        </div>
                    </div>
                ) : (
                    // 기본 상태에서 보여줄 '연락처 추가하기' 버튼
                    <button onClick={handleAddClick} className="flex h-[54px] w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 text-sm text-gray-600 hover:bg-gray-50">
                        <Plus className="h-5 w-5" />
                        연락처 추가하기
                    </button>
                )}
            </section>
        </>
    );
}