import "./css/spotlight.css"
import React, { useEffect, useRef, useState } from 'react';
import { Carousel } from "./carousel"

export const Spotlight = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const story_carouselRef = useRef(null);
    const storyRef = useRef(null);

    const [viewportSize, setViewportSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const updateStoryHeight = () => {
        if (storyRef.current && story_carouselRef.current){
            storyRef.current.style.height = `${story_carouselRef.current.offsetHeight}px`;
        }
    }
    
      // Function to update viewport size
    const updateViewportSize = () => {
        setViewportSize({
            width: window.innerWidth,
            height: window.innerHeight,
        })
    };

    useEffect(() => {
        if (viewportSize.width >= 700) {
            updateStoryHeight();
        } else if (storyRef.current) {
            storyRef.current.style.height = "auto";  // Reset height when < 700px
        }
    }, [[], viewportSize.width]);

    useEffect(() => {
        updateStoryHeight();
    }, []);

    useEffect(() => {
        window.addEventListener('resize', updateViewportSize, );
        window.addEventListener('resize', updateStoryHeight);
    
        return () => {
          window.removeEventListener('resize', updateViewportSize);
          window.removeEventListener('resize', updateStoryHeight);
        };
    }, []); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/spotlight');
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

    if (loading) return <div className="spotlight-container">Loading...</div>;
    if (error) return <div className="spotlight-container">Error: {error}</div>;
    if (!data) return <div className="spotlight-container">No data available</div>;

    return (
        <div className="spotlight-container">
            <div className="story_carousel" ref={story_carouselRef}>
                <Carousel type="storycarousel"/>
            </div>
            <div className="story" ref={storyRef}>
                <h1>{data.title}</h1>
                <p>{data.description}</p>
            </div>
        </div>
    )
}