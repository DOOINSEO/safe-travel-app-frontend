export const DUMMY_POSTS = [{
    postId: 1,
    userId: 101,
    userNickname: 'Jueon',
    content: '세부 해변 근처에서 해파리 출몰했습니다. 모래사장 근처에도 엄청 많이 보이니, 어린이 동반 여행객은 주의하는게 좋을 것 같네요. 다들 안전 여행 하시길 바랍니다!',
    categoryId: 1,
    categoryName: '기상이변',
    countryId: 1,
    locationId: 101,
    locationName: '캄보디아 - 시엠레아프',
    country: '캄보디아',
    region: '시엠레아프',
    images: [{
        imageId: 1,
        postId: 1,
        imgPath: 'https://cdn.newspenguin.com/news/photo/202210/12586_38370_1011.jpeg',
        order: 0
    }, {imageId: 5, postId: 1, imgPath: 'https://image.dongascience.com/Photo/2017/02/14860887121959.jpg', order: 1}],
    likeCount: 212,
    isLike: false,
    createdAt: '2025-04-25T10:00:00Z',
}, {
    postId: 2,
    userId: 102,
    userNickname: 'Dongho Park',
    content: '이스탄불 관광지 주변에서 가짜 기념품 상인들이 접근합니다...',
    categoryId: 2,
    categoryName: '소매치기',
    countryId: 2,
    locationId: 201,
    locationName: '터키 - 이스탄불',
    country: '터키',
    region: '이스탄불',
    images: [{imageId: 2, postId: 2, imgPath: 'https://i.ytimg.com/vi/ZH4O7dLJ4Oc/maxresdefault.jpg', order: 0},],
    likeCount: 158,
    isLike: true,
    createdAt: '2025-04-25T09:00:00Z',
},];

export const DUMMY_COMMENTS = [{
    commentId: 1,
    postId: 1,
    userId: 102,
    userNickname: 'Dongho Park',
    content: '정보 감사합니다! 조심해야겠네요.',
    createdAt: '2025-04-25T11:00:00Z'
}, {
    commentId: 2,
    postId: 1,
    userId: 103,
    userNickname: 'Chris',
    content: '저도 얼마 전에 봤어요. 정말 많더라고요.',
    createdAt: '2025-04-25T11:30:00Z'
}, {
    commentId: 3,
    postId: 2,
    userId: 101,
    userNickname: 'Jueon',
    content: '카드 사용이 좋겠네요.',
    createdAt: '2025-04-25T12:00:00Z'
},];