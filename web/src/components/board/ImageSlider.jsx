import React, {useEffect, useState} from 'react';
import {ChevronLeft, ChevronRight, X} from 'lucide-react'; // X 아이콘 import

export default function ImageSlider({images, isEditing = false, onDelete}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 0으로 리셋
  useEffect(() => {
    setCurrentIndex(0);
  }, [images]);

  if (!images || images.length === 0) {
    return (
      <div className="flex h-64 w-full items-center justify-center rounded-lg bg-gray-100 text-gray-400">
        이미지 없음
      </div>
    );
  }

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const currentImage = images[currentIndex];

  return (
    <div className="relative h-64 w-full">
      <img
        src={currentImage.imgPath || currentImage.previewUrl}
        alt={`Slide ${currentIndex + 1}`}
        className="h-full w-full rounded-lg object-cover"
      />
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-1 text-white hover:bg-black/50"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-1 text-white hover:bg-black/50"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
      {/* 편집 모드일때만 삭제 X 버튼 */}
      {isEditing && (
        <button
          onClick={() => onDelete(currentImage.id || currentImage.imageId)}
          className="absolute right-2 top-2 rounded-full bg-black/50 p-1 text-white hover:bg-black/70"
          aria-label="이미지 삭제"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
