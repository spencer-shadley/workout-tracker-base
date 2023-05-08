import { useEffect, useState } from 'react';
import youtubeSearch from 'youtube-search';
import { useActivityCardContext } from '../../../context/ActivityCardContextProvider';

export default function useVideo() {
  const { exerciseName } = useActivityCardContext();

  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [shouldShowVideo, setShouldShowVideo] = useState<boolean>(false);
  const [hasYoutubeQuotaExceeded, setHasYoutubeQuotaExceeded] =
    useState<boolean>(false);

  const youtubeSearchUrl = encodeURI(
    `https://www.youtube.com/results?search_query=how+to+do+${exerciseName}`
  );

  useEffect(() => {
    if (!shouldShowVideo || hasYoutubeQuotaExceeded) {
      return;
    }

    const opts: youtubeSearch.YouTubeSearchOptions = {
      maxResults: 1,
      key: 'AIzaSyBKLpjDurJWREpz9oQu_FWh-nwrNoKDkzA',
      type: 'video',
    };

    youtubeSearch(`how to do ${exerciseName}`, opts, (err, results) => {
      if (err) {
        setHasYoutubeQuotaExceeded(true);
        return console.log(err);
      }

      console.dir(results);
      if (results?.length) {
        setVideoUrl(results[0].link);
      }
    });
  }, [exerciseName, hasYoutubeQuotaExceeded, shouldShowVideo]);

  return {
    videoUrl,
    shouldShowVideo,
    setShouldShowVideo,
    hasYoutubeQuotaExceeded,
    youtubeSearchUrl,
  };
}
