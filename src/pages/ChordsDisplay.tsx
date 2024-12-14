import GenerateDiatonicChords from "./ChordGenerator";
import { Scale } from "../data/ScaleData";
import { useScaleSettings } from "../ScaleSettingsContext";

const ChordsDisplay = ({scale, selectedMode, includeSevenths}: {scale: Scale, selectedMode: number, includeSevenths: boolean}) => {
    const { highlightQueryNotes, queryNotes } = useScaleSettings();
    
    const prepareNote = (note: string) => {
        if(highlightQueryNotes && queryNotes.length > 0) {
            if(queryNotes.includes(note)) {
                return (<span className="highlightedNote">{note}</span>);
            }
        }
        return note;
    }
    
    return (
        <div className="chords" style={{ marginTop: "0.8rem", marginBottom: "1rem" }}>
            {GenerateDiatonicChords(scale, selectedMode, includeSevenths).map((chord, chordIndex) => (
                <div key={chordIndex} className="chord">
                    <strong>{chord.chordName}</strong>
                    <div className="chord-notes">
                        {chord.chordNotes.map((note, noteIndex) => (
                            <div key={noteIndex}>{prepareNote(note)}</div>
                        ))}
                    </div>
                    <strong>{chord.romanNumeral}</strong>
                </div>
            ))}
        </div>);
}

export default ChordsDisplay;