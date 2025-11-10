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

    return (
        <div className="min-h-screen bg-white">
            <PageHeader title="계정 관리" backPath="/mypage" />

            <main className="pt-[20px]">
                {error && (
                    <div className="mx-5 mb-4 rounded-md border border-red-400 bg-red-100 p-4 text-center text-red-600">
                        {error}
                    </div>
                )}

                <UserProfileForm initialProfile={userProfile} />

                <div className="mt-8 px-[40px]">
                    <AccountActions />
                </div>
                <div className="h-[15px]" />
            </main>
        </div>
    );
}