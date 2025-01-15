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
  const [showDisplayKeyboardDegrees, setShowDisplayKeyboardDegrees] = useState(() =>
    getInitialState("showDisplayKeyboardDegrees", true)
  );
  const [forceScaleGroupOpen, setForceScaleGroupOpen] = useState(() =>
    getInitialState("forceScaleGroupOpen", false)
  );
  const [searchBarFollow, setSearchBarFollow] = useState(() =>
    getInitialState("searchBarFollow", true)
  );
  const [enablePinFuntionality, setEnablePinFuntionality] = useState(() =>
    getInitialState("enablePinFuntionality", false)
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

  useEffect(() => {
    localStorage.setItem("showDisplayKeyboardDegrees", JSON.stringify(showDisplayKeyboardDegrees));
  }, [showDisplayKeyboardDegrees]);

  useEffect(() => {
    localStorage.setItem("forceScaleGroupOpen", JSON.stringify(forceScaleGroupOpen));
  }, [forceScaleGroupOpen]);

  useEffect(() => {
    localStorage.setItem("searchBarFollow", JSON.stringify(searchBarFollow));
  }, [searchBarFollow]);

  useEffect(() => {
    localStorage.setItem("enablePinFuntionality", JSON.stringify(enablePinFuntionality));
  }, [enablePinFuntionality]);

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
        showDisplayKeyboardDegrees,
        setShowDisplayKeyboardDegrees,
        forceScaleGroupOpen,
        setForceScaleGroupOpen,
        searchBarFollow,
        setSearchBarFollow,
        enablePinFuntionality,
        setEnablePinFuntionality
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
