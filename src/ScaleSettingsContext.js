import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const ScaleSettingsContext = createContext();

const getInitialState = (key, defaultValue) => {
  const savedValue = localStorage.getItem(key);
  return savedValue !== null ? JSON.parse(savedValue) : defaultValue;
};

// Context provider component
export const ScaleSettingsProvider = ({ children }) => {
  const [includeSevenths, setIncludeSevenths] = useState(() =>
    getInitialState("includeSevenths", false)
  );
  const [enharmonicEquivalence, setEnharmonicEquivalence] = useState(() =>
    getInitialState("enharmonicEquivalence", true)
  );
  const [romanNumeralsMajorAdjusted, setRomanNumeralsMajorAdjusted] = useState(() =>
    getInitialState("romanNumeralsMajorAdjusted", true)
  );
  const [highlightQueryNotes, setHighlightQueryNotes] = useState(() =>
    getInitialState("highlightQueryNotes", true)
  );
  const [queryNotes, setQueryNotes] = useState(() =>
    getInitialState("queryNotes", [])
  );
  const [showNoteScaleDegree, setShowNoteScaleDegree] = useState(() =>
    getInitialState("showNoteScaleDegree", true)
  );
  const [chordDisplayOrientation, setChordDisplayOrientation] = useState(() =>
    getInitialState("chordDisplayOrientation", "horizontal")
  );
  const [inludeSuspenedChords, setInludeSuspenedChords] = useState(() =>
    getInitialState("inludeSuspenedChords", false)
  );
  const [useAsciiAccidentals, setUseAsciiAccidentals] = useState(() =>
    getInitialState("useAsciiAccidentals", false)
  );

  // Effect to sync settings with localStorage
  useEffect(() => {
    localStorage.setItem("includeSevenths", JSON.stringify(includeSevenths));
  }, [includeSevenths]);

  useEffect(() => {
    localStorage.setItem("enharmonicEquivalence", JSON.stringify(enharmonicEquivalence));
  }, [enharmonicEquivalence]);

  useEffect(() => {
    localStorage.setItem("romanNumeralsMajorAdjusted", JSON.stringify(romanNumeralsMajorAdjusted));
  }, [romanNumeralsMajorAdjusted]);

  useEffect(() => {
    localStorage.setItem("highlightQueryNotes", JSON.stringify(highlightQueryNotes));
  }, [highlightQueryNotes]);

  useEffect(() => {
    localStorage.setItem("queryNotes", JSON.stringify(queryNotes));
  }, [queryNotes]);

  useEffect(() => {
    localStorage.setItem("showNoteScaleDegree", JSON.stringify(showNoteScaleDegree));
  }, [showNoteScaleDegree]);

  useEffect(() => {
    localStorage.setItem("chordDisplayOrientation", JSON.stringify(chordDisplayOrientation));
  }, [chordDisplayOrientation]);

  useEffect(() => {
    localStorage.setItem("inludeSuspenedChords", JSON.stringify(inludeSuspenedChords));
  }, [inludeSuspenedChords]);

  useEffect(() => {
    localStorage.setItem("useAsciiAccidentals", JSON.stringify(useAsciiAccidentals));
  }, [useAsciiAccidentals]);

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
        setUseAsciiAccidentals,
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
