import GenerateDiatonicChords from "./ChordGenerator";
import { Scale } from "../data/ScaleData";
import { convertNotesToInt, noteToInt } from "../Helpers";
import { useScaleSettings } from "../ScaleSettingsContext";
import { FormatAccidentalsForDisplay } from "./HelperComponents";


const ChordsDisplay = ({scale, selectedMode, includeSevenths}: {scale: Scale, selectedMode: number, includeSevenths: boolean}) => {
    const { highlightQueryNotes, queryNotes, chordDisplayOrientation, inludeSuspenedChords, enharmonicEquivalence } = useScaleSettings();
    
    const prepareNote = (note: string) => {
        if(highlightQueryNotes && queryNotes.length > 0) {
            const queryNotesFormatted = (enharmonicEquivalence) ? convertNotesToInt(queryNotes) : queryNotes;
            const noteFormatted = (enharmonicEquivalence) ? noteToInt[note] : note;
            if(queryNotesFormatted.includes(noteFormatted)) {
                return (<span className="highlightedNote"><FormatAccidentalsForDisplay textInput={note}/></span>);
            }
        }
        return (<FormatAccidentalsForDisplay textInput={note} />);
    }
    
    return (
        <div className={ chordDisplayOrientation == "horizontal" ? "chords" : "chords-vertical" } 
            style={{ marginTop: "0.8rem", marginBottom: "1rem" }}>
            {GenerateDiatonicChords(scale, selectedMode, includeSevenths, inludeSuspenedChords).map((chord, chordIndex) => (
                chordDisplayOrientation === "horizontal" ? (
                    <div key={chordIndex} className="chord">
                        <div className="horizontal-chord-name"><FormatAccidentalsForDisplay textInput={chord.chordName}/></div>
                        <div className="chord-notes">
                            {chord.chordNotes && chord.chordNotes.map((note, noteIndex) => (
                                <div key={noteIndex} className="horizontal-note">{prepareNote(note)}</div>
                            ))}
                        </div>
                        <div className="horizontal-chord-roman-numeral"><FormatAccidentalsForDisplay textInput={chord.romanNumeral} forceAccidental={true}/></div>
                    </div>
                ) : (
                    <div style={{paddingBlock: "4px"}} key={chordIndex}>
                        <strong><FormatAccidentalsForDisplay textInput={chord.chordName}/> </strong>
                        <span>&#40;
                            {chord.chordNotes && chord.chordNotes.map((note, noteIndex) => (
                                <span key={noteIndex}>{prepareNote(note)}{noteIndex < chord.chordNotes.length-1 ? "-" : ""}</span>
                            ))}
                        &#41;</span>
                        <strong> <FormatAccidentalsForDisplay textInput={chord.romanNumeral} forceAccidental={true}/></strong>
                    </div>
                )
            ))}
        </div>);
}

export default ChordsDisplay;