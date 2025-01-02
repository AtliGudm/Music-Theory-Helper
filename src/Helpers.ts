import { modes } from './data/ModesData';
import { Scale } from './data/ScaleData';

// Map notes to integers (for comparison)
export const noteToInt: { [key: string]: number } = {
    C: 0, Dbb: 0,
    "C#": 1, Db: 1, "B##": 1,
    D: 2, Ebb: 2, "C##": 2,
    "D#": 3, Eb: 3, Fbb: 3,
    E: 4, Fb: 4, "D##": 4,
    "E#": 5, F: 5, Gbb: 5,
    "F#": 6, Gb: 6, "E##": 6,
    G: 7, Abb: 7, "F##": 7,
    "G#": 8, Ab: 8,
    A: 9, Bbb: 9, "G##": 9,
    "A#": 10, Bb: 10, Cbb: 10,
    B: 11, Cb: 11, "A##": 11,
    "B#": 0,
  };

export const formatNote = (note: string) => {
    return note.trim().charAt(0).toUpperCase() + note.trim().slice(1); //.toLowerCase();
}

export const formatNotes = (notes: string[]) => {
    return notes.map((note) => {
        return formatNote(note);
    }).filter((num) => num !== undefined);
}

export const isMusicalNote = (note: string) => {
    const formattedNote = formatNote(note);
    return noteToInt.hasOwnProperty(formattedNote);
}

export const convertNotesToInt = (notes: string[]) => {
    return notes.map((note) => {
        const formattedNote = formatNote(note);
        return noteToInt[formattedNote]; // or handle undefined case appropriately
    }).filter((num) => num !== undefined);
}

// Helper function to convert scale notes to integers
export const scaleNotesToInt = (notes: string[]) => notes.map((note) => noteToInt[note]);

export const shiftScale = (scale: Scale, shiftBy: number) => {
    const shiftedNotes = shiftArr(scale.notes, shiftBy);
    const newScale = { ...scale, notes: shiftedNotes };
    return newScale;
}

const shiftArr = (arr: string[], shiftBy: number) => {
    const length = arr.length;
    if (length === 0) return arr; // Handle empty array
  
    // Normalize shiftBy to ensure it's within bounds
    const normalizedShift = ((shiftBy % length) + length) % length;
  
    return arr.slice(normalizedShift).concat(arr.slice(0, normalizedShift));
}


export const getFifth = (note: string, steps: number = 1) => {
    // Circle of Fifths with enharmonic preferences
    const circleOfFifths = [
        "C", "G", "D", "A", "E", "B", "F#", "Db", "Ab", "Eb", "Bb", "F"
    ];

    // Normalize input note
    const normalizedNote = note.trim();//.toUpperCase().replace("♭", "b");

    // Find the index of the input note
    const noteIndex = circleOfFifths.indexOf(normalizedNote);
    if (noteIndex === -1) {
        throw new Error("Invalid note name. Please enter a valid note (e.g., C, G#, Bb).");
    }

    // Calculate the resulting index
    const resultIndex = (noteIndex + steps + circleOfFifths.length) % circleOfFifths.length;

    // Return the resulting note
    return circleOfFifths[resultIndex];
}

export const modifyNote = (note: string, accidental: string | number) => {
    if(accidental == 0) {
        return note;
    }
    if(note.length === 1) {
        return note + accidental;
    }
    else if(note.length === 2) {
        const noteAccidental = note.slice(-1);
        if(noteAccidental === "#") {
            if(accidental === "#") {
                return note + accidental;
            }
            else if(accidental === "b") {
                return note.charAt(0);
            }
        }else if(noteAccidental === "b") {
            if(accidental === "#") {
                return note.charAt(0);
            }
            else if(accidental === "b") {
                return note + accidental;
            }
        }
    }
    else if(note.length === 3) {
        const noteAccidental = note.slice(-2);
        if(noteAccidental === "##") {
            if(accidental === "b") {
                return note.slice(0,2);
            }
            else if(accidental === "#") {
                throw new Error("Case not implemented.");
            }
        }
        else if(noteAccidental === "bb") {
            if(accidental === "#") {
                return note.slice(0,2);
            }
            else if(accidental === "b") {
                throw new Error("Case not implemented.");
            }
        }
    }
    // Default return value if no conditions are met
    throw new Error("Invalid note or accidental");
}


export const findScalesByNotes = (noteList: string[] = [], enharmonicEquivalence: boolean, scales: Scale[]) => {
    const input = (enharmonicEquivalence) ? convertNotesToInt(noteList) : formatNotes(noteList);

    const matches: Scale[] = scales.filter((scale) => {
        const scaleToCompare = (enharmonicEquivalence) ? scaleNotesToInt(scale.notes) : scale.notes;
        return (input as (string | number)[]).every((note) => (scaleToCompare as (string | number)[]).includes(note));
    });

    // Group the matching scales by type
    return groupScalesByType(matches);
}

export const groupScalesByType = (matchedScales: Scale[], selectedModeIndex: number = 0, parentScale: string | null = null) => {
    return matchedScales.reduce((acc: { [key: string]: { scale: Scale[], selectedModeIndex: number, parentScale: string | null } }, _scale: Scale) => {
        if (!acc[_scale.type]) acc[_scale.type] = {scale:[], selectedModeIndex: selectedModeIndex, parentScale: parentScale};
        acc[_scale.type].scale.push(_scale);
        return acc;
    }, {});
} 

export const groupScalesByType2 = (matchedScales: {scale: Scale, selectedModeIndex: number, parentScale: string | null }[]) => {   
    return matchedScales.reduce((acc: { [key: string]: { scale: Scale[], selectedModeIndex: number, parentScale: string | null } }, item) => {
        if(item.selectedModeIndex === 0) {
            if (!acc[item.scale.type]) acc[item.scale.type] = {scale:[], selectedModeIndex: item.selectedModeIndex, parentScale: item.parentScale};
            acc[item.scale.type].scale.push(item.scale);
        }
        else {
            const theMode = modes[item.scale.type][item.selectedModeIndex].mode;
            if (!acc[theMode]) acc[theMode] = {scale:[], selectedModeIndex: item.selectedModeIndex, parentScale: item.parentScale};
            acc[theMode].scale.push(item.scale);
        }
        return acc;
    }, {});
} 

export const processTextInput2 = (inputText: string) => {
    const splittedString = inputText.split(/[\s,]+/);
    let musicalNotes: string[] = [];
    let rebuiltInputString: string[] = [];
    
    splittedString.forEach((item) => {
        if (isMusicalNote(item)) {
            musicalNotes.push(formatNote(item));
        } else if(item.length > 0) {
            rebuiltInputString.push(item);
        }
    });
    return {musicalNotes, rebuiltInputString};
}

export const processTextInput = (inputText: string) => {
    const splittedString = inputText.split(/[\s,]+/);
    let found: string = "";
    let rebuiltInputString: string[] = [];
    splittedString.forEach((item) => {
        if (!found && isMusicalNote(item)) {
            found = formatNote(item);
        } else if(item.length > 0) {
            rebuiltInputString.push(item);
        }
    });
    return {found, rebuiltInputString};
}

