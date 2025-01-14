import { CheckboxSetting } from "./CheckboxSetting";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useScaleSettings } from "../ScaleSettingsContext";
import { useState } from "react";


const ScaleFinderSettings = (/* {disableEnharmonicCheckbox}: {disableEnharmonicCheckbox:boolean} */) => {
    const { includeSevenths, setIncludeSevenths, 
        enharmonicEquivalence, setEnharmonicEquivalence,
        romanNumeralsMajorAdjusted, setRomanNumeralsMajorAdjusted,
        highlightQueryNotes, setHighlightQueryNotes,
        showNoteScaleDegree,setShowNoteScaleDegree,
        chordDisplayOrientation, setChordDisplayOrientation,
        useAsciiAccidentals, setUseAsciiAccidentals,
        showDisplayKeyboardDegrees, setShowDisplayKeyboardDegrees,
        forceScaleGroupOpen, setForceScaleGroupOpen,
        searchBarFollow, setSearchBarFollow } = useScaleSettings();
    const [ isOpen, setIsOpen ] = useState(false);

    return (
        <div className={"settings-container2 "} /* style={{height: isOpen ? "156px" : "60px"}} */>
            <div style={{/* top: "33px", position: "relative",  */ textAlign: "left", paddingTop: "5px"}}>
                {/* <div></div> */}
                <div className="settings-div" style={{display: "flex", flexWrap: "wrap", gap: "5px 12px"/* , backgroundColor: "#dfdfdf", borderRadius: "0px 0px 17px 17px" */}}>
                    <span style={{paddingRight: "0px"}}><i onClick={() => setIsOpen(!isOpen)} className={isOpen ? "fa-solid fa-circle-chevron-up": "fa-solid fa-circle-chevron-down"}></i></span>
                    <div>
                        <input 
                            type="checkbox" 
                            checked={enharmonicEquivalence}
                            onChange={() => setEnharmonicEquivalence(!enharmonicEquivalence)} 
                            id={"enharmonicEquivalence"} 
                            /* disabled={disableEnharmonicCheckbox} *//>
                            <label htmlFor={"enharmonicEquivalence"}>{"Enharmonic Check"}</label>
                    </div>
                    <CheckboxSetting id={"includeSevenths"}
                                    checked={includeSevenths}
                                    onChange={() => setIncludeSevenths(!includeSevenths)}
                                    label={"Include 7ths"} />
                    <div style={{flexBasis: "content"}}>
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
                    </div>
                
                {isOpen && (
                    <>
                    {/* <div className="settings-div" style={{paddingLeft: "38px"}}> */}
                        <CheckboxSetting id={"highlightQueryNotes"}
                                        checked={highlightQueryNotes}
                                        onChange={() => setHighlightQueryNotes(!highlightQueryNotes)}
                                        label={"Highlight Matched Input Notes"} />
                        <CheckboxSetting id={"showNoteScaleDegree"} 
                                        checked={showNoteScaleDegree}
                                        onChange={() => setShowNoteScaleDegree(!showNoteScaleDegree)}
                                        label={"Show Note Scale Degree"} />
                    {/* </div> */}
                    {/* <div className="settings-div" style={{textAlign: "left", paddingLeft: "38px"}}> */}
                        <CheckboxSetting id={"romanNumeralsMajorAdjusted"} 
                                        checked={romanNumeralsMajorAdjusted}
                                        onChange={() => setRomanNumeralsMajorAdjusted(!romanNumeralsMajorAdjusted)}
                                        label={"Roman Numerals are relative to Major"} />
                    {/* </div> */}
                    {/* <div className="settings-div" style={{textAlign: "left" , paddingLeft: "0px" }}>
                        <CheckboxSetting id={"inludeSuspenedChords"} 
                                        checked={inludeSuspenedChords}
                                        onChange={() => setInludeSuspenedChords(!inludeSuspenedChords)}
                                        label={"Include Suspened Chords"} />
                    </div> */}
                    {/* <div className="settings-div" style={{textAlign: "left", paddingLeft: "0px"}}> */}
                        <CheckboxSetting id={"useAsciiAccidentals"} 
                                        checked={useAsciiAccidentals}
                                        onChange={() => setUseAsciiAccidentals(!useAsciiAccidentals)}
                                        label={"Plain Text Accidentals"} />
                    {/* </div> */}
                    {/* <div className="settings-div" style={{textAlign: "left", paddingLeft: "38px"}}> */}
                        <CheckboxSetting id={"showDisplayKeyboardDegrees"} 
                                        checked={showDisplayKeyboardDegrees}
                                        onChange={() => setShowDisplayKeyboardDegrees(!showDisplayKeyboardDegrees)}
                                        label={"Display Piano Keyboard Degrees"} />
                    {/* </div> */}
                    {/* <div className="settings-div" style={{textAlign: "left", paddingLeft: "0px"}}> */}
                        <CheckboxSetting id={"forceScaleGroupOpen"} 
                                        checked={forceScaleGroupOpen}
                                        onChange={() => setForceScaleGroupOpen(!forceScaleGroupOpen)}
                                        label={"Force Scale Group Open"} />
                    {/* </div> */}
                    {/* <div className="settings-div" style={{textAlign: "left", paddingLeft: "38px"}}> */}
                        <CheckboxSetting id={"searchBarFollow"} 
                                        checked={searchBarFollow}
                                        onChange={() => setSearchBarFollow(!searchBarFollow)}
                                        label={"Search Bar Follow"} />
                    {/* </div> */}
                    </>
                )}
                </div>
            </div>
        </div>
    );
}

export default ScaleFinderSettings;