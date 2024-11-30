import { useState } from "react"
import './ScaleFinder.css'
import ScaleDisplay from "./ScaleDisplay";

// Map notes to integers (for comparison)
const noteToInt = {
    C: 0, "C#": 1, Db: 1, D: 2, "D#": 3, Eb: 3,
    E: 4, Fb: 4, "E#": 5, F: 5, "F#": 6, Gb: 6, G: 7, "G#": 8,
    Ab: 8, A: 9, "A#": 10, Bb: 10, B: 11, Cb: 11, "B#": 0,
  };


// Map integers to notes (for display) 
const intToNote = {
    0: "C", 1: "C#", 2: "D", 3: "D#", 4: "E",
    5: "F", 6: "F#", 7: "G", 8: "G#", 9: "A",
    10: "A#", 11: "B",
  };

  const scales = [
    { name: "C Major", notes: ["C", "D", "E", "F", "G", "A", "B"] },
    { name: "G Major", notes: ["G", "A", "B", "C", "D", "E", "F#"] },
    { name: "D Major", notes: ["D", "E", "F#", "G", "A", "B", "C#"] },
    { name: "A Major", notes: ["A", "B", "C#", "D", "E", "F#", "G#"] },
    { name: "E Major", notes: ["E", "F#", "G#", "A", "B", "C#", "D#"] },
    { name: "B Major", notes: ["B", "C#", "D#", "E", "F#", "G#", "A#"] },
    { name: "F# Major", notes: ["F#", "G#", "A#", "B", "C#", "D#", "E#"] },
    { name: "Db Major", notes: ["Db", "Eb", "F", "Gb", "Ab", "Bb", "C"] },
    { name: "Ab Major", notes: ["Ab", "Bb", "C", "Db", "Eb", "F", "G"] },
    { name: "Eb Major", notes: ["Eb", "F", "G", "Ab", "Bb", "C", "D"] },
    { name: "Bb Major", notes: ["Bb", "C", "D", "Eb", "F", "G", "A"] },
    { name: "F Major", notes: ["F", "G", "A", "Bb", "C", "D", "E"] },
    { name: "Gb Major", notes: ["Gb", "Ab", "Bb", "Cb", "Db", "Eb", "F"]},
    { name: "A Harmonic Minor", notes: ["A", "B", "C", "D", "E", "F", "G#"] },
    { name: "E Harmonic Minor", notes: ["E", "F#", "G", "A", "B", "C", "D#"] },
    { name: "C Double Harmonic Major", notes: ["C", "Db", "E", "F", "G", "Ab", "B"] },
  ];

const formatNote = (note) => {
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

// Roman numeral patterns for different scale types
const romanNumeralsByScaleType = {
    "Major": ["I", "ii", "iii", "IV", "V", "vi", "vii°"],
    "Minor": ["i", "ii°", "bIII", "iv", "v", "bVI", "bVII"],
    "Harmonic Minor": ["i", "ii°", "bIII+", "iv", "V", "bVI", "vii°"],
    "Double Harmonic Major": ["I", "bii°", "iii", "IV+", "V", "bVI", "vii°"],
  };


//function generateDiatonicChords(scaleNotes, scaleType) {
//
//}

const ScaleFinder = () => {
    const [ inputNotes, setInputNotes ] = useState("");
    const [ matchingScales, setMatchingScales ] = useState([]);
    const [ enharmonicCheck, setEnharmonicCheck ] = useState(true);

    const findScales = () => {
        console.log("raw input: " + inputNotes);
        const input = (enharmonicCheck) ? convertNotesToInt(inputNotes.split(",")) : formatNotes(inputNotes.split(","));
        console.log("Inputted notes are: ", input);
        console.log("Enharmonic state is: " + enharmonicCheck);

        if(input.length === 0) {
            setMatchingScales([]);
            return;
        }

        const matches = scales.filter((scale) => {
            const scaleToCompare = (enharmonicCheck) ? scaleNotesToInt(scale.notes) : scale.notes;
            return input.every((note) => scaleToCompare.includes(note));
        });

        setMatchingScales(matches);
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
                checked={enharmonicCheck}
                onChange={() => setEnharmonicCheck(!enharmonicCheck)} />
            Enharmonic Check
            <div>
                <h2>Matching Scales:</h2>
                {/* Skip all this JSX if there are no scale matches */}
                { matchingScales.length > 0 ? (
                    <ul>
                        {matchingScales.map((_scale) => (
                            <ScaleDisplay key={_scale.name} scale={_scale} />
                        ))}
                    </ul>)
                : (<p>No Matching scales found.</p>) }
            </div>
        </div>
    );
}

export default ScaleFinder;
