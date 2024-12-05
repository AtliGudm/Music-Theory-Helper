// Map notes to integers (for comparison)
export const noteToInt = {
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

export const formatNote = (note) => {
    return note.trim().charAt(0).toUpperCase() + note.trim().slice(1); //.toLowerCase();
}

export const formatNotes = (notes) => {
    return notes.map((note) => {
        return formatNote(note);
    }).filter((num) => num !== undefined);
}

export const convertNotesToInt = (notes) => {
    return notes.map((note) => {
        const formattedNote = formatNote(note);
        return noteToInt[formattedNote];
    }).filter((num) => num !== undefined);
}

// Helper function to convert scale notes to integers
export const scaleNotesToInt = (notes) => notes.map((note) => noteToInt[note]);

export const shiftScale = (scale, shiftBy) => {
    const shiftedNotes = shiftArr(scale.notes, shiftBy);
    const newScale = { ...scale, notes: shiftedNotes };
    return newScale;
}

const shiftArr = (arr, shiftBy) => {
/*     if (!Array.isArray(arr) || typeof shiftBy !== "number") {
      throw new Error("Invalid input. Provide an array and a number.");
    } */
  
    const length = arr.length;
    if (length === 0) return arr; // Handle empty array
  
    // Normalize shiftBy to ensure it's within bounds
    const normalizedShift = ((shiftBy % length) + length) % length;
  
    return arr.slice(normalizedShift).concat(arr.slice(0, normalizedShift));
  }



export const getFifth = (note, steps = 1) => {
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

export const modifyNote = (note, accidental) => {
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
}

