import React, {useState} from "react";


const ScaleDisplay = ({scale}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <li>
            <div onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? "▼" : "▶"} <strong>{scale.name}:</strong> {scale.notes.join(", ")} 
            </div>
            {isOpen && (
                <div>
                    <p>Blah blah</p>
                </div>
            )}
        </li>
    );
}

export default ScaleDisplay;