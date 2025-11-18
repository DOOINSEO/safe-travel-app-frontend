import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ThumbsUp, MoreHorizontal } from 'lucide-react';

export default function PostItem({ post, handleLikeToggle }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // 드롭다운 메뉴 바깥 영역을 클릭하면 메뉴가 닫히도록 하는 로직
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownRef]);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return dateString.split('T')[0].replace(/-/g, '.');
    };

    const onMoreButtonClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDropdownOpen(prev => !prev);
    };

    const onLikeClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        handleLikeToggle(post.postId);
        setIsDropdownOpen(false);
    };

    return (
        <Link to={`/board/${post.postId}`} className="block transition-colors hover:bg-gray-50">
            <div className="border-t border-gray-200 bg-white p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-800">{post.userNickname}</span>
                        <span className="text-xs text-gray-500">{formatDate(post.createdAt)}</span>
                    </div>
                    <div className="relative" ref={dropdownRef}>
                        <button onClick={onMoreButtonClick} className="rounded-full p-1 text-gray-400 hover:bg-gray-200">
                            <MoreHorizontal size={20} />
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute right-0 top-full z-10 mt-2 w-40 rounded-md border bg-white shadow-lg">
                                <button onClick={onLikeClick} className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                                    <ThumbsUp size={16} fill={post.isLike ? 'currentColor' : 'none'} />
                                    {post.isLike ? '추천 취소' : '게시물 추천하기'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <p className="my-3 text-sm leading-relaxed text-gray-700 line-clamp-3">
                    {post.content}
                </p>

                {post.images && post.images.length > 0 && (
                    <div className={`grid gap-2 ${post.images.length >= 3 ? 'grid-cols-3' : `grid-cols-${post.images.length}`}`}>
                        {post.images.map((image) => (
                            <img
                                key={image.imageId}
                                src={image.imgPath}
                                alt={`게시글 이미지 ${image.order + 1}`}
                                className="aspect-square w-full rounded-md object-cover"
                            />
                        ))}
                    </div>
                )}

                <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-gray-600">
                        <ThumbsUp size={16} />
                        <span className="text-sm font-medium">{post.likeCount}</span>
                    </div>
                    <span className="text-xs text-gray-500">{post.locationName}</span>
                </div>
            </div>
        </Link>
    );
}