import { useAppAnimationControl } from '#src/providers/animation-control.tsx';
import { cn } from '#src/utils/cn.ts';
import { FC, memo, useMemo } from 'react';

export const AnimationControl: FC<{ className?: string; onRemountClick?: () => void }> = ({
  className,
  onRemountClick,
}) => {
  const { appAnimationSpeedScale, setAppAnimationSpeedScale, showBorders, setShowBorders } = useAppAnimationControl();
  const scales = useMemo(
    () => [
      { value: 0.25, showInSm: true },
      { value: 0.5, showInSm: true },
      { value: 0.75 },
      { value: 1, showInSm: true },
      { value: 1.5 },
      { value: 2, showInSm: true },
    ],
    []
  );

  return (
    <div className={cn('flex flex-row flex-wrap items-center justify-center gap-2', className)}>
      {scales.map((scale) => (
        <button
          key={scale.value}
          className={cn(
            'w-[4em] cursor-pointer items-center justify-center rounded-md border border-gray-200 bg-gray-50 py-1.5 text-xs text-gray-500 transition-colors hover:bg-gray-100 sm:py-1 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800',
            !scale.showInSm && 'hidden sm:flex',
            scale.showInSm && 'flex',
            appAnimationSpeedScale === scale.value &&
              appAnimationSpeedScale === 1 &&
              'border-blue-500/30 bg-blue-500/20 hover:bg-blue-500/30 dark:border-blue-500/30 dark:bg-blue-500/20 dark:hover:bg-blue-500/30',
            appAnimationSpeedScale === scale.value &&
              appAnimationSpeedScale !== 1 &&
              'border-red-500/30 bg-red-500/20 hover:bg-red-500/30 dark:border-red-500/30 dark:bg-red-500/20 dark:hover:bg-red-500/30'
          )}
          onClick={() => setAppAnimationSpeedScale(scale.value)}
        >
          <span className="trim-both">{scale.value}&times;</span>
        </button>
      ))}
      <button
        className={cn(
          'flex cursor-pointer flex-col items-center rounded-md border border-gray-200 bg-gray-50 px-2 py-1.5 text-xs text-gray-500 transition-colors hover:bg-gray-100 sm:py-1 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800',
          showBorders &&
            'border-red-500/30 bg-red-500/20 hover:bg-red-500/30 dark:border-red-500/30 dark:bg-red-500/20 dark:hover:bg-red-500/30'
        )}
        onClick={() => setShowBorders(!showBorders)}
      >
        <span className="trim-both">{showBorders ? 'Hide borders' : 'Show borders'}</span>
        <span className="trim-both invisible h-0 overflow-clip leading-0">Show borders</span>
        <span className="trim-both invisible h-0 overflow-clip leading-0">Hide borders</span>
      </button>
      <button
        className={cn(
          'flex cursor-pointer flex-col items-center rounded-md border border-gray-200 bg-gray-50 px-2 py-1.5 text-xs text-gray-500 transition-colors hover:bg-gray-100 sm:py-1 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800'
        )}
        onClick={onRemountClick}
      >
        <span className="trim-both">Remount</span>
      </button>
    </div>
  );
};

export const MemoizedAnimationControl = memo(AnimationControl);
