import React, {useState} from 'react';
import {GoogleMap, LoadScript} from '@react-google-maps/api';
import SafetyPolygon from '../components/map/polygons/SafetyPolygon';
import MapBottomSheet from '../components/map/bottomsheet/MapBottomSheet';
import gadmData from '../data/map/gadm41_KHM_1.json';
import {convertGADMToPolygons} from '../utils/map/geojsonConverter';

const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const containerStyle = {
  width: '100%',
  height: '100vh',
};

// 캄보디아 프놈펜
const center = {
  lat: 11.5564,
  lng: 104.9282,
};

const DEFAULT_ZOOM = 8;

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

const mapOptions = {
  disableDefaultUI: true, // 모든 기본 UI 숨김
  styles: mapStyles,
  clickableIcons: false, // 기본 POI 클릭 비활성화
};

// GeoJSON을 폴리곤 배열로 변환
const convertedPolygons = convertGADMToPolygons(gadmData);

// 임시 안전 등급
const safetyLevelMap = {
  프놈펜: 'safe',
  칸달: 'caution',
  시아누크빌: 'warning',
  바탐방: 'danger',
};

// 안전 등급 적용
const samplePolygons = convertedPolygons.map((polygon) => ({
  ...polygon,
  level: safetyLevelMap[polygon.nameKo] || 'safe',
}));

export default function Map() {
  const [selectedPolygon, setSelectedPolygon] = useState(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const handlePolygonClick = (polygonData) => {
    setSelectedPolygon(polygonData);
    setIsBottomSheetOpen(true);
    console.log('선택된 폴리곤:', polygonData);
  };

  return (
    <div className="w-full h-screen">
      <LoadScript googleMapsApiKey={googleMapsApiKey}>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={DEFAULT_ZOOM} options={mapOptions}>
          {/* 폴리곤 렌더링 */}
          {samplePolygons.map((polygon) => (
            <SafetyPolygon
              key={polygon.id}
              data={polygon}
              onClick={handlePolygonClick}
              isSelected={selectedPolygon?.id === polygon.id}
            />
          ))}
        </GoogleMap>
      </LoadScript>

      {/* 바텀시트 */}
      <MapBottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
        selectedPolygon={selectedPolygon}
      />
    </div>
  );
}
