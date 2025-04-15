import {useState, useEffect} from 'react'
import ReactPlayer from 'react-player'
import './css/Video.css';
import { Navbar } from "../components/navbar.jsx";


function Video() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/video');
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

    if (loading) return <div className="video-container">Loading...</div>;
    if (error) return <div className="video-container">Error: {error}</div>;
    if (!data) return <div className="video-container">No data available</div>;

    return (
        <div className='video'>
            <Navbar/>
            <div className="content"> 
                {data.map((video, idx) => {
                    return( 
                        <div className="video-container" id={"video_" + idx}>
                            {video.video_filename && (<div className='video-video'>
                                <ReactPlayer 
                                    key={idx}
                                    url={video.video_filename}
                                    controls='100'
                                    width='100%'
                                    height='100%'
                                />
                            </div>)}
                            <div className="video-text" id={"video_" + idx +"_text"}>
                                {video.title && <h1>{video.title}</h1>}
                                {video.description && <p>{video.description}</p>}
                            </div>
                        </div>
                    )   
                })}    
            </div>
        </div>
    )
}

export default Video;