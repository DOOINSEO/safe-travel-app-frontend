import React, {useState, useEffect} from 'react';
import {getNews} from '../../../../services/newsApi';
import {Newspaper} from 'lucide-react';

export default function NewsContent({region}) {
  const [newsData, setNewsData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!region || !region.id) return;

    const fetchNews = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getNews({
          regionCode: region.id,
          size: 10,
        });

        if (response && response.isSuccess && response.data) {
          setNewsData({
            items: response.data.content || [],
            totalElements: response.data.totalElements || 0,
            totalPages: response.data.totalPages || 0,
            currentPage: response.data.number || 0,
            pageSize: response.data.size || 10,
          });
        } else {
          setNewsData({
            items: [],
            totalElements: 0,
            totalPages: 0,
            currentPage: 0,
            pageSize: 10,
          });
        }
      } catch (err) {
        console.error('뉴스 조회 실패:', err);
        setError(err.message || '뉴스를 불러오는데 실패했습니다.');
        setNewsData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [region]);

  // 날짜 포맷팅 (날짜 + 시간)
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateString;
    }
  };

  // 이벤트 카테고리 한국어 변환
  const getEventLabel = (event) => {
    const eventMap = {
      crime: '범죄',
      accident: '사고',
      gov_notice: '정부 공지',
      gov: '정부 공지',
    };
    return eventMap[event] || event;
  };

  // 이벤트 카테고리 색상
  const getEventColor = (event) => {
    const colorMap = {
      crime: 'bg-red-100 text-red-700 border-red-200',
      accident: 'bg-orange-100 text-orange-700 border-orange-200',
      gov_notice: 'bg-blue-100 text-blue-700 border-blue-200',
      gov: 'bg-blue-100 text-blue-700 border-blue-200',
    };
    return colorMap[event] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-gray-500">뉴스를 불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-5">
        <div className="rounded-md border border-red-400 bg-red-100 p-4 text-center text-red-600">{error}</div>
      </div>
    );
  }

  if (!newsData || !newsData.items || newsData.items.length === 0) {
    if (isLoading) {
      return null;
    }
    return (
      <div className="p-5">
        <p className="text-center text-gray-500">뉴스 기사가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="pb-6">
      {/* 뉴스 목록 */}
      <div className="px-5 pt-4">
        <div className="mb-4 flex items-center gap-2">
          <Newspaper className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-bold text-gray-800">{region?.nameKo || '지역'} 뉴스</h3>
          {newsData.totalElements !== undefined && (
            <span className="text-sm text-gray-500">({newsData.totalElements}건)</span>
          )}
        </div>

        <div className="space-y-4">
          {newsData.items.map((article) => (
            <div key={article.newsId} className="block rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              {/* 제목과 이벤트 카테고리 */}
              <div className="mb-2 flex items-start gap-2">
                {article.event && (
                  <span
                    className={`mt-1 shrink-0 rounded-full border px-2 py-1 text-xs font-medium ${getEventColor(
                      article.event
                    )}`}
                  >
                    {getEventLabel(article.event)}
                  </span>
                )}

                <h4 className="flex-1 text-base font-semibold text-gray-900 line-clamp-2">{article.title}</h4>
              </div>
              {/* 발행 시간 */}
              {article.publishedAt && <div className="text-sm text-gray-500">{formatDate(article.publishedAt)}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
