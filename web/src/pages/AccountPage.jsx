// src/pages/AccountPage.jsx (최종 수정본)

import React from 'react';
import PageHeader from '../components/common/PageHeader';
import UserProfileForm from '../components/account/UserProfileForm';
import AccountActions from '../components/account/AccountActions';
import { useUserProfile } from '../hooks/useUserProfile';

export default function AccountPage() {
    // TODO: 실제 사용자 ID로 교체 필요
    const userId = '1';
    const { userProfile, isLoading, error } = useUserProfile(userId);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white">
                <PageHeader title="계정 관리" backPath="/mypage" />
                <div className="flex h-64 items-center justify-center"><p>사용자 정보를 불러오는 중...</p></div>
            </div>
        );
    }

    // --- 🎨 수정된 부분 🎨 ---
    // if (error) 블록을 제거하고, main 렌더링 로직을 항상 실행합니다.
    return (
        <div className="min-h-screen bg-white">
            <PageHeader title="계정 관리" backPath="/mypage" />

            <main className="pt-[20px]">
                {/* 에러가 있다면, 폼 위에 에러 메시지를 표시합니다. */}
                {error && (
                    <div className="mx-5 mb-4 rounded-md border border-red-400 bg-red-100 p-4 text-center text-red-600">
                        {error}
                    </div>
                )}

                {/* UserProfileForm을 항상 렌더링합니다. 데이터가 없으면 빈 폼이 보입니다. */}
                <UserProfileForm initialProfile={userProfile} />

                <div className="mt-8 px-[40px]">
                    <AccountActions />
                </div>
                <div className="h-[15px]" />
            </main>
        </div>
    );
}