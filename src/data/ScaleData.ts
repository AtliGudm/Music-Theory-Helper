export interface Scale {
    type: string;
    root: string;
    notes: string[];
}

export const scales: Scale[] = [
    { type: "Major", root: "C", notes: ["C", "D", "E", "F", "G", "A", "B"] },
    { type: "Major", root: "G", notes: ["G", "A", "B", "C", "D", "E", "F#"] },
    { type: "Major", root: "D", notes: ["D", "E", "F#", "G", "A", "B", "C#"] },
    { type: "Major", root: "A", notes: ["A", "B", "C#", "D", "E", "F#", "G#"] },
    { type: "Major", root: "E", notes: ["E", "F#", "G#", "A", "B", "C#", "D#"] },
    { type: "Major", root: "B", notes: ["B", "C#", "D#", "E", "F#", "G#", "A#"] },
    { type: "Major", root: "F#", notes: ["F#", "G#", "A#", "B", "C#", "D#", "E#"] },
    { type: "Major", root: "Db", notes: ["Db", "Eb", "F", "Gb", "Ab", "Bb", "C"] },
    { type: "Major", root: "Ab", notes: ["Ab", "Bb", "C", "Db", "Eb", "F", "G"] },
    { type: "Major", root: "Eb", notes: ["Eb", "F", "G", "Ab", "Bb", "C", "D"] },
    { type: "Major", root: "Bb", notes: ["Bb", "C", "D", "Eb", "F", "G", "A"] },
    { type: "Major", root: "F", notes: ["F", "G", "A", "Bb", "C", "D", "E"] },
    
    { type: "Minor", root: "C", notes: ["C", "D", "Eb", "F", "G", "Ab", "Bb"] },
    { type: "Minor", root: "G", notes: ["G", "A", "Bb", "C", "D", "Eb", "F"] },
    { type: "Minor", root: "D", notes: ["D", "E", "F", "G", "A", "Bb", "C"] },
    { type: "Minor", root: "A", notes: ["A", "B", "C", "D", "E", "F", "G"] },
    { type: "Minor", root: "E", notes: ["E", "F#", "G", "A", "B", "C", "D"] },
    { type: "Minor", root: "B", notes: ["B", "C#", "D", "E", "F#", "G", "A"] },
    { type: "Minor", root: "F#", notes: ["F#", "G#", "A", "B", "C#", "D", "E"] },
    { type: "Minor", root: "Db", notes: ["Db", "Eb", "Fb", "Gb", "Ab", "Bbb", "Cb"] },
    { type: "Minor", root: "Ab", notes: ["Ab", "Bb", "Cb", "Db", "Eb", "Fb", "Gb"] },
    { type: "Minor", root: "Eb", notes: ["Eb", "F", "Gb", "Ab", "Bb", "Cb", "Db"] },
    { type: "Minor", root: "Bb", notes: ["Bb", "C", "Db", "Eb", "F", "Gb", "Ab"] },
    { type: "Minor", root: "F", notes: ["F", "G", "Ab", "Bb", "C", "Db", "Eb"] },

    { type: "Melodic Minor", root: "A", notes: ["A", "B", "C", "D", "E", "F#", "G#"] },
    { type: "Melodic Minor", root: "E", notes: ["E", "F#", "G", "A", "B", "C#", "D#"] },
    { type: "Melodic Minor", root: "B", notes: ["B", "C#", "D", "E", "F#", "G#", "A#"] },
    { type: "Melodic Minor", root: "F#", notes: ["F#", "G#", "A", "B", "C#", "D#", "E#"] },
    { type: "Melodic Minor", root: "Db", notes: ["Db", "Eb", "Fb", "Gb", "Ab", "Bb", "C"] },
    { type: "Melodic Minor", root: "Ab", notes: ["Ab", "Bb", "Cb", "Db", "Eb", "F", "G"] },
    { type: "Melodic Minor", root: "Eb", notes: ["Eb", "F", "Gb", "Ab", "Bb", "C", "D"] },
    { type: "Melodic Minor", root: "Bb", notes: ["Bb", "C", "Db", "Eb", "F", "G", "A"] },
    { type: "Melodic Minor", root: "F", notes: ["F", "G", "Ab", "Bb", "C", "D", "E"] },
    { type: "Melodic Minor", root: "C", notes: ["C", "D", "Eb", "F", "G", "A", "B"] },
    { type: "Melodic Minor", root: "G", notes: ["G", "A", "Bb", "C", "D", "E", "F#"] },
    { type: "Melodic Minor", root: "D", notes: ["D", "E", "F", "G", "A", "B", "C#"] },

    { type: "Harmonic Minor", root: "A", notes: ["A", "B", "C", "D", "E", "F", "G#"] },
    { type: "Harmonic Minor", root: "E", notes: ["E", "F#", "G", "A", "B", "C", "D#"] },
    { type: "Harmonic Minor", root: "B", notes: ["B", "C#", "D", "E", "F#", "G", "A#"] },
    { type: "Harmonic Minor", root: "F#", notes: ["F#", "G#", "A", "B", "C#", "D", "E#"] },
    { type: "Harmonic Minor", root: "Db", notes: ["Db", "Eb", "Fb", "Gb", "Ab", "Bbb", "C"] },
    { type: "Harmonic Minor", root: "Ab", notes: ["Ab", "Bb", "Cb", "Db", "Eb", "Fb", "G"] },
    { type: "Harmonic Minor", root: "Eb", notes: ["Eb", "F", "Gb", "Ab", "Bb", "Cb", "D"] },
    { type: "Harmonic Minor", root: "Bb", notes: ["Bb", "C", "Db", "Eb", "F", "Gb", "A"] },
    { type: "Harmonic Minor", root: "F", notes: ["F", "G", "Ab", "Bb", "C", "Db", "E"] },
    { type: "Harmonic Minor", root: "C", notes: ["C", "D", "Eb", "F", "G", "Ab", "B"] },
    { type: "Harmonic Minor", root: "G", notes: ["G", "A", "Bb", "C", "D", "Eb", "F#"] },
    { type: "Harmonic Minor", root: "D", notes: ["D", "E", "F", "G", "A", "Bb", "C#"] },

    { type: "Harmonic Major" , root: "C", notes: ["C", "D", "E", "F", "G", "Ab", "B"] },
    { type: "Harmonic Major" , root: "G", notes: ["G", "A", "B", "C", "D", "Eb", "F#"] },
    { type: "Harmonic Major" , root: "D", notes: ["D", "E", "F#", "G", "A", "Bb", "C#"] },
    { type: "Harmonic Major" , root: "A", notes: ["A", "B", "C#", "D", "E", "F", "G#"] },
    { type: "Harmonic Major" , root: "E", notes: ["E", "F#", "G#", "A", "B", "C", "D#"] },
    { type: "Harmonic Major" , root: "B", notes: ["B", "C#", "D#", "E", "F#", "G", "A#"] },
    { type: "Harmonic Major" , root: "F#", notes: ["F#", "G#", "A#", "B", "C#", "D", "E#"] },
    { type: "Harmonic Major" , root: "Db", notes: ["Db", "Eb", "F", "Gb", "Ab", "Bbb", "C"] },
    { type: "Harmonic Major" , root: "Ab", notes: ["Ab", "Bb", "C", "Db", "Eb", "Fb", "G"] },
    { type: "Harmonic Major" , root: "Eb", notes: ["Eb", "F", "G", "Ab", "Bb", "Cb", "D"] },
    { type: "Harmonic Major" , root: "Bb", notes: ["Bb", "C", "D", "Eb", "F", "Gb", "A"] },
    { type: "Harmonic Major" , root: "F", notes: ["F", "G", "A", "Bb", "C", "Db", "E"] },

    { type: "Double Harmonic Major", root: "C", notes: ["C", "Db", "E", "F", "G", "Ab", "B"] },
    { type: "Double Harmonic Major", root: "G", notes: ["G", "Ab", "B", "C", "D", "Eb", "F#"] },
    { type: "Double Harmonic Major", root: "D", notes: ["D", "Eb", "F#", "G", "A", "Bb", "C#"] },
    { type: "Double Harmonic Major", root: "A", notes: ["A", "Bb", "C#", "D", "E", "F", "G#"] },
    { type: "Double Harmonic Major", root: "E", notes: ["E", "F", "G#", "A", "B", "C", "D#"] },
    { type: "Double Harmonic Major", root: "B", notes: ["B", "C", "D#", "E", "F#", "G", "A#"] },
    { type: "Double Harmonic Major", root: "F#", notes: ["F#", "G", "A#", "B", "C#", "D", "E#"] },
    { type: "Double Harmonic Major", root: "Db", notes: ["Db", "Ebb", "F", "Gb", "Ab", "Bbb", "C"] },
    { type: "Double Harmonic Major", root: "Ab", notes: ["Ab", "Bbb", "C", "Db", "Eb", "Fb", "G"] },
    { type: "Double Harmonic Major", root: "Eb", notes: ["Eb", "Fb", "G", "Ab", "Bb", "Cb", "D"] },
    { type: "Double Harmonic Major", root: "Bb", notes: ["Bb", "Cb", "D", "Eb", "F", "Gb", "A"] },
    { type: "Double Harmonic Major", root: "F", notes: ["F", "Gb", "A", "Bb", "C", "Db", "E"] }
];

export function getScale(type: string, root: string): Scale | undefined {
    return scales.find(scale => scale.type === type && scale.root === root);
}