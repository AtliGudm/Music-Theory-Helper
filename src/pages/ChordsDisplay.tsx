import GenerateDiatonicChords from "./ChordGenerator";
import { Scale } from "../data/ScaleData";
import { useScaleSettings } from "../ScaleSettingsContext";

const ChordsDisplay = ({scale, selectedMode, includeSevenths}: {scale: Scale, selectedMode: number, includeSevenths: boolean}) => {
    const { highlightQueryNotes, queryNotes, chordDisplayOrientation, inludeSuspenedChords } = useScaleSettings();
    
    const prepareNote = (note: string) => {
        if(highlightQueryNotes && queryNotes.length > 0) {
            if(queryNotes.includes(note)) {
                return (<span className="highlightedNote">{note}</span>);
            }
        }
        return note;
    }
    
    return (
        <div className={ chordDisplayOrientation == "horizontal" ? "chords" : "chords-vertical" } 
            style={{ marginTop: "0.8rem", marginBottom: "1rem" }}>
            {GenerateDiatonicChords(scale, selectedMode, includeSevenths, inludeSuspenedChords).map((chord, chordIndex) => (
                chordDisplayOrientation === "horizontal" ? (
                    <div key={chordIndex} className="chord">
                        <div className="horizontal-chord-name">{chord.chordName}</div>
                        <div className="chord-notes">
                            {chord.chordNotes && chord.chordNotes.map((note, noteIndex) => (
                                <div key={noteIndex} className="horizontal-note">{prepareNote(note)}</div>
                            ))}
                        </div>
                        <div className="horizontal-chord-roman-numeral">{chord.romanNumeral}</div>
                    </div>
                ) : (
                    <div style={{paddingBlock: "4px"}} key={chordIndex}>
                        <strong>{chord.chordName} </strong>
                        <span>&#40;
                            {chord.chordNotes && chord.chordNotes.map((note, noteIndex) => (
                                <span key={noteIndex}>{prepareNote(note)}{noteIndex < chord.chordNotes.length-1 ? "-" : ""}</span>
                            ))}
                        &#41;</span>
                        <strong> {chord.romanNumeral}</strong>
                    </div>
                )
            ))}
        </div>);
}

export default ChordsDisplay;