import React, { useState } from 'react';

// lucide-react 아이콘 임포트 (실제 환경에서는 설치가 필요합니다)
// 아이콘을 사용하기 위해 임의의 SVG로 대체하거나,
// lucide-react가 설치된 환경이라고 가정합니다.
// 여기서는 간단한 SVG로 아이콘을 대체합니다.

const ChevronDown = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
        <path d="m6 9 6 6 6-6" />
    </svg>
);

const Pencil = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
        <path d="m15 5 4 4" />
    </svg>
);

const Globe = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
    </svg>
);

const MapPin = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);


// 게시판 페이지 컴포넌트
export default function App() {
    // 상태 관리
    const [selectedCountry, setSelectedCountry] = useState('all');
    const [selectedRegion, setSelectedRegion] = useState('all');
    const [sortBy, setSortBy] = useState('latest'); // 'latest' 또는 'recommended'

    // 더미 데이터
    const dummyPosts = [
        {
            id: 1,
            title: '첫 번째 게시글입니다. 여행 후기!',
            author: '김여행',
            createdAt: '2025-10-30',
            recommendations: 15,
            country: '일본',
            region: '도쿄',
            contentSnippet: '이번에 도쿄에 다녀왔는데, 정말 좋았던 맛집과...',
        },
        // 필요시 더미 데이터 추가
    ];

    const [posts, setPosts] = useState(dummyPosts);

    // 셀렉트 박스 컴포넌트 (스타일 재사용을 위해)
    const SelectBox = ({ id, label, value, onChange, children }) => (
        <div className="relative">
            <label htmlFor={id} className="sr-only">{label}</label>
            <select
                id={id}
                value={value}
                onChange={onChange}
                className="block w-full md:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm appearance-none bg-white"
            >
                {children}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <ChevronDown />
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8 font-sans">
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="p-6 md:p-8">
                    {/* 페이지 타이틀 */}
                    <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
                        여행 게시판
                    </h1>

                    {/* 필터 및 컨트롤 바 */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 flex-wrap">
                        {/* 왼쪽: 필터 */}
                        <div className="flex gap-3 flex-wrap">
                            <SelectBox
                                id="country-filter"
                                label="나라별"
                                value={selectedCountry}
                                onChange={(e) => setSelectedCountry(e.target.value)}
                            >
                                <option value="all">나라 (전체)</option>
                                <option value="한국">한국</option>
                                <option value="일본">일본</option>
                                <option value="미국">미국</option>
                                <option value="유럽">유럽</option>
                            </SelectBox>

                            <SelectBox
                                id="region-filter"
                                label="지역별"
                                value={selectedRegion}
                                onChange={(e) => setSelectedRegion(e.target.value)}
                            >
                                <option value="all">지역 (전체)</option>
                                <option value="서울">서울</option>
                                <option value="도쿄">도쿄</option>
                                <option value="뉴욕">뉴욕</option>
                                <option value="파리">파리</option>
                            </SelectBox>
                        </div>

                        {/* 오른쪽: 정렬 및 글쓰기 */}
                        <div className="flex gap-3 flex-wrap">
                            <SelectBox
                                id="sort-order"
                                label="정렬"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="latest">최신순</option>
                                <option value="recommended">추천순</option>
                            </SelectBox>

                            <button
                                onClick={() => console.log('글쓰기 페이지로 이동')}
                                className="flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-md font-semibold shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                            >
                                <Pencil />
                                <span className="ml-2">글쓰기</span>
                            </button>
                        </div>
                    </div>

                    {/* 게시글 목록 */}
                    <div className="mt-8 space-y-5">
                        {posts.length > 0 ? (
                            posts.map((post) => (
                                <article
                                    key={post.id}
                                    className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer"
                                >
                                    <div className="p-5">
                                        {/* 태그 */}
                                        <div className="flex flex-wrap gap-2 mb-3">
                      <span className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        <Globe />
                        <span className="ml-1">{post.country}</span>
                      </span>
                                            <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        <MapPin />
                        <span className="ml-1">{post.region}</span>
                      </span>
                                        </div>

                                        {/* 제목 및 작성자 */}
                                        <div className="flex justify-between items-start mb-2">
                                            <h2 className="text-xl font-bold text-gray-900 transition-colors">
                                                {/* 실제로는 Link 컴포넌트를 사용합니다 */}
                                                <a href="#">{post.title}</a>
                                            </h2>
                                        </div>

                                        <p className="text-gray-600 text-sm mb-4">
                                            {post.contentSnippet}
                                        </p>

                                        {/* 메타 정보 (하단) */}
                                        <div className="flex justify-between items-center text-sm text-gray-500 pt-3 border-t border-gray-100">
                                            <span>작성자: {post.author}</span>
                                            <div className="flex gap-4">
                                                <span>추천: {post.recommendations}</span>
                                                <span>작성일: {post.createdAt}</span>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            ))
                        ) : (
                            <div className="text-center text-gray-500 py-10">
                                게시글이 없습니다.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
