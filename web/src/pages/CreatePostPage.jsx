import React, {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import AlertModal from '../components/common/AlertModal';
import PostForm from '../components/board/create/PostForm';
import {CAMBODIA_REGIONS} from '../data/regionData';

const DUMMY_LOCATIONS = [
  {country: '국가 선택', id: null, regions: [{name: '지역 선택', id: null, nameKo: '지역 선택'}]},
  {
    country: '캄보디아',
    id: 'KHM',
    regions: [
      {name: '지역 전체', id: null, nameKo: '지역 전체'},
      ...CAMBODIA_REGIONS.map((region) => ({
        name: region.name,
        id: region.id,
        nameKo: region.nameKo,
      })),
    ],
  },
  {
    country: '터키',
    id: 2,
    regions: [
      {name: '지역 전체', id: null, nameKo: '지역 전체'},
      {name: '이스탄불', id: 201, nameKo: '이스탄불'},
      {name: '앙카라', id: 202, nameKo: '앙카라'},
    ],
  },
];

export default function CreatePostPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [postData, setPostData] = useState({regionId: '', categoryId: '', content: ''});
  const [images, setImages] = useState([]);
  const [selectedCountryName, setSelectedCountryName] = useState(DUMMY_LOCATIONS[0].country);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalState, setModalState] = useState({isOpen: false, title: '', message: ''});
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  useEffect(() => {
    return () => images.forEach((image) => URL.revokeObjectURL(image.previewUrl));
  }, [images]);
  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setPostData((prev) => ({...prev, [name]: value}));
  };
  const handleCountryChange = (e) => {
    setSelectedCountryName(e.target.value);
    setPostData((prev) => ({...prev, regionId: ''}));
  };
  const handleImageUpload = (e) => {
    const newImages = Array.from(e.target.files).map((file) => ({
      id: Math.random(),
      previewUrl: URL.createObjectURL(file),
      file,
    }));
    setImages((prev) => [...prev, ...newImages]);
  };
  const handleImageDelete = (id) => setImages((prev) => prev.filter((img) => img.id !== id));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedCountryName === '국가 선택' || !postData.regionId) {
      setModalState({isOpen: true, title: '알림', message: '국가와 지역을 선택해주세요.'});
      return;
    }
    if (!postData.categoryId) {
      setModalState({isOpen: true, title: '알림', message: '카테고리를 선택해주세요.'});
      return;
    }
    if (!postData.content.trim()) {
      setModalState({isOpen: true, title: '알림', message: '내용을 입력해주세요.'});
      return;
    }
    setIsSubmitting(true);
    try {
      await new Promise((res) => setTimeout(res, 1500));
      setSubmissionSuccess(true);
      setModalState({isOpen: true, title: '성공', message: '게시물이 성공적으로 작성되었습니다.'});
    } catch (error) {
      console.error('게시물 작성 실패:', error);
      setModalState({isOpen: true, title: '오류', message: '게시물 작성에 실패했습니다.'});
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalClose = () => {
    setModalState({isOpen: false, title: '', message: ''});
    if (submissionSuccess) navigate('/board');
  };
  const availableRegions = DUMMY_LOCATIONS.find((c) => c.country === selectedCountryName)?.regions || [];

  return (
    <div className="flex h-screen flex-col bg-white">
      <header>
        <PageHeader title="게시물 작성하기" />
      </header>
      <main className="flex-1 overflow-y-auto">
        <PostForm
          postData={postData}
          images={images}
          availableRegions={availableRegions}
          fileInputRef={fileInputRef}
          handleInputChange={handleInputChange}
          handleCountryChange={handleCountryChange}
          handleImageUpload={handleImageUpload}
          handleImageDelete={handleImageDelete}
          handleSubmit={handleSubmit}
        />
      </main>
      <footer className="p-4">
        <button
          type="submit"
          form="create-post-form"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-black py-3 font-bold text-white transition-colors disabled:bg-gray-400"
        >
          {isSubmitting ? '작성 중...' : '작성하기'}
        </button>
      </footer>
      <AlertModal isOpen={modalState.isOpen} onClose={handleModalClose} title={modalState.title}>
        {modalState.message}
      </AlertModal>
    </div>
  );
}
