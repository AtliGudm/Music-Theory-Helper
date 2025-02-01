import { FormatAccidentalsForDisplay, GetScaleNotesDisplay } from "./HelperComponents";
import { useScaleSettings } from "../ScaleSettingsContext";
import { getScale, Scale } from "../data/ScaleData";
import { getScaleDisplayName, DisplayScaleOnKeyboardPayload } from "../Helpers";
import ChordsDisplay from "./ChordsDisplay";
import { useState } from "react";
import { PayloadContainer } from "../data/ScaleData";
import GenerateDiatonicChords from "./ChordGenerator";
import { Chord } from "./ChordGenerator";
import PianoKeysIcon from "../assets/PianoKeysIcon";

export const MinorExtraScaleDisplay = ({scale, displayScaleOnKeyboard} : {scale: Scale, displayScaleOnKeyboard: (payloadContainer: PayloadContainer) => void}) => {
    const { includeSevenths, inludeSuspenedChords, enableDisplayPiano } = useScaleSettings();
    const [ isOpen, setIsOpen ] = useState(false);

    const getHarmonicMinor = () => {
        return getScale("Harmonic Minor", scale.root);
    }

    const getMelodicMinor = () => {
        return getScale("Melodic Minor", scale.root);
    }

    const callDisplayScaleOnKeyboard = (inputScale: Scale) => {
        const payload = DisplayScaleOnKeyboardPayload(inputScale, 0);
        displayScaleOnKeyboard(payload); 
    }


    const GetBlrga = ({inputScale, generateOnlyDegreesArr, chordsToExclude} : {inputScale: Scale, generateOnlyDegreesArr: number[], chordsToExclude: Chord[]}) => {
        return (<>
            <div>
                <h3 className="circle"><FormatAccidentalsForDisplay textInput={inputScale.notes[generateOnlyDegreesArr[2]]}/></h3>
                <div className="parallelScaleHeader" style={{padding: "5px", paddingInline: "16px"}}>
                    { enableDisplayPiano && (
                        <button className="display-scale-on-keyboard-button" title="Search" 
                            onClick={() => callDisplayScaleOnKeyboard(inputScale)} 
                            style={{marginRight: "12px"}}
                            >
                        <PianoKeysIcon width="30" height="30"/>
                    </button>
                    )}
                    <div>
                        <div style={{display: "inline"}} >
                            <strong><FormatAccidentalsForDisplay textInput={getScaleDisplayName(inputScale, 0)}/>:</strong>
                        </div>
                        <div><GetScaleNotesDisplay scaleNotes={inputScale.notes} scaleType={inputScale.type} selectedMode={0}/></div>
                    </div>
                </div>
                <ChordsDisplay chordsToExclude={chordsToExclude} generateOnlyDegreesArr={generateOnlyDegreesArr} scale={inputScale} selectedMode={0} includeSevenths={includeSevenths} displayScaleOnKeyboard={displayScaleOnKeyboard}/>
            </div>
        </>);
    }

    const bkg = GenerateDiatonicChords(scale, 0, includeSevenths, inludeSuspenedChords, null);

    return (<>
            <div className="parallelModesButton" style={{paddingTop:"10px"}} onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <i className="fa-solid fa-angle-down"></i> : <i className="fa-solid fa-angle-right"></i>}  <strong>Harmonic & Melodic</strong>
            </div>
            {isOpen && (
                <div style={{display: "flex", justifyContent: "center", columnGap: "14px"}}>
                    <GetBlrga inputScale={getHarmonicMinor()} generateOnlyDegreesArr={[2,4,6]} chordsToExclude={bkg}/>
                    <GetBlrga inputScale={getMelodicMinor()} generateOnlyDegreesArr={[1,3,5]} chordsToExclude={bkg}/>
                </div>
            )}
    </>
    );
}


