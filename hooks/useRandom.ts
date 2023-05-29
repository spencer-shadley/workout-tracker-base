import { sample } from 'lodash';
import { useEffect, useState } from 'react';

export default function useRandom(collection: string[], durationInMs = 10_000) {
  const [currentItem, setCurrentItem] = useState<string | null>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentItem(sample(collection) ?? null);
    }, durationInMs);
    return () => {
      clearInterval(intervalId);
    };
  }, [collection, durationInMs]);

  return currentItem;
}
