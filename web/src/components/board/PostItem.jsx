import React from 'react';
import { MoreHorizontal, ThumbsUp } from 'lucide-react';

export default function PostItem({ post }) {
    return (
        <div className="rounded-lg bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between">
                <div>
                    <p className="font-bold text-gray-900">{post.author}</p>
                    <p className="text-xs text-gray-500">{post.date}</p>
                </div>
                <button aria-label="게시물 옵션">
                    <MoreHorizontal className="h-5 w-5 text-gray-400" />
                </button>
            </div>

            <p className="my-3 text-sm leading-relaxed text-gray-800">{post.content}</p>

            {post.images && post.images.length > 0 && (
                <div className={`grid gap-1.5 ${post.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                    {post.images.map((src, index) => (
                        <div key={index} className="aspect-video w-full overflow-hidden rounded-md">
                            <img src={src} alt={`post-${post.id}-img-${index}`} className="h-full w-full object-cover" />
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-3 flex items-center justify-between text-gray-500">
                <div className="flex items-center gap-1">
                    <ThumbsUp className="h-4 w-4" />
                    <span className="text-sm font-medium">{post.likes}</span>
                </div>
                <span className="text-xs">{post.location}</span>
            </div>
        </div>
    );
}