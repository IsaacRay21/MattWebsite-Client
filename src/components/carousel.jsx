import React, { useState, useEffect} from "react";
import "./css/carousel.css"
import {SlArrowLeft, SlArrowRight} from "react-icons/sl"
import FullscreenImage from "./fullscreenImage"

export const Carousel = ({ type="" }) => {
    const [fullscreenImage, setFullscreenImage] = useState(null);
    const [slide, setSlide] = useState(0);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const prevSlide = () => {
        setSlide(slide === 0? data.length - 1: slide - 1);
    };

    const nextSlide = () => {
        setSlide(slide === data.length - 1? 0 : slide + 1);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/photo/${type}`);
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
        <div className="carousel-container"> 
            <SlArrowLeft className="arrow arrow-left" onClick={prevSlide}/>
            {data.map((photo, idx) => {
                return (
                    <div className="slides">
                        <img 
                            src={photo.photo_filename} 
                            key={idx} 
                            onClick={() => setFullscreenImage(photo.photo_filename)} 
                            alt={photo.description} 
                            className={slide === idx ? "slide" : "slide slide-hidden"} 
                        />
                        <p className={slide === idx ? "title" : "title title-hidden"}> {photo.description}</p>
                    </div>
                )
            })}
            <SlArrowRight className="arrow arrow-right" onClick={nextSlide}/>
            <span className="indicators">
                {data.map((_, idx) => {
                    return <button 
                                key={idx}
                                className={slide === idx ? "indicator" : "indicator indicator-inactive"}
                                onClick={() => {
                                    setSlide(idx)
                                }}>
                            </button>
                })}
            </span>

            {fullscreenImage && (
                <FullscreenImage
                src={fullscreenImage}
                onClose={() => setFullscreenImage(null)}
                />
            )}
        </div>
    )
};