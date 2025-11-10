import React from 'react';

/**
 * 픽토그램 이미지와 다국어 텍스트를 표시합니다.
 * 어떤 언어든 동적으로 처리할 수 있도록 설계되었습니다.
 * @param {{ image: string, translations: { ko: string, en: string, [key: string]: string } }} props.pictogram
 * @param {{ code: string, name: string } | null} props.selectedLanguage
 */
export default function PictogramDisplay({ pictogram, selectedLanguage }) {
    // 기본 언어(한국어, 영어)는 항상 표시합니다.
    const { ko: korean, en: english } = pictogram.translations;

    // 선택된 언어의 번역을 동적으로 찾습니다. 없으면 null이 됩니다.
    const selectedTranslation = selectedLanguage
        ? pictogram.translations[selectedLanguage.code]
        : null;

    return (
        <div className="flex flex-col items-center text-center">
            <div className="flex h-[320px] w-[320px] items-center justify-center">
                <img src={pictogram.image} alt={korean} className="max-h-full max-w-full object-contain" />
            </div>

            <div className="w-full pt-[13px]">
                <div className="flex flex-col items-center gap-[5px]">
                    <p className="text-xl font-semibold text-gray-800">{korean}</p>
                    <p className="text-lg font-bold text-gray-900">{english}</p>

                    {/* 선택된 언어의 번역이 존재할 경우에만 표시합니다. */}
                    {selectedTranslation && (
                        <p className="text-lg font-bold text-gray-900">{selectedTranslation}</p>
                    )}
                </div>
            </div>
        </div>
    );
}