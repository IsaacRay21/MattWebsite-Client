import {useState, useRef, React, useEffect} from 'react'
import WaveSurfer from 'wavesurfer.js';
import {BsFillPlayFill, BsFillPauseFill} from 'react-icons/bs'
import "./css/audioplayer.css"

export const AudioPlayer = ({url}) => {
  const [playing, setPlaying] = useState(false)
  const waveformRef = useRef(null);
  let wavesurfer = useRef(null);

  useEffect(() => {
    if (!wavesurfer.current) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "black",
        progressColor: "red",
        url: url,
        dragToSeek: true,
        width: "100%",
        height: "auto",
      })
    }
    

    return () => {
      if (wavesurfer.current){
        wavesurfer.current.destroy();
        wavesurfer.current= null;
      }
    }
  }, [url])

  const handlePlayPause = () => {
    if (wavesurfer.current){
        wavesurfer.current.playPause();
        setPlaying(!playing);
    }
  }

  return (
    <div className="audio-player">
        <BsFillPlayFill onClick={handlePlayPause} className={!playing ? "playpause-button" : "playpause-button hide-playpause-button"}></BsFillPlayFill>
        <BsFillPauseFill onClick={handlePlayPause} className={playing ? "playpause-button" : "playpause-button hide-playpause-button"}></BsFillPauseFill>
        <div ref={waveformRef} className="waveform"></div>
    </div>
  );
}