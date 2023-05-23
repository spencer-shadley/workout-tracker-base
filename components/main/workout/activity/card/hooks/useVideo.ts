import { useEffect, useState } from 'react';

import { useExerciseContext } from '@/components/shared/ExerciseProvider';

import { useYoutube } from './useYoutube';

export default function useVideo() {
  const { exerciseName } = useExerciseContext();

  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [shouldShowVideo, setShouldShowVideo] = useState<boolean>(false);
  const [hasYoutubeQuotaExceeded, setHasYoutubeQuotaExceeded] =
    useState<boolean>(false);

  const youtubeSearchUrl = encodeURI(
    `https://www.youtube.com/results?search_query=how+to+do+${exerciseName}`
  );

  const { data: youtubeUrl, isError } = useYoutube(shouldShowVideo && !hasYoutubeQuotaExceeded);
  console.log(youtubeUrl);

  useEffect(() => {
    setVideoUrl(youtubeUrl ?? ``);
  }, [youtubeUrl]);

  useEffect(() => {
    setHasYoutubeQuotaExceeded(isError);
  }, [isError]);

  return {
    videoUrl,
    shouldShowVideo,
    setShouldShowVideo,
    hasYoutubeQuotaExceeded,
    youtubeSearchUrl,
  };
}
