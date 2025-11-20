import React from 'react';

export default function EmergencySetupSection() {
  return (
    <section>
      <div className=" rounded-[12px] bg-[#F3F4F6] p-5">
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
