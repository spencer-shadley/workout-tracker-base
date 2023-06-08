import { TextSkeleton } from './TextSkeleton';

interface TextSkeletonsProps {
  numberOfLinesOfText: number;
}

export function TextSkeletons({ numberOfLinesOfText }: TextSkeletonsProps) {
  return (
    <div className='overflow-x-hidden w-full'>
      {Array.from(Array(numberOfLinesOfText).keys()).map((i) => <TextSkeleton key={i} />
      )}
    </div>
  );
}
