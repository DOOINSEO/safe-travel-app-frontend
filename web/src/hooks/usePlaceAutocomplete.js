import {useState, useRef, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

export function usePlaceAutocomplete(onPlaceSelect) {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [predictions, setPredictions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const autocompleteServiceRef = useRef(null);
  const placesServiceRef = useRef(null);
  const containerRef = useRef(null);

  // Google Maps Places API 서비스 초기화
  useEffect(() => {
    const initGoogleServices = () => {
      if (window.google && window.google.maps && window.google.maps.places) {
        autocompleteServiceRef.current = new window.google.maps.places.AutocompleteService();
        placesServiceRef.current = new window.google.maps.places.PlacesService(document.createElement('div'));
      }
    };

    initGoogleServices();

    // 주기적으로 확인
    const checkInterval = setInterval(() => {
      if (!autocompleteServiceRef.current && window.google && window.google.maps && window.google.maps.places) {
        initGoogleServices();
        clearInterval(checkInterval);
      }
    }, 100);

    // 5초 후에도 안되면 중단
    setTimeout(() => clearInterval(checkInterval), 5000);

    return () => clearInterval(checkInterval);
  }, []);

  // 서치바 외부 클릭 시 자동완성 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 검색 입력 시 자동완성 예측 결과 가져오기
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    // 입력값이 없으면 예측 결과 초기화
    if (!value.trim()) {
      setPredictions([]);
      setShowSuggestions(false);
      return;
    }

    // Google Maps API가 아직 로드되지 않았으면 초기화 시도
    if (!autocompleteServiceRef.current) {
      if (window.google && window.google.maps && window.google.maps.places) {
        autocompleteServiceRef.current = new window.google.maps.places.AutocompleteService();
        placesServiceRef.current = new window.google.maps.places.PlacesService(document.createElement('div'));
      } else {
        console.warn('Google Maps Places API가 아직 로드되지 않았습니다.');
        return;
      }
    }

    setIsLoading(true);

    // 지역 단위로만 검색 (도시, 행정구역)
    autocompleteServiceRef.current.getPlacePredictions(
      {
        input: value,
        types: ['(cities)'], // 도시 단위만 검색
      },
      (predictions, status) => {
        setIsLoading(false);
        if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
          // 지역 단위만 필터링 (구체적인 장소 제외)
          const filteredPredictions = predictions.filter((prediction) => {
            const types = prediction.types || [];
            // 도시, 행정구역만 허용
            return (
              types.includes('locality') ||
              types.includes('administrative_area_level_1') ||
              types.includes('administrative_area_level_2') ||
              types.includes('political')
            );
          });
          setPredictions(filteredPredictions);
          setShowSuggestions(true);
        } else {
          setPredictions([]);
          setShowSuggestions(false);
        }
      }
    );
  };

  // 자동완성 결과 선택 시 상세 정보 조회 및 부모 컴포넌트에 전달
  const handleSelectPlace = (placeId) => {
    if (!placesServiceRef.current) return;

    placesServiceRef.current.getDetails(
      {
        placeId: placeId,
        fields: ['geometry', 'name', 'formatted_address'],
      },
      (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
          setSearchValue(place.name);
          setShowSuggestions(false);

          // 선택된 장소 정보를 부모 컴포넌트(Map)에 전달
          if (onPlaceSelect && place.geometry) {
            onPlaceSelect({
              location: place.geometry.location,
              name: place.name,
              address: place.formatted_address,
            });
          }
        }
      }
    );
  };

  // 뒤로가기 버튼 클릭 시 홈 페이지로 이동
  const handleBack = () => {
    navigate('/');
  };

  return {
    searchValue,
    setSearchValue,
    predictions,
    showSuggestions,
    setShowSuggestions,
    isLoading,
    inputRef,
    containerRef,
    handleInputChange,
    handleSelectPlace,
    handleBack,
  };
}


