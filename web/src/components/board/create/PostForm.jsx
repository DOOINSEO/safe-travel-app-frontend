import React from 'react';
import {ChevronDown, Upload, X} from 'lucide-react';
import {CAMBODIA_REGIONS} from '../../../data/regionData';

const DUMMY_LOCATIONS = [
  {country: '국가 선택', id: null, regions: [{name: '지역 선택', id: null, nameKo: '지역 선택'}]},
  {
    country: '캄보디아',
    id: 'KHM',
    regions: [
      {name: '지역 전체', id: null, nameKo: '지역 전체'},
      ...CAMBODIA_REGIONS.map((region) => ({
        name: region.name,
        id: region.id,
        nameKo: region.nameKo,
      })),
    ],
  },
  {
    country: '터키',
    id: 2,
    regions: [
      {name: '지역 전체', id: null, nameKo: '지역 전체'},
      {name: '이스탄불', id: 201, nameKo: '이스탄불'},
      {name: '앙카라', id: 202, nameKo: '앙카라'},
    ],
  },
];
const DUMMY_CATEGORIES = [
  {id: null, name: '카테고리'},
  {id: 0, name: '기상이변'},
  {id: 1, name: '교통사고'},
  {id: 2, name: '사기'},
  {id: 3, name: '소매치기'},
  {id: 4, name: '시설낙후'},
  {id: 5, name: '흉기 난동'},
  {id: 6, name: '화재'},
  {id: 7, name: '기타'},
];

export default function PostForm({
  postData,
  images,
  availableRegions,
  fileInputRef,
  handleInputChange,
  handleCountryChange,
  handleImageUpload,
  handleImageDelete,
  handleSubmit,
}) {
  const today = new Date().toLocaleDateString('ko-KR').slice(0, -1);

  return (
    <form id="create-post-form" onSubmit={handleSubmit} className="p-4 space-y-4">
      <div className="text-sm">
        <div className="flex">
          <span className="w-16 font-semibold text-gray-600">작성자</span>
          <span>Jueon</span>
        </div>
        <div className="flex mt-1">
          <span className="w-16 font-semibold text-gray-600">작성날짜</span>
          <span>{today}</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2.5">
        <div className="relative">
          <select
            onChange={handleCountryChange}
            className="w-full appearance-none rounded-md border border-gray-300 bg-white p-2.5 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {DUMMY_LOCATIONS.map((loc) => (
              <option key={loc.country} value={loc.country}>
                {loc.country}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
            <ChevronDown size={16} />
          </div>
        </div>
        <div className="relative">
          <select
            name="regionId"
            value={postData.regionId}
            onChange={handleInputChange}
            className="w-full appearance-none rounded-md border border-gray-300 bg-white p-2.5 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {availableRegions.map((region) => (
              <option key={region.id || 'all'} value={region.id || ''}>
                {region.nameKo || region.name}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
            <ChevronDown size={16} />
          </div>
        </div>
        <div className="relative">
          <select
            name="categoryId"
            value={postData.categoryId}
            onChange={handleInputChange}
            className="w-full appearance-none rounded-md border border-gray-300 bg-white p-2.5 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {DUMMY_CATEGORIES.map((cat) => (
              <option key={cat.name} value={cat.id || ''}>
                {cat.name}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
            <ChevronDown size={16} />
          </div>
        </div>
      </div>
      <textarea
        name="content"
        value={postData.content}
        onChange={handleInputChange}
        placeholder="내용을 입력해주세요."
        className="w-full h-48 rounded-lg border border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div>
        <input type="file" multiple hidden ref={fileInputRef} onChange={handleImageUpload} accept="image/*" />
        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          className="flex items-center gap-2 rounded-md border border-gray-400 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
        >
          <Upload size={16} />
          사진 업로드
        </button>
      </div>
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {images.map((image) => (
            <div key={image.id} className="relative aspect-square">
              <img src={image.previewUrl} alt="미리보기" className="h-full w-full rounded-md object-cover" />
              <button
                type="button"
                onClick={() => handleImageDelete(image.id)}
                className="absolute right-1 top-1 rounded-full bg-black/50 p-0.5 text-white hover:bg-black/70"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </form>
  );
}
