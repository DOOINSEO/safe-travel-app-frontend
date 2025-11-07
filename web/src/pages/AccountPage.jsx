import React from 'react';
import PageHeader from '../components/common/PageHeader';

export default function AccountPage() {
    return (
        <div className="min-h-screen bg-white">
            <PageHeader title="계정 관리" backPath="/mypage" />
            <main className="p-5 text-center">
                <p>계정 관리 페이지입니다. (구현 예정)</p>
            </main>
        </div>
    );
}