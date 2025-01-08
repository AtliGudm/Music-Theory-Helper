import React, { createContext, useContext, useState } from "react";

// Create the context
const ScaleSettingsContext = createContext();

// Context provider component
export const ScaleSettingsProvider = ({ children }) => {
  const [ includeSevenths, setIncludeSevenths ] = useState(false);
  const [ enharmonicEquivalence, setEnharmonicEquivalence ] = useState(true); // Default to true
  const [ romanNumeralsMajorAdjusted, setRomanNumeralsMajorAdjusted ] = useState(true);
  const [ highlightQueryNotes, setHighlightQueryNotes ] = useState(true);
  const [ queryNotes, setQueryNotes ] = useState([]);
  const [ showNoteScaleDegree, setShowNoteScaleDegree ] = useState(true);
  const [ chordDisplayOrientation, setChordDisplayOrientation ] = useState("horizontal");
  const [ inludeSuspenedChords, setInludeSuspenedChords ] = useState(false);
  const [ useAsciiAccidentals, setUseAsciiAccidentals ] = useState(false);

  return (
    <ScaleSettingsContext.Provider
      value={{
        includeSevenths,
        setIncludeSevenths,
        enharmonicEquivalence,
        setEnharmonicEquivalence,
        romanNumeralsMajorAdjusted,
        setRomanNumeralsMajorAdjusted,
        highlightQueryNotes,
        setHighlightQueryNotes,
        queryNotes,
        setQueryNotes,
        showNoteScaleDegree,
        setShowNoteScaleDegree,
        chordDisplayOrientation,
        setChordDisplayOrientation,
        inludeSuspenedChords,
        setInludeSuspenedChords,
        useAsciiAccidentals,
        setUseAsciiAccidentals
      }}
    >
      {children}
    </ScaleSettingsContext.Provider>
  );
};

// Hook to use the context
export const useScaleSettings = () => {
  return useContext(ScaleSettingsContext);
};
