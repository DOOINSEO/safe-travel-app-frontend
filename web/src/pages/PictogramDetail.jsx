import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import { pictograms } from '../data/pictogramData';
import LanguageSelector from '../components/pictogram/LanguageSelector';
import PictogramDisplay from '../components/pictogram/PictogramDisplay';

/**
 * ID에 해당하는 픽토그램의 상세 정보와 다국어 번역을 보여주는 페이지입니다.
 */
export default function PictogramDetail() {
    const { id } = useParams();
    const pictogram = pictograms.find((p) => p.id.toString() === id);

    const [selectedLanguage, setSelectedLanguage] = useState(null);

    if (!pictogram) {
        return (
            <div className="min-h-screen bg-white p-5 text-center">
                <PageHeader title="오류" />
                <p className="mt-10">요청하신 픽토그램 정보를 찾을 수 없습니다.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <PageHeader title="픽토그램" />

            <main className="flex flex-col gap-[25px] px-[20px]">
                <LanguageSelector
                    selectedLanguage={selectedLanguage}
                    onSelectLanguage={setSelectedLanguage}
                />
                <PictogramDisplay
                    pictogram={pictogram}
                    selectedLanguage={selectedLanguage}
                />
            </main>
        </div>
    );
}