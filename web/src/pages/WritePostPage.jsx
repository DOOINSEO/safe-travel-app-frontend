import React from 'react';
import { ChevronDown } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import { useWriteForm } from '../hooks/useWriteForm';

function FilterDropdown({ label }) {
    return (
        <div className="flex-1">
            <button type="button" className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700">
                <span>{label}</span>
                <ChevronDown className="h-4 w-4" />
            </button>
        </div>
    );
}

export default function WritePostPage() {
    const { formData, handleChange, handleSubmit, isSubmitting, error } = useWriteForm();

    return (
        <div className="min-h-screen bg-white">
            <PageHeader title="게시물 작성하기" backPath="/board" />

            <form onSubmit={handleSubmit}>
                <main className="p-4">
                    {/* 작성자/날짜 정보 UI */}
                    <div className="mb-4 space-y-1 text-sm text-gray-500">
                        <div className="flex">
                            <span className="w-16 flex-shrink-0">작성자</span>
                            <span className="font-semibold text-gray-800">Jueon</span>
                        </div>
                        <div className="flex">
                            <span className="w-16 flex-shrink-0">작성날짜</span>
                            <span className="font-semibold text-gray-800">2025.04.25</span>
                        </div>
                    </div>

                    {/* 위치 및 카테고리 선택 UI */}
                    <div className="space-y-2">
                        <div className="flex h-[52px] w-full items-center rounded-lg border border-gray-300 bg-white">
                            <div className="relative flex flex-1 cursor-pointer items-center justify-between px-4">
                                <span className="text-sm">캄보디아</span>
                                <ChevronDown className="h-4 w-4 text-gray-400" />
                            </div>
                            <div className="h-full w-px bg-gray-200"></div>
                            <div className="flex-1 px-4">
                                <input
                                    type="text"
                                    placeholder="시엠레아프"
                                    className="w-full bg-transparent text-sm placeholder-gray-500 focus:outline-none"
                                />
                            </div>
                        </div>
                        <div className="relative flex h-[52px] w-full cursor-pointer items-center justify-between rounded-lg border border-gray-300 bg-white px-4">
                            <span className="text-sm text-gray-500">카테고리</span>
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                        </div>
                    </div>

                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        className="mt-4 h-40 w-full rounded-lg border border-gray-300 p-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="내용을 입력해주세요."
                        required
                    ></textarea>

                    <button type="button" className="mt-4 w-full rounded-lg border border-gray-300 bg-white py-2 text-sm text-gray-700">
                        사진 업로드
                    </button>

                    <div className="mt-4 grid grid-cols-3 gap-2">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="aspect-square rounded-lg bg-gray-200"></div>
                        ))}
                    </div>

                    {error && <p className="mt-4 text-center text-sm text-red-500">{error}</p>}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="mt-8 w-full rounded-full bg-black py-4 font-bold text-white disabled:bg-gray-400"
                    >
                        {isSubmitting ? '등록 중...' : '작성하기'}
                    </button>
                </main>
            </form>
        </div>
    );
}