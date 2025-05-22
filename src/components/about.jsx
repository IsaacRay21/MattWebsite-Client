import "./css/about.css";
import { useState, useEffect} from 'react';
import { FaInstagram, FaLinkedin } from "react-icons/fa6";

export const About = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/about`);
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

    if (loading) return <div className="about-container">Loading...</div>;
    if (error) return <div className="about-container">Error: {error}</div>;
    if (!data) return <div className="about-container">No data available</div>;

    return (
        <div className="about-container">
            <div className="about-content">
                {data.filename && (
                    <img 
                        className="about-photo" 
                        src= {data.filename}
                        alt="about me" 
                    />
                )}
                <div className="about-text">
                    <h1>{data.title || 'About Me'}</h1>
                    <p>{data.description || 'No description available'}</p>
                    <div className="contacts">
                        <div className="social-links">
                            {data.instagram_url && (
                                <a target="_blank" rel="noreferrer" href={data.instagram_url}>
                                    <FaInstagram />
                                </a>
                            )}
                            {data.linkedin_url && (
                                <a target="_blank" rel="noreferrer" href={data.linkedin_url}>
                                    <FaLinkedin />
                                </a>
                            )}
                        </div>
                        <div className="contact-info">
                            {data.phone_number && <p style={{ whiteSpace: 'pre-wrap' }}>{data.phone_number}</p>}
                            {data.email && <p>{data.email}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};