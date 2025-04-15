import "./css/editor.css";
import { useState} from 'react';
import { TbPencil } from "react-icons/tb";

const onCancel = () => {
    window.location.reload()
}

export const Editor = ({isEditing, startEditing, onSave}) => {
    
    return(
        <div className="edit-container">
            {isEditing ? (
                <div className="edit-options">
                    <button className="cancel-edit-button" onClick={onCancel}>Cancel</button>
                    <button className="save-edit-button"  onClick={onSave}>Save</button>
                </div>
            ) :(              
                <TbPencil className="edit-pencil" onClick={startEditing}/>)
            }
        </div>
    )
}

const TextEditor = ({original, setIsModalOpen}) => {
    const [text, setText] = useState(original?.innerHTML || "");
    return (
        <form className="modal-form" onSubmit={(e) =>{
            e.preventDefault();
            original.innerHTML = text;
            setIsModalOpen(false)
        }}>
            <textarea 
                value={text} 
                onChange={(e) => setText(e.target.value)}
                style={{ width: '100%' }}
                required
            />
            <input
                type="submit"
            ></input>
      </form>
    )
}

const ImageEditor = ({original, setIsModalOpen}) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newImageUrl = URL.createObjectURL(selectedFile);
        original.src = newImageUrl;

        setIsModalOpen(false);
    };
    return (
        <form className="modal-form" onSubmit={handleSubmit}>
            <input
                id="img-edit"
                name="img-edit"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
            />
            <input
                type="submit"
            ></input>
      </form>
    )
}

const ModalType = ({ type, original, setIsModalOpen }) => {
    switch (type){
        case "H1":
        case "P": 
            return (
                <TextEditor original={original} setIsModalOpen={setIsModalOpen}/>
            )
        case "IMG":
            return <ImageEditor original={original} setIsModalOpen={setIsModalOpen}/>
        default:
            return null;
        

    }
}

export const EditModal = ({elem, setIsModalOpen}) => {
    const type = elem.target.nodeName;
    const original = elem.target;

    return (
        <div className="edit-modal-container">
            <div className="media-editor"> 
                <ModalType type={type} original={original} setIsModalOpen={setIsModalOpen}/>
            </div>
        </div>
    )
}