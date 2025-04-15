import "./css/about.css";
import { useState, useEffect} from 'react';
import { FaInstagram, FaLinkedin } from "react-icons/fa6";
import { Editor, EditModal} from "./editor"

export const About = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);

    const openModal = (e) => {
        setModalData(e);
        setIsModalOpen(true);
    }


    // const startEditing = () => {
    //     setIsEditing(true)
    // }

    // const onSave = () => {

    // }

    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/about');
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
                        src={data.filename} 
                        alt="about me" 
                        onClick={isEditing ? (e) => openModal(e) : null}
                    />
                )}
                <div className="about-text">
                    <h1 onClick={isEditing ? (e) => openModal(e) : null}>{data.title || 'About Me'}</h1>
                    <p onClick={isEditing ? (e) => openModal(e) : null}>{data.description || 'No description available'}</p>
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
                            {data.phone_number && <p>{data.phone_number}</p>}
                            {data.email && <p>{data.email}</p>}
                        </div>
                    </div>
                </div>
            </div>
            {/* <Editor startEditing={startEditing} isEditing={isEditing} onSave={onSave}/>
            {isModalOpen && <EditModal elem={modalData} setIsModalOpen={setIsModalOpen}/>} */}
        </div>
    );
};