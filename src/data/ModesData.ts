import fuzzysort from 'fuzzysort';

export interface Mode {
    mode: string;
    fifthShift: number;
    accidentals: (number | string)[];
}

export interface ModesData {
    [key: string]: Mode[];
}

export interface SearchResult {
    type: 'mode' | 'scale', 
    item: Mode, 
    parentScale: string, 
    score: number,
    modeNumber: number
}

export function findByName(searchString: string, threshold: number = 0): SearchResult[] {
    // Prepare the input for fuzzysort, embedding parent scale information
    const searchableModes = Object.entries(modes).flatMap(([parentScale, scaleModes]) =>
        scaleModes.map((mode, index) => ({
            ...mode,      // Include mode properties
            parentScale,  // Add the parent scale name (e.g., "Major")
            modeNumber: index // Track the mode's position (0 for Ionian, 1 for Dorian, etc.)
        }))
    );

    const modesResults = fuzzysort.go(searchString, searchableModes, { key: 'mode', threshold: threshold });

    return modesResults.map(result => ({
        type: result.obj.modeNumber  === 0 ? 'scale' : 'mode', // Since we are searching for modes
        item: result.obj, // The matched mode object
        parentScale: result.obj.parentScale, // Parent scale from the enriched object
        score: result.score, // Fuzzy match score
        modeNumber: result.obj.modeNumber // The mode's position in the parent scale
    }));
}

export const modes: ModesData = {
    "Major": [ 
        { mode: "Major", fifthShift: 0, accidentals: [0, 0, 0, 0, 0, 0, 0] },
        { mode: "Dorian", fifthShift: -2, accidentals: [0, 0, "b", 0, 0, 0, "b"] },
        { mode: "Phrygian", fifthShift: -4, accidentals: [0, "b", "b", 0, 0, "b", "b"] },
        { mode: "Lydian", fifthShift: 1, accidentals: [0, 0, 0, "#", 0, 0, 0] },
        { mode: "Mixolydian", fifthShift: -1, accidentals: [0, 0, 0, 0, 0, 0, "b"] },
        { mode: "Aeolian", fifthShift: -3, accidentals: [0, 0, "b", 0, 0, "b", "b"] },
        { mode: "Locrian", fifthShift: -5, accidentals: [0, "b", "b", 0, "b", "b", "b"] } 
    ],
    "Minor": [ 
        { mode: "Minor", fifthShift: 0, accidentals: [0, 0, "b", 0, 0, "b", "b"] }
    ],
    "Melodic Minor": [ 
        { mode: "Melodic Minor", fifthShift: 0, accidentals: [0, 0, "b", 0, 0, 0, 0] },
        { mode: "Dorian b2", fifthShift: -2, accidentals: [0, "b", "b", 0, 0, 0, "b"] },
        { mode: "Lydian Augmented", fifthShift: 3, accidentals: [0, 0, 0, "#", "#", 0, 0] },
        { mode: "Lydian Dominant", fifthShift: 1, accidentals: [0, 0, 0, "#", 0, 0, "b"] },
        { mode: "Aeolian Dominant", fifthShift: -1, accidentals: [0, 0, 0, 0, 0, "b", "b"] },
        { mode: "Half-Diminished", fifthShift: -3, accidentals: [0, 0, "b", 0, "b", "b", "b"] },
        { mode: "Super Locrian", fifthShift: -5, accidentals: [0, "b", "b", "b", "b", "b", "b"] } 
    ],
    "Harmonic Minor": [
        { mode: "Harmonic Minor", fifthShift: 0, accidentals: [0, 0, "b", 0, 0, "b", 0] },
        { mode: "Locrian #6", fifthShift: -2, accidentals: [0, "b", "b", 0, "b", 0, "b"] },
        { mode: "Ionian #5", fifthShift: -4, accidentals: [0, 0, 0, 0, "#", 0, 0] },
        { mode: "Dorian #4", fifthShift: 1, accidentals: [0, 0, "b", "#", 0, 0, "b"] },
        { mode: "Phrygian Dominant", fifthShift: -1, accidentals: [0, "b", 0, 0, 0, "b", "b"] },
        { mode: "Lydian #2", fifthShift: -3, accidentals: [0, "#", 0, "#", 0, 0, 0] },
        { mode: "Super Locrian bb7", fifthShift: -5, accidentals: [0, "b", "b", "b", "b", "b", "bb"] } 
    ],

    "Harmonic Major": [
        { mode: "Harmonic Major", fifthShift: 0, accidentals: [0, 0, 0, 0, 0, "b", 0] },
        { mode: "Dorian b5", fifthShift: -2, accidentals: [0, 0, "b", 0, "b", 0, "b"] },
        { mode: "Phrygian b4", fifthShift: -4, accidentals: [0, "b", "b", "b", 0, "b", "b"] },
        { mode: "Lydian b3", fifthShift: 1, accidentals: [0, 0, "b", "#", 0, 0, 0] },
        { mode: "Mixolydian b2", fifthShift: -1, accidentals: [0, "b", 0, 0, 0, 0, "b"] },
        { mode: "Lydian Augmented #2", fifthShift: 4, accidentals: [0, "#", 0, "#", "#", 0, 0] },
        { mode: "Locrian bb7", fifthShift: -5, accidentals: [0, "b", "b", 0, "b", "b", "bb"] } 
    ],
    "Double Harmonic Major": [
        { mode: "Double Harmonic Major", fifthShift: 0, accidentals: [0, "b", 0, 0, 0, "b", 0] },
        { mode: "Lydian #2 #6", fifthShift: 5, accidentals: [0, "#", 0, "#", 0, "#", 0] },
        { mode: "Phrygian bb7 b4", fifthShift: -4, accidentals: [0, "b", "b", "b", 0, "b", "bb"] },
        { mode: "Hungarian Minor", fifthShift: 1, accidentals: [0, 0, "b", "#", 0, "b", 0] },
        { mode: "Mixolydian b5 b2", fifthShift: -1, accidentals: [0, "b", 0, 0, "b", 0, "b"] },
        { mode: "Ionian #5 #2", fifthShift: 4, accidentals: [0, "#", 0, 0, "#", 0, 0] },
        { mode: "Locrian bb3 bb7", fifthShift: -5, accidentals: [0, "b", "bb", 0, "b", "b", "bb"] } 
    ],
    "Whole Tone": [
        {mode: "Whole Tone", fifthShift: 0, accidentals: [0,0,0,0,0,0]}
    ],
    "Half-Whole Diminished": [
        {mode: "Half-Whole Diminished", fifthShift: 0, accidentals: [0,0,0,0, 0,0,0,0]}
    ],
    "Major Pentatonic": [
        {mode: "Major Pentatonic", fifthShift: 0, accidentals: [0,0,0,0,0]}
    ],
    "Minor Pentatonic": [
        {mode: "Minor Pentatonic", fifthShift: 0, accidentals: [0,0,0,0,0]}
    ]
};