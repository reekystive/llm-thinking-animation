import { useAppAnimationControl } from '#src/providers/animation-control.tsx';
import { cn } from '#src/utils/cn.ts';
import { FC, useMemo } from 'react';

export const AnimationControl: FC<{ className?: string }> = ({ className }) => {
  const { appAnimationSpeedScale, setAppAnimationSpeedScale, showOutlines, setShowOutlines } = useAppAnimationControl();
  const scales = useMemo(() => [0.25, 0.5, 0.75, 1, 1.5, 2], []);

  return (
    <div className={cn('flex flex-row items-center gap-2', className)}>
      <div className="flex flex-row items-center gap-2">
        {scales.map((scale) => (
          <button
            key={scale}
            className={cn(
              'flex w-[4em] shrink-0 grow-1 basis-0 cursor-pointer items-center justify-center rounded-md border border-gray-200 bg-gray-50 py-1.5 text-xs text-gray-500 transition-colors hover:bg-gray-100 sm:py-1 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800',
              appAnimationSpeedScale === scale &&
                appAnimationSpeedScale === 1 &&
                'border-blue-500/30 bg-blue-500/20 hover:bg-blue-500/30 dark:border-blue-500/30 dark:bg-blue-500/20 dark:hover:bg-blue-500/30',
              appAnimationSpeedScale === scale &&
                appAnimationSpeedScale !== 1 &&
                'border-red-500/30 bg-red-500/20 hover:bg-red-500/30 dark:border-red-500/30 dark:bg-red-500/20 dark:hover:bg-red-500/30'
            )}
            onClick={() => setAppAnimationSpeedScale(scale)}
          >
            <span className="trim-both">{scale}&times;</span>
          </button>
        ))}
      </div>
      <button
        className={cn(
          'flex cursor-pointer flex-col items-center rounded-md border border-gray-200 bg-gray-50 px-2 py-1.5 text-xs text-gray-500 transition-colors hover:bg-gray-100 sm:py-1 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800',
          showOutlines &&
            'border-red-500/30 bg-red-500/20 hover:bg-red-500/30 dark:border-red-500/30 dark:bg-red-500/20 dark:hover:bg-red-500/30',
          className
        )}
        onClick={() => setShowOutlines(!showOutlines)}
      >
        <span className="trim-both">{showOutlines ? 'Hide Outlines' : 'Show Outlines'}</span>
        <span className="trim-both invisible h-0">Show Outlines</span>
        <span className="trim-both invisible h-0">Hide Outlines</span>
      </button>
    </div>
  );
};
