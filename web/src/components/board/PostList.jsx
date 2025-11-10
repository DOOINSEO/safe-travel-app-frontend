import React from 'react';
import PostItem from './PostItem';

export default function PostList({ posts, isLoading, error }) {
    if (isLoading) {
        return <div className="p-4 text-center text-gray-500">게시물을 불러오는 중...</div>;
    }

    if (error) {
        return <div className="p-4 text-center text-red-500">{error}</div>;
    }

    if (posts.length === 0) {
        return <div className="p-4 text-center text-gray-500">게시물이 없습니다.</div>;
    }

    return (
        <div className="space-y-4 bg-gray-50 p-4">
            {posts.map((post) => (
                <PostItem key={post.id} post={post} />
            ))}
        </div>
    );
}