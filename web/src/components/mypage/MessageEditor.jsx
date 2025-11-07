import React from 'react';

/**
 * @description '내 정보' 페이지에서 사용될 비상 메시지 입력용 텍스트 편집기(textarea) 컴포넌트입니다.
 *              이 컴포넌트는 '제어 컴포넌트(Controlled Component)' 방식으로 동작합니다.
 *              즉, 입력창의 값을 직접 관리하지 않고, 부모 컴포넌트로부터 받은 상태(state)와
 *              상태 변경 함수(props)를 통해 값을 제어합니다. 이를 통해 데이터 흐름을 단방향으로 유지하여
 *              애플리케이션의 상태 관리를 예측 가능하고 용이하게 만듭니다.
 *
 * @param {object} props - 컴포넌트 props
 * @param {string} props.emergencyMessage - textarea에 표시될 현재 메시지 텍스트
 * @param {(message: string) => void} props.setEmergencyMessage - textarea의 내용이 변경될 때 부모의 상태를 업데이트하기 위해 호출될 함수
 *
 * @example
 * const [message, setMessage] = useState('');
 * <MessageEditor
 *   emergencyMessage={message}
 *   setEmergencyMessage={setMessage}
 * />
 */
export default function MessageEditor({ emergencyMessage, setEmergencyMessage }) {
    return (
        <section className="mt-5">
            <textarea
                value={emergencyMessage}
                onChange={(e) => setEmergencyMessage(e.target.value)}
                placeholder="내용을 입력해주세요."
                // placeholder 텍스트를 중앙에 배치하기 위해 'placeholder:text-center'를 사용합니다.
                className="h-[200px] w-full resize-none rounded-[20px] border border-black bg-white p-5 text-sm placeholder:text-center focus:border-black focus:outline-none"
            />
        </section>
    );
}