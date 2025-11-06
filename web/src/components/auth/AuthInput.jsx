import React from 'react';

/**
 * @description 인증 폼(로그인, 회원가입)에서 공통으로 사용되는 '레이블 + 입력창' 세트 컴포넌트입니다.
 *              일관된 디자인을 유지하고, 코드 중복을 줄이는 역할을 합니다.
 *              React.forwardRef를 사용하여 부모 컴포넌트에서 이 input 요소에 직접 접근(focus 등)할 수 있도록 설계되었습니다.
 *
 * @param {object} props - 컴포넌트 props
 * @param {string} props.id - input 요소의 고유 id. <label>의 htmlFor와 연결되어 웹 접근성을 향상시킵니다.
 * @param {string} props.label - 입력창 위에 표시될 텍스트 (예: "아이디", "비밀번호")
 * @param {any} ref - React.forwardRef를 통해 전달되는 ref 객체
 *
 * @example
 * // LogIn.jsx에서 사용하는 예시
 * <AuthInput
 *   id="username"
 *   label="아이디"
 *   type="text"
 *   placeholder="아이디 입력"
 *   value={username}
 *   onChange={(e) => setUsername(e.target.value)}
 * />
 */

export const AuthInput = React.forwardRef(({ id, label, ...props }, ref) => {
    // React.forwardRef는 부모 컴포넌트로부터 ref를 받아 자식 DOM 요소(여기서는 <input>)에 직접 전달하는 기능입니다.
    // 이를 통해 부모에서 input.focus() 같은 DOM API를 직접 호출할 수 있게 됩니다.
    // ...props 구문은 id, label을 제외한 나머지 모든 props(type, placeholder, value, onChange 등)를
    // <input> 요소에 그대로 전달하는 역할을 합니다.

    return (
        <div className="w-full">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                id={id}
                ref={ref}
                className="mt-1 block h-[48px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                // required 속성은 폼 제출 시 이 필드가 비어있으면 브라우저가 기본 경고를 표시하도록 합니다.
                required
                {...props}
            />
        </div>
    );
});