import {useEffect } from 'react';
import Portal from './portal';
import "./css/fullscreenImage.css"

const FullscreenImage = ({src, description, onClose}) => {
    

    useEffect(() => {
        const keyPress = (e) => {
            if (e.key === 'Escape'){
                onClose();
            }
        }

        console.log(description)
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', keyPress)

        return () => {
            document.body.style.overflow = 'unset';
            document.removeEventListener('keydown', keyPress)
        }
    }, [onClose])

    return (
        <Portal>
            <div className="modal-backdrop" >
                <div className="modal-content">
                    <img src={src} alt="Fullscreen"/>
                    <div className="description-container">
                        <p>{description}</p>
                    </div>
                    <button aria-label="Close modal" onClick={onClose}>&times;</button>
                </div>
            </div>
        </Portal>
    )
}

export default FullscreenImage;