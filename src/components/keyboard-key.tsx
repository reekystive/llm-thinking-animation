import { cn } from '#src/utils/cn.ts';
import { FC, memo } from 'react';

const KeyboardKey: FC<{ keyText: string; className?: string }> = ({ keyText, className }) => {
  return (
    <div className={cn('relative h-4 w-4', className)}>
      {/* Outer rounded rectangle - slightly visible at the bottom */}
      <div className="absolute inset-0 translate-y-[2px] rounded-sm bg-gray-300 dark:bg-gray-800"></div>
      {/* Inner small rounded rectangle - main body */}
      <div className="absolute inset-0 flex items-center justify-center rounded-sm bg-gray-200 text-[9px] font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-200">
        {keyText}
      </div>
    </div>
  );
};

export const MemoizedKeyboardKey = memo(KeyboardKey);
