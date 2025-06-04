import { Website } from '#src/mocks/thinking-interface.ts';
import { cn } from '#src/utils/cn.ts';
import { FC } from 'react';

export const SearchItem: FC<{ data: Website; className?: string }> = ({ data, className }) => {
  const { title, faviconUrl } = data;
  return (
    <div
      className={cn(
        'flex flex-row items-center gap-1 rounded-full border-[1px] border-gray-200 bg-gray-50 px-2 py-0.5 pl-0.5 text-xs dark:border-gray-700 dark:bg-gray-900',
        !faviconUrl && 'pl-2',
        className
      )}
    >
      {faviconUrl && (
        <div className="flex h-4 w-4 items-center justify-center overflow-clip rounded-full bg-gray-50">
          <img src={faviconUrl} alt={title} className="block h-3 w-3" />
        </div>
      )}
      <div>{title}</div>
    </div>
  );
};
