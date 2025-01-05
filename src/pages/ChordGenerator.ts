import { modes } from '../data/ModesData';
import { useScaleSettings } from "../ScaleSettingsContext";
import { noteToInt } from "../Helpers";
import { Scale } from "../data/ScaleData";

const intToRomanNumeral: { [key: number]: string } = {
    0: "i", 1: "ii", 2: "iii", 3: "iv", 4: "v",
    5: "vi", 6: "vii", 7: "viii", 8: "ix"
}

const getChordQuality = (root: number, third: number, fifth: number, seventh: number | null, scaleDegree: number) => {
    const interval1 = (third - root + 12) % 12; // Root to third
    const interval2 = (fifth - third + 12) % 12; // Third to fifth
    const interval3 = seventh !== null ? (seventh - fifth + 12) % 12 : null; // Fifth to seventh
    
    let quality = null;
    let romanNumeral = intToRomanNumeral[scaleDegree];

    
    // Sus2
    if (interval1 === 2 && interval2 === 5) {
        quality = "sus2"
        quality += seventh === null ? "" : interval3 === 4 ? "maj7" : "7";
        romanNumeral = romanNumeral.toUpperCase() + quality;
    }
    // Major
    else if (interval1 === 4 && interval2 === 3) {
        quality = seventh === null ? "" : interval3 === 4 ? "maj7" : "7";
        romanNumeral = romanNumeral.toUpperCase() + quality;
    }
    // Minor
    else if (interval1 === 3 && interval2 === 4) {
        quality = seventh === null ? "" : interval3 === 4 ? "(maj7)" : "7";
        romanNumeral += quality;
        quality = "m" + quality;
    }
    // Sus4
    else if (interval1 === 5 && interval2 === 2) {
        quality = "sus4"
        quality += seventh === null ? "" : interval3 === 4 ? "maj7" : "7";
        romanNumeral = romanNumeral.toUpperCase() + quality;
    }
    // Diminished
    else if (interval1 === 3 && interval2 === 3) {
        if (seventh === null)
            quality = "°";
        else if (interval3 === 3)
            quality = "°7";
        else if (interval3 === 4)
            quality = "ø7";
        else if (interval3 === 5)
            quality = "°(maj7)";
        romanNumeral += quality;
    }
    // Augmented
    else if (interval1 === 4 && interval2 === 4) {
        quality = seventh === null ? "+" : "+7";
        romanNumeral = romanNumeral.toUpperCase() + quality;
    }

    return { quality, romanNumeral }
};

const GenerateDiatonicChords = (scale: Scale, selectedMode: number, includeSevenths: boolean, inludeSuspenedChords: boolean) => {
    if(inludeSuspenedChords || scale.type === "Major Pentatonic" || scale.type === "Minor Pentatonic")
        return GenerateAllDiatonicChords(scale, selectedMode, includeSevenths);
    else
        return GenerateStandardDiatonicChords(scale, selectedMode, includeSevenths);
}

const GenerateStandardDiatonicChords = (scale: Scale, selectedMode: number, includeSevenths: boolean) => {
    const { romanNumeralsMajorAdjusted } = useScaleSettings();
    
    const scaleNotes = scale.notes;
    const chords = scaleNotes.map((root, index) => {
        const third = scaleNotes[(index + 2) % scaleNotes.length];
        const fifth = scaleNotes[(index + 4) % scaleNotes.length];
        const seventh = includeSevenths ? scaleNotes[(index + 6) % scaleNotes.length] : null;

        let { quality, romanNumeral } = getChordQuality(noteToInt[root], noteToInt[third], noteToInt[fifth], seventh !== null ? noteToInt[seventh] : null, index);
        if (quality === null) return {};
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

interface Chord {
    chordName: string;
    chordNotes: string[];
    romanNumeral: string;
}


const GenerateAllDiatonicChords = (scale: Scale, selectedMode: number, includeSevenths: boolean) => {
    const { romanNumeralsMajorAdjusted } = useScaleSettings();
    
    const scaleNotes = scale.notes;
    const chords: Chord[] = [];
    scaleNotes.forEach((root, index) => {
        const possibleChords = getPossibleChordsOfRoot(scaleNotes, root, index, includeSevenths);
        possibleChords.forEach(({quality, romanNumeral, third, fifth, seventh }) => {
            const chordName = root + quality;
            const chordNotes = [root, third, fifth];
            if(includeSevenths && seventh !== null) chordNotes.push(seventh);
            if(romanNumeralsMajorAdjusted/*  && Number(selectedMode) > 0 */) {
                const accidental = modes[scale.type][Number(selectedMode)].accidentals[index];
                if(accidental != 0)
                    romanNumeral = accidental + romanNumeral;
            }
            chords.push({ chordName, chordNotes, romanNumeral });
        });
    });
    return chords;
}

const getPossibleChordsOfRoot = (scaleNotes: string[], root: string, index: number, includeSevenths: boolean) => {
    const dfg = [[index, index+2, index+4],
                 [index, index+1, index+2],
                 [index, index+1, index+3],
                 [index, index+2, index+3],
                 [index, index+1, index+4],
                 [index, index+3, index+4]];
    let hf: any[] = [];
    dfg.forEach(item => {
        const third = scaleNotes[item[1] % scaleNotes.length];
        const fifth = scaleNotes[item[2] % scaleNotes.length];
        const seventh = includeSevenths ? scaleNotes[(index + 6) % scaleNotes.length] : null;

        let { quality, romanNumeral } = getChordQuality(noteToInt[root], noteToInt[third], noteToInt[fifth], seventh !== null ? noteToInt[seventh] : null, index);
        if(quality !== null) hf.push({ quality, romanNumeral, third, fifth, seventh });
    });
    return hf;
}

export default GenerateDiatonicChords;