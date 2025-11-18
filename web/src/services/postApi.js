import apiClient from './apiClient';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const getImageUrl = (imagePath) => {
  if (imagePath.startsWith('http')) return imagePath;
  if (imagePath.startsWith('/')) {
    let normalizedPath = imagePath;
    if (imagePath.toLowerCase().includes('/postimages/')) {
      normalizedPath = imagePath.replace(/\/postimages\//gi, '/postImages/');
    }
    return `${API_BASE_URL}${normalizedPath}`;
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

export const toggleLike = async (postId) => {
  // TODO: 서버에 좋아요 API가 구현되면 추가
  // 현재는 클라이언트에서만 상태 관리
  return {postId, isLike: true};
};
