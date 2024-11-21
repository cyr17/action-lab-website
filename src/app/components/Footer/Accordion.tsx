'use client';

import React, { useState } from 'react';

interface AccordionProps {
  title: string;
  items: { link: any }[]; // Adjust `any` to your specific type for `link`
}

const Accordion: React.FC<AccordionProps> = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => setIsOpen((prev) => !prev);

  return (
    <div>
      <button
        className="w-full flex justify-between items-center py-4 px-6 text-white border-b-2 border-white"
        onClick={toggleAccordion}
      >
        <span>{title}</span>
        <svg
          className={`w-4 h-4 transform transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <ul
        className={`transition-all overflow-hidden ${isOpen ? 'max-h-screen' : 'max-h-0'}`}
        style={{ transition: 'max-height 0.3s ease' }}
      >
        {items.map(({ link }, index) => (
          <li key={index} className="py-2 px-6">
            <a href={link.url} className="text-white">
              {link.label}
            </a>
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Accordion;
