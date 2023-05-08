import { Button, Link, Typography } from '@mui/material';
import { useActivityCardContext } from '../../context/ActivityCardContextProvider';
import ReactPlayer from 'react-player/lazy';
import useVideo from './hooks/useVideo';
import { useTimeContext } from '../../context/TimeContextProvider';

export function VideoButtons() {
  const { pause } = useTimeContext();
  const { activityType } = useActivityCardContext();

  const {
    videoUrl,
    setShouldShowVideo: setShowVideo,
    hasYoutubeQuotaExceeded,
    youtubeSearchUrl,
    shouldShowVideo: showVideo,
  } = useVideo();

  return activityType === 'exercise' ? (
    <>
      {hasYoutubeQuotaExceeded ? (
        <Typography>YouTube Quota Exceeded</Typography>
      ) : (
        <Button
          onClick={() => {
            pause();
            setShowVideo(true);
          }}
        >
          show video
        </Button>
      )}

      <Link href={youtubeSearchUrl} target="_blank">
        <Button onClick={() => pause()}>Search on YouTube</Button>
      </Link>

      {videoUrl && showVideo && <ReactPlayer url={videoUrl} />}
    </>
  ) : null;
}
