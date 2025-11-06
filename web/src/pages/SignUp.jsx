import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import { AuthInput } from '../components/auth/AuthInput';
import AuthButton from '../components/auth/AuthButton';
// API 통신을 담당하는 서비스 모듈을 import 합니다.
import { signup } from '../services/authApi';

/**
 * @description 사용자가 아이디와 비밀번호를 입력하여 회원가입할 수 있는 UI를 제공합니다.
 *              이 컴포넌트는 UI와 사용자 입력 상태 관리에 집중하며,
 *              실제 서버와의 통신은 `services/authApi.js` 파일에 위임합니다.
 *
 * @example
 * // App.jsx (라우터)에서 회원가입 경로에 이 컴포넌트를 연결합니다.
 * <Route path="/signup" element={<SignUp />} />
 */
export default function SignUp() {
    const navigate = useNavigate();

    // --- 컴포넌트 상태 정의 ---
    // 사용자의 입력, API 요청 로딩 상태, 에러 메시지를 관리합니다.
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // 비밀번호 확인을 위한 추가 상태
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * @description 아이디 입력창에서 한글 입력을 실시간으로 방지하는 핸들러 함수입니다.
     */
    const handleUsernameChange = (e) => {
        const englishOnly = e.target.value.replace(/[ㄱ-ㅎㅏ-ㅣ가-힣]/g, '');
        setUsername(englishOnly);
    };

    /**
     * @description 회원가입 버튼 클릭 시 실행되는 메인 핸들러 함수입니다.
     *              비동기로 동작하며, 프론트엔드 유효성 검사를 거친 후
     *              API 서비스(`authApi.js`)의 `signup` 함수를 호출하여 회원가입을 처리합니다.
     */
    const handleSignUp = async (e) => {
        // 폼 제출 시 페이지가 새로고침되는 기본 동작을 방지합니다.
        e.preventDefault();

        // 새로운 요청 시작 전, 이전 에러 메시지를 초기화합니다.
        setError(null);

        // --- 프론트엔드 유효성 검사 ---
        // API를 호출하기 전에, 클라이언트 단에서 먼저 간단한 검증을 수행합니다.
        // 이를 통해 불필요한 서버 요청을 줄일 수 있습니다.
        if (password !== confirmPassword) {
            setError('비밀번호가 일치하지 않습니다.');
            return; // 함수 실행을 중단합니다.
        }

        setIsLoading(true);

        try {
            // --- ⚙️ 백엔드 연동 영역 ⚙️ ---
            // 1. 분리된 API 서비스(`authApi.js`)의 signup 함수를 호출합니다.
            //    백엔드 API 명세가 변경되더라도, 이 컴포넌트가 아닌 `authApi.js` 파일만 수정하면 됩니다.
            const data = await signup({ username, password });

            // 2. 회원가입 성공 후 처리
            console.log('회원가입 성공:', data);
            alert('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.');
            navigate('/login'); // 회원가입 성공 시 로그인 페이지로 이동

        } catch (err) {
            // `authApi.js`에서 회원가입 실패 시 던진(throw) 에러를 여기서 잡아서(catch),
            // 사용자에게 보여줄 에러 메시지를 상태에 저장합니다.
            setError(err.message);
            console.error('회원가입 실패:', err);
        } finally {
            // API 요청이 성공하든 실패하든, 항상 마지막에 로딩 상태를 비활성화합니다.
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout title="회원가입하기">
            <form onSubmit={handleSignUp} className="flex w-full flex-col items-center">
                <div className="flex w-full flex-col items-center gap-6">
                    <AuthInput
                        id="username"
                        label="아이디"
                        type="text"
                        placeholder="사용할 아이디 입력"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                    <AuthInput
                        id="password"
                        label="비밀번호"
                        type="password"
                        placeholder="비밀번호 입력"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <AuthInput
                        id="confirmPassword"
                        label="비밀번호 확인"
                        type="password"
                        placeholder="비밀번호 다시 입력"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                {/* 에러 메시지를 표시하는 영역입니다. */}
                <div className="mt-4 h-5 text-center">
                    {error && <p className="text-sm text-red-600">{error}</p>}
                </div>

                {/* 회원가입 버튼입니다. API 요청 중(isLoading)일 때는 비활성화됩니다. */}
                <AuthButton text="회원가입" isLoading={isLoading} />

                {/* 버튼과 링크 사이에 15px 높이의 '투명한 공간 박스(Spacer)'를 삽입하여 확실한 간격을 만듭니다. */}
                <div className="h-[15px]" />

                {/* 로그인 페이지로 이동하는 링크입니다. */}
                <p className="text-sm text-gray-600">
                    이미 계정이 있나요?{' '}
                    <button
                        type="button"
                        onClick={() => navigate('/login')}
                        className="font-bold hover:underline"
                    >
                        로그인
                    </button>
                </p>
            </form>
        </AuthLayout>
    );
}

// 만약 services/authApi.js 파일의 이름이 authService.js 등으로 변경된다면,
// 이 파일 최상단의 import 구문만 수정해주면 됩니다.
// 예: import { signup } from '../services/authService';