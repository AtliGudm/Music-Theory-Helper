import { modes } from '../data/ModesData';
import { useScaleSettings } from "../ScaleSettingsContext";
import { noteToInt } from "../Helpers";
import { Scale } from "../data/ScaleData";

const intToRomanNumeral: { [key: number]: string } = {
    0: "i", 1: "ii", 2: "iii", 3: "iv", 4: "v",
    5: "vi", 6: "vii"
}

const getChordQuality = (root: number, third: number, fifth: number, seventh: number | null, scaleDegree: number) => {
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


const GenerateDiatonicChords = (scale: Scale, selectedMode: number, includeSevenths: boolean) => {
    const { romanNumeralsMajorAdjusted } = useScaleSettings();
    
    const scaleNotes = scale.notes;
    const chords = scaleNotes.map((root, index) => {
        const third = scaleNotes[(index + 2) % scaleNotes.length];
        const fifth = scaleNotes[(index + 4) % scaleNotes.length];
        const seventh = includeSevenths ? scaleNotes[(index + 6) % scaleNotes.length] : null;

        let { quality, romanNumeral } = getChordQuality(noteToInt[root], noteToInt[third], noteToInt[fifth], seventh !== null ? noteToInt[seventh] : null, index);
        const chordName = root + quality;
        const chordNotes = [root, third, fifth];
        if(includeSevenths && seventh !== null) chordNotes.push(seventh);
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