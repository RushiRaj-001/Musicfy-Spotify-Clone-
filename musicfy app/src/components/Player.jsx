import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import {
  ListMusic,
  Maximize2,
  Mic,
  Minimize2,
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Speaker,
  Volume2,
} from "lucide-react";

export const Player = () => {
  const {
    track,
    seekBar,
    seekBg,
    playStatus,
    play,
    pause,
    time,
    previous,
    next,
    seekSong,
  } = useContext(PlayerContext);

  const formatTime = (min, sec) =>
    `${String(min).padStart(2, "0")} : ${String(sec).padStart(2, "0")}`;

  return track ? (
    <div className="h-auto bg-black text-white flex flex-col lg:flex-row items-center justify-between px-4 py-3 gap-3">
      <div className="flex items-center gap-3 w-full lg:w-1/3">
        <img src={track.image} alt="" className="w-12 h-12 rounded" />
        <div className="leading-tight">
          <p className="font-semibold text-sm">{track.name}</p>
          <p className="text-xs opacity-70">{track.desc.slice(0, 14)}</p>
        </div>
      </div>

      
      <div className="flex flex-col items-center gap-2 w-full lg:w-1/3">
        <div className="flex gap-6 items-center">
          <Shuffle className="w-4 cursor-pointer hover:text-green-500" />

          <SkipBack
            onClick={previous}
            className="w-5 cursor-pointer hover:text-green-500"
          />

          {playStatus ? (
            <Pause
              onClick={pause}
              className="w-8 h-8 cursor-pointer hover:text-green-500"
            />
          ) : (
            <Play
              onClick={play}
              className="w-8 h-8 cursor-pointer hover:text-green-500"
            />
          )}

          <SkipForward
            onClick={next}
            className="w-5 cursor-pointer hover:text-green-500"
          />

          <Repeat className="w-4 cursor-pointer hover:text-green-500" />
        </div>

       
        <div className="flex items-center gap-3 w-full">
          <p className="text-xs w-12 text-right">
            {formatTime(time.currentTime.minute, time.currentTime.second)}
          </p>

          <div
            ref={seekBg}
            onClick={seekSong}
            className="flex-1 h-1 bg-gray-600 rounded-full cursor-pointer relative"
          >
            <div
              ref={seekBar}
              className="h-1 bg-green-500 rounded-full w-0"
            ></div>
          </div>

          <p className="text-xs w-12">{track.duration}</p>
        </div>
      </div>

     
      <div className="hidden lg:flex items-center gap-4 w-1/3 justify-end opacity-80">
        <ListMusic className="w-4 cursor-pointer hover:text-green-500" />
        <Mic className="w-4 cursor-pointer hover:text-green-500" />
        <Speaker className="w-4 cursor-pointer hover:text-green-500" />
        <Volume2 className="w-4 cursor-pointer hover:text-green-500" />
        <Minimize2 className="w-4 cursor-pointer hover:text-green-500" />
        <Maximize2 className="w-4 cursor-pointer hover:text-green-500" />
      </div>
    </div>
  ) : null;
};

export default Player;
