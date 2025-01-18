import { FormatAccidentalsForDisplay, getScaleNotesDisplay } from "./HelperComponents";
import { useScaleSettings } from "../ScaleSettingsContext";
import { getScale, Scale } from "../data/ScaleData";
import { getScaleDisplayName } from "../Helpers";
import ChordsDisplay from "./ChordsDisplay";
import { useState } from "react";
import { PayloadContainer } from "../data/ScaleData";

export const MinorExtraScaleDisplay = ({scale, displayScaleOnKeyboard} : {scale: Scale, displayScaleOnKeyboard: (payloadContainer: PayloadContainer) => void}) => {
    const { includeSevenths, highlightQueryNotes, queryNotes, showNoteScaleDegree, enharmonicEquivalence } = useScaleSettings();
    const [ isOpen, setIsOpen ] = useState(false);

    const getHarmonicMinor = () => {
        return getScale("Harmonic Minor", scale.root);
    }

    const getMelodicMinor = () => {
        return getScale("Melodic Minor", scale.root);
    }

    const GetBlrga = ({inputScale, generateOnlyDegreesArr} : {inputScale: Scale, generateOnlyDegreesArr: number[]}) => {
        return (<>
            <div>
                <h3 className="circle"><FormatAccidentalsForDisplay textInput={inputScale.notes[generateOnlyDegreesArr[2]]}/></h3>
                <div className="parallelScaleHeader" style={{padding: "5px", paddingInline: "16px"}}>
                    <div style={{display: "inline"}} >
                        <strong><FormatAccidentalsForDisplay textInput={getScaleDisplayName(inputScale, 0)}/>:</strong>
                    </div>
                    <div>{getScaleNotesDisplay(inputScale.notes, highlightQueryNotes, queryNotes, showNoteScaleDegree, inputScale.type, 0, enharmonicEquivalence)}</div>
                </div>
                <ChordsDisplay generateOnlyDegreesArr={generateOnlyDegreesArr} scale={inputScale} selectedMode={0} includeSevenths={includeSevenths} displayScaleOnKeyboard={displayScaleOnKeyboard}/>
            </div>
        </>);
    }

    return (<>
            <div className="parallelModesButton" style={{paddingTop:"10px"}} onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <i className="fa-solid fa-angle-down"></i> : <i className="fa-solid fa-angle-right"></i>}  <strong>Harmonic & Melodic</strong>
            </div>
            {isOpen && (
                <div style={{display: "flex", justifyContent: "center", columnGap: "14px"}}>
                    <GetBlrga inputScale={getHarmonicMinor()} generateOnlyDegreesArr={[2,4,6]}/>
                    <GetBlrga inputScale={getMelodicMinor()} generateOnlyDegreesArr={[1,3,5]}/>
                </div>
            )}
    </>
    );
}


