import apiClient from './apiClient';

// 뉴스 기사 조회
export const getNews = async (options = {}) => {
  const {
    regionCode,
    page,
    size = 10,
    sort,
    event,
    q, // 검색어
  } = options;

  const params = {};
  
  if (regionCode) params.regionCode = regionCode;
  if (page !== undefined) params.page = page;
  if (size !== undefined) params.size = size;
  if (sort !== undefined) params.sort = sort;
  if (event) params.event = event;
  if (q) params.q = q;

  return await apiClient.get(`/news`, {
    params,
  });
};

