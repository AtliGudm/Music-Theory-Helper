import { modes } from '../data/ModesData';
import { useScaleSettings } from "../ScaleSettingsContext";
import { noteToInt } from "../Helpers";
import { Scale } from "../data/ScaleData";

const intToRomanNumeral: { [key: number]: string } = {
    0: "i", 1: "ii", 2: "iii", 3: "iv", 4: "v",
    5: "vi", 6: "vii", 7: "viii", 8: "ix"
}

export interface Chord {
    chordName: string;
    chordNotes: string[];
    romanNumeral: string;
    degrees: string[];
}

const getChordQuality = (root: number, third: number, fifth: number, seventh: number | null, scaleDegree: number, includeSuspenedChords: boolean) => {
    const interval1 = (third - root + 12) % 12; // Root to third
    const interval2 = (fifth - third + 12) % 12; // Third to fifth
    const interval3 = seventh !== null ? (seventh - fifth + 12) % 12 : null; // Fifth to seventh
    
    let quality = null;
    let romanNumeral = intToRomanNumeral[scaleDegree];
    let order = -1;
    let degrees: string[] = []
    
    // Sus2
    if (interval1 === 2 && interval2 === 5 && includeSuspenedChords === true) {
        quality = "sus2";
        if(seventh === null) {
            degrees = ["1","2","5"];
        }
        else if(interval3 === 4) {
            quality += "maj7";
            degrees = ["1","2","5","7"];
        }
        else if(interval3 === 3) {
            quality += "7";
            degrees = ["1","2","5","b7"];
        }
        else {
            quality += "?";
            degrees = ["1","2","5","?"];
        }
        romanNumeral = romanNumeral.toUpperCase() + quality;
        order = 4;
    }
/*     // Sus2(b5) 
    else if (interval1 === 2 && interval2 === 4) {
        quality = "sus2(b5)";
        quality += seventh === null ? "" : interval3 === 4 ? "maj7" : "7";
        romanNumeral = romanNumeral.toUpperCase() + quality;
    } */
    // Major
    else if (interval1 === 4 && interval2 === 3) {
        if(seventh === null) {
            quality = "";
            degrees = ["1","3","5"];
        }
        else if(interval3 === 4) {
            quality = "maj7";
            degrees = ["1","3","5","7"];
        }
        else if(interval3 === 3) {
            quality = "7";
            degrees = ["1","3","5","b7"];
        }
        else if(interval3 === 2) {
            quality = "6";
            degrees = ["1","3","5","6"];
        }
        else {
            quality = "?";
            degrees = ["1","3","5","?"];
        }
        
        romanNumeral = romanNumeral.toUpperCase() + quality;
        order = 0;
    }
/*     // Major(b5)
    else if (interval1 === 4 && interval2 === 2) {
        quality = seventh === null ? "(b5)" : interval3 === 4 ? "(b5)maj7" : "(b5)7";
        romanNumeral = romanNumeral.toUpperCase() + quality;
    } */
    // Minor
    else if (interval1 === 3 && interval2 === 4) {
        if(seventh === null) {
            quality = "";
            degrees = ["1","b3","5"];
        }
        else if(interval3 === 4) {
            quality = "(maj7)";
            degrees = ["1","b3","5","7"];
        }
        else if(interval3 === 3){ // TODO: FINISH CASE
            quality = "7";
            degrees = ["1","b3","5","b7"];
        }
        else if(interval3 === 2) {
            quality = "6";
            degrees = ["1","b3","5","6"];
        }
        else {
            quality = "?";
            degrees = ["1","b3","5","?"];
        }
        
        romanNumeral += quality;
        quality = "m" + quality;
        order = 1;
    }
    // Sus4
    else if (interval1 === 5 && interval2 === 2 && includeSuspenedChords === true) {
        quality = "sus4";
        if(seventh === null) {
            degrees = ["1","4","5"];
        }
        else if(interval3 === 4) {
            quality += "maj7";
            degrees = ["1","4","5","7"];
        }
        else if(interval3 === 3) {
            quality += "7";
            degrees = ["1","4","5","b7"];
        }
        else {
            quality += "?";
            degrees = ["1","4","5","?"];
        }
        romanNumeral = romanNumeral.toUpperCase() + quality;
        order = 5;
    }
    // Diminished
    else if (interval1 === 3 && interval2 === 3) {
        if (seventh === null) {
            quality = "°";
            degrees = ["1","b3","b5"];
        } 
        else if (interval3 === 3) {
            quality = "°7";
            degrees = ["1","b3","b5","bb7"];
        }
        else if (interval3 === 4) {
            quality = "ø7";
            degrees = ["1","b3","b5","b7"];
        }
        else if (interval3 === 5) {
            quality = "°(maj7)";
            degrees = ["1","b3","b5","7"];
        }
        else {
            quality = "°?";
            degrees = ["1","b3","b5","?"];
        }
        
        romanNumeral += quality;
        order = 2;
    }
    // Augmented
    else if (interval1 === 4 && interval2 === 4) {
        if(seventh === null) {
            quality = "+";
            degrees = ["1","3","#5"];
        }
        else if(interval3 === 2) {
            quality = "+7";
            degrees = ["1","3","#5","b7"];
        }
        else if(interval3 === 3) {
            quality = "+maj7";
            degrees = ["1","3","#5","7"];
        }
        else {
            quality = "+?"
            degrees = ["1","3","#5","?"];
        }
        romanNumeral = romanNumeral.toUpperCase() + quality;
        order = 3;
    }

    return { quality, romanNumeral, order, degrees }
};

// @ts-ignore
const GenerateDiatonicChords = (scale: Scale, selectedMode: number, includeSevenths: boolean, includeSuspenedChords: boolean , generateOnlyDegreesArr: number[] | null = null ) => {
    if(scale.type === "Major Pentatonic" || scale.type === "Minor Pentatonic")
        return GenerateAllDiatonicChords(scale, selectedMode, includeSevenths, true);
    else
        return GenerateAllDiatonicChords(scale, selectedMode, includeSevenths, includeSuspenedChords);
}

/* 
const GenerateStandardDiatonicChords = (scale: Scale, selectedMode: number, includeSevenths: boolean, generateOnlyDegreesArr: number[] | null = null) => {
    const { romanNumeralsMajorAdjusted } = useScaleSettings();
    
    const scaleNotes = scale.notes;
    let chords: Chord[] = [];

    if (generateOnlyDegreesArr) {
        let notesToLoopThrough: string[] = [];
        generateOnlyDegreesArr.forEach(item => {
            notesToLoopThrough.push(scaleNotes[item]);
        });

        chords = notesToLoopThrough.map((root, index) => {
            return generateDiatonicChord(scale, selectedMode, includeSevenths, romanNumeralsMajorAdjusted, scaleNotes, generateOnlyDegreesArr[index], root);
        });
    }
    else {
        chords = scaleNotes.map((root, index) => {
            return generateDiatonicChord(scale, selectedMode, includeSevenths, romanNumeralsMajorAdjusted, scaleNotes, index, root);
        });
    }

    return chords;
}

const generateDiatonicChord = (scale: Scale, selectedMode: number, includeSevenths: boolean, romanNumeralsMajorAdjusted: boolean, scaleNotes: string[], index: number, root: string) => {
    const third = scaleNotes[(index + 2) % scaleNotes.length];
    const fifth = scaleNotes[(index + 4) % scaleNotes.length];
    const seventh = includeSevenths ? scaleNotes[(index + 6) % scaleNotes.length] : null;

    let { quality, romanNumeral } = getChordQuality(noteToInt[scaleNotes[index]], noteToInt[third], noteToInt[fifth], seventh !== null ? noteToInt[seventh] : null, index);
    if (quality === null) return { chordName: "", chordNotes: [], romanNumeral: "" };
    const chordName = root + quality;
    const chordNotes = [root, third, fifth];
    if(includeSevenths && seventh !== null) chordNotes.push(seventh);
    if(romanNumeralsMajorAdjusted) {
        const accidental = modes[scale.type][Number(selectedMode)].accidentals[index];
        if(accidental != 0)
            romanNumeral = accidental + romanNumeral;
    }
    return { chordName, chordNotes, romanNumeral };
}

 */


const GenerateAllDiatonicChords = (scale: Scale, selectedMode: number, includeSevenths: boolean, includeSuspenedChords: boolean) => {
    const { romanNumeralsMajorAdjusted } = useScaleSettings();
    
    const scaleNotes = scale.notes;
    const chords: Chord[] = [];
    scaleNotes.forEach((root, index) => {
        const possibleChords = getPossibleChordsOfRoot(scaleNotes, root, index, includeSevenths, includeSuspenedChords);
        possibleChords.forEach(({quality, romanNumeral, third, fifth, seventh, degrees }) => {
            const chordName = root + quality;
            const chordNotes = [root, third, fifth];
            if(includeSevenths && seventh !== null) chordNotes.push(seventh);
            if(romanNumeralsMajorAdjusted) {
                const accidental = modes[scale.type][Number(selectedMode)].accidentals[index];
                if(accidental != 0)
                    romanNumeral = accidental + romanNumeral;
            }
            chords.push({ chordName, chordNotes, romanNumeral, degrees });
        });
    });
    return chords;
}

const getPossibleChordsOfRoot = (scaleNotes: string[], root: string, index: number, includeSevenths: boolean, includeSuspenedChords: boolean) => {
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

        let { quality, romanNumeral, order, degrees } = getChordQuality(noteToInt[root], noteToInt[third], noteToInt[fifth], seventh !== null ? noteToInt[seventh] : null, index, includeSuspenedChords);
        if(quality !== null) hf.push({ quality, romanNumeral, third, fifth, seventh, order, degrees });
    });
    if(hf.length > 1) {
        hf.sort((a, b) => a.order - b.order);
    }

    return hf;
}

export default GenerateDiatonicChords;