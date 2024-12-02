import React, {useState} from "react";
import GenerateDiatonicChords from "./ChordGenerator";
import { useScaleSettings } from "../ScaleSettingsContext";

const ScaleDisplay = ({scale}) => {
    const { includeSevenths } = useScaleSettings();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <li>
            <div onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? "▼" : "▶"} <strong>{scale.name}:</strong> {scale.notes.join(", ")} 
            </div>
            {isOpen && (
                <div className="chords" style={{ marginTop: "0.5rem" }}>
                    {GenerateDiatonicChords(scale, includeSevenths).map((chord, chordIndex) => (
                        <div key={chordIndex} className="chord">
                            <strong>{chord.chordName}</strong>
                            <div className="chord-notes">
                                {chord.chordNotes.map((note, noteIndex) => (
                                    <div key={noteIndex}>{note}</div>
                                ))}
                            </div>
                            <strong>{chord.romanNumeral}</strong>
                        </div>
                    ))}
                </div>
            )}
        </li>
    );
}

export default ScaleDisplay;