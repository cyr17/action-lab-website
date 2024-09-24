'use client';
import React, { useState } from 'react';
import { cn } from '@/utilities/cn';
import { Card } from '../Card';
import { init } from 'next/dist/compiled/webpack/webpack';

export type Props = {
  items: any[],
  collection: any,
  filter: any,
};

export const FilteredCollectionArchive: React.FC<Props> = (props) => {
  const { items: initialItems, collection, filter } = props;

  // Add state for filtered items and selected category
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredItems, setFilteredItems] = useState(initialItems);

  // Function to handle filtering logic
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);

    // Filter items based on the selected category (impactAreas title)
    const filtered = initialItems.filter((item) => {
      return item.impactAreas?.some((impactArea) => impactArea.title === category);
    });
    
    setFilteredItems(filtered);
  };

  return (
    <div className={cn('container')}>
      {/* Filter Categories */}
      <div className="py-4">
        <div className="flex flex-wrap gap-4 justify-center">
          {filter?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div key={index}>
                  <a
                    className={cn(
                      `cursor-pointer text-lg font-bold `,
                      'hover:bg-gray-200 px-2 py-1 rounded-sm transition-colors duration-300',
                      selectedCategory === result.title && 'text-blue-700' // Active state
                    )}
                    onClick={() => handleCategorySelect(result.title)}
                  >
                    {result.title}
                  </a>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>

      {/* Display Filtered Items */}
      <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
        {filteredItems?.map((result, index) => {
          if (typeof result === 'object' && result !== null) {
            return (
              <div className="col-span-4" key={index}>
                <Card className="h-full" doc={result} relationTo={collection} />
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};
