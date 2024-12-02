import { useState } from "react"
import './ScaleFinder.css'
import ScaleGroupDisplay from "./ScaleGroupDisplay";
import { useScaleSettings } from "../ScaleSettingsContext";
import { noteToInt, formatNote, formatNotes, convertNotesToInt, scaleNotesToInt } from "../Helpers";
import { scales } from "../data/ScaleData";

// Map integers to notes (for display) 
/* const intToNote = {
    0: "C", 1: "C#", 2: "D", 3: "D#", 4: "E",
    5: "F", 6: "F#", 7: "G", 8: "G#", 9: "A",
    10: "A#", 11: "B",
  }; */

/* const scales = [
    { type: "Major", name: "C Major", notes: ["C", "D", "E", "F", "G", "A", "B"] },
    { type: "Minor", name: "A Minor", notes: ["A", "B", "C", "D", "E", "F", "G"] },
    { type: "Harmonic Minor", name: "A Harmonic Minor", notes: ["A", "B", "C", "D", "E", "F", "G#"] },
    { type: "Double Harmonic Major", name: "C Double Harmonic Major", notes: ["C", "Db", "E", "F", "G", "Ab", "B"] },
]; */

/* const modes = {
    "Major": { "Ionian": [0, 0, 0, 0, 0, 0, 0],
                "Dorian": [0, 0, "b", 0, 0, "b", 0],
                "Phrygian": [0, "b", "b", 0, 0, "b", "b"],
                "Lydian": [0, 0, 0, "#", 0, 0, 0],
                "Mixolydian": [0, 0, 0, 0, 0, 0, "b"],
                "Aeolian": [0, 0, "b", 0, 0, "b", "b"],
                "Locrian": [0, "b", "b", 0, "b", "b", "b"] },
}; */

/* const formatNote = (note) => {
    return note.trim().charAt(0).toUpperCase() + note.trim().slice(1); //.toLowerCase();
}

const formatNotes = (notes) => {
    return notes.map((note) => {
        return formatNote(note);
    }).filter((num) => num !== undefined);
}

const convertNotesToInt = (notes) => {
    return notes.map((note) => {
        const formattedNote = formatNote(note);
        return noteToInt[formattedNote];
    }).filter((num) => num !== undefined);
}

// Helper function to convert scale notes to integers
const scaleNotesToInt = (notes) => notes.map((note) => noteToInt[note]);
 */
const ScaleFinder = () => {
    const [ inputNotes, setInputNotes ] = useState("");
    const { includeSevenths, setIncludeSevenths, 
            enharmonicEquivalence, setEnharmonicEquivalence,
            romanNumeralsMajorAdjusted, setRomanNumeralsMajorAdjusted } = useScaleSettings();
    const [ groupedScales, setGroupedScales ] = useState({});

    const findScales = () => {
        console.log("raw input: " + inputNotes);
        const input = (enharmonicEquivalence) ? convertNotesToInt(inputNotes.split(",")) : formatNotes(inputNotes.split(","));
        console.log("Inputted notes are: ", input);
        console.log("Enharmonic state is: " + enharmonicEquivalence);

        if(input.length === 0) {
            setGroupedScales({});
            return;
        }

        const matches = scales.filter((scale) => {
            const scaleToCompare = (enharmonicEquivalence) ? scaleNotesToInt(scale.notes) : scale.notes;
            return input.every((note) => scaleToCompare.includes(note));
        });

        // Group the matching scales by type
        const grouped = matches.reduce((acc, scale) => {
            if (!acc[scale.type]) acc[scale.type] = [];
            acc[scale.type].push(scale);
            return acc;
        }, {});
  
        setGroupedScales(grouped);
    }

    return (
        
            <div className="App">
                <h1>Scale Finder</h1>
                <p>Enter musical notes separated by commas</p>
                <input 
                    type="text"
                    value={inputNotes}
                    onChange={(e) => setInputNotes(e.target.value)}
                    placeholder="Enter notes here..."
                />
                <button onClick={findScales}>Find Scales</button>
                <input 
                    type="checkbox" 
                    checked={enharmonicEquivalence}
                    onChange={() => setEnharmonicEquivalence(!enharmonicEquivalence)} />
                Enharmonic Check
                <input 
                    type="checkbox" 
                    checked={includeSevenths}
                    onChange={() => setIncludeSevenths(!includeSevenths)} />
                Include Sevenths
                <input 
                    type="checkbox" 
                    checked={romanNumeralsMajorAdjusted}
                    onChange={() => setRomanNumeralsMajorAdjusted(!romanNumeralsMajorAdjusted)} />
                Roman Numerals Major Adjusted
                <div>
                    <h2>Matching Scales:</h2>
                    {/* Skip all this JSX if there are no scale matches */}
                    {Object.keys(groupedScales).length > 0 ? (
                        Object.entries(groupedScales).map(([type, scales]) => (
                            <ScaleGroupDisplay
                                key={type}
                                type={type}
                                scales={scales}
                            />
                        ))
                        ) : (
                        <p>No matching scales found.</p>
                    )}
                </div>
            </div>
        
    );
}

export default ScaleFinder;
