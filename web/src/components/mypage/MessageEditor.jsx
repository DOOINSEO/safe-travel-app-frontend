import React from 'react';

/**
 * '내 정보' 페이지의 비상 메시지를 입력하고 수정하는 제어(controlled) 텍스트 편집기입니다.
 */
export default function MessageEditor({ emergencyMessage, setEmergencyMessage }) {
    return (
        <section className="mt-5">
            <textarea
                value={emergencyMessage}
                onChange={(e) => setEmergencyMessage(e.target.value)}
                placeholder="내용을 입력해주세요."
                className="h-[200px] w-full resize-none rounded-[20px] border border-black bg-white p-5 text-sm placeholder:text-center focus:border-black focus:outline-none"
            />
        </section>
    );
}