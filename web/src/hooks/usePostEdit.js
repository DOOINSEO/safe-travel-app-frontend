import {useState, useEffect} from 'react';
import {updatePost} from '../services/postApi';
import {EDIT_LOCATIONS, CATEGORIES} from '../data/boardData';

export function usePostEdit(post, onUpdateSuccess, onError) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const [editedImages, setEditedImages] = useState([]);
  const [editedCategoryId, setEditedCategoryId] = useState('');
  const [editedLocationId, setEditedLocationId] = useState('');
  const [selectedCountryNameForEdit, setSelectedCountryNameForEdit] = useState('');
  const [availableRegionsForEdit, setAvailableRegionsForEdit] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  // 이미지 previewUrl 정리
  useEffect(() => {
    return () => {
      editedImages.forEach((image) => {
        if (image.previewUrl && image.file) {
          URL.revokeObjectURL(image.previewUrl);
        }
      });
    };
  }, [editedImages]);

  const handleStartEdit = () => {
    if (!post) return;
    
    setEditedContent(post.content);
    setEditedImages(post.images);
    setEditedCategoryId(post.categoryId);
    setEditedLocationId(post.regionId);
    const currentCountry = EDIT_LOCATIONS.find((c) => c.id === post.countryId);
    if (currentCountry) {
      setSelectedCountryNameForEdit(currentCountry.country);
      setAvailableRegionsForEdit(currentCountry.regions);
    }
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    if (!post) return;

    try {
      setIsSaving(true);
      onError?.(null);

      // 카테고리 및 지역 정보 검증
      const updatedCategory = CATEGORIES.find((c) => c.id === parseInt(editedCategoryId, 10));
      const updatedCountry = EDIT_LOCATIONS.find((c) => c.country === selectedCountryNameForEdit);
      const updatedRegion = updatedCountry?.regions.find((r) => r.id === editedLocationId);

      if (!updatedCategory) {
        throw new Error('카테고리를 선택해주세요.');
      }
      if (!updatedRegion) {
        throw new Error('지역을 선택해주세요.');
      }

      // 이미지 데이터 준비: 기존 이미지와 새 파일 구분
      const imagesToSend = editedImages.map((img, i) => {
        // 새로 업로드한 파일인 경우
        if (img.file) {
          return {
            file: img.file,
            order: i,
          };
        }
        // 기존 이미지를 유지하는 경우
        return {
          imgPath: img.imgPath || img.filePath,
          order: i,
        };
      });

      // API 호출
      const updatedPost = await updatePost(post.postId, {
        content: editedContent.trim(),
        categoryId: updatedCategory.id,
        regionCode: updatedRegion.id,
        images: imagesToSend,
      });

      // 성공 시 상태 업데이트
      onUpdateSuccess?.(updatedPost);
      setIsEditing(false);

      // previewUrl 정리
      editedImages.forEach((img) => {
        if (img.previewUrl && img.file) {
          URL.revokeObjectURL(img.previewUrl);
        }
      });
    } catch (err) {
      console.error('게시물 수정 실패:', err);
      onError?.(err.message || '게시물 수정에 실패했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageDelete = (id) => {
    setEditedImages((prev) => prev.filter((img) => (img.id || img.imageId) !== id));
  };

  const handleImageUpload = (e) => {
    const newImages = Array.from(e.target.files).map((file) => ({
      id: Math.random(),
      previewUrl: URL.createObjectURL(file),
      file,
    }));
    setEditedImages((prev) => [...prev, ...newImages]);
  };

  const handleCountryChangeForEdit = (e) => {
    const name = e.target.value;
    setSelectedCountryNameForEdit(name);
    const data = EDIT_LOCATIONS.find((c) => c.country === name);
    setAvailableRegionsForEdit(data ? data.regions : []);
    setEditedLocationId('');
  };

  return {
    // 상태
    isEditing,
    editedContent,
    editedImages,
    editedCategoryId,
    editedLocationId,
    selectedCountryNameForEdit,
    availableRegionsForEdit,
    isSaving,
    // 핸들러
    setEditedContent,
    setEditedCategoryId,
    setEditedLocationId,
    handleStartEdit,
    handleSaveEdit,
    handleImageDelete,
    handleImageUpload,
    handleCountryChangeForEdit,
  };
}

