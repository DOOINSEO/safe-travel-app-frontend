import React, {useEffect} from 'react';
import PageHeader from '../components/common/PageHeader';
import UserProfileForm from '../components/account/UserProfileForm';
import AccountActions from '../components/account/AccountActions';
import {useUserProfile} from '../hooks/useUserProfile';
import useAuthStore from '../stores/authStore';

export default function AccountPage() {
  const {userId, initAuth} = useAuthStore();
  const {userProfile, isLoading, error} = useUserProfile(userId);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <PageHeader title="계정 관리" backPath="/" />
        <div className="flex h-64 items-center justify-center">
          <p>사용자 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <PageHeader title="계정 관리" backPath="/" />

      <main className="pt-[20px]">
        {error && (
          <div className="mx-5 mb-4 rounded-md border border-red-400 bg-red-100 p-4 text-center text-red-600">
            {error}
          </div>
        )}

        {userProfile ? (
          <>
            <UserProfileForm initialProfile={userProfile} />
            <div className="mt-8 px-[40px]">
              <AccountActions userId={userProfile.id || userId} />
            </div>
          </>
        ) : (
          <div className="flex h-64 items-center justify-center">
            <p>사용자 정보를 불러올 수 없습니다.</p>
          </div>
        )}
        <div className="h-[15px]" />
      </main>
    </div>
  );
}
