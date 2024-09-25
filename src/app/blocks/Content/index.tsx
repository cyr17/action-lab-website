import { cn } from '@/utilities/cn';
import React from 'react';
import RichText from 'src/app/components/RichText';

import type { Page } from '../../../payload-types';

import { CMSLink } from '../../components/Link';

type Props = Extract<Page['layout'][0], { blockType: 'content' }>;

export const ContentBlock: React.FC<
  {
    id?: string;
  } & Props
> = (props) => {
  const { columns } = props;

  const sizeClasses = {
    full: 'w-full',
    half: 'w-1/2',
    oneThird: 'w-1/3',
    twoThirds: 'w-2/3',
  };

  const alignmentClasses = {
    left: 'ml-0 mr-auto',
    center: 'mx-auto',
    right: 'ml-auto mr-0',
  };

  return (
    <div className="container my-16">
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { enableLink, link, richText, size, alignment } = col;

            const widthClass = sizeClasses[size] || 'w-full';
            const marginClass = alignmentClasses[alignment] || 'ml-0 mr-auto';

            return (
              <div
                key={index}
                className="col-span-4 lg:col-span-12"
              >
                <div className={cn(widthClass, marginClass)}>
                  <RichText content={richText} enableGutter={false} />
                  {enableLink && <CMSLink {...link} />}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
