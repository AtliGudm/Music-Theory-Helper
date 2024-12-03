export const modes = {
    "Major": [ 
        { mode: "Ionian", accidentals: [0, 0, 0, 0, 0, 0, 0] },
        { mode: "Dorian", accidentals: [0, 0, "b", 0, 0, "b", 0] },
        { mode: "Phrygian", accidentals: [0, "b", "b", 0, 0, "b", "b"] },
        { mode: "Lydian", accidentals: [0, 0, 0, "#", 0, 0, 0] },
        { mode: "Mixolydian", accidentals: [0, 0, 0, 0, 0, 0, "b"] },
        { mode: "Aeolian", accidentals: [0, 0, "b", 0, 0, "b", "b"] },
        { mode: "Locrian", accidentals: [0, "b", "b", 0, "b", "b", "b"] } 
    ],
    "Minor": [ 
        { mode: "Minor", accidentals: [0, 0, "b", 0, 0, "b", "b"] }
    ],
};