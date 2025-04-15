import "./css/hero.css"
import { useState, useEffect } from "react";

export const Hero = ({onLearnMoreClick}) => {
    const [blur, setBlur] = useState(0);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
            try{
                const scrollY = window.scrollY;
                const imgHeight = document.getElementById("hero-img").offsetHeight
                const maxBlur = 10;
                const newBlur = Math.min(scrollY/ imgHeight, 1) * maxBlur;
                setBlur(newBlur)
            }
            catch(err){
                console.error("Failed to handle scroll");
                setError(err.message);
            }
            finally{
                setBlur(0)
            }
        }

        const fetchData = async () => {
            try {
                const response = await fetch(`/api/hero`);
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

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll)
    }, []);

    if (loading) return <div className="hero-container">Loading...</div>;
    if (error) return <div className="hero-container">Error: {error}</div>;
    if (!data) return <div className="hero-container">No data available</div>;

    return (
        <div className="hero-container">
            <div className="hero-text">
                <h1 className="hero-title">{data.title}</h1>
                <button className="hero-button" onClick={onLearnMoreClick}> {data.button_text}</button>
            </div>   
            <img id="hero-img" src={data.photo_filename} alt= "hero-img" style={{ filter: `blur(${blur}px)` }}/>
        </div>  
    )
}