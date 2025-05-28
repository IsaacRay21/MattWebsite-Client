import { useState, useRef, useEffect } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { SlControlPlay, SlControlPause} from "react-icons/sl"
import "./css/audioplayer.css";

export const AudioPlayer = ({ url }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  useEffect(() => {
    // Clean up previous instance if it exists
    if (wavesurfer.current) {
      wavesurfer.current.destroy();
    }

    // Create new instance without Timeline plugin
    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#666",
      progressColor: "rgb(47, 65, 183)",
      cursorColor: "#666",
      url: url,
      dragToSeek: true,
      width: "100%",
      height: 50,
      barWidth: 1,
      barGap: 1,
    });

    wavesurfer.current.on('timeupdate', (time) => {
      setCurrentTime(time);
    });

    wavesurfer.current.on('ready', () => {
      setDuration(wavesurfer.current.getDuration());
    });

    return () => {
      wavesurfer.current?.destroy();
    };
  }, [url]);

  const togglePlayPause = () => {
    wavesurfer.current?.playPause();
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="audio-player">
      <div className="player-controls">
        <button onClick={togglePlayPause} className="playpause-button">
          {isPlaying ? <SlControlPause /> : <SlControlPlay />}
        </button>
        <span className="time-display">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>
      <div ref={waveformRef} className="waveform"></div>
    </div>
  );
};