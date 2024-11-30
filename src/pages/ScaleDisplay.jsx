import React, {useState} from "react";
import GenerateDiatonicChords from "./ChordGenerator";

const generateDiatonicChordsDisplay = (scale) => {
    return GenerateDiatonicChords(scale);
}

const ScaleDisplay = ({scale}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <li>
            <div onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? "▼" : "▶"} <strong>{scale.name}:</strong> {scale.notes.join(", ")} 
            </div>
            {isOpen && (
                <ul>
                    {GenerateDiatonicChords(scale).map((chord, index) => (
                        <li key={index}><strong>{chord.romanNumeral}</strong> - <strong>{chord.chordName}</strong> ({chord.chordNotes.join(", ")})</li>
                    ))}
                </ul>
            )}
        </li>
    );
}

export default ScaleDisplay;