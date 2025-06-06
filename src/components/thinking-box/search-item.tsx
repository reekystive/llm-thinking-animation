import { Website } from '#src/mocks/thinking-interface.ts';
import { cn } from '#src/utils/cn.ts';
import { SearchIcon } from 'lucide-react';
import { FC, useRef } from 'react';

const Image: FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className }) => {
  const ref = useRef<HTMLImageElement>(null);
  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      onError={() => {
        if (ref.current) {
          ref.current.style.visibility = 'hidden';
        }
      }}
      className={className}
    />
  );
};

export const SearchItem: FC<{ data: Website; className?: string }> = ({ data, className }) => {
  const { title, faviconUrl } = data;

  return (
    <div
      className={cn(
        'flex flex-row items-center rounded-full border-[1px] border-gray-200 bg-gray-50 py-0.5 pr-1.5 pl-0.5 text-xs leading-[1.2em] dark:border-gray-700 dark:bg-gray-900',
        faviconUrl && 'gap-[3px]',
        !faviconUrl && 'gap-[1px]',
        className
      )}
    >
      <div
        className={cn(
          'flex aspect-square h-[1.2em] min-w-0 items-center justify-center overflow-clip rounded-full p-[1px]',
          faviconUrl && 'bg-gray-200 dark:bg-gray-600',
          !faviconUrl && 'ml-[0.5px]'
        )}
      >
        {faviconUrl ? (
          <Image
            src={faviconUrl}
            alt={title}
            className={cn('block h-full w-full overflow-clip rounded-full object-cover')}
          />
        ) : (
          <SearchIcon className="block h-full w-full overflow-clip rounded-full p-[0.5px]" />
        )}
      </div>
      <div>{title}</div>
    </div>
  );
};
