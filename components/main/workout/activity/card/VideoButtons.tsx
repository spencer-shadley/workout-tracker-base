import { Button, Link } from '@mui/material';
import { useActivityCardContext } from '../../context/ActivityCardContextProvider';
import youtubeSearch from 'youtube-search';
import ReactPlayer from 'react-player/lazy';
import { useEffect, useState } from 'react';

export function VideoButtons() {
  const { exerciseName, activityType } = useActivityCardContext();

  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [showVideo, setShowVideo] = useState<boolean>(false);
  const [hasYoutubeQuotaExceeded, setHasYoutubeQuotaExceeded] =
    useState<boolean>(false);

  useEffect(() => {
    if (!showVideo || hasYoutubeQuotaExceeded) {
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
  }, [exerciseName, hasYoutubeQuotaExceeded, showVideo]);

  return activityType === 'exercise' ? (
    <>
      {!hasYoutubeQuotaExceeded && (
        <Button
          onClick={() => {
            setShowVideo(true);
          }}
        >
          show video
        </Button>
      )}

      <Link
        href={encodeURI(
          `https://www.youtube.com/results?search_query=how+to+do+${exerciseName}`
        )}
        target="_blank"
      >
        <Button>Search on YouTube</Button>
      </Link>

      {videoUrl && showVideo && <ReactPlayer url={videoUrl} />}
    </>
  ) : null;
}
