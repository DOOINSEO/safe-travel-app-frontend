import React from 'react';

/**
 * @description '내 정보' 페이지에서 '비상 연락 자동 저장 설정'에 대한 안내 문구를 표시하는 정적 UI 컴포넌트입니다.
 *              이 컴포넌트는 제목과 회색 배경의 설명 박스로 구성되어 있으며, 별도의 상태나 로직을 갖지 않습니다.
 *              UI의 일부를 의미 있는 단위로 분리하여 코드 가독성을 높이는 역할을 합니다.
 *
 * @example
 * // MyPage.jsx에서 사용하는 예시
 * <main>
 *   <EmergencySetupSection />
 *   { ... 다른 섹션들 ... }
* </main>
*/
export default function EmergencySetupSection() {
    return (
        <section className="mt-5">
            <h3 className="text-base font-bold text-gray-800">비상 연락 자동 저장 설정</h3>

            {/* Figma 디자인에 맞춘 회색 설명 박스 */}
            <div className="mt-2 rounded-[20px] bg-[#F3F4F6] p-5">
                <div className="text-sm leading-relaxed text-black">
                    <p>원클릭 버튼을 누르면, 등록된 연락처로 설정한 메시지와 현재 위치 정보가 자동으로 전송됩니다.</p>
                    <p>전송할 연락처와 메시지를 입력해주세요.</p>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-gray-500">
                    위치 정보는 자동으로 포함되며, 등록된 내용은 언제든 수정할 수 있습니다.
                </p>
            </div>
        </section>
    );
}