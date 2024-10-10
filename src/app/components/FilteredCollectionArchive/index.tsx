'use client';
import React, { useState  } from 'react';
import { cn } from '@/utilities/cn';
import { Card } from '../Card';
import { init } from 'next/dist/compiled/webpack/webpack';
import {PrimaryCard } from '../PrimaryCard'
import { get } from 'http';

export type Props = {
  items: any[],
  collection: any,
  filter: any,
};

const colors = [
  'bg-black',
  'bg-purple-500',
  'bg-red-600',
  'bg-green-300',
  'bg-yellow-500',
  'bg-blue-500',
  'bg-orange-500',
  'bg-pink-500',
  'bg-green-600',
]

const hoverCategoryColors = [
  'hover:border-b-4 hover:border-l-0 border-black bg-white text-black',
  'hover:border-b-4 hover:border-l-0 border-purple-500 bg-white text-black',
  'hover:border-b-4 hover:border-l-0 border-red-600 bg-white text-black',
  'hover:border-b-4 hover:border-l-0 border-green-300 bg-white text-black',
  'hover:border-b-4 hover:border-l-0 border-yellow-500 bg-white text-black',
  'hover:border-b-4 hover:border-l-0 border-blue-500 bg-white text-black',
  'hover:border-b-4 hover:border-l-0 border-orange-500 bg-white text-black',
  'hover:border-b-4 hover:border-l-0 border-pink-500 bg-white text-black',
  'hover:border-b-4 hover:border-l-0 border-green-600 bg-white text-black',
]


const selectedCategoryStyles = [
  'p-2 bg-black text-white',
  'p-2 bg-purple-500 text-white',
  'p-2 bg-red-600 text-white',
  'p-2 bg-green-300 text-white',
  'p-2 bg-yellow-500 text-white',
  'p-2 bg-blue-500 text-white',
  'p-2 bg-orange-500 text-white',
  'p-2 bg-pink-500 text-white',
  'p-2 bg-green-600 text-white',
]

const defaultCategoryStyles = [
  'border-l-4 border-black bg-white text-black',
  'border-l-4 border-purple-500 bg-white text-black',
  'border-l-4 border-red-600 bg-white text-black',
  'border-l-4 border-green-300 bg-white text-black',
  'border-l-4 border-yellow-500 bg-white text-black',
  'border-l-4 border-blue-500 bg-white text-black',
  'border-l-4 border-orange-500 bg-white text-black',
  'border-l-4 border-pink-500 bg-white text-black',
  'border-l-4 border-green-600 bg-white text-black',
]

export const FilteredCollectionArchive: React.FC<Props> = (props) => {
  const { items: initialItems, collection, filter } = props;

  // add "ALL" to the first index of filter
  if (!filter.some(f => f.title === 'See All')) {
    filter.unshift({ title: 'See All' });
  }
  // Add state for filtered items and selected category
  const [selectedCategory, setSelectedCategory] = useState("See All");
  const [filteredItems, setFilteredItems] = useState(initialItems);

  // Function to handle filtering logic
  const handleCategorySelect = (category: string) => {

    if (category === "See All") {

      setFilteredItems(initialItems);
      setSelectedCategory("See All");
    }

    else{
      setSelectedCategory(category);

      // Filter items based on the selected category (impactAreas title)
      const filtered = initialItems.filter((item) => {
        return item.impactAreas?.some((impactArea) => impactArea.title === category);
      });
      
      setFilteredItems(filtered);
    }
  };
  
  const cardColor = (impactArea:String) => {
    // find index of impactArea in filter
    const index = filter.findIndex((item) => item.title === impactArea);
    // return color from colors array
    return colors[index];
  }

  return (
    <div className={cn('container')}>
      {/* Filter Categories */}
      <div className="py-4 grid gap-8 lg:grid-cols-12">
        <div className='lg:col-span-6 text-center sm:text-left lg:pl-24'>
          <h1 className="text-2xl font-bold">
          {
            selectedCategory === "See All" ? "Case Studies" : selectedCategory
          }
          </h1>
        </div>
        <div className='md:col-span-6'>
        <div className="flex flex-wrap gap-4 justify-left">
          {filter?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div key={index}>
                  <a className={cn(
                    'cursor-pointer text-lg font-bold ',
                    

                    { [selectedCategoryStyles[index]]: selectedCategory === result.title },
                    { [defaultCategoryStyles[index]]: selectedCategory !== result.title },
                    { [hoverCategoryColors[index]]: selectedCategory !== result.title },
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
      </div>

      {/* Display Filtered Items */}
      <div className="grid grid-cols-4 sm:grid-cols-8 md:grid-cols-12 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
        {filteredItems?.map((result, index) => {
          if (typeof result === 'object' && result !== null) {
            return (
              <div className="col-span-4 sm:col-span-4 md:col-span-4 lg:col-span-3" key={index}>
                <PrimaryCard className="h-full" doc={result} relationTo={collection} color={cardColor(result.impactAreas[0].title)} />
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};
