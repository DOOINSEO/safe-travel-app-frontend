import React, {useState, useEffect } from 'react';
import PageHeader from '../components/common/PageHeader';
import UserProfileForm from '../components/account/UserProfileForm';
import PasswordChangeForm from '../components/account/PasswordChangeForm';
import AccountActions from '../components/account/AccountActions';
import { getUserProfile } from '../services/accountApi';

/**
 * @description 사용자 계정 정보를 관리하는 메인 페이지 컴포넌트입니다.
 *              이 컴포넌트는 페이지의 전체적인 구조와 데이터 로딩을 담당하며,
 *              각 기능(프로필 수정, 비밀번호 변경 등)은 하위 컴포넌트에 위임합니다.
 *
 * @example
 * // App.jsx (라우터)에서 사용
 * <Route path="/account" element={<AccountPage />} />
 */
export default function AccountPage() {
    // --- 컴포넌트 상태 정의 ---
    const [userProfile, setUserProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- 데이터 로딩 (useEffect) ---
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // --- ⚙️ 백엔드 연동: 사용자 정보 조회 ⚙️ ---
                const profileData = await getUserProfile('1');
                setUserProfile(profileData);
            } catch (err) {
                console.error("사용자 정보 로딩 실패:", err);
                setError(err.message || "사용자 정보를 불러오는데 실패했습니다.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, []);

    // --- 렌더링 로직 ---

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white">
                <PageHeader title="계정 관리" backPath="/mypage" />
                <div className="flex h-64 items-center justify-center"><p>사용자 정보를 불러오는 중...</p></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-white">
                <PageHeader title="계정 관리" backPath="/mypage" />
                <div className="p-5 text-center text-red-600">{error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <PageHeader title="계정 관리" backPath="/mypage" />

            <main className="pt-[20px]">
                {/*
                  개인정보 수정 폼 컴포넌트입니다.
                  좌우 여백(px)은 이 컴포넌트가 스스로 관리합니다.
                */}
                <UserProfileForm initialProfile={userProfile} />

                {/*
                  [수정] 구분선을 padding이 없는 main 바로 아래에 위치시켜
                  화면 전체 너비로 그려지도록 합니다.
                */}
                <div className="my-8 border-b border-gray-200" />

                {/*
                  비밀번호 변경 및 계정 액션 컴포넌트들을
                  별도의 div로 감싸고 여기에 좌우 여백을 적용합니다.
                */}
                <div className="px-[40px]">
                    <PasswordChangeForm />
                    <AccountActions />
                </div>

                {/* [추가] 페이지 하단에 흰색 빈 공간을 추가합니다. */}
                <div className="h-[15px]" />
            </main>
        </div>
    );
}