import apiClient from './apiClient';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL || 'https://safeapplicationserver.onrender.com';

const getImageUrl = (imagePath) => {
  if (imagePath.startsWith('http')) return imagePath;
  if (imagePath.startsWith('/')) {
    let normalizedPath = imagePath;

    // postimages를 postImages로 정규화
    if (normalizedPath.toLowerCase().includes('/postimages/')) {
      normalizedPath = normalizedPath.replace(/\/postimages\//gi, '/postImages/');
    }

    // 이미지 전용 환경변수 사용
    return `${IMAGE_BASE_URL}${normalizedPath}`;
  }
  return imagePath;
};

const transformImages = (images) => {
  if (!images || !Array.isArray(images)) return [];
  return images.map((img) => ({
    imageId: img.imageId,
    postId: img.postId,
    imgPath: getImageUrl(img.imgPath || img.filePath),
    order: img.order,
  }));
};

const transformPost = (postData) => {
  return {
    postId: postData.postId,
    userId: postData.userId,
    userNickname: postData.userNickname,
    content: postData.content,
    categoryId: postData.categoryId,
    categoryName: postData.categoryName,
    regionCode: postData.regionCode,
    regionId: postData.regionCode,
    country: postData.country,
    region: postData.region,
    countryId: postData.regionCode?.startsWith('KHM') ? 'KHM' : null,
    locationName: `${postData.country} - ${postData.region}`,
    images: transformImages(postData.images),
    likeCount: postData.likeCount || 0,
    isLike: postData.isLike || false,
    createdAt: postData.createdAt,
  };
};

// 게시물 목록 조회
export const getPosts = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams();

    if (params.sort) {
      queryParams.append('sort', params.sort);
    }
    if (params.categoryId !== null && params.categoryId !== undefined) {
      queryParams.append('categoryId', String(params.categoryId));
    }
    if (params.regionCode) {
      queryParams.append('regionCode', String(params.regionCode));
    }
    queryParams.append('page', String(params.page || 0));
    queryParams.append('size', String(params.size || 20));

    const queryString = queryParams.toString();
    const url = `/posts${queryString ? `?${queryString}` : ''}`;

    const response = await apiClient.get(url);

    if (response.isSuccess && response.data) {
      return response.data.content.map(transformPost);
    }
    return [];
  } catch (error) {
    console.error('게시물 목록 조회 실패:', error);
    throw error;
  }
};

// 게시물 상세 조회
export const getPost = async (postId) => {
  try {
    const response = await apiClient.get(`/posts/${postId}`);

    if (response.isSuccess && response.data) {
      return transformPost(response.data);
    }
    throw new Error(response.message || '게시물을 찾을 수 없습니다.');
  } catch (error) {
    console.error('게시물 상세 조회 실패:', error);
    throw error;
  }
};

// 게시물 생성
export const createPost = async (postData) => {
  const formData = new FormData();

  formData.append('content', postData.content.trim());
  formData.append('categoryId', String(postData.categoryId));
  formData.append('regionCode', String(postData.regionCode));

  if (postData.images && postData.images.length > 0) {
    postData.images.forEach((image, index) => {
      if (image.file) {
        formData.append(`images[${index}].file`, image.file);
        formData.append(`images[${index}].order`, String(index));
      }
    });
  }

  // formData 형식
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      ...(token && {Authorization: `Bearer ${token}`}),
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({message: '게시물 작성에 실패했습니다.'}));
    throw new Error(errorData.message || '게시물 작성에 실패했습니다.');
  }

  const result = await response.json();
  if (result.isSuccess && result.data) {
    return result.data;
  }
  throw new Error(result.message || '게시물 작성에 실패했습니다.');
};

// 게시물 수정
export const updatePost = async (postId, postData) => {
  const formData = new FormData();

  formData.append('content', postData.content.trim());
  formData.append('categoryId', String(postData.categoryId));
  formData.append('regionCode', String(postData.regionCode));

  if (postData.images && postData.images.length > 0) {
    postData.images.forEach((image, index) => {
      if (image.file) {
        formData.append(`images[${index}].file`, image.file);
        formData.append(`images[${index}].order`, String(index));
      } else if (image.imgPath || image.filePath) {
        let imgPath = image.imgPath || image.filePath;

        if (imgPath.startsWith('blob:')) {
          return;
        }

        if (imgPath.startsWith('http://') || imgPath.startsWith('https://')) {
          if (imgPath.startsWith(API_BASE_URL)) {
            imgPath = imgPath.replace(API_BASE_URL, '');
          } else {
            console.warn('외부 이미지 URL은 지원하지 않습니다:', imgPath);
            return;
          }
        }
        formData.append(`images[${index}].imgPath`, imgPath);
        formData.append(`images[${index}].order`, String(index));
      }
    });
  }

  const token = localStorage.getItem('token');
  const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
    method: 'PUT',
    headers: {
      ...(token && {Authorization: `Bearer ${token}`}),
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({message: '게시물 수정에 실패했습니다.'}));
    throw new Error(errorData.message || '게시물 수정에 실패했습니다.');
  }

  const result = await response.json();
  if (result.isSuccess && result.data) {
    return transformPost(result.data);
  }
  throw new Error(result.message || '게시물 수정에 실패했습니다.');
};

// 게시물 삭제
export const deletePost = async (postId) => {
  await apiClient.delete(`/posts/${postId}`);
};

// 댓글 생성
export const createComment = async (postId, content) => {
  const response = await apiClient.post('/comments', {postId, content});
  return response.data;
};

// 댓글 목록 조회
export const getComments = async (postId) => {
  const response = await apiClient.get(`/comments?postId=${postId}`);
  return response.data || [];
};

// 댓글 수정
export const updateComment = async (commentId, postId, content) => {
  const response = await apiClient.put(`/comments/${commentId}`, {postId, content});
  return response.data;
};

// 댓글 삭제
export const deleteComment = async (commentId) => {
  await apiClient.delete(`/comments/${commentId}`);
};

// 좋아요 조회 (내 추천 여부)
export const getLikeStatus = async (postId) => {
  try {
    const response = await apiClient.get(`/likes?postId=${postId}`);
    if (response.isSuccess && response.data !== undefined) {
      return response.data; // true 또는 false
    }
    return false;
  } catch (error) {
    console.error('좋아요 조회 실패:', error);
    return false;
  }
};

// 좋아요 생성
export const createLike = async (postId, userId = null) => {
  try {
    const body = {postId: postId};
    if (userId) {
      body.userId = userId;
    }
    const response = await apiClient.post('/likes', body);
    if (response.isSuccess) {
      return response.data;
    }
    throw new Error(response.message || '좋아요 생성에 실패했습니다.');
  } catch (error) {
    console.error('좋아요 생성 실패:', error);
    throw error;
  }
};

// 좋아요 삭제
export const deleteLike = async (postId) => {
  try {
    await apiClient.delete(`/likes?postId=${postId}`);
  } catch (error) {
    console.error('좋아요 삭제 실패:', error);
    throw error;
  }
};

// 좋아요 토글 (생성/삭제)
export const toggleLike = async (postId, currentIsLike) => {
  try {
    if (currentIsLike) {
      // 이미 좋아요가 있으면 삭제
      await deleteLike(postId);
      return {postId, isLike: false};
    } else {
      // 좋아요가 없으면 생성
      const userId = localStorage.getItem('userId');
      const result = await createLike(postId, userId ? parseInt(userId, 10) : null);
      // API 응답에서 현재 상태를 확인
      return {postId, isLike: true};
    }
  } catch (error) {
    console.error('좋아요 토글 실패:', error);
    throw error;
  }
};
