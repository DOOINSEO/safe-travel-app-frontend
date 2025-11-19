import apiClient from './apiClient';

// 위험도 평가 단건 조회 (지역별)
export const getRiskByRegion = async (regionCode) => {
  return await apiClient.get(`/risk/${regionCode}`);
};
