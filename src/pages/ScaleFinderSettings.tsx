import { CheckboxSetting } from "./CheckboxSetting";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useScaleSettings } from "../ScaleSettingsContext";
import { useState, useEffect } from "react";


const ScaleFinderSettings = (/* {disableEnharmonicCheckbox}: {disableEnharmonicCheckbox:boolean} */) => {
    const { includeSevenths, setIncludeSevenths, 
        enharmonicEquivalence, setEnharmonicEquivalence,
        romanNumeralsMajorAdjusted, setRomanNumeralsMajorAdjusted,
        highlightQueryNotes, setHighlightQueryNotes,
        showNoteScaleDegree,setShowNoteScaleDegree,
        chordDisplayOrientation, setChordDisplayOrientation,
        useAsciiAccidentals, setUseAsciiAccidentals,
        forceScaleGroupOpen, setForceScaleGroupOpen,
        searchBarFollow, setSearchBarFollow,
        enablePinFuntionality, setEnablePinFuntionality,
        inludeSuspenedChords, setInludeSuspenedChords,
        enableDisplayPiano, setEnableDisplayPiano,
        enableInlineDisplayPiano, setEnableInlineDisplayPiano } = useScaleSettings();
    const [ isOpen, setIsOpen ] = useState(false);
    const [ hideIncludeSusCheckbox, setHideIncludeSusCheckbox ] = useState(window.innerWidth <= 530);
    const [ hide7thsCheckbox, setHide7thsCheckbox ] = useState(window.innerWidth <= 355);

    useEffect(() => {
        const handleResize = () => setHideIncludeSusCheckbox(window.innerWidth <= 530);
        window.addEventListener("resize", handleResize);
    
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const handleResize = () => setHide7thsCheckbox(window.innerWidth <= 355);
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className={"settings-container2 "}>
            <div style={{textAlign: "left", paddingTop: "5px"}}>
                <div className="settings-div" style={{display: "flex", flexWrap: "wrap", gap: "5px 12px"}}>
                    <span style={{paddingRight: "0px"}}>
                        <i onClick={() => setIsOpen(!isOpen)} 
                            style={{fontSize: "18px"}}
                           className={isOpen ? "fa-solid fa-circle-chevron-up": "fa-solid fa-circle-chevron-down"}></i>
                    </span>
                    
                        <CheckboxSetting id={"enharmonicEquivalence"}
                                    checked={enharmonicEquivalence}
                                    onChange={() => setEnharmonicEquivalence(!enharmonicEquivalence)}
                                    label={"Enharmonic Check"} />
                    {!hide7thsCheckbox && (
                        <CheckboxSetting id={"includeSevenths"}
                                    checked={includeSevenths}
                                    onChange={() => setIncludeSevenths(!includeSevenths)}
                                    label={"Include 7ths"} />)}
                    {!hideIncludeSusCheckbox && (    
                        <CheckboxSetting id={"inludeSuspenedChords"} 
                                    checked={inludeSuspenedChords}
                                    onChange={() => setInludeSuspenedChords(!inludeSuspenedChords)}
                                    label={"Include Sus Chords"} />)}
                {isOpen && (
                    <>
                        {hide7thsCheckbox && (
                            <CheckboxSetting id={"includeSevenths"}
                                        checked={includeSevenths}
                                        onChange={() => setIncludeSevenths(!includeSevenths)}
                                        label={"Include 7ths"} />)}
                        {hideIncludeSusCheckbox && (
                            <CheckboxSetting id={"inludeSuspenedChords"} 
                                        checked={inludeSuspenedChords}
                                        onChange={() => setInludeSuspenedChords(!inludeSuspenedChords)}
                                        label={"Include Sus Chords"} />)}
                        <CheckboxSetting id={"enablePinFuntionality"} 
                                        checked={enablePinFuntionality}
                                        onChange={() => setEnablePinFuntionality(!enablePinFuntionality)}
                                        label={"Enable Pin Funtionality"} />
                        <CheckboxSetting id={"searchBarFollow"} 
                                        checked={searchBarFollow}
                                        onChange={() => setSearchBarFollow(!searchBarFollow)}
                                        label={"Search Bar Follow"} />
                        <div style={{display: "flex", flexWrap: "wrap", gap: "5px 12px", borderTop: "2px solid #8f8f8f", paddingTop: "6px"}}>
                            <div style={{flexBasis: "content"}}>
                                <span>Chords</span>
                                <label>
                                    <input type="radio" 
                                            id="age2" 
                                            name="age" 
                                            value="vertical"
                                            checked={chordDisplayOrientation == "vertical"}
                                            onChange={() => setChordDisplayOrientation("vertical")}
                                            />Vertical
                                </label>
                                <label>
                                    <input type="radio" 
                                            id="age1" 
                                            name="age" 
                                            value="horizontal"
                                            checked={chordDisplayOrientation == "horizontal"}
                                            onChange={() => setChordDisplayOrientation("horizontal")}
                                            />Horizontal
                                </label>
                            </div>
                            <CheckboxSetting id={"highlightQueryNotes"}
                                            checked={highlightQueryNotes}
                                            onChange={() => setHighlightQueryNotes(!highlightQueryNotes)}
                                            label={"Highlight Matched Input Notes"} />
                            <CheckboxSetting id={"showNoteScaleDegree"} 
                                            checked={showNoteScaleDegree}
                                            onChange={() => setShowNoteScaleDegree(!showNoteScaleDegree)}
                                            label={"Show Note Scale Degree"} />
                            <CheckboxSetting id={"romanNumeralsMajorAdjusted"} 
                                            checked={romanNumeralsMajorAdjusted}
                                            onChange={() => setRomanNumeralsMajorAdjusted(!romanNumeralsMajorAdjusted)}
                                            label={"Roman Numerals are relative to Major"} />
                            <CheckboxSetting id={"useAsciiAccidentals"} 
                                            checked={useAsciiAccidentals}
                                            onChange={() => setUseAsciiAccidentals(!useAsciiAccidentals)}
                                            label={"Plain Text Accidentals"} />
                            {/* <CheckboxSetting id={"showDisplayKeyboardDegrees"} 
                                            checked={showDisplayKeyboardDegrees}
                                            onChange={() => setShowDisplayKeyboardDegrees(!showDisplayKeyboardDegrees)}
                                            label={"Display Piano Keyboard Degrees"} /> */}
                            <CheckboxSetting id={"forceScaleGroupOpen"} 
                                            checked={forceScaleGroupOpen}
                                            onChange={() => setForceScaleGroupOpen(!forceScaleGroupOpen)}
                                            label={"Force Scale Group Open"} />
                            {/* <CheckboxSetting id={"fillDisplayPiano"} 
                                            checked={fillDisplayPiano}
                                            onChange={() => setFillDisplayPiano(!fillDisplayPiano)}
                                            label={"Fill Piano Display"} /> */}
                            <CheckboxSetting id={"enableDisplayPiano"} 
                                            checked={enableDisplayPiano}
                                            onChange={() => setEnableDisplayPiano(!enableDisplayPiano)}
                                            label={"Enable Display Piano"} />
                            <CheckboxSetting id={"enableInlineDisplayPiano"} 
                                            checked={enableInlineDisplayPiano}
                                            onChange={() => setEnableInlineDisplayPiano(!enableInlineDisplayPiano)}
                                            label={"Enable Inline Piano"} />
                        </div>
                    </>
                )}
                </div>
            </div>
        </div>
    );
}

export default ScaleFinderSettings;