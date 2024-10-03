import { cn } from '@/utilities/cn';
import React from 'react';
import RichText from 'src/app/components/RichText';

import type { Page } from '../../../payload-types';

import { CMSLink } from '../../components/Link';

type Props = Extract<Page['layout'][0], { blockType: 'sideBySide' }>;

export const SideBySideBlock: React.FC<
  {
    id?: string;
  } & Props
> = (props) => {
  const { leftSide,rightSide } = props;

  return (
    <div className="container my-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-8 gap-x-16">
      <div className="col-span-1">
        {leftSide &&
          leftSide.length > 0 &&
          leftSide.map((col, index) => {
            const { enableLink, link, richText } = col;

            const widthClass = 'w-1/2 sm:w-full';
            const marginClass = 'ml-0 mr-auto';

            return (
              <div
                key={index}
                className="mb-8"
              >
                <div className={cn(widthClass, marginClass)}>
                  <RichText content={richText} enableGutter={false} />
                  {enableLink && <CMSLink {...link} />}
                </div>
              </div>
            );
          })}
          </div>

          
        <div className="col-span-1">
          {rightSide &&
          rightSide.length > 0 &&
          rightSide.map((col, index) => {
            const { enableLink, link, richText } = col;

            const widthClass = 'w-1/2 sm:w-full';
            const marginClass = 'ml-auto mr-0';

            return (
              <div
                key={index}
                className="mb-8"
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
    </div>
  );
};
