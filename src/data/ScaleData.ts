import { Mode } from "./ModesData";

export interface Scale {
    type: string;
    root: string | null;
    notes: string[];
    order: number;
}

export interface PayloadContainer{
    scaleName: string;
    payloadList: Payload[]; 
}

export interface Payload {
    note: number;
    degree: string;
}

export interface ParaScale {
    mode: Mode;
    parallelRoot: string;
    modifiedScale: Scale;
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

    { type: "Melodic Minor", root: "C", notes: ["C", "D", "Eb", "F", "G", "A", "B"], order: 24 },
    { type: "Melodic Minor", root: "G", notes: ["G", "A", "Bb", "C", "D", "E", "F#"], order: 25 },
    { type: "Melodic Minor", root: "D", notes: ["D", "E", "F", "G", "A", "B", "C#"], order: 26 },
    { type: "Melodic Minor", root: "A", notes: ["A", "B", "C", "D", "E", "F#", "G#"], order: 27 },
    { type: "Melodic Minor", root: "E", notes: ["E", "F#", "G", "A", "B", "C#", "D#"], order: 28 },
    { type: "Melodic Minor", root: "B", notes: ["B", "C#", "D", "E", "F#", "G#", "A#"], order: 29 },
    { type: "Melodic Minor", root: "F#", notes: ["F#", "G#", "A", "B", "C#", "D#", "E#"], order: 30 },
    { type: "Melodic Minor", root: "Db", notes: ["Db", "Eb", "Fb", "Gb", "Ab", "Bb", "C"], order: 31 },
    { type: "Melodic Minor", root: "Ab", notes: ["Ab", "Bb", "Cb", "Db", "Eb", "F", "G"], order: 32 },
    { type: "Melodic Minor", root: "Eb", notes: ["Eb", "F", "Gb", "Ab", "Bb", "C", "D"], order: 33 },
    { type: "Melodic Minor", root: "Bb", notes: ["Bb", "C", "Db", "Eb", "F", "G", "A"], order: 34 },
    { type: "Melodic Minor", root: "F", notes: ["F", "G", "Ab", "Bb", "C", "D", "E"], order: 35 },

    { type: "Harmonic Minor", root: "C", notes: ["C", "D", "Eb", "F", "G", "Ab", "B"], order: 36 },
    { type: "Harmonic Minor", root: "G", notes: ["G", "A", "Bb", "C", "D", "Eb", "F#"], order: 37 },
    { type: "Harmonic Minor", root: "D", notes: ["D", "E", "F", "G", "A", "Bb", "C#"], order: 38 },
    { type: "Harmonic Minor", root: "A", notes: ["A", "B", "C", "D", "E", "F", "G#"], order: 39 },
    { type: "Harmonic Minor", root: "E", notes: ["E", "F#", "G", "A", "B", "C", "D#"], order: 40 },
    { type: "Harmonic Minor", root: "B", notes: ["B", "C#", "D", "E", "F#", "G", "A#"], order: 41 },
    { type: "Harmonic Minor", root: "F#", notes: ["F#", "G#", "A", "B", "C#", "D", "E#"], order: 42 },
    { type: "Harmonic Minor", root: "Db", notes: ["Db", "Eb", "Fb", "Gb", "Ab", "Bbb", "C"], order: 43 },
    { type: "Harmonic Minor", root: "Ab", notes: ["Ab", "Bb", "Cb", "Db", "Eb", "Fb", "G"], order: 44 },
    { type: "Harmonic Minor", root: "Eb", notes: ["Eb", "F", "Gb", "Ab", "Bb", "Cb", "D"], order: 45 },
    { type: "Harmonic Minor", root: "Bb", notes: ["Bb", "C", "Db", "Eb", "F", "Gb", "A"], order: 46 },
    { type: "Harmonic Minor", root: "F", notes: ["F", "G", "Ab", "Bb", "C", "Db", "E"], order: 47 },

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
    
    
    { type: "Major Pentatonic", root: "C", notes: ["C", "D", "E", "G", "A"], order: 77 },
    { type: "Major Pentatonic", root: "G", notes: ["G", "A", "B", "D", "E"], order: 78 },
    { type: "Major Pentatonic", root: "D", notes: ["D", "E", "F#", "A", "B"], order: 79 },
    { type: "Major Pentatonic", root: "A", notes: ["A", "B", "C#", "E", "F#"], order: 80 },
    { type: "Major Pentatonic", root: "E", notes: ["E", "F#", "G#", "B", "C#"], order: 81 },
    { type: "Major Pentatonic", root: "B", notes: ["B", "C#", "D#", "F#", "G#"], order: 82 },
    { type: "Major Pentatonic", root: "F#", notes: ["F#", "G#", "A#", "C#", "D#"], order: 83 },
    { type: "Major Pentatonic", root: "Db", notes: ["Db", "Eb", "F", "Ab", "Bb"], order: 84 },
    { type: "Major Pentatonic", root: "Ab", notes: ["Ab", "Bb", "C", "Eb", "F"], order: 85 },
    { type: "Major Pentatonic", root: "Eb", notes: ["Eb", "F", "G", "Bb", "C"], order: 86 },
    { type: "Major Pentatonic", root: "Bb", notes: ["Bb", "C", "D", "F", "G"], order: 87 },
    { type: "Major Pentatonic", root: "F", notes: ["F", "G", "A", "C", "D"], order: 88 },
    
    { type: "Minor Pentatonic", root: "C", notes: ["C", "Eb", "F", "G", "Bb"], order: 89 },
    { type: "Minor Pentatonic", root: "G", notes: ["G", "Bb", "C", "D", "F"], order: 90 },
    { type: "Minor Pentatonic", root: "D", notes: ["D", "F", "G", "A", "C"], order: 91 },
    { type: "Minor Pentatonic", root: "A", notes: ["A", "C", "D", "E", "G"], order: 92 },
    { type: "Minor Pentatonic", root: "E", notes: ["E", "G", "A", "B", "D"], order: 93 },
    { type: "Minor Pentatonic", root: "B", notes: ["B", "D", "E", "F#", "A"], order: 94 },
    { type: "Minor Pentatonic", root: "F#", notes: ["F#", "A", "B", "C#", "E"], order: 95 },
    { type: "Minor Pentatonic", root: "Db", notes: ["Db", "Fb", "Gb", "Ab", "B"], order: 96 },
    { type: "Minor Pentatonic", root: "Ab", notes: ["Ab", "Cb", "Db", "Eb", "Gb"], order: 97 },
    { type: "Minor Pentatonic", root: "Eb", notes: ["Eb", "Gb", "Ab", "Bb", "Db"], order: 98 },
    { type: "Minor Pentatonic", root: "Bb", notes: ["Bb", "Db", "Eb", "F", "Ab"], order: 99 },
    { type: "Minor Pentatonic", root: "F", notes: ["F", "Ab", "Bb", "C", "Eb"], order: 100 },

    { type: "Whole Tone", root: null, notes: ["C", "D", "E", "F#", "G#", "A#"], order: 72 },
    { type: "Whole Tone", root: null, notes: ["Db", "Eb", "F", "G", "A", "B"], order: 73 },
    
    { type: "Half-Whole Diminished", root: "C", notes: ["C", "Db", "Eb", "E", "F#", "G", "A", "Bb"], order: 74 },
    { type: "Half-Whole Diminished", root: "Db", notes: ["Db", "D", "E", "F", "G", "Ab", "Bb", "B"], order: 75 },
    { type: "Half-Whole Diminished", root: "D", notes: ["D", "Eb", "F", "F#", "G#", "A", "B", "C"], order: 76 },

    { type: "Neapolitan Major", root: "C", notes: ["C", "Db", "Eb", "F", "G", "A", "B"], order: 101 },
    { type: "Neapolitan Major", root: "G", notes: ["G", "Ab", "Bb", "C", "D", "E", "F#"], order: 102 },
    { type: "Neapolitan Major", root: "D", notes: ["D", "Eb", "F", "G", "A", "B", "C#"], order: 103 },
    { type: "Neapolitan Major", root: "A", notes: ["A", "Bb", "C", "D", "E", "F#", "G#"], order: 104 },
    { type: "Neapolitan Major", root: "E", notes: ["E", "F", "G", "A", "B", "C#", "D#"], order: 105 },
    { type: "Neapolitan Major", root: "B", notes: ["B", "C", "D", "E", "F#", "G#", "A#"], order: 106 },
    { type: "Neapolitan Major", root: "F#", notes: ["F#", "G", "A", "B", "C#", "D#", "E#"], order: 107 },
    { type: "Neapolitan Major", root: "Db", notes: ["Db", "Ebb", "Fb", "Gb", "Ab", "Bb", "C"], order: 108 },
    { type: "Neapolitan Major", root: "Ab", notes: ["Ab", "Bbb", "Cb", "Db", "Eb", "F", "G"], order: 109 },
    { type: "Neapolitan Major", root: "Eb", notes: ["Eb", "Fb", "Gb", "Ab", "Bb", "C", "D"], order: 110 },
    { type: "Neapolitan Major", root: "Bb", notes: ["Bb", "Cb", "Db", "Eb", "F", "G", "A"], order: 111 },
    { type: "Neapolitan Major", root: "F", notes: ["F", "Gb", "Ab", "Bb", "C", "D", "E"], order: 112 },
    
    { type: "Neapolitan Minor", root: "C", notes:  ["C", "Db", "Eb", "F", "G", "Ab", "B"], order: 113 },
    { type: "Neapolitan Minor", root: "G", notes:  ["G", "Ab", "Bb", "C", "D", "Eb", "F#"], order: 114 },
    { type: "Neapolitan Minor", root: "D", notes:  ["D", "Eb", "F", "G", "A", "Bb", "C#"], order: 115 },
    { type: "Neapolitan Minor", root: "A", notes:  ["A", "Bb", "C", "D", "E", "F", "G#"], order: 116 },
    { type: "Neapolitan Minor", root: "E", notes:  ["E", "F", "G", "A", "B", "C", "D#"], order: 117 },
    { type: "Neapolitan Minor", root: "B", notes:  ["B", "C", "D", "E", "F#", "G", "A#"], order: 118 },
    { type: "Neapolitan Minor", root: "F#", notes: ["F#", "G", "A", "B", "C#", "D", "E#"], order: 119 },
    { type: "Neapolitan Minor", root: "Db", notes: ["Db", "Ebb", "Fb", "Gb", "Ab", "Bbb", "C"], order: 120 },
    { type: "Neapolitan Minor", root: "Ab", notes: ["Ab", "Bbb", "Cb", "Db", "Eb", "Fb", "G"], order: 121 },
    { type: "Neapolitan Minor", root: "Eb", notes: ["Eb", "Fb", "Gb", "Ab", "Bb", "Cb", "D"], order: 122 },
    { type: "Neapolitan Minor", root: "Bb", notes: ["Bb", "Cb", "Db", "Eb", "F", "Gb", "A"], order: 123 },
    { type: "Neapolitan Minor", root: "F", notes:  ["F", "Gb", "Ab", "Bb", "C", "Db", "E"], order: 124 },

    { type: "Romanian Major", root: "C", notes:  ["C", "Db", "E", "F#", "G", "A", "Bb"], order: 125 },
    { type: "Romanian Major", root: "G", notes:  ["G", "Ab", "B", "C#", "D", "E", "F"], order: 126 },
    { type: "Romanian Major", root: "D", notes:  ["D", "Eb", "F#", "G#", "A", "B", "C"], order: 127 },
    { type: "Romanian Major", root: "A", notes:  ["A", "Bb", "C#", "D#", "E", "F#", "G"], order: 128 },
    { type: "Romanian Major", root: "E", notes:  ["E", "F", "G#", "A#", "B", "C#", "D"], order: 129 },
    { type: "Romanian Major", root: "B", notes:  ["B", "C", "D#", "E#", "F#", "G#", "A"], order: 130 },
    { type: "Romanian Major", root: "F#", notes: ["F#", "G", "A#", "B#", "C#", "D#", "E"], order: 131 },
    { type: "Romanian Major", root: "Db", notes: ["Db", "Ebb", "F", "G", "Ab", "Bb", "Cb"], order: 132 },
    { type: "Romanian Major", root: "Ab", notes: ["Ab", "Bbb", "C", "D", "Eb", "F", "Gb"], order: 133 },
    { type: "Romanian Major", root: "Eb", notes: ["Eb", "Fb", "G", "A", "Bb", "C", "Db"], order: 134 },
    { type: "Romanian Major", root: "Bb", notes: ["Bb", "Cb", "D", "E", "F", "G", "Ab"], order: 135 },
    { type: "Romanian Major", root: "F", notes:  ["F", "Gb", "A", "B", "C", "D", "Eb"], order: 136 },
    
    { type: "Hungarian Major", root: "C", notes: ["C", "D#", "E", "F#", "G", "A", "Bb"], order: 137 },
    { type: "Hungarian Major", root: "G", notes: ["G", "A#", "B", "C#", "D", "E", "F"], order: 138 },
    { type: "Hungarian Major", root: "D", notes: ["D", "E#", "F#", "G#", "A", "B", "C"], order: 139 },
    { type: "Hungarian Major", root: "A", notes: ["A", "B#", "C#", "D#", "E", "F#", "G"], order: 140 },
    { type: "Hungarian Major", root: "E", notes: ["E", "Fx", "G#", "A#", "B", "C#", "D"], order: 141 },
    { type: "Hungarian Major", root: "B", notes: ["B", "Cx", "D#", "E#", "F#", "G#", "A"], order: 142 },
    { type: "Hungarian Major", root: "F#", notes: ["F#", "Gx", "A#", "B#", "C#", "D#", "E"], order: 143 },
    { type: "Hungarian Major", root: "Db", notes: ["Db", "E", "F", "G", "Ab", "Bb", "Cb"], order: 144 },
    { type: "Hungarian Major", root: "Ab", notes: ["Ab", "B", "C", "D", "Eb", "F", "Gb"], order: 145 },
    { type: "Hungarian Major", root: "Eb", notes: ["Eb", "F#", "G", "A", "Bb", "C", "Db"], order: 146 },
    { type: "Hungarian Major", root: "Bb", notes: ["Bb", "C#", "D", "E", "F", "G", "Ab"], order: 147 },
    { type: "Hungarian Major", root: "F", notes: ["F", "G#", "A", "B", "C", "D", "Eb"], order: 148 },
     
    { type: "Enigmatic", root: "C", notes: ["C", "Db", "E", "F#", "G#", "A#", "B"], order: 149 },
    { type: "Enigmatic", root: "G", notes: ["G", "Ab", "B", "C#", "D#", "E#", "F#"], order: 150 },
    { type: "Enigmatic", root: "D", notes: ["D", "Eb", "F#", "G#", "A#", "B#", "C#"], order: 151 },
    { type: "Enigmatic", root: "A", notes: ["A", "Bb", "C#", "D#", "E#", "Fx", "G#"], order: 152 },
    { type: "Enigmatic", root: "E", notes: ["E", "F", "G#", "A#", "B#", "Cx", "D#"], order: 153 },
    { type: "Enigmatic", root: "B", notes: ["B", "C", "D#", "E#", "Fx", "Gx", "A#"], order: 154 },
    { type: "Enigmatic", root: "F#", notes: ["F#", "G", "A#", "B#", "Cx", "Dx", "E#"], order: 155 },
    { type: "Enigmatic", root: "Db", notes: ["Db", "Ebb", "F", "G", "A", "B", "C"], order: 156 }, // !!!!!
    { type: "Enigmatic", root: "Ab", notes: ["Ab", "Bbb", "C", "D", "E", "F#", "G"], order: 157 },
    { type: "Enigmatic", root: "Eb", notes: ["Eb", "Fb", "G", "A", "B", "C#", "D"], order: 158 },
    { type: "Enigmatic", root: "Bb", notes: ["Bb", "Cb", "D", "E", "F#", "G#", "A"], order: 159 },
    { type: "Enigmatic", root: "F", notes: ["F", "Gb", "A", "B", "C#", "D#", "E"], order: 160 },
    
    { type: "Spanish 8 Tone", root: "C", notes: ["C", "Db", "D#", "E", "F", "Gb", "Ab", "Bb"], order: 161 },
    { type: "Spanish 8 Tone", root: "G", notes: ["G", "Ab", "A#", "B", "C", "Db", "Eb", "F"], order: 162 },
    { type: "Spanish 8 Tone", root: "D", notes: ["D", "Eb", "E#", "F#", "G", "Ab", "Bb", "C"], order: 163 },
    { type: "Spanish 8 Tone", root: "A", notes: ["A", "Bb", "B#", "C#", "D", "Eb", "F", "G"], order: 164 },
    { type: "Spanish 8 Tone", root: "E", notes: ["E", "F", "Fx", "G#", "A", "Bb", "C", "D"], order: 165 },
    { type: "Spanish 8 Tone", root: "B", notes: ["B", "C", "Cx", "D#", "E", "F", "G", "A"], order: 166 },
    { type: "Spanish 8 Tone", root: "F#", notes: ["F#", "G", "Gx", "A#", "B", "C", "D", "E"], order: 167 },
    { type: "Spanish 8 Tone", root: "Db", notes: ["Db", "Ebb", "E", "F", "Gb", "Abb", "Bbb", "Cb"], order: 168 },
    { type: "Spanish 8 Tone", root: "Ab", notes: ["Ab", "Bbb", "B", "C", "Db", "Ebb", "Fb", "Gb"], order: 169 },
    { type: "Spanish 8 Tone", root: "Eb", notes: ["Eb", "Fb", "F#", "G", "Ab", "Bbb", "Cb", "Db"], order: 170 },
    { type: "Spanish 8 Tone", root: "Bb", notes: ["Bb", "Cb", "C#", "D", "Eb", "Fb", "Gb", "Ab"], order: 171 },
    { type: "Spanish 8 Tone", root: "F", notes: ["F", "Gb", "G#", "A", "Bb", "Cb", "Db", "Eb"], order: 172 },
   
    { type: "Augmented", root: "C", notes: ["C", "D#", "E", "G", "Ab", "B"], order: 173 },
    { type: "Augmented", root: "Db", notes: ["Db", "E", "F", "G#", "A", "C"], order: 174 },
    { type: "Augmented", root: "D", notes: ["D", "F", "Gb", "A", "Bb", "C#"], order: 175 },
    { type: "Augmented", root: "Eb", notes: ["Eb", "F#", "G", "A#", "B", "D"], order: 176 },

    { type: "Prometheus", root: "C", notes: ["C", "D", "E", "Gb", "A", "Bb"], order: 177 },
    { type: "Prometheus", root: "G", notes: ["G", "A", "B", "C#", "E", "F"], order: 178 },
    { type: "Prometheus", root: "D", notes: ["D", "E", "F#", "G#", "B", "C"], order: 179 },
    { type: "Prometheus", root: "A", notes: ["A", "B", "C#", "D#", "F#", "G"], order: 180 },
    { type: "Prometheus", root: "E", notes: ["E", "F#", "G#", "A#", "C#", "D"], order: 181 },
    { type: "Prometheus", root: "B", notes: ["B", "C#", "D#", "F", "G#", "A"], order: 182 },
    { type: "Prometheus", root: "F#", notes: ["F#", "G#", "A#", "C", "D#", "E"], order: 183 },
    { type: "Prometheus", root: "Db", notes: ["Db", "Eb", "F", "G", "A#", "B"], order: 184 },    
    { type: "Prometheus", root: "Ab", notes: ["Ab", "Bb", "C", "D", "F", "Gb"], order: 185 },
    { type: "Prometheus", root: "Eb", notes: ["Eb", "F", "G", "A", "C", "Db"], order: 186 },
    { type: "Prometheus", root: "Bb", notes: ["Bb", "C", "D", "E", "G", "Ab"], order: 187 },
    { type: "Prometheus", root: "F", notes: ["F", "G", "A", "B", "D", "Eb"], order: 188 },
    
    { type: "Tritone", root: "C", notes: ["C", "Db", "E", "F#", "G", "Bb"], order: 189 },
    { type: "Tritone", root: "G", notes: ["G", "Ab", "B", "Db", "D", "F"], order: 190 },
    { type: "Tritone", root: "D", notes: ["D", "Eb", "F#", "G#", "A", "C"], order: 191 },
    { type: "Tritone", root: "A", notes: ["A", "Bb", "C#", "Eb", "Fb", "G"], order: 192 },
    { type: "Tritone", root: "E", notes: ["E", "F", "G#", "A#", "B", "D"], order: 193 },
    { type: "Tritone", root: "B", notes: ["F", "Gb", "A", "B", "C", "D#"], order: 194 },
    { type: "Tritone", root: "F#", notes: ["F#", "G", "Bb", "C", "Db", "E"], order: 195 },
    { type: "Tritone", root: "Db", notes: ["Db", "D", "F", "G", "Ab", "B"], order: 196 },
    { type: "Tritone", root: "Ab", notes: ["Ab", "A", "C", "D", "Eb", "F#"], order: 197 },
    { type: "Tritone", root: "Eb", notes: ["Eb", "Fb", "G", "A", "Bb", "C#"], order: 198 },
    { type: "Tritone", root: "Bb", notes: ["B", "D", "E", "F", "G#", "A#"], order: 199 },
    { type: "Tritone", root: "F", notes: ["F", "Gb", "A", "B", "C", "D#"], order: 200 },

    { type: "Minor Blues", root: "C", notes: ["C", "Eb", "F", "Gb", "G", "Bb"], order: 201 },
    { type: "Minor Blues", root: "G", notes: ["G", "Bb", "C", "Db", "D", "F"], order: 202 },
    { type: "Minor Blues", root: "D", notes: ["D", "F", "G", "Ab", "A", "C"], order: 203 },
    { type: "Minor Blues", root: "A", notes: ["A", "C", "D", "Eb", "E", "G"], order: 204 },
    { type: "Minor Blues", root: "E", notes: ["E", "G", "A", "Bb", "B", "D"], order: 205 },
    { type: "Minor Blues", root: "B", notes: ["B", "D", "E", "F", "F#", "A"], order: 206 },
    { type: "Minor Blues", root: "F#", notes: ["F#", "A", "B", "C", "C#", "E"], order: 207 },
    { type: "Minor Blues", root: "Db", notes: ["Db", "E", "F#", "G", "Ab", "B"], order: 208 },
    { type: "Minor Blues", root: "Ab", notes: ["Ab", "B", "C#", "D", "Eb", "F#"], order: 209 },
    { type: "Minor Blues", root: "Eb", notes: ["Eb", "F#", "G#", "A", "Bb", "C#"], order: 210 },
    { type: "Minor Blues", root: "Bb", notes: ["Bb", "C#", "D#", "E", "F", "G#"], order: 211 },
    { type: "Minor Blues", root: "F", notes: ["F", "G#", "A#", "B", "C", "D#"], order: 212 },

    { type: "Hirajoshi", root: "C", notes: ["C", "D", "Eb", "G", "Ab"], order: 213 },
    { type: "Hirajoshi", root: "G", notes: ["G", "A", "Bb", "D", "Eb"], order: 214 },
    { type: "Hirajoshi", root: "D", notes: ["D", "E", "F", "A", "Bb"], order: 215 },
    { type: "Hirajoshi", root: "A", notes: ["A", "B", "C", "E", "F"], order: 216 },
    { type: "Hirajoshi", root: "E", notes: ["E", "F#", "G", "B", "C"], order: 217 },
    { type: "Hirajoshi", root: "B", notes: ["B", "C#", "D", "F#", "G"], order: 218 },
    { type: "Hirajoshi", root: "F#", notes: ["F#", "G#", "A", "C#", "D"], order: 219 },
    { type: "Hirajoshi", root: "Db", notes: ["Db", "Eb", "Fb", "G#", "A"], order: 220 },
    { type: "Hirajoshi", root: "Ab", notes: ["Ab", "Bb", "Cb", "D#", "E"], order: 221 },
    { type: "Hirajoshi", root: "Eb", notes: ["Eb", "F", "Gb", "A#", "B"], order: 222 },
    { type: "Hirajoshi", root: "Bb", notes: ["Bb", "C", "Db", "F", "Gb"], order: 223 },
    { type: "Hirajoshi", root: "F", notes: ["F", "G", "Ab", "C", "Db"], order: 224 },

    { type: "Messiaen Mode 5", root: "C", notes: ["C", "Db", "F", "F#", "G", "B"], order: 225 },
    { type: "Messiaen Mode 5", root: "G", notes: ["G", "Ab", "C", "C#", "D", "F#"], order: 226 },
    { type: "Messiaen Mode 5", root: "D", notes: ["D", "Eb", "G", "G#", "A", "C#"], order: 227 },
    { type: "Messiaen Mode 5", root: "A", notes: ["A", "Bb", "D", "D#", "E", "G#"], order: 228 },
    { type: "Messiaen Mode 5", root: "E", notes: ["E", "F", "A", "Bb", "Cb", "D#"], order: 229 },
    { type: "Messiaen Mode 5", root: "B", notes: ["B", "C", "E", "F", "Gb", "A#"], order: 230 },
    { type: "Messiaen Mode 5", root: "F#", notes: ["F#", "G", "B", "C", "Db", "E#"], order: 231 },
    { type: "Messiaen Mode 5", root: "Db", notes: ["Db", "Ebb", "F#", "G", "Ab", "C"], order: 232 },
    { type: "Messiaen Mode 5", root: "Ab", notes: ["Ab", "Bbb", "C#", "D", "Eb", "G"], order: 233 },
    { type: "Messiaen Mode 5", root: "Eb", notes: ["Eb", "Fb", "G#", "A", "Bb", "D"], order: 234 },
    { type: "Messiaen Mode 5", root: "Bb", notes: ["Bb", "Cb", "D#", "E", "F", "A"], order: 235 },
    { type: "Messiaen Mode 5", root: "F", notes: ["F", "Gb", "A#", "B", "C", "E"], order: 236 },

];
// Half-Whole Diminished
export function getScale(type: string, root: string): Scale | undefined {
    return scales.find(scale => scale.type === type && scale.root === root);
}

export function getScales(type: string): Scale[] | undefined {
    return scales.filter(scale => scale.type === type);
}