import { CheckboxSetting } from "./CheckboxSetting";
import { useScaleSettings } from "../ScaleSettingsContext";

const ScaleFinderSettings = () => {
    const { includeSevenths, setIncludeSevenths, 
//        enharmonicEquivalence, setEnharmonicEquivalence,
        romanNumeralsMajorAdjusted, setRomanNumeralsMajorAdjusted,
        highlightQueryNotes, setHighlightQueryNotes,
        showNoteScaleDegree,setShowNoteScaleDegree } = useScaleSettings();

    return (
        <>
            <CheckboxSetting id={"includeSevenths"} 
                            checked={includeSevenths}
                            onChange={() => setIncludeSevenths(!includeSevenths)}
                            label={"Include 7ths"} />
            <CheckboxSetting id={"romanNumeralsMajorAdjusted"} 
                            checked={romanNumeralsMajorAdjusted}
                            onChange={() => setRomanNumeralsMajorAdjusted(!romanNumeralsMajorAdjusted)}
                            label={"Major Relative RNs"} />
            <CheckboxSetting id={"highlightQueryNotes"} 
                            checked={highlightQueryNotes}
                            onChange={() => setHighlightQueryNotes(!highlightQueryNotes)}
                            label={"Highlight Notes"} />
            <CheckboxSetting id={"showNoteScaleDegree"} 
                            checked={showNoteScaleDegree}
                            onChange={() => setShowNoteScaleDegree(!showNoteScaleDegree)}
                            label={"Show Scale Degree"} />                 
        </>
    );
}

export default ScaleFinderSettings;