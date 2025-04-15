import {React, useState, useEffect} from 'react'
import './css/Audio.css';
import { Navbar } from "../components/navbar.jsx";
import { AudioPlayer } from "../components/audioplayer.jsx";

function Audio() {
	const [data, setData] = useState(null);
  	const [loading, setLoading] = useState(true);
  	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('/api/audio');
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const result = await response.json();
				setData(result);
			} catch (err) {
				console.error("Failed to load Data:", err);
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	if (loading) return <div className="audio-container">Loading...</div>;
	if (error) return <div className="audio-container">Error: {error}</div>;
	if (!data) return <div className="audio-container">No data available</div>;


	return (
		<div className='audio'>
			<Navbar/>
			<div className="content"> 
				{data.map((audio, idx) => {
					return( 
						<div className="audio-container" id={"audio" + idx}>
							{audio.photo_filename && (
								<div className='audio-photo'>
									<img src={audio.photo_filename} alt="audio thumbnail"></img>
								</div>
								)
							}
							<div className="audio-other" id={"audio" + idx +"_text"}>
								{audio.title && <h1>{audio.title}</h1>}
								{audio.audio_filename && <AudioPlayer url={audio.audio_filename}/>}
								{/* <p>{audio.description}</p> */}
							</div>
						</div>
					)   
				})}    
			</div>
		</div>
	)
}

export default Audio;