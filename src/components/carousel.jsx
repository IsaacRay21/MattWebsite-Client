import React, { useState, useEffect} from "react";
import "./css/carousel.css"
import {SlArrowLeft, SlArrowRight} from "react-icons/sl"
import FullscreenImage from "./fullscreenImage"

export const Carousel = ({ type="" }) => {
    const [fullscreenImage, setFullscreenImage] = useState(null);
    const [slide, setSlide] = useState(0);
    const [data, setData] = useState(null);
    const [slideTotal, setSlideTotal] = useState(0);
    const [currSlide, setCurrSlide] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const prevSlide = () => {
        setSlide(slide === 0? data.length - 1: slide - 1);
        setCurrSlide(currSlide === 1 ? data.length: currSlide - 1)
    };

    const nextSlide = () => {
        setSlide(slide === data.length - 1? 0 : slide + 1);
        setCurrSlide(currSlide === data.length ? 1: currSlide + 1)
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/photo/${type}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                setData(result);
                setSlideTotal(result.length)
                if (result.length > 0){
                    setCurrSlide(1)
                }

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
            <div className="slides-container"> 
                {data.map((photo, idx) => {
                    return (
                        <div 
                            className= {`slide ${slide === idx ? "active" : ""}`}
                            key={idx}
                        >
                            <img 
                                className="slide-img"
                                src={photo.photo_filename} 
                                onClick={() => setFullscreenImage(photo.photo_filename)} 
                                alt={photo.description} 
                            />
                            <p className={slide === idx ? "description" : "description description-hidden"}> {photo.description}</p>
                        </div>
                    )
                })}
            </div>
            <div className="slide-navigator">
                <SlArrowLeft className="arrow arrow-left" onClick={prevSlide}/>
                <span className="slide-counter">{currSlide} / {slideTotal}</span>
                <SlArrowRight className="arrow arrow-right" onClick={nextSlide}/>
            </div>
            {fullscreenImage && (
                <FullscreenImage
                src={fullscreenImage}
                onClose={() => setFullscreenImage(null)}
                />
            )}
        </div>
    )
};