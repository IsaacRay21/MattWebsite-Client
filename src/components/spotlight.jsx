import "./css/spotlight.css"
import React, { useEffect, useState} from 'react';
import { Carousel } from "./carousel"

export const Spotlight = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/spotlight`);
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
            <div className="story_carousel">
                <Carousel type="storycarousel"/>
            </div>
            <div className="story">
                <h1>{data.title}</h1>
                <p>{data.description}</p>
            </div>
        </div>
    )
}