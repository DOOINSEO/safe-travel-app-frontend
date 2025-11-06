import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import { AuthInput } from '../components/auth/AuthInput';
import AuthButton from '../components/auth/AuthButton';
// API 통신을 담당하는 서비스 모듈을 import 합니다.
import { login } from '../services/authApi';

/**
 * @description 사용자가 아이디와 비밀번호를 입력하여 로그인할 수 있는 UI를 제공합니다.
 *              이 컴포넌트는 오직 UI와 사용자 입력 상태 관리에만 집중하며,
 *              실제 서버와의 통신은 `services/authApi.js` 파일에 위임합니다.
 *              이를 통해 UI 로직과 비즈니스 로직이 명확하게 분리됩니다.
 *
 */

export default function LogIn() {
    const navigate = useNavigate();

    // --- 컴포넌트 상태 정의 ---
    // 사용자의 입력, API 요청 로딩 상태, 서버로부터 받은 에러 메시지를 관리합니다.
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * @description 아이디 입력창에서 한글 입력을 실시간으로 방지하는 핸들러 함수입니다.
     *              사용자 경험(UX)을 개선하고 불필요한 유효성 검사 오류를 줄입니다.
     */

    const handleUsernameChange = (e) => {
        const englishOnly = e.target.value.replace(/[ㄱ-ㅎㅏ-ㅣ가-힣]/g, '');
        setUsername(englishOnly);
    };

    /**
     * @description 로그인 버튼 클릭 시 실행되는 메인 핸들러 함수입니다.
     *              비동기로 동작하며, `authApi.js`의 `login` 함수를 호출하여 로그인을 처리합니다.
     */

    const handleLogin = async (e) => {
        // form 태그의 기본 동작(페이지 새로고침)을 막습니다.
        e.preventDefault();

        // API 요청 시작 전, 로딩 상태를 활성화하고 이전 에러 메시지를 초기화합니다.
        setIsLoading(true);
        setError(null);

        try {
            // --- ⚙️ 백엔드 연동 핵심 영역 ⚙️ ---
            // 1. 분리된 API 서비스(`authApi.js`)의 login 함수를 호출합니다.
            //    이 컴포넌트는 login 함수가 내부적으로 어떻게 동작하는지(fetch, axios 등) 알 필요가 없습니다.
            const userData = await login(username, password);

            // 2. 만약 백엔드 API 명세(엔드포인트, DB 컬럼명 등)가 변경되면,
            //    이 컴포넌트는 수정할 필요 없이 `services/authApi.js` 파일만 수정하면 됩니다.
            //    예를 들어, 백엔드가 'user_name'을 'nickname'으로 바꿔도 이 파일은 안전합니다.

            console.log('로그인 성공! 사용자 정보:', userData);
            // TODO: 로그인 성공 후, 받은 사용자 정보(userData)를 전역 상태(Context, Redux 등)에 저장하는 로직이 필요할 수 있습니다.

            navigate('/'); // 로그인 성공 시 메인 페이지로 이동

        } catch (err) {
            // `authApi.js`에서 로그인 실패 시 던진(throw) 에러를 여기서 잡아서(catch),
            // 사용자에게 보여줄 에러 메시지를 상태에 저장합니다.
            setError(err.message);
            console.error('로그인 실패:', err);
        } finally {
            // API 요청이 성공하든 실패하든, 항상 마지막에 로딩 상태를 비활성화합니다.
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout title="로그인하기">
            <form onSubmit={handleLogin} className="flex w-full flex-col items-center">
                <div className="flex w-full flex-col items-center gap-6">
                    <AuthInput
                        id="username"
                        label="아이디"
                        type="text"
                        placeholder="아이디 입력"
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
                </div>

                {/* 에러 메시지를 표시하는 영역입니다. 메시지가 없을 때도 고정 높이를 차지하여 UI 레이아웃이 밀리는 현상을 방지합니다. */}
                <div className="mt-4 h-5 text-center">
                    {error && <p className="text-sm text-red-600">{error}</p>}
                </div>

                {/* 로그인 버튼입니다. API 요청 중(isLoading)일 때는 비활성화됩니다. */}
                <AuthButton text="로그인" isLoading={isLoading} />

                {/* 버튼과 링크 사이에 15px 높이의 '투명한 공간 박스(Spacer)'를 삽입하여 확실한 간격을 만듭니다. */}
                <div className="h-[15px]" />

                {/* 회원가입 페이지로 이동하는 링크입니다. '회원가입하기' 부분만 클릭 가능하도록 구현했습니다. */}
                <p className="text-sm text-gray-600">
                    계정이 없다면{' '}
                    <button
                        type="button"
                        onClick={() => navigate('/signup')}
                        className="font-bold hover:underline"
                    >
                        회원가입하기
                    </button>
                </p>
            </form>
        </AuthLayout>
    );
}

// 만약 services/authApi.js 파일의 이름이 authService.js 등으로 변경된다면,
// 이 파일 최상단의 import 구문만 수정해주면 됩니다.
// 예: import { login } from '../services/authService';