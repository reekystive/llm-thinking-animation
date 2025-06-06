import { Website } from '#src/mocks/thinking-interface.ts';
import { cn } from '#src/utils/cn.ts';
import { FC } from 'react';

export const SearchItem: FC<{ data: Website; className?: string }> = ({ data, className }) => {
  const { title, faviconUrl } = data;
  return (
    <div
      className={cn(
        'flex flex-row items-center gap-1 rounded-full border-[1px] border-gray-200 bg-gray-50 py-0.5 pr-2 text-xs leading-[1.2em] dark:border-gray-700 dark:bg-gray-900',
        !faviconUrl && 'pl-2',
        faviconUrl && 'pl-0.5',
        className
      )}
    >
      {faviconUrl && (
        <div className="flex aspect-square h-[1.2em] items-center justify-center overflow-clip rounded-full bg-gray-200 p-[1px] dark:bg-gray-600">
          <img src={faviconUrl} alt={title} className="block h-full w-full overflow-clip rounded-full object-cover" />
        </div>
      )}
      <div>{title}</div>
    </div>
  );
};
