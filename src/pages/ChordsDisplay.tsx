import GenerateDiatonicChords from "./ChordGenerator";
import { Scale } from "../data/ScaleData";
import { convertNotesToInt, noteToInt } from "../Helpers";
import { useScaleSettings } from "../ScaleSettingsContext";
import { FormatAccidentalsForDisplay } from "./HelperComponents";
import { PayloadContainer } from "../data/ScaleData";
import { Chord } from "./ChordGenerator";


const ChordsDisplay = ({scale, selectedMode, includeSevenths, generateOnlyDegreesArr, displayScaleOnKeyboard}: {scale: Scale, selectedMode: number, includeSevenths: boolean, generateOnlyDegreesArr?: number[] | null,  displayScaleOnKeyboard: (payloadContainer: PayloadContainer) => void}) => {
    const { highlightQueryNotes, queryNotes, chordDisplayOrientation, inludeSuspenedChords, enharmonicEquivalence } = useScaleSettings();
    
    const prepareNote = (note: string) => {
        if(highlightQueryNotes && queryNotes.length > 0) {
            const queryNotesFormatted = (enharmonicEquivalence) ? convertNotesToInt(queryNotes) : queryNotes;
            const noteFormatted = (enharmonicEquivalence) ? noteToInt[note] : note;
            if(queryNotesFormatted.includes(noteFormatted)) {
                return (<span className="highlightedNote"><FormatAccidentalsForDisplay textInput={note} seventhChordSymbolAllowed={true}/></span>);
            }
        }
        return (<FormatAccidentalsForDisplay textInput={note} seventhChordSymbolAllowed={true}/>);
    }
    

    const displayChordOnPianoKeyboard = (chord: Chord) => {
        console.log(chord);
        let temp: PayloadContainer = {scaleName: chord.chordName, payloadList: []}
        chord.chordNotes.forEach((item, index) => {
            temp.payloadList.push({note: noteToInt[item], degree: chord.degrees[index]});
        });
        displayScaleOnKeyboard(temp);
    }
    
    return (
        <div className={ chordDisplayOrientation == "horizontal" ? "chords" : "chords-vertical" } 
            style={{ marginTop: "0.8rem", marginBottom: "1rem", rowGap: "30px" }}>
            {GenerateDiatonicChords(scale, selectedMode, includeSevenths, inludeSuspenedChords, generateOnlyDegreesArr).map((chord, chordIndex) => (
                chordDisplayOrientation === "horizontal" ? (
                    <div key={chordIndex} 
                        className="chord"
                        onClick={() => displayChordOnPianoKeyboard(chord)}>
                        <div className="horizontal-chord-name"><FormatAccidentalsForDisplay textInput={chord.chordName} seventhChordSymbolAllowed={true}/></div>
                        <div className="chord-notes">
                            {chord.chordNotes && chord.chordNotes.map((note, noteIndex) => (
                                <div key={noteIndex} className="horizontal-note">{prepareNote(note)}</div>
                            ))}
                        </div>
                        <div className="horizontal-chord-roman-numeral"><FormatAccidentalsForDisplay textInput={chord.romanNumeral} forceAccidental={true} seventhChordSymbolAllowed={true}/></div>
                    </div>
                ) : (
                    <div className="vertical-chord" 
                        key={chordIndex}
                        onClick={() => displayChordOnPianoKeyboard(chord)}>
                        <strong><FormatAccidentalsForDisplay textInput={chord.chordName} seventhChordSymbolAllowed={true}/> </strong>
                        <span>&#40;
                            {chord.chordNotes && chord.chordNotes.map((note, noteIndex) => (
                                <span key={noteIndex}>{prepareNote(note)}{noteIndex < chord.chordNotes.length-1 ? "-" : ""}</span>
                            ))}
                        &#41;</span>
                        <strong> <FormatAccidentalsForDisplay textInput={chord.romanNumeral} forceAccidental={true} seventhChordSymbolAllowed={true}/></strong>
                    </div>
                )
            ))}
        </div>);
}

export default ChordsDisplay;