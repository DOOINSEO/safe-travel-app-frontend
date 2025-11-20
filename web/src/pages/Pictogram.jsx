import React, { useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import { pictograms, categories } from '../data/pictogramData'; // categories import
import CategoryFilter from '../components/pictogram/CategoryFilter';
import PictogramGrid from '../components/pictogram/PictogramGrid';

export default function Pictogram() {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const filteredPictograms = selectedCategory
        ? pictograms.filter(p => p.category === selectedCategory)
        : pictograms;

    return (
        <div className="min-h-screen bg-white">
            <PageHeader title="픽토그램" backPath="/"/>

            <main className="px-[20px]">
                <CategoryFilter
                    items={categories}
                    selectedId={selectedCategory}
                    onSelect={setSelectedCategory}
                />

                <PictogramGrid items={filteredPictograms} />
            </main>
        </div>
    );
}