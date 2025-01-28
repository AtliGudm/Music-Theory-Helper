import React, { useEffect, useState } from "react";
import { WebMidi, Input, NoteMessageEvent } from "webmidi";
import { useRef } from "react";

interface MidiInputProps {
  onNoteInput: (note: string) => void;
}

const MidiInput = ({ onNoteInput }: {onNoteInput: (e: any) => void }) => {
  const [midiEnabled, setMidiEnabled] = useState(false);
  const [activeInput, setActiveInput] = useState<Input | null>(null);
  //const lastNoteTimestamp = useRef<number | null>(null); // Store the last note's timestamp
  //const [ notes, setNotes ] = useState<string[]>([]);

  useEffect(() => {
    const initializeWebMidi = async () => {
      try {
        // Enable WebMidi
        await WebMidi.enable();
        setMidiEnabled(true);
        //console.log("WebMidi enabled!");

        // List available inputs
        const inputs = WebMidi.inputs;
        //console.log("Available MIDI Inputs:", inputs);

        if (inputs.length > 0) {
          const input = inputs[0]; // Use the first available MIDI input
          setActiveInput(input);

          // Set up event listeners for noteon and noteoff
          input.addListener("noteon", (e) => {
            onNoteInput(e);
            /* const currentTimestamp = e.timestamp; // Timestamp of the current note
            let elapsedTime: number | null = null;

            if (lastNoteTimestamp.current !== null) {
              elapsedTime = currentTimestamp - lastNoteTimestamp.current;
            }

            lastNoteTimestamp.current = currentTimestamp; // Update the last note timestamp
            if (elapsedTime && (elapsedTime < 25000)) {
              if (!notes.includes(e.note.name)) {
                console.log("Adding to array");
                const notesTemp = [...notes];
                notesTemp.push(e.note.name);
                setNotes(notesTemp);
              }
            }
            else if(elapsedTime !== 0.0) {
              console.log("Re-initiated array");
              setNotes([e.note.name]);
            } */

          });

          input.addListener("noteoff", (e) => {
            console.log(`Note OFF: ${e.note.name}${e.note.octave}`);
          });
        }
      } catch (err) {
        console.error("WebMidi could not be enabled:", err);
      }
    };

    initializeWebMidi();

    // Cleanup on component unmount
    return () => {
      WebMidi.disable();
    };
  }, []);

  return (
    <div>
      {midiEnabled ? (
        <p>MIDI Enabled! Listening for input...</p>
      ) : (
        <p>Enabling MIDI...</p>
      )}
      {activeInput && <p>Active Input: {activeInput.name}</p>}
    </div>
  );
};

export default MidiInput;
