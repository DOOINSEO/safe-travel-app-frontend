import apiClient from './apiClient';

// 위험도 평가 조회
export const getRiskByRegion = async (regionCode) => {
  return await apiClient.get(`/risk/${regionCode}`);
};
