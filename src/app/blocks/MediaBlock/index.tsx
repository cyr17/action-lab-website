import type { StaticImageData } from 'next/image';
import { cn } from '@/utilities/cn';
import React from 'react';
import RichText from 'src/app/components/RichText';
import type { Page } from '../../../payload-types';
import { Media } from '../../components/Media';

type Props = Extract<Page['layout'][0], { blockType: 'mediaBlock' }> & {
  breakout?: boolean;
  captionClassName?: string;
  className?: string;
  enableGutter?: boolean;
  id?: string;
  imgClassName?: string;
  staticImage?: StaticImageData;
};

export const MediaBlock: React.FC<Props> = (props) => {
  const {
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    media,
    position = 'default',
    staticImage,
  } = props;

  let caption;
  if (media && typeof media === 'object') caption = media.caption;

  const isFullscreen = position === 'fullscreen';

  return (
    <div
      className={cn(
        isFullscreen
          ? 'relative left-1/2 right-1/2 -mx-[50vw] w-screen max-w-none'
          : '',
        {
          container: !isFullscreen && enableGutter,
        },
        className,
      )}
    >
      <Media
        imgClassName={cn('w-full', !isFullscreen && 'rounded', imgClassName)}
        resource={media}
        src={staticImage}
      />

      
      {caption && (
        <div className="mt-6 mx-auto text-center">
        <RichText content={caption} enableGutter={false} />
      </div>
      )}
    </div>
  );
};
