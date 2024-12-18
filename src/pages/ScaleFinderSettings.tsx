import { CheckboxSetting } from "./CheckboxSetting";
import { useScaleSettings } from "../ScaleSettingsContext";
import { useState } from "react";

const ScaleFinderSettings = () => {
    const { includeSevenths, setIncludeSevenths, 
        enharmonicEquivalence, setEnharmonicEquivalence,
        romanNumeralsMajorAdjusted, setRomanNumeralsMajorAdjusted,
        highlightQueryNotes, setHighlightQueryNotes,
        showNoteScaleDegree,setShowNoteScaleDegree,
        chordDisplayOrientation, setChordDisplayOrientation } = useScaleSettings();
    const [ isOpen, setIsOpen ] = useState(false);

    return (
        <div className={isOpen ? "settings-container" : ""}>
            <div className="settings-row">
                <div>
                    <CheckboxSetting id={"enharmonicEquivalence"}
                                    checked={enharmonicEquivalence}
                                    onChange={() => setEnharmonicEquivalence(!enharmonicEquivalence)}
                                    label={"Enharmonic Check"} />
                    <CheckboxSetting id={"includeSevenths"}
                                    checked={includeSevenths}
                                    onChange={() => setIncludeSevenths(!includeSevenths)}
                                    label={"Include 7ths"} />
                    <CheckboxSetting id={"highlightQueryNotes"}
                                    checked={highlightQueryNotes}
                                    onChange={() => setHighlightQueryNotes(!highlightQueryNotes)}
                                    label={"Highlight Matched Notes"} />
                </div>
                <span onClick={()=> setIsOpen(!isOpen)} style={{paddingRight: "4px"}}><span style={{verticalAlign: "baseline", paddingRight: "10px"}}>{isOpen ? "▼" : "▶"}</span><i className="fa fa-gear icon" style={{ fontSize: "18px" }}></i></span>
            </div>
            {isOpen && (
                <>
                <div style={{textAlign: "left", paddingLeft: "14px", paddingBlock: "4px"}}>
                    <span>Chord Display Orientation</span>
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
                <div style={{textAlign: "left", paddingLeft: "14px", paddingBlock: "4px"}}>
                    <CheckboxSetting id={"showNoteScaleDegree"} 
                                     checked={showNoteScaleDegree}
                                     onChange={() => setShowNoteScaleDegree(!showNoteScaleDegree)}
                                     label={"Show Note Scale Degree"} />
                    <CheckboxSetting id={"romanNumeralsMajorAdjusted"} 
                                     checked={romanNumeralsMajorAdjusted}
                                     onChange={() => setRomanNumeralsMajorAdjusted(!romanNumeralsMajorAdjusted)}
                                     label={"Roman Numerals are relative to Major"} />
                </div>
                </>
            )}

        </div>
    );
}

export default ScaleFinderSettings;