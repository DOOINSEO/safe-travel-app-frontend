import React from 'react';
import ImageSlider from '../ImageSlider';
import {ChevronDown, MessageSquare, ThumbsUp, Upload} from 'lucide-react';
import {LOCATIONS, CATEGORIES_WITH_SELECT} from '../../../data/boardData';

export default function PostContentView({
  post,
  comments,
  isEditing,
  isOwner,
  editedState, // 수정 관련 상태들을 객체로 받음
  editHandlers, // 수정 관련 핸들러들을 객체로 받음
  fileInputRef,
}) {
  // Props de-structuring for cleaner access
  const {
    editedContent,
    editedImages,
    editedCategoryId,
    editedLocationId,
    selectedCountryNameForEdit,
    availableRegionsForEdit,
  } = editedState;
  const {
    setEditedContent,
    handleImageDelete,
    handleImageUpload,
    handleSaveEdit,
    handleStartEdit,
    setIsDeleteModalOpen,
    handleLikeToggle,
    handleCountryChangeForEdit,
    setEditedLocationId,
    setEditedCategoryId,
  } = editHandlers;

  return (
    <>
      {isEditing ? (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2.5">
            <div className="relative">
              <select
                value={selectedCountryNameForEdit}
                onChange={handleCountryChangeForEdit}
                className="w-full appearance-none rounded-md border border-gray-300 bg-white p-2.5 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {LOCATIONS.map((loc) => (
                  <option key={loc.country} value={loc.country}>
                    {loc.country}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <ChevronDown size={16} />
              </div>
            </div>
            <div className="relative">
              <select
                value={editedLocationId}
                onChange={(e) => setEditedLocationId(e.target.value)}
                className="w-full appearance-none rounded-md border border-gray-300 bg-white p-2.5 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {availableRegionsForEdit.map((region) => (
                  <option key={region.id || 'all'} value={region.id || ''}>
                    {region.nameKo || region.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <ChevronDown size={16} />
              </div>
            </div>
            <div className="relative">
              <select
                value={editedCategoryId}
                onChange={(e) => setEditedCategoryId(e.target.value)}
                className="w-full appearance-none rounded-md border border-gray-300 bg-white p-2.5 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {CATEGORIES_WITH_SELECT.map((cat) => (
                  <option key={cat.name} value={cat.id || ''}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <ChevronDown size={16} />
              </div>
            </div>
          </div>
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="10"
          />
        </div>
      ) : (
        <p className="mb-4 whitespace-pre-wrap text-[13px] leading-relaxed text-gray-800">{post.content}</p>
      )}

      <ImageSlider images={isEditing ? editedImages : post.images} isEditing={isEditing} onDelete={handleImageDelete} />

      <div className="mt-4 flex items-center justify-between pb-4">
        <div className="flex items-center space-x-4 text-gray-600">
          <button
            onClick={handleLikeToggle}
            className={`flex items-center gap-1 transition-colors ${
              post.isLike ? 'text-red-600 hover:text-red-700' : 'text-gray-600 hover:text-red-600'
            }`}
          >
            <ThumbsUp size={18} fill={post.isLike ? 'currentColor' : 'none'} />
            <span className="text-sm font-medium">{post.likeCount}</span>
          </button>
          <div className="flex items-center gap-1">
            <MessageSquare size={18} /> <span>{comments.length}</span>
          </div>
        </div>
      </div>

      {isOwner && (
        <div className="mt-4 flex justify-end gap-4">
          {isEditing ? (
            <>
              <input type="file" multiple hidden ref={fileInputRef} onChange={handleImageUpload} accept="image/*" />
              <button
                onClick={() => fileInputRef.current.click()}
                className="flex items-center gap-1 text-sm font-semibold text-gray-600 hover:underline"
              >
                <Upload size={16} /> 사진 업로드
              </button>
              <button onClick={handleSaveEdit} className="text-sm font-semibold text-blue-600 hover:underline">
                저장
              </button>
            </>
          ) : (
            <>
              <button onClick={handleStartEdit} className="text-sm font-semibold text-gray-600 hover:underline">
                수정
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(true)}
                className="text-sm font-semibold text-red-600 hover:underline"
              >
                삭제
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
