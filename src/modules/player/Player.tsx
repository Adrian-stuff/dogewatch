import React, { useCallback } from "react";
import YouTube, { Options } from "react-youtube";
import { YouTubePlayer } from "youtube-player/dist/types";
import usePlayer from "../../global-store/usePlayer";

interface PlayerProps {
  videoID: string;
}

const Player: React.FC<PlayerProps> = ({ videoID }) => {
  const { initPlayer } = usePlayer();
  const options: Options = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 0,
      modestbranding: 1,
      playsinline: 1,
      disablekb: 1,
    },
  };

  const onReady = useCallback((event: { target: YouTubePlayer }) => {
    initPlayer(event.target);
  }, []);

  const handleOnSeek = useCallback((data: number) => {
    // handle on seek
  }, []);

  const onStateChange = useCallback(
    (event: { target: YouTubePlayer; data: number }) => {
      handleOnSeek(event.data);
    },
    []
  );

  return (
    <YouTube
      videoId={videoID}
      opts={options}
      onReady={onReady}
      onStateChange={onStateChange}
    />
  );
};

export default Player;
