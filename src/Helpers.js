// Map notes to integers (for comparison)
export const noteToInt = {
    C: 0, "C#": 1, Db: 1, D: 2, "D#": 3, Eb: 3,
    E: 4, Fb: 4, "E#": 5, F: 5, "F#": 6, Gb: 6, G: 7, "G#": 8,
    Ab: 8, A: 9, "A#": 10, Bb: 10, B: 11, Cb: 11, "B#": 0,
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
