import { CheckboxSetting } from "./CheckboxSetting";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useScaleSettings } from "../ScaleSettingsContext";
import { useState } from "react";

const ScaleFinderSettings = (/* {isOpen}: {isOpen:boolean} */) => {
    const { includeSevenths, setIncludeSevenths, 
        enharmonicEquivalence, setEnharmonicEquivalence,
        romanNumeralsMajorAdjusted, setRomanNumeralsMajorAdjusted,
        highlightQueryNotes, setHighlightQueryNotes,
        showNoteScaleDegree,setShowNoteScaleDegree,
        chordDisplayOrientation, setChordDisplayOrientation,
        inludeSuspenedChords, setInludeSuspenedChords,
        useAsciiAccidentals, setUseAsciiAccidentals } = useScaleSettings();
    const [ isOpen, setIsOpen ] = useState(false);

    return (
        <div className={"settings-container2 "} style={{height: isOpen ? "133px" : "60px"}}>
            <div style={{top: "33px", position: "relative", textAlign: "left"}} /* className={isOpen ? "settings-container" : ""} */ >
                <div className="settings-div">
                    <span style={{paddingRight: "8px"}}><i onClick={() => setIsOpen(!isOpen)} className={isOpen ? "fa-solid fa-circle-chevron-up": "fa-solid fa-circle-chevron-down"}></i></span>
                    <CheckboxSetting id={"enharmonicEquivalence"}
                                    checked={enharmonicEquivalence}
                                    onChange={() => setEnharmonicEquivalence(!enharmonicEquivalence)}
                                    label={"Enharmonic Check"} />
                    <CheckboxSetting id={"includeSevenths"}
                                    checked={includeSevenths}
                                    onChange={() => setIncludeSevenths(!includeSevenths)}
                                    label={"Include 7ths"} />
                    <span>
                        <span>Chords</span>
                        <label>
                            <input type="radio" 
                                    id="age1" 
                                    name="age" 
                                    value="horizontal"
                                    checked={chordDisplayOrientation == "horizontal"}
                                    onChange={() => setChordDisplayOrientation("horizontal")}
                                    />Horizontal
                        </label>
                        <label>
                            <input type="radio" 
                                    id="age2" 
                                    name="age" 
                                    value="vertical"
                                    checked={chordDisplayOrientation == "vertical"}
                                    onChange={() => setChordDisplayOrientation("vertical")}
                                    />Vertical
                        </label>
                    </span>
                    {/* <span style={{paddingRight: "0px"}}><i className="fa-solid fa-circle-question"></i></span> */}
                </div>
                {isOpen && (
                    <>
                    <div className="settings-div" style={{paddingLeft: "38px"}}>
                        <CheckboxSetting id={"highlightQueryNotes"}
                                        checked={highlightQueryNotes}
                                        onChange={() => setHighlightQueryNotes(!highlightQueryNotes)}
                                        label={"Highlight Matched Input Notes"} />
                        <CheckboxSetting id={"showNoteScaleDegree"} 
                                        checked={showNoteScaleDegree}
                                        onChange={() => setShowNoteScaleDegree(!showNoteScaleDegree)}
                                        label={"Show Note Scale Degree"} />
                    </div>
                    <div className="settings-div" style={{textAlign: "left", paddingLeft: "38px"}}>
                        <CheckboxSetting id={"romanNumeralsMajorAdjusted"} 
                                        checked={romanNumeralsMajorAdjusted}
                                        onChange={() => setRomanNumeralsMajorAdjusted(!romanNumeralsMajorAdjusted)}
                                        label={"Roman Numerals are relative to Major"} />
                    </div>
                    <div className="settings-div" style={{textAlign: "left" , paddingLeft: "0px" }}>
                        <CheckboxSetting id={"inludeSuspenedChords"} 
                                        checked={inludeSuspenedChords}
                                        onChange={() => setInludeSuspenedChords(!inludeSuspenedChords)}
                                        label={"Include Suspened Chords"} />
                    </div>
                    <div className="settings-div" style={{textAlign: "left", paddingLeft: "38px"}}>
                        <CheckboxSetting id={"useAsciiAccidentals"} 
                                        checked={useAsciiAccidentals}
                                        onChange={() => setUseAsciiAccidentals(!useAsciiAccidentals)}
                                        label={"Use Plain Text Accidentals"} />
                    </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default ScaleFinderSettings;