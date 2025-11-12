import React, {useState, useEffect} from 'react';

export default function InfoContent({region}) {
  const [placeInfo, setPlaceInfo] = useState(null);
  const [wikiInfo, setWikiInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!region || !window.google) return;

    setLoading(true);
    setPlaceInfo(null);
    setWikiInfo(null);

    // 1. Google Places API - 사진 가져오기
    const service = new google.maps.places.PlacesService(document.createElement('div'));
    const request = {
      query: `${region.name} Cambodia`,
      fields: ['photos'],
    };

    service.findPlaceFromQuery(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results?.[0]) {
        console.log('Place 정보:', results[0]);
        setPlaceInfo(results[0]);
      }
      setLoading(false);
    });

    // 2. Wikipedia API - 지역 소개 가져오기
    const fetchWikipedia = async () => {
      try {
        // 한국어 위키백과 시도
        let response = await fetch(
          `https://ko.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(region.nameKo)}`
        );

        // 한국어가 없으면 영어 위키백과 시도
        if (!response.ok) {
          response = await fetch(
            `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(region.name)}`
          );
        }

        if (response.ok) {
          const data = await response.json();
          console.log('Wikipedia 정보:', data);
          setWikiInfo(data);
        }
      } catch (error) {
        console.error('Wikipedia API 오류:', error);
      }
    };

    fetchWikipedia();
  }, [region]);

  if (loading) {
    return (
      <div className="p-5 flex items-center justify-center h-40">
        <div className="text-gray-400">지역 정보를 불러오는 중...</div>
      </div>
    );
  }

  if (!placeInfo) {
    return (
      <div className="p-5">
        <p className="text-gray-500">지역 정보를 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="pb-6">
      {/* 지역 사진 */}
      {placeInfo?.photos && placeInfo.photos.length > 0 ? (
        <div className="relative h-56 overflow-hidden">
          <img
            src={placeInfo.photos[0].getUrl({maxWidth: 800, maxHeight: 400})}
            alt={region.nameKo}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h2 className="text-white font-bold text-2xl mb-1">{region.nameKo}</h2>
            <p className="text-white/90 text-sm">{region.name}</p>
          </div>
        </div>
      ) : (
        <div className="relative h-56 bg-gradient-to-br from-indigo-600 via-blue-500 to-cyan-400 flex items-center justify-center">
          <div className="text-center px-5">
            <h2 className="text-white font-bold text-2xl mb-2">{region.nameKo}</h2>
            <p className="text-white/90 text-sm">{region.name}</p>
          </div>
        </div>
      )}

      {/* 지역 소개 (Wikipedia) */}
      {wikiInfo?.extract && (
        <div className="px-5 pt-6">
          <h3 className="text-lg font-bold text-gray-800 mb-3">지역 소개</h3>
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{wikiInfo.extract}</p>
        </div>
      )}
    </div>
  );
}
