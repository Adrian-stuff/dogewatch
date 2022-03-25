import YouTube from "react-youtube";
import { YouTubePlayer } from "youtube-player/dist/types";
import create, { SetState } from "zustand";

type PlayerStore = {
  player: null | YouTubePlayer;
  isPlaying: boolean;
  timestamp: number;
  togglePlaying: () => void;
  initPlayer: (player: YouTubePlayer) => void;
  setTimestamp: (time: number) => void;
};

const usePlayer = create<PlayerStore>((set, get) => ({
  player: null,
  isPlaying: false,
  timestamp: 0,
  initPlayer: (player) => set({ player: player }),
  togglePlaying: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setTimestamp: (time) => set({ timestamp: time }),
}));

export default usePlayer;
