import React from 'react';
import { useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();
    const { formData, handleChange, handleSubmit, isSubmitting, error } = useWriteForm();

    return (
        <div className="min-h-screen bg-gray-50">
            <PageHeader title="게시물 작성하기" backPath="/board" />

            <form onSubmit={handleSubmit}>
                <main className="p-4">
                    <div className="mb-4 text-sm">
                        <p>작성자 <span className="font-semibold">Jueon</span></p>
                        <p>작성날짜 <span className="font-semibold">2025.04.25</span></p>
                    </div>

                    <div className="mb-4 flex gap-2">
                        <FilterDropdown label="국가 선택" />
                        <FilterDropdown label="지역 선택" />
                        <FilterDropdown label="카테고리" />
                    </div>

                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        className="h-40 w-full rounded-lg border border-gray-300 p-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
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