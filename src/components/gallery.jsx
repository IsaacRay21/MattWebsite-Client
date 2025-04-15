import "./css/gallery.css"
import {useState, useEffect} from 'react'
import FullscreenImage from "./fullscreenImage"

export const Gallery = () => {
    const [fullscreenImage, setFullscreenImage] = useState(null);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/photo`);
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

    if (loading) return <div className="carousel-container">Loading...</div>;
    if (error) return <div className="carousel-container">Error: {error}</div>;
    if (!data) return <div className="carousel-container">No data available</div>;

    return (
        <div className="gallery-container">
            {data.map((photo, idx) => {
                return (
                    <div className="gallery_container">
                        <img 
                            src={photo.photo_filename} 
                            key={idx} 
                            alt={photo.title} 
                            className="gallery_img" 
                            onClick={() => setFullscreenImage(photo.photo_filename)}/>
                    </div>
                )
            })}

            {fullscreenImage && (
                <FullscreenImage
                src={fullscreenImage}
                onClose={() => setFullscreenImage(null)}
                />
            )}
        </div>

    )
}