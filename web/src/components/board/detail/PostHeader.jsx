import React from 'react';

export default function PostHeader({post}) {
    const formatDate = (dateString) => new Date(dateString).toLocaleDateString('ko-KR');

    return (<div className="mb-4 flex items-start justify-between">
            <div>
                <span className="font-bold text-lg">{post.userNickname}</span>
                <p className="text-xs text-gray-600 mt-1">{post.country} - {post.region}</p>
            </div>
            <div className="text-right">
                <span className="text-sm text-gray-500">{formatDate(post.createdAt)}</span>
                <p className="text-xs text-gray-600 mt-1">{post.categoryName}</p>
            </div>
        </div>);
}