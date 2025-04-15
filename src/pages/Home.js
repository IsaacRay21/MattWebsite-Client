import './css/Home.css';
import { useRef, useState, useEffect } from "react";
import { Navbar } from "../components/navbar.jsx";
import { Hero } from "../components/hero.jsx";
import { Link } from "react-router-dom";
import { About } from "../components/about.jsx"

function Home() {
    const linksRef = useRef()

    const scrollToLinks = () => linksRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })   

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/link`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                console.log(result);
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

    if (loading) return <div className="home">Loading...</div>;
    if (error) return <div className="home">Error: {error}</div>;
    if (!data) return <div className="home">No data available</div>;

    return (
        <div className='home'>
            <Navbar />
            <div className="content"> 
                <Hero
                    onLearnMoreClick={scrollToLinks}
                />
                <div ref={linksRef} className="content_links">  
                    {data.map((link, idx) => {
                        return (<Link to={link.link_to} className="content_links_container">
                            <h1 className='links-title'>{link.link_title}</h1>
                            <img 
                                src={link.link_photo_filename}
                                alt={link.link_title}
                                className="links_img" 
                            />
                        </Link>
                        )
                    })}
                </div>
                <About/>
            </div>
        </div>
    )
}

export default Home;