import GenerateDiatonicChords from "./ChordGenerator";
import { Scale } from "../data/ScaleData";

const ChordsDisplay = ({scale, selectedMode, includeSevenths}: {scale: Scale, selectedMode: number, includeSevenths: boolean}) => {
    return (
        <div className="chords" style={{ marginTop: "0.8rem", marginBottom: "1rem" }}>
            {GenerateDiatonicChords(scale, selectedMode, includeSevenths).map((chord, chordIndex) => (
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
        </div>);
}

export default ChordsDisplay;