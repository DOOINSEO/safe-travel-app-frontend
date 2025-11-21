import React, { useState } from 'react'; // ✨ 'useState' -> useState 로 따옴표 제거
import AlertModal from '../../common/AlertModal';
import { createPost } from '../../../services/postApi';

// --- 데이터 설정 ---
const PHNOM_PENH_REGION_CODE = 'KHM-12';
const SIHANOUKVILLE_REGION_CODE = 'KHM-16';

const imageModules = import.meta.glob('/src/assets/board/*.jpg', { eager: true });
const imageUrls = Object.fromEntries(
    Object.entries(imageModules).map(([path, module]) => [path.split('/').pop(), module.default])
);

const DUMMY_POSTS_DATA = [
    { categoryId: 4, content: '왓프놈 사원 근처에서 아이들이 구걸하며 주머니를 뒤지는 경우가 있어요. 안쓰럽더라도 거리를 유지하는 게 좋습니다.', images: ['1-1.jpg', '1-2.jpg'] },
    { categoryId: 2, content: '프놈펜 시내 로터리는 신호가 없어 정말 혼란스러워요. 툭툭 타고 지나갈 때 꽉 잡으셔야 합니다.', images: ['2-1.jpg'] },
    { categoryId: 4, content: '시아누크빌 해변에서 친한 척 말을 걸며 주의를 끈 뒤, 다른 일행이 소지품을 훔쳐가는 사례가 있었습니다.', images: ['3-1.jpg', '3-2.jpg'] },
    { categoryId: 5, content: '오루세이 마켓 주변은 길이 좁고 사람이 많아 위생 상태가 좋지 않아요. 특히 우기에는 조심하세요.', images: ['4-1.jpg', '4-2.jpg'] },
    { categoryId: 2, content: '캄보디아는 횡단보도에서도 오토바이가 멈추지 않아요. 길 건널 때 항상 주변을 잘 살피세요.', images: ['5-1.jpg', '5-2.jpg'] },
    { categoryId: 4, content: '리버사이드 공원에서 산책할 때, 오토바이 날치기가 스마트폰을 낚아채 가는 경우가 있으니 주의가 필요합니다.', images: ['6-1.jpg'] },
    { categoryId: 1, content: '시아누크빌은 갑자기 스콜이 쏟아질 때가 많습니다. 작은 우산이라도 꼭 챙겨 다니는 걸 추천해요.', images: ['7-1.jpg'] },
    { categoryId: 5, content: '프놈펜 일부 지역은 밤에 가로등이 부족해 길이 매우 어둡습니다. 혼자 다니는 것은 피하는 것이 좋습니다.', images: ['8-1.jpg', '8-2.jpg'] },
    { categoryId: 4, content: '센트럴 마켓에서 물건 구경하는 사이 가방을 열어 지갑만 빼가는 소매치기를 조심해야 합니다.', images: ['9-1.jpg', '9-2.jpg'] },
    { categoryId: 2, content: '툭툭 기사들이 간혹 과속하거나 위험하게 운전하는 경우가 있습니다. 불안하면 즉시 천천히 가달라고 요청하세요.', images: ['10-1.jpg'] },
    { categoryId: 4, content: '시아누크빌 선착장 근처에서 호객꾼들이 과도한 요금을 요구하는 경우가 있습니다. 공식 매표소만 이용하세요.', images: ['11-1.jpg'] },
    { categoryId: 5, content: '프놈펜 길거리 음식은 맛있지만, 위생에 민감하다면 식당을 이용하는 것이 더 안전할 수 있습니다.', images: ['12-1.jpg'] },
    { categoryId: 1, content: '건기에는 프놈펜 시내의 먼지가 생각보다 심합니다. 마스크를 착용하는 것이 호흡기 건강에 도움이 됩니다.', images: ['13-1.jpg'] },
];

const urlToFile = async (url, filename) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], filename, { type: blob.type });
};

export default function DummyPostGenerator() {
    const [isSeeding, setIsSeeding] = useState(false);
    const [seedingMessage, setSeedingMessage] = useState('');
    const [modalState, setModalState] = useState({ isOpen: false, title: '', message: '' });

    const handleSeedData = async () => {
        setIsSeeding(true);
        let successCount = 0;

        const shuffledPosts = [...DUMMY_POSTS_DATA].sort(() => Math.random() - 0.5);

        const phnomPenhPosts = shuffledPosts.slice(0, 7);
        const sihanoukvillePosts = shuffledPosts.slice(7);

        const postsToCreate = [
            ...phnomPenhPosts.map(p => ({ ...p, regionCode: PHNOM_PENH_REGION_CODE })),
            ...sihanoukvillePosts.map(p => ({ ...p, regionCode: SIHANOUKVILLE_REGION_CODE }))
        ];

        for (let i = 0; i < postsToCreate.length; i++) {
            const post = postsToCreate[i];

            setSeedingMessage(`[${i + 1}/13] 이미지 준비 중...`);

            try {
                const imageFilesPromises = post.images.map((filename) => {
                    const finalUrl = imageUrls[filename];
                    if (!finalUrl) throw new Error(`이미지 파일 없음: ${filename}`);
                    return urlToFile(finalUrl, filename);
                });
                const files = await Promise.all(imageFilesPromises);
                const imagesForApi = files.map((file) => ({ id: Math.random(), file }));

                setSeedingMessage(`[${i + 1}/13] 게시물 업로드 중...`);

                await createPost({
                    content: post.content,
                    categoryId: post.categoryId,
                    regionCode: post.regionCode,
                    images: imagesForApi,
                });

                successCount++;
            } catch (error) {
                console.error(`게시물 생성 실패 (${i + 1}):`, error);
                setModalState({ isOpen: true, title: '오류 발생', message: `데이터 생성 중 오류가 발생했습니다: ${error.message}` });
                setIsSeeding(false);
                return;
            }
            await new Promise(res => setTimeout(res, 300));
        }

        setIsSeeding(false);
        setModalState({ isOpen: true, title: '생성 완료', message: `${successCount}개의 더미 게시물 생성이 완료되었습니다.` });
    };

    const handleCloseModal = () => {
        setModalState({ isOpen: false, title: '', message: '' });
    };

    return (
        <>
            <button
                id="dummy-generator-trigger"
                type="button"
                onClick={handleSeedData}
                disabled={isSeeding}
                className="w-full h-10 opacity-0"
                aria-label="더미 데이터 생성 트리거 (개발용)"
            />
            {isSeeding && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
                    <div className="rounded-lg bg-white p-4 text-sm font-semibold text-gray-800 shadow-xl">
                        {seedingMessage}
                    </div>
                </div>
            )}
            <AlertModal
                isOpen={modalState.isOpen}
                onClose={handleCloseModal}
                title={modalState.title}
            >
                {modalState.message}
            </AlertModal>
        </>
    );
}