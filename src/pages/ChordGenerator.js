import { modes } from '../data/ModesData';
import { useScaleSettings } from "../ScaleSettingsContext";

const intToRomanNumeral = {
    0: "i", 1: "ii", 2: "iii", 3: "iv", 4: "v",
    5: "vi", 6: "vii"
}

// Map notes to integers (for comparison)
const noteToInt = {
    C: 0, "C#": 1, Db: 1, D: 2, "D#": 3, Eb: 3,
    E: 4, Fb: 4, "E#": 5, F: 5, "F#": 6, Gb: 6, G: 7, "G#": 8,
    Ab: 8, A: 9, "A#": 10, Bb: 10, B: 11, Cb: 11, "B#": 0,
  };

const getChordQuality = (root, third, fifth, seventh, scaleDegree) => {
    const interval1 = (third - root + 12) % 12; // Root to third
    const interval2 = (fifth - third + 12) % 12; // Third to fifth
    const interval3 = seventh !== null ? (seventh - fifth + 12) % 12 : null; // Fifth to seventh
    
    let quality = "";
    let romanNumeral = intToRomanNumeral[scaleDegree];

    // Determine chord quality
    if (interval1 === 4 && interval2 === 3) {
        quality = seventh === null ? "" : interval3 === 4 ? "maj7" : "7";
        romanNumeral = romanNumeral.toUpperCase() + quality;
    } else if (interval1 === 3 && interval2 === 4) {
        quality = seventh === null ? "" : interval3 === 4 ? "(maj7)" : "7";
        romanNumeral += quality;
        quality = "m" + quality;
    } else if (interval1 === 3 && interval2 === 3) {
        if (seventh === null)
            quality = "°";
        else if (interval3 === 3)
            quality = "°7";
        else if (interval3 === 4)
            quality = "ø7";
        else if (interval3 === 5)
            quality = "°(maj7)";
        romanNumeral += quality;
    } else if (interval1 === 4 && interval2 === 4) {
        quality = seventh === null ? "+" : "+7";
        romanNumeral = romanNumeral.toUpperCase() + quality;
    }

    return { quality, romanNumeral }
};


const GenerateDiatonicChords = (scale, selectedMode, includeSevenths) => {
    const { romanNumeralsMajorAdjusted } = useScaleSettings();
    
    const scaleNotes = scale.notes;
    console.log(scaleNotes);
    const chords = scaleNotes.map((root, index) => {
        const third = scaleNotes[(index + 2) % scaleNotes.length];
        const fifth = scaleNotes[(index + 4) % scaleNotes.length];
        const seventh = includeSevenths ? scaleNotes[(index + 6) % scaleNotes.length] : null;

        let { quality, romanNumeral } = getChordQuality(noteToInt[root], noteToInt[third], noteToInt[fifth], includeSevenths ? noteToInt[seventh] : null, index);
        const chordName = root + quality;
        const chordNotes = [root, third, fifth];
        if(includeSevenths) chordNotes.push(seventh);
        if(romanNumeralsMajorAdjusted/*  && Number(selectedMode) > 0 */) {
            const accidental = modes[scale.type][Number(selectedMode)].accidentals[index];
            if(accidental != 0)
                romanNumeral = accidental + romanNumeral;
        }

        return { chordName, chordNotes, romanNumeral };
    });

    return chords;
}

export default GenerateDiatonicChords;