import React, {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import AlertModal from '../components/common/AlertModal';
import PostForm from '../components/board/create/PostForm';
import {LOCATIONS} from '../data/boardData';
import {getUserProfile} from '../services/accountApi';
import {createPost} from '../services/postApi';

export default function CreatePostPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [postData, setPostData] = useState({regionId: '', categoryId: '', content: ''});
  const [images, setImages] = useState([]);
  const [selectedCountryName, setSelectedCountryName] = useState(LOCATIONS[0].country);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalState, setModalState] = useState({isOpen: false, title: '', message: ''});
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [userName, setUserName] = useState('');

  // 사용자 정보 가져오기
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        // localStorage에서 먼저 확인
        const userInfoStr = localStorage.getItem('userInfo');
        if (userInfoStr) {
          const userInfo = JSON.parse(userInfoStr);
          setUserName(userInfo.nickname || userInfo.name || '');
          return;
        }

        // localStorage에 없으면 API 호출
        const response = await getUserProfile();
        const data = response?.data || response;
        if (data) {
          setUserName(data.nickname || data.name || '');
          localStorage.setItem('userInfo', JSON.stringify(data));
        }
      } catch (error) {
        console.error('사용자 정보 가져오기 실패:', error);
        setUserName('');
      }
    };

    fetchUserName();
  }, []);

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
      await createPost({
        content: postData.content.trim(),
        categoryId: postData.categoryId,
        regionCode: postData.regionId,
        images: images,
      });

      setSubmissionSuccess(true);
      setModalState({isOpen: true, title: '성공', message: '게시물이 성공적으로 작성되었습니다.'});
    } catch (error) {
      console.error('게시물 작성 실패:', error);
      setModalState({
        isOpen: true,
        title: '오류',
        message: error.message || '게시물 작성에 실패했습니다.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalClose = () => {
    setModalState({isOpen: false, title: '', message: ''});
    if (submissionSuccess) navigate('/board');
  };
  const availableRegions = LOCATIONS.find((c) => c.country === selectedCountryName)?.regions || [];

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
          userName={userName}
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
