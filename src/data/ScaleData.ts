export interface Scale {
    type: string;
    root: string;
    notes: string[];
    order: number;
}

export const scales: Scale[] = [
    { type: "Major", root: "C", notes: ["C", "D", "E", "F", "G", "A", "B"], order: 0},
    { type: "Major", root: "G", notes: ["G", "A", "B", "C", "D", "E", "F#"], order: 1 },
    { type: "Major", root: "D", notes: ["D", "E", "F#", "G", "A", "B", "C#"], order: 2 },
    { type: "Major", root: "A", notes: ["A", "B", "C#", "D", "E", "F#", "G#"], order: 3 },
    { type: "Major", root: "E", notes: ["E", "F#", "G#", "A", "B", "C#", "D#"], order: 4 },
    { type: "Major", root: "B", notes: ["B", "C#", "D#", "E", "F#", "G#", "A#"], order: 5 },
    { type: "Major", root: "F#", notes: ["F#", "G#", "A#", "B", "C#", "D#", "E#"], order: 6 },
    { type: "Major", root: "Db", notes: ["Db", "Eb", "F", "Gb", "Ab", "Bb", "C"], order: 7 },
    { type: "Major", root: "Ab", notes: ["Ab", "Bb", "C", "Db", "Eb", "F", "G"], order: 8 },
    { type: "Major", root: "Eb", notes: ["Eb", "F", "G", "Ab", "Bb", "C", "D"], order: 9 },
    { type: "Major", root: "Bb", notes: ["Bb", "C", "D", "Eb", "F", "G", "A"], order: 10 },
    { type: "Major", root: "F", notes: ["F", "G", "A", "Bb", "C", "D", "E"], order: 11 },
    
    { type: "Minor", root: "C", notes: ["C", "D", "Eb", "F", "G", "Ab", "Bb"], order: 12 },
    { type: "Minor", root: "G", notes: ["G", "A", "Bb", "C", "D", "Eb", "F"],   order: 13 },
    { type: "Minor", root: "D", notes: ["D", "E", "F", "G", "A", "Bb", "C"],   order: 14 },
    { type: "Minor", root: "A", notes: ["A", "B", "C", "D", "E", "F", "G"],   order: 15 },
    { type: "Minor", root: "E", notes: ["E", "F#", "G", "A", "B", "C", "D"],   order: 16 },
    { type: "Minor", root: "B", notes: ["B", "C#", "D", "E", "F#", "G", "A"],   order: 17 },
    { type: "Minor", root: "F#", notes: ["F#", "G#", "A", "B", "C#", "D", "E"],   order: 18 },
    { type: "Minor", root: "Db", notes: ["Db", "Eb", "Fb", "Gb", "Ab", "Bbb", "Cb"],   order: 19 },
    { type: "Minor", root: "Ab", notes: ["Ab", "Bb", "Cb", "Db", "Eb", "Fb", "Gb"],   order: 20 },
    { type: "Minor", root: "Eb", notes: ["Eb", "F", "Gb", "Ab", "Bb", "Cb", "Db"],   order: 21 },
    { type: "Minor", root: "Bb", notes: ["Bb", "C", "Db", "Eb", "F", "Gb", "Ab"],   order: 22 },
    { type: "Minor", root: "F", notes: ["F", "G", "Ab", "Bb", "C", "Db", "Eb"],   order: 23 },

    { type: "Melodic Minor", root: "A", notes: ["A", "B", "C", "D", "E", "F#", "G#"], order: 24 },
    { type: "Melodic Minor", root: "E", notes: ["E", "F#", "G", "A", "B", "C#", "D#"], order: 25 },
    { type: "Melodic Minor", root: "B", notes: ["B", "C#", "D", "E", "F#", "G#", "A#"], order: 26 },
    { type: "Melodic Minor", root: "F#", notes: ["F#", "G#", "A", "B", "C#", "D#", "E#"], order: 27 },
    { type: "Melodic Minor", root: "Db", notes: ["Db", "Eb", "Fb", "Gb", "Ab", "Bb", "C"], order: 28 },
    { type: "Melodic Minor", root: "Ab", notes: ["Ab", "Bb", "Cb", "Db", "Eb", "F", "G"], order: 29 },
    { type: "Melodic Minor", root: "Eb", notes: ["Eb", "F", "Gb", "Ab", "Bb", "C", "D"], order: 30 },
    { type: "Melodic Minor", root: "Bb", notes: ["Bb", "C", "Db", "Eb", "F", "G", "A"], order: 31 },
    { type: "Melodic Minor", root: "F", notes: ["F", "G", "Ab", "Bb", "C", "D", "E"], order: 32 },
    { type: "Melodic Minor", root: "C", notes: ["C", "D", "Eb", "F", "G", "A", "B"], order: 33 },
    { type: "Melodic Minor", root: "G", notes: ["G", "A", "Bb", "C", "D", "E", "F#"], order: 34 },
    { type: "Melodic Minor", root: "D", notes: ["D", "E", "F", "G", "A", "B", "C#"], order: 35 },

    { type: "Harmonic Minor", root: "A", notes: ["A", "B", "C", "D", "E", "F", "G#"], order: 36 },
    { type: "Harmonic Minor", root: "E", notes: ["E", "F#", "G", "A", "B", "C", "D#"], order: 37 },
    { type: "Harmonic Minor", root: "B", notes: ["B", "C#", "D", "E", "F#", "G", "A#"], order: 38 },
    { type: "Harmonic Minor", root: "F#", notes: ["F#", "G#", "A", "B", "C#", "D", "E#"], order: 39 },
    { type: "Harmonic Minor", root: "Db", notes: ["Db", "Eb", "Fb", "Gb", "Ab", "Bbb", "C"], order: 40 },
    { type: "Harmonic Minor", root: "Ab", notes: ["Ab", "Bb", "Cb", "Db", "Eb", "Fb", "G"], order: 41 },
    { type: "Harmonic Minor", root: "Eb", notes: ["Eb", "F", "Gb", "Ab", "Bb", "Cb", "D"], order: 42 },
    { type: "Harmonic Minor", root: "Bb", notes: ["Bb", "C", "Db", "Eb", "F", "Gb", "A"], order: 43 },
    { type: "Harmonic Minor", root: "F", notes: ["F", "G", "Ab", "Bb", "C", "Db", "E"], order: 44 },
    { type: "Harmonic Minor", root: "C", notes: ["C", "D", "Eb", "F", "G", "Ab", "B"], order: 45 },
    { type: "Harmonic Minor", root: "G", notes: ["G", "A", "Bb", "C", "D", "Eb", "F#"], order: 46 },
    { type: "Harmonic Minor", root: "D", notes: ["D", "E", "F", "G", "A", "Bb", "C#"], order: 47 },

    { type: "Harmonic Major" , root: "C", notes: ["C", "D", "E", "F", "G", "Ab", "B"], order: 48 },
    { type: "Harmonic Major" , root: "G", notes: ["G", "A", "B", "C", "D", "Eb", "F#"], order: 49 },
    { type: "Harmonic Major" , root: "D", notes: ["D", "E", "F#", "G", "A", "Bb", "C#"], order: 50 },
    { type: "Harmonic Major" , root: "A", notes: ["A", "B", "C#", "D", "E", "F", "G#"], order: 51 },
    { type: "Harmonic Major" , root: "E", notes: ["E", "F#", "G#", "A", "B", "C", "D#"], order: 52 },
    { type: "Harmonic Major" , root: "B", notes: ["B", "C#", "D#", "E", "F#", "G", "A#"], order: 53 },
    { type: "Harmonic Major" , root: "F#", notes: ["F#", "G#", "A#", "B", "C#", "D", "E#"], order: 54 },
    { type: "Harmonic Major" , root: "Db", notes: ["Db", "Eb", "F", "Gb", "Ab", "Bbb", "C"], order: 55 },
    { type: "Harmonic Major" , root: "Ab", notes: ["Ab", "Bb", "C", "Db", "Eb", "Fb", "G"], order: 56 },
    { type: "Harmonic Major" , root: "Eb", notes: ["Eb", "F", "G", "Ab", "Bb", "Cb", "D"], order: 57 },
    { type: "Harmonic Major" , root: "Bb", notes: ["Bb", "C", "D", "Eb", "F", "Gb", "A"], order: 58 },
    { type: "Harmonic Major" , root: "F", notes: ["F", "G", "A", "Bb", "C", "Db", "E"], order: 59 },

    { type: "Double Harmonic Major", root: "C", notes: ["C", "Db", "E", "F", "G", "Ab", "B"], order: 60 },
    { type: "Double Harmonic Major", root: "G", notes: ["G", "Ab", "B", "C", "D", "Eb", "F#"], order: 61 },
    { type: "Double Harmonic Major", root: "D", notes: ["D", "Eb", "F#", "G", "A", "Bb", "C#"], order: 62 },
    { type: "Double Harmonic Major", root: "A", notes: ["A", "Bb", "C#", "D", "E", "F", "G#"], order: 63 },
    { type: "Double Harmonic Major", root: "E", notes: ["E", "F", "G#", "A", "B", "C", "D#"], order: 64 },
    { type: "Double Harmonic Major", root: "B", notes: ["B", "C", "D#", "E", "F#", "G", "A#"], order: 65 },
    { type: "Double Harmonic Major", root: "F#", notes: ["F#", "G", "A#", "B", "C#", "D", "E#"], order: 66 },
    { type: "Double Harmonic Major", root: "Db", notes: ["Db", "Ebb", "F", "Gb", "Ab", "Bbb", "C"], order: 67 },
    { type: "Double Harmonic Major", root: "Ab", notes: ["Ab", "Bbb", "C", "Db", "Eb", "Fb", "G"], order: 68 },
    { type: "Double Harmonic Major", root: "Eb", notes: ["Eb", "Fb", "G", "Ab", "Bb", "Cb", "D"], order: 69 },
    { type: "Double Harmonic Major", root: "Bb", notes: ["Bb", "Cb", "D", "Eb", "F", "Gb", "A"], order: 70 },
    { type: "Double Harmonic Major", root: "F", notes: ["F", "Gb", "A", "Bb", "C", "Db", "E"], order: 71 },
];

export function getScale(type: string, root: string): Scale | undefined {
    return scales.find(scale => scale.type === type && scale.root === root);
}