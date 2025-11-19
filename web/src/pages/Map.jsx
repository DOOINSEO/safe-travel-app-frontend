import React, {useState, useRef, useMemo} from 'react';
import {GoogleMap, LoadScript} from '@react-google-maps/api';
import SafetyPolygon from '../components/map/polygons/SafetyPolygon';
import MapBottomSheet from '../components/map/bottomsheet/MapBottomSheet';
import SearchBar from '../components/map/SearchBar';
import gadmData from '../data/map/gadm41_KHM_1.json';
import customGeoData from '../data/map/custom.geo.json';
import {convertGADMToPolygons, convertWorldToPolygons} from '../utils/map/geojsonConverter';

const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// Google Maps 라이브러리 (외부 변수로 선언하여 재렌더링 시 참조 유지)
const LIBRARIES = ['places'];

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
// 지역 폴리곤과 국가 폴리곤 전환 기준 줌 레벨
const REGION_TO_COUNTRY_ZOOM_THRESHOLD = 6; // 6 이하일 때 국가 폴리곤 표시

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

// 지역 단위 폴리곤 (캄보디아)
// convertGADMToPolygons에서 이미 안전단계에 따른 level이 설정됨
const regionPolygons = convertGADMToPolygons(gadmData);

// 국가 단위 폴리곤
const countryPolygons = convertWorldToPolygons(customGeoData).map((polygon) => ({
  ...polygon,
  level: 'level1',
}));

export default function Map() {
  const [selectedPolygon, setSelectedPolygon] = useState(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [mapCenter, setMapCenter] = useState(center);
  const [mapZoom, setMapZoom] = useState(DEFAULT_ZOOM);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const mapRef = useRef(null);

  // 줌 레벨에 따라 표시할 폴리곤 결정
  const shouldShowCountryPolygons = mapZoom <= REGION_TO_COUNTRY_ZOOM_THRESHOLD;
  const polygonsToRender = shouldShowCountryPolygons ? countryPolygons : regionPolygons;

  const handlePolygonClick = (polygonData) => {
    setSelectedPolygon(polygonData);
    // 국가 단위 폴리곤이 표시 중일 때는 바텀시트를 열지 않음
    const isCountryPolygon = mapZoom <= REGION_TO_COUNTRY_ZOOM_THRESHOLD;
    if (!isCountryPolygon) {
      setIsBottomSheetOpen(true);
    }
    console.log('선택된 폴리곤:', polygonData);
  };

  // 서치바에서 지역 선택 시 호출되는 핸들러
  const handlePlaceSelect = (place) => {
    if (place.location && mapRef.current) {
      const lat = place.location.lat();
      const lng = place.location.lng();
      setMapCenter({lat, lng});
      setMapZoom(10);

      // 지도 이동 및 확대
      if (mapRef.current) {
        mapRef.current.panTo({lat, lng});
        mapRef.current.setZoom(10);
      }

      // 검색된 지역명과 폴리곤 매칭 (영어명/한국어명 모두 확인)
      // 현재 줌 레벨에 따라 지역/국가 폴리곤 중에서 검색
      const searchName = place.name.toLowerCase();
      const currentPolygons = mapZoom <= REGION_TO_COUNTRY_ZOOM_THRESHOLD ? countryPolygons : regionPolygons;
      const matchedPolygon = currentPolygons.find((polygon) => {
        const polygonName = polygon.name.toLowerCase();
        const polygonNameKo = polygon.nameKo.toLowerCase();

        // 정확한 일치 또는 부분 일치 확인
        return (
          searchName.includes(polygonName) ||
          polygonName.includes(searchName) ||
          searchName.includes(polygonNameKo) ||
          polygonNameKo.includes(searchName)
        );
      });

      // 매칭된 폴리곤이 있으면 선택
      // 국가 단위 폴리곤이 아닐 때만 바텀시트 열기
      if (matchedPolygon) {
        setSelectedPolygon(matchedPolygon);
        const isCountryPolygon = mapZoom <= REGION_TO_COUNTRY_ZOOM_THRESHOLD;
        if (!isCountryPolygon) {
          setIsBottomSheetOpen(true);
        }
      }
    }
  };

  const handleMapLoad = (map) => {
    mapRef.current = map;
    setIsMapLoaded(true);
  };

  // 지도 줌 변경 감지
  const handleZoomChanged = () => {
    if (mapRef.current) {
      const currentZoom = mapRef.current.getZoom();
      setMapZoom(currentZoom);
    }
  };

  const mapOptionsMemo = useMemo(() => mapOptions, []);

  if (!googleMapsApiKey) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-gray-500">Google Maps API 키가 설정되지 않았습니다.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-screen relative">
      <LoadScript
        googleMapsApiKey={googleMapsApiKey}
        libraries={LIBRARIES}
        preventGoogleFontsLoading
        loadingElement={<div className="w-full h-screen flex items-center justify-center">지도를 불러오는 중...</div>}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={mapZoom}
          options={mapOptionsMemo}
          onLoad={handleMapLoad}
          onZoomChanged={handleZoomChanged}
        >
          {/* 폴리곤 렌더링 - 줌 레벨에 따라 지역/국가 폴리곤 전환 */}
          {isMapLoaded &&
            polygonsToRender.map((polygon) => (
              <SafetyPolygon
                key={polygon.id}
                data={polygon}
                onClick={handlePolygonClick}
                isSelected={selectedPolygon?.id === polygon.id}
              />
            ))}
        </GoogleMap>
      </LoadScript>

      {/* 서치바 - 지도 로드 완료 후에만 표시 */}
      {isMapLoaded && <SearchBar onPlaceSelect={handlePlaceSelect} map={mapRef.current} />}

      {/* 바텀시트 */}
      <MapBottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
        selectedPolygon={selectedPolygon}
      />
    </div>
  );
}
