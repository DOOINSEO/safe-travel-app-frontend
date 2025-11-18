import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import AlertModal from '../components/common/AlertModal'; // AlertModal import
import { Upload, X, ChevronDown } from 'lucide-react';

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

export default function CreatePostPage() {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [postData, setPostData] = useState({
        locationId: '',
        categoryId: '',
        content: '',
    });
    const [images, setImages] = useState([]);
    const [selectedCountryName, setSelectedCountryName] = useState(DUMMY_LOCATIONS[0].country);

    // --- 추가된 상태 ---
    const [isSubmitting, setIsSubmitting] = useState(false); // 제출 로딩 상태
    const [modalState, setModalState] = useState({ isOpen: false, title: '', message: '' }); // 모달 상태
    const [submissionSuccess, setSubmissionSuccess] = useState(false); // 제출 성공 여부

    useEffect(() => {
        return () => {
            images.forEach(image => URL.revokeObjectURL(image.previewUrl));
        };
    }, [images]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPostData(prev => ({ ...prev, [name]: value }));
    };

    const handleCountryChange = (e) => {
        setSelectedCountryName(e.target.value);
        setPostData(prev => ({ ...prev, locationId: '' }));
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map(file => ({
            id: Math.random(),
            previewUrl: URL.createObjectURL(file),
            file: file,
        }));
        setImages(prev => [...prev, ...newImages]);
    };

    const handleImageDelete = (idToDelete) => {
        setImages(prevImages => prevImages.filter(img => img.id !== idToDelete));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // --- 1. 유효성 검사 ---
        if (selectedCountryName === '국가 선택' || !postData.locationId) {
            setModalState({ isOpen: true, title: '알림', message: '국가와 지역을 선택해주세요.' });
            return;
        }
        if (!postData.categoryId) {
            setModalState({ isOpen: true, title: '알림', message: '카테고리를 선택해주세요.' });
            return;
        }
        if (!postData.content.trim()) {
            setModalState({ isOpen: true, title: '알림', message: '내용을 입력해주세요.' });
            return;
        }

        setIsSubmitting(true);

        try {
            const formData = new FormData();
            formData.append('content', postData.content);
            formData.append('categoryId', postData.categoryId);
            formData.append('locationId', postData.locationId);
            images.forEach((img, index) => {
                formData.append(`images[${index}].file`, img.file);
                formData.append(`images[${index}].order`, index);
            });

            // --- 2. API 요청 시뮬레이션 ---
            console.log('--- 제출할 FormData ---', formData);
            // await axios.post('/api/posts', formData); // 실제 API 호출
            await new Promise(resolve => setTimeout(resolve, 1500)); // 1.5초 딜레이로 로딩 효과

            // --- 3. 성공 처리 ---
            setSubmissionSuccess(true);
            setModalState({ isOpen: true, title: '성공', message: '게시물이 성공적으로 작성되었습니다.' });

        } catch (error) {
            // --- 4. 실패 처리 ---
            console.error('게시물 작성 실패:', error);
            setModalState({ isOpen: true, title: '오류', message: '게시물 작성에 실패했습니다. 잠시 후 다시 시도해주세요.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    // 모달 닫기 핸들러
    const handleModalClose = () => {
        setModalState({ isOpen: false, title: '', message: '' });
        if (submissionSuccess) {
            navigate('/board'); // 성공 시에만 페이지 이동
        }
    };

    const availableRegions = DUMMY_LOCATIONS.find(c => c.country === selectedCountryName)?.regions || [];
    const today = new Date().toLocaleDateString('ko-KR').slice(0, -1);

    return (
        <div className="flex h-screen flex-col bg-white">
            <header>
                <PageHeader title="게시물 작성하기" />
            </header>

            <main className="flex-1 overflow-y-auto">
                <form id="create-post-form" onSubmit={handleSubmit} className="p-4 space-y-4">
                    {/* ... (폼 내용은 이전과 동일) ... */}
                    <div className="text-sm">
                        <div className="flex"><span className="w-16 font-semibold text-gray-600">작성자</span><span>Jueon</span></div>
                        <div className="flex mt-1"><span className="w-16 font-semibold text-gray-600">작성날짜</span><span>{today}</span></div>
                    </div>
                    <div className="grid grid-cols-3 gap-2.5">
                        <div className="relative"><select onChange={handleCountryChange} className="w-full appearance-none rounded-md border border-gray-300 bg-white p-2.5 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">{DUMMY_LOCATIONS.map(loc => <option key={loc.country} value={loc.country}>{loc.country}</option>)}</select><div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500"><ChevronDown size={16} /></div></div>
                        <div className="relative"><select name="locationId" value={postData.locationId} onChange={handleInputChange} className="w-full appearance-none rounded-md border border-gray-300 bg-white p-2.5 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">{availableRegions.map(region => <option key={region.name} value={region.id || ''}>{region.name}</option>)}</select><div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500"><ChevronDown size={16} /></div></div>
                        <div className="relative"><select name="categoryId" value={postData.categoryId} onChange={handleInputChange} className="w-full appearance-none rounded-md border border-gray-300 bg-white p-2.5 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">{DUMMY_CATEGORIES.map(cat => <option key={cat.name} value={cat.id || ''}>{cat.name}</option>)}</select><div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500"><ChevronDown size={16} /></div></div>
                    </div>
                    <textarea name="content" value={postData.content} onChange={handleInputChange} placeholder="내용을 입력해주세요." className="w-full h-48 rounded-lg border border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <div><input type="file" multiple hidden ref={fileInputRef} onChange={handleImageUpload} accept="image/*" /><button type="button" onClick={() => fileInputRef.current.click()} className="flex items-center gap-2 rounded-md border border-gray-400 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"><Upload size={16} />사진 업로드</button></div>
                    {images.length > 0 && (<div className="grid grid-cols-3 gap-2">{images.map(image => (<div key={image.id} className="relative aspect-square"><img src={image.previewUrl} alt="미리보기" className="h-full w-full rounded-md object-cover" /><button type="button" onClick={() => handleImageDelete(image.id)} className="absolute right-1 top-1 rounded-full bg-black/50 p-0.5 text-white hover:bg-black/70"><X size={14} /></button></div>))}</div>)}
                </form>
            </main>

            <footer className="p-4">
                <button
                    type="submit"
                    form="create-post-form"
                    disabled={isSubmitting} // 로딩 중 비활성화
                    className="w-full rounded-lg bg-black py-3 font-bold text-white transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? '작성 중...' : '작성하기'}
                </button>
            </footer>

            {/* AlertModal 렌더링 */}
            <AlertModal
                isOpen={modalState.isOpen}
                onClose={handleModalClose}
                title={modalState.title}
            >
                {modalState.message}
            </AlertModal>
        </div>
    );
}