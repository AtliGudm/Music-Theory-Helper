import ScaleFinder from "./ScaleFinder";
import MidiInput from "./MidiInput";
import { useRef, useState } from "react";

const ScaleFinderContainer = () => {
    const lastNoteTimestamp = useRef<number | null>(null); // Store the last note's timestamp
    const [ notes, setNotes ] = useState<string[]>([]);

    const formatNote = (name: string, accidental: string | undefined) => {
        if(accidental) return (name + accidental);
        return name;
    }

    const noteOn = (e: any) => {
        const currentTimestamp = e.timestamp; // Timestamp of the current note
        let elapsedTime: number | null = null;
        
        if (lastNoteTimestamp.current !== null) {
            elapsedTime = currentTimestamp - lastNoteTimestamp.current;
        }

        lastNoteTimestamp.current = currentTimestamp; // Update the last note timestamp
        if (elapsedTime && (elapsedTime < 2000)) {
            setNotes(prevNotes => {
                const includes = prevNotes.includes(formatNote(e.note.name, e.note.accidental));
                if (!includes) {
                    const notesTemp = [...prevNotes, formatNote(e.note.name, e.note.accidental)];
                    console.log(notesTemp);
                    return notesTemp;
                }
                return prevNotes;
            });
        }
        else if(elapsedTime !== 0.0) {
            console.log("Re-initiated array");
            setNotes([formatNote(e.note.name, e.note.accidental)]);
        }
    }

    return (
        <>
            <MidiInput onNoteInput={noteOn}/>
            <ul>
                {notes.map((note, index) => (
                <li key={index}>{note}</li>
                ))}
            </ul>
            <ScaleFinder />
            
        </>
    );
}

export default ScaleFinderContainer;