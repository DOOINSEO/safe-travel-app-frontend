import React from 'react';
import {GoogleMap, LoadScript} from '@react-google-maps/api';

const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// ==================== 지도 기본 설정 ====================

const containerStyle = {
  width: '100%',
  height: '100vh',
};

const center = {
  lat: 11.5564,
  lng: 104.9282, // 캄보디아 프놈펜
};

const DEFAULT_ZOOM = 12;

// ==================== 지도 스타일 (POI 제거 등) ====================

const mapStyles = [
  // POI (관심 지점) 라벨 숨기기
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{visibility: 'off'}],
  },
  // 비즈니스 POI 숨기기
  {
    featureType: 'poi.business',
    stylers: [{visibility: 'off'}],
  },
  // 대중교통 정보 숨기기
  {
    featureType: 'transit',
    stylers: [{visibility: 'off'}],
  },
];

// ==================== 지도 옵션 ====================

const mapOptions = {
  disableDefaultUI: true, // 모든 기본 UI 숨김
  styles: mapStyles,
  clickableIcons: false, // 기본 POI 클릭 비활성화
};

// ==================== 메인 컴포넌트 ====================

export default function Map() {
  return (
    <div className="w-full h-screen">
      <LoadScript googleMapsApiKey={googleMapsApiKey}>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={DEFAULT_ZOOM} options={mapOptions}>
          {/* 여기에 폴리곤, 마커 등 추가 예정 */}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
