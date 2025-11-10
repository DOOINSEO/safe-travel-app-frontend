// --- Mock Data ---
const mockPosts = [
    {
        id: 1,
        author: 'Jueon',
        date: '2025.04.25',
        content: '새벽 해변 근처에서 해파리 출몰했습니다. 모래사장 근처에도 엄청 많이 보이니, 어린이 동반 여행객은 주의하는게 좋을 것 같네요.',
        images: ['https://via.placeholder.com/300x200'],
        likes: 212,
        location: '캄보디아 - 시엠레아프',
    },
    {
        id: 2,
        author: 'Dongho Park',
        date: '2025.04.25',
        content: '이스탄불 관광지 주변에서 가짜 기념품 상인들이 접근합니다. 가격 흥정 전에 제품 확인하고, 현금보다는 카드 사용을 추천드려요.',
        images: [
            'https://via.placeholder.com/150',
            'https://via.placeholder.com/150',
            'https://via.placeholder.com/150',
            'https://via.placeholder.com/150',
        ],
        likes: 212,
        location: '터키 - 이스탄불',
    },
];

/**
 * 게시물 목록을 가져오는 API (현재는 목업)
 * @param {object} filters - 필터링 조건 (country, region, category)
 */
export const getPosts = async (filters) => {
    console.log('Fetching posts with filters:', filters);
    // TODO: apiClient.get('/board', { params: filters });
    return new Promise(resolve => setTimeout(() => resolve(mockPosts), 500));
};

/**
 * 새 게시물을 생성하는 API (현재는 목업)
 * @param {object} postData - 새 게시물 데이터
 */
export const createPost = async (postData) => {
    console.log('Creating new post:', postData);
    // TODO: apiClient.post('/board', postData);
    return new Promise(resolve => setTimeout(() => resolve({ success: true, newPost: { id: Date.now(), ...postData } }), 500));
};