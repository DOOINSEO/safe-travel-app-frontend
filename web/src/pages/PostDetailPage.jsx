import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import ImageSlider from '../components/board/ImageSlider';
import CommentSection from '../components/board/CommentSection';
import ConfirmModal from '../components/common/ConfirmModal';
import { ThumbsUp, MessageSquare, Frown, Send, Upload, ChevronDown } from 'lucide-react';
import { DUMMY_POSTS, DUMMY_COMMENTS } from '../data/dummyData';

// --- 추가된 부분: 수정 모드에서 사용할 더미데이터 ---
const DUMMY_LOCATIONS = [
    { country: '국가 선택', id: null, regions: [{ name: '지역 선택', id: null }] },
    { country: '캄보디아', id: 1, regions: [{ name: '지역 전체', id: null }, { name: '시엠레아프', id: 101 }, { name: '프놈펜', id: 102 }] },
    { country: '터키', id: 2, regions: [{ name: '지역 전체', id: null }, { name: '이스탄불', id: 201 }, { name: '앙카라', id: 202 }] },
];
const DUMMY_CATEGORIES = [
    { id: null, name: '카테고리' },
    { id: 1, name: '기상이변' },
    { id: 2, name: '소매치기' },
    { id: 3, name: '교통사고' },
    { id: 4, name: '시설낙후' },
];

// --- 추가된 부분: 권한 처리를 위한 현재 사용자 ID 시뮬레이션 ---
const CURRENT_USER_ID = 101; // 'Jueon'의 ID로 가정

export default function PostDetailPage() {
    const { postId } = useParams();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const postData = useMemo(() => DUMMY_POSTS.find(p => p.postId === parseInt(postId, 10)), [postId]);
    const initialComments = useMemo(() => DUMMY_COMMENTS.filter(c => c.postId === parseInt(postId, 10)), [postId]);

    const [post, setPost] = useState(postData);
    const [comments, setComments] = useState(initialComments);
    const [newComment, setNewComment] = useState('');

    // --- 수정 관련 상태 ---
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState('');
    const [editedImages, setEditedImages] = useState([]);
    const [editedCategoryId, setEditedCategoryId] = useState('');
    const [editedLocationId, setEditedLocationId] = useState('');
    const [selectedCountryNameForEdit, setSelectedCountryNameForEdit] = useState('');
    const [availableRegionsForEdit, setAvailableRegionsForEdit] = useState([]);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    useEffect(() => {
        return () => {
            editedImages.forEach(image => {
                if (image.previewUrl && image.file) {
                    URL.revokeObjectURL(image.previewUrl);
                }
            });
        };
    }, [editedImages]);


    if (!post) {
        return (
            <div className="min-h-screen bg-white">
                <PageHeader title="오류" />
                <div className="flex flex-col items-center justify-center pt-20 text-center">
                    <Frown className="h-16 w-16 text-gray-400" />
                    <h2 className="mt-4 text-xl font-semibold">게시글을 찾을 수 없습니다.</h2>
                    <p className="mt-2 text-gray-500">삭제되었거나 잘못된 경로입니다.</p>
                </div>
            </div>
        );
    }

    // --- 추가된 부분: 권한 확인 변수 ---
    const isOwner = post.userId === CURRENT_USER_ID;

    const handleLikeToggle = () => {
        setPost(prev => ({ ...prev, isLike: !prev.isLike, likeCount: prev.isLike ? prev.likeCount - 1 : prev.likeCount + 1 }));
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (newComment.trim() === '') return;
        const newCommentData = { commentId: Math.random(), postId: post.postId, userId: CURRENT_USER_ID, userNickname: 'CurrentUser', content: newComment, createdAt: new Date().toISOString() };
        setComments(prev => [...prev, newCommentData]);
        setNewComment('');
    };

    const handleStartEdit = () => {
        setEditedContent(post.content);
        setEditedImages(post.images);
        setEditedCategoryId(post.categoryId);
        setEditedLocationId(post.locationId);

        const currentCountry = DUMMY_LOCATIONS.find(c => c.id === post.countryId);
        if (currentCountry) {
            setSelectedCountryNameForEdit(currentCountry.country);
            setAvailableRegionsForEdit(currentCountry.regions);
        }
        setIsEditing(true);
    };

    // --- 수정된 부분: 저장 핸들러 ---
    const handleSaveEdit = () => {
        const finalImages = editedImages.map((img, index) => {
            if (img.file) {
                return { imageId: Math.random(), postId: post.postId, imgPath: img.previewUrl, order: index };
            }
            return { ...img, order: index };
        });

        const updatedCategory = DUMMY_CATEGORIES.find(c => c.id === parseInt(editedCategoryId, 10));
        const updatedCountry = DUMMY_LOCATIONS.find(c => c.country === selectedCountryNameForEdit);
        const updatedRegion = updatedCountry?.regions.find(r => r.id === parseInt(editedLocationId, 10));

        setPost(prev => ({
            ...prev,
            content: editedContent,
            images: finalImages,
            categoryId: updatedCategory.id,
            categoryName: updatedCategory.name,
            countryId: updatedCountry.id,
            locationId: updatedRegion.id,
            country: updatedCountry.country,
            region: updatedRegion.name,
        }));
        setIsEditing(false);
    };

    const handleImageDelete = (idToDelete) => {
        setEditedImages(prevImages => prevImages.filter(img => (img.id || img.imageId) !== idToDelete));
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map(file => ({
            id: Math.random(),
            previewUrl: URL.createObjectURL(file),
            file: file,
        }));
        setEditedImages(prev => [...prev, ...newImages]);
    };

    const handleDeletePost = () => {
        console.log(`Post ID: ${post.postId} 삭제됨`);
        setIsDeleteModalOpen(false);
        navigate('/board');
    };

    // --- 추가된 부분: 수정 중 국가 변경 핸들러 ---
    const handleCountryChangeForEdit = (e) => {
        const countryName = e.target.value;
        setSelectedCountryNameForEdit(countryName);
        const countryData = DUMMY_LOCATIONS.find(c => c.country === countryName);
        setAvailableRegionsForEdit(countryData ? countryData.regions : []);
        setEditedLocationId(''); // 지역 선택 초기화
    };

    const formatDate = (dateString) => new Date(dateString).toLocaleDateString('ko-KR');

    return (
        <div className="flex h-screen flex-col bg-white">
            <header><PageHeader title="게시물 상세보기" /></header>

            <main className="flex-1 overflow-y-auto">
                <div className="p-4">
                    <div className="mb-4 flex items-start justify-between">
                        <div>
                            <span className="font-bold text-lg">{post.userNickname}</span>
                            {/* --- 수정된 부분: country, region 조합으로 위치 표시 --- */}
                            <p className="text-xs text-gray-600 mt-1">{post.country} - {post.region}</p>
                        </div>
                        <div className="text-right">
                            <span className="text-sm text-gray-500">{formatDate(post.createdAt)}</span>
                            <p className="text-xs text-gray-600 mt-1">{post.categoryName}</p>
                        </div>
                    </div>

                    {isEditing ? (
                        <div className="space-y-4">
                            {/* --- 추가된 부분: 수정 모드 시 지역/카테고리 선택 UI --- */}
                            <div className="grid grid-cols-3 gap-2.5">
                                <div className="relative">
                                    <select value={selectedCountryNameForEdit} onChange={handleCountryChangeForEdit} className="w-full appearance-none rounded-md border border-gray-300 bg-white p-2.5 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        {DUMMY_LOCATIONS.map(loc => <option key={loc.country} value={loc.country}>{loc.country}</option>)}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500"><ChevronDown size={16} /></div>
                                </div>
                                <div className="relative">
                                    <select value={editedLocationId} onChange={(e) => setEditedLocationId(e.target.value)} className="w-full appearance-none rounded-md border border-gray-300 bg-white p-2.5 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        {availableRegionsForEdit.map(region => <option key={region.name} value={region.id || ''}>{region.name}</option>)}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500"><ChevronDown size={16} /></div>
                                </div>
                                <div className="relative">
                                    <select value={editedCategoryId} onChange={(e) => setEditedCategoryId(e.target.value)} className="w-full appearance-none rounded-md border border-gray-300 bg-white p-2.5 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        {DUMMY_CATEGORIES.map(cat => <option key={cat.name} value={cat.id || ''}>{cat.name}</option>)}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500"><ChevronDown size={16} /></div>
                                </div>
                            </div>
                            <textarea value={editedContent} onChange={(e) => setEditedContent(e.target.value)} className="w-full rounded-lg border border-gray-300 p-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500" rows="10" />
                        </div>
                    ) : (
                        <p className="mb-4 whitespace-pre-wrap text-[13px] leading-relaxed text-gray-800">{post.content}</p>
                    )}

                    <ImageSlider images={isEditing ? editedImages : post.images} isEditing={isEditing} onDelete={handleImageDelete} />

                    <div className="mt-4 flex items-center justify-between pb-4">
                        <div className="flex items-center space-x-4 text-gray-600">
                            <div className="flex items-center gap-1"> <ThumbsUp size={18} /> <span>{post.likeCount}</span> </div>
                            {/* --- 수정된 부분: comments.length로 댓글 수 표시 --- */}
                            <div className="flex items-center gap-1"> <MessageSquare size={18} /> <span>{comments.length}</span> </div>
                        </div>
                        <button onClick={handleLikeToggle} className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-semibold transition-colors ${ post.isLike ? 'bg-black text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300' }`}>
                            <ThumbsUp size={16} fill={post.isLike ? 'white' : 'none'} />
                            {post.isLike ? '추천됨' : '추천하기'}
                        </button>
                    </div>

                    {/* --- 수정된 부분: isOwner일 때만 수정/삭제 관련 버튼 노출 --- */}
                    {isOwner && (
                        <div className="mt-4 flex justify-end gap-4">
                            {isEditing ? (
                                <>
                                    <input type="file" multiple hidden ref={fileInputRef} onChange={handleImageUpload} accept="image/*" />
                                    <button onClick={() => fileInputRef.current.click()} className="flex items-center gap-1 text-sm font-semibold text-gray-600 hover:underline">
                                        <Upload size={16} /> 사진 업로드
                                    </button>
                                    <button onClick={handleSaveEdit} className="text-sm font-semibold text-blue-600 hover:underline">저장</button>
                                </>
                            ) : (
                                <>
                                    <button onClick={handleStartEdit} className="text-sm font-semibold text-gray-600 hover:underline">수정</button>
                                    <button onClick={() => setIsDeleteModalOpen(true)} className="text-sm font-semibold text-red-600 hover:underline">삭제</button>
                                </>
                            )}
                        </div>
                    )}

                    <CommentSection comments={comments} setComments={setComments} currentUserId={CURRENT_USER_ID} />
                </div>
            </main>

            <footer className="border-t bg-white p-2">
                <form onSubmit={handleCommentSubmit} className="flex items-center space-x-2">
                    <input type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="댓글을 입력하세요..." className="flex-1 rounded-full border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <button type="submit" className="rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600 disabled:bg-gray-300" disabled={!newComment.trim()} aria-label="댓글 전송"><Send size={18} /></button>
                </form>
            </footer>

            <ConfirmModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleDeletePost} title="게시물 삭제 확인" intent="destructive" confirmText="삭제">
                정말로 이 게시물을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
            </ConfirmModal>
        </div>
    );
}