'use client'
import { cn } from '@/utilities/cn'
import React, { useRef } from 'react'
import { Card } from '../Card'

export type Props = {
  items: any[],
  collection: any,
}

export const SliderArchive: React.FC<Props> = (props) => {
  const { items, collection } = props
  
  // Reference for the scrollable div
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleScrollLeft = () => {
    if (scrollRef.current) {
      // Scroll left by the width of one child element (e.g., card)
      scrollRef.current.scrollBy({ left: -240, behavior: 'smooth' })
    }
  }

  const handleScrollRight = () => {
    if (scrollRef.current) {
      // Scroll right by the width of one child element (e.g., card)
      scrollRef.current.scrollBy({ left: 240, behavior: 'smooth' })
    }
  }

  return (
    <div className={cn('w-[calc(100vw)] sm:pl-20')}>
      <div className="relative">
        {/* Wrapper for the scrollable container */}
        <div 
          className="flex gap-4 overflow-x-scroll scroll-smooth snap-x snap-mandatory no-scrollbar" 
          ref={scrollRef}
        >
          {items?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div className="snap-start min-w-[240px] flex-shrink-0" key={index}>
                  {/* Each card now has a fixed width to allow horizontal scrolling */}
                  <Card doc={result} relationTo={collection} showImpactAreas widthClass='w-[240px] sm:w-[300px]' />
                </div>
              )
            }
            return null
          })}
        </div>
        
         {/* Buttons positioned below the slider */}
      <div className="flex justify-end mr-20 gap-4 mt-4">
        <button
          className="border-2 border-black border-solid flex items-center justify-center text-2xl rounded-full w-[4rem] h-[4rem] p-2 bg-black/10 text-white cursor-pointer"
          onClick={handleScrollLeft}
        >
          <svg width="18" height="32" viewBox="0 0 18 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.6033 2.00244L2.39686 16.2089L16.1854 29.9974" stroke="black" strokeWidth="3"/>
          </svg>

        </button>
        
        <button
          className="border-2 border-black border-solid flex items-center justify-center text-2xl rounded-full w-[4rem] h-[4rem] p-2 bg-black/10 text-white cursor-pointer"
          onClick={handleScrollRight}
        >
          <svg width="18" height="32" viewBox="0 0 18 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.39673 2.00244L15.6031 16.2089L1.81456 29.9974" stroke="black" strokeWidth="3"/>
          </svg>

        </button>
        </div>
      </div>
    </div>
  )
}
