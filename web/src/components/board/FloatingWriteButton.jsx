import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';

export default function FloatingWriteButton() {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate('/board/new')}
            className="fixed bottom-5 right-6 z-10 flex w-[136px] h-[38.28px] items-center justify-center gap-1 rounded-full border border-[#026ABF] bg-[#E8F5FF] text-sm font-semibold text-[#026ABF] shadow-lg transition hover:bg-blue-100"
        >
            <Plus size={16} />
            <span>게시물 작성하기</span>
        </button>
    );
}