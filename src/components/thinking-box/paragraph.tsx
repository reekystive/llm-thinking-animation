import { cn } from '#src/utils/cn.ts';
import { FC, Fragment } from 'react';

export const Paragraphs: FC<{ contentText: string; className?: string }> = ({ contentText, className }) => {
  return (
    <Fragment>
      {contentText.split(/\n+/).map((line, index) => (
        <p key={index} className={cn(className)}>
          {line}
        </p>
      ))}
    </Fragment>
  );
};
