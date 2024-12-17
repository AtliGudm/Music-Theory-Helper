import { CheckboxSetting } from "./CheckboxSetting";
import { useScaleSettings } from "../ScaleSettingsContext";
import { useState } from "react";

const ScaleFinderSettings = () => {
    const { includeSevenths, setIncludeSevenths, 
        enharmonicEquivalence, setEnharmonicEquivalence,
        romanNumeralsMajorAdjusted, setRomanNumeralsMajorAdjusted,
        highlightQueryNotes, setHighlightQueryNotes,
        showNoteScaleDegree,setShowNoteScaleDegree } = useScaleSettings();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="settings-container">
            <div className="settings-row">
                <div><i className="fa fa-gear" onClick={()=> setIsOpen(!isOpen)} style={{ fontSize: "28px" }}></i>{isOpen ? "▼" : "▶"}</div>
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
                                label={"Highlight Notes"} />
            </div>
            {isOpen && (
                <div className="settings-row">
                    <CheckboxSetting id={"showNoteScaleDegree"} 
                                    checked={showNoteScaleDegree}
                                    onChange={() => setShowNoteScaleDegree(!showNoteScaleDegree)}
                                    label={"Show Scale Degree"} />
                    <CheckboxSetting id={"romanNumeralsMajorAdjusted"} 
                                    checked={romanNumeralsMajorAdjusted}
                                    onChange={() => setRomanNumeralsMajorAdjusted(!romanNumeralsMajorAdjusted)}
                                    label={"Major Relative RNs"} />
                </div>
            )}

        </div>
    );
}

export default ScaleFinderSettings;