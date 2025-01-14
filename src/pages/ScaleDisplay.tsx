import { useState } from "react";
import { useScaleSettings } from "../ScaleSettingsContext";
import ChordsDisplay from "./ChordsDisplay";
import ModeSelector from "./ModeSelector";
import { shiftScale, DisplayScaleOnKeyboardPayload, getScaleDisplayName } from '../Helpers'
import ParallelModesDisplay from "./ParallelModesDisplay";
import { getScaleNotesDisplay, FormatAccidentalsForDisplay } from './HelperComponents';
import PianoKeysIcon from "../assets/PianoKeysIcon";
import { Scale, PayloadContainer } from "../data/ScaleData";


const ScaleDisplay = ({scale, selectedMode, scaleIndex, changeModeCallback, displayScaleOnKeyboard} : {scale: Scale, selectedMode: number, scaleIndex: number, changeModeCallback : (index: number, newValue: number) => void, displayScaleOnKeyboard: (payloadContainer: PayloadContainer) => void }) => {
    const { includeSevenths, highlightQueryNotes, queryNotes, showNoteScaleDegree, enharmonicEquivalence } = useScaleSettings();
    const [ isOpen, setIsOpen ] = useState(false);

    const getScaleNotes = () => {
        return (selectedMode !== 0) ? shiftScale(scale, selectedMode) : scale;
    }

    const handleModeChange = (modeIndex: any) => {
        changeModeCallback(scaleIndex, modeIndex);
    };

    const showRelativeModeButton = () => {
        if (scale.type === "Minor" || 
            scale.type === "Whole Tone" || 
            scale.type === "Half-Whole Diminished" ||
            scale.type === "Minor Pentatonic"
        ) return false;
        return true;
    }

    const showParallelModeButton = () => {
        if (scale.type === "Minor" || 
            scale.type === "Whole Tone" || 
            scale.type === "Half-Whole Diminished" ||
            scale.type === "Major Pentatonic" ||
            scale.type === "Minor Pentatonic"
        ) return false;
        return true;
    }

    const callDisplayScaleOnKeyboard = () => {
        const payload = DisplayScaleOnKeyboardPayload(scale, selectedMode);
        displayScaleOnKeyboard(payload); 
    }

    return (
        <li className="scaleDisplay">
            <div>
                <div style={{marginBottom: "0.4rem", display: "flex", alignItems: "center", position: "relative"}} className="scaleHeader">
                <button className="display-scale-on-keyboard-button" title="Search" 
                         onClick={callDisplayScaleOnKeyboard} 
                         style={{marginRight: "auto"}}
                        >
                    <PianoKeysIcon width="30" height="30"/>
                </button>
                    <div style={{flexGrow: "2"/* , display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "5px" */}}
                        role="button" 
                        onClick={() => setIsOpen(!isOpen)}
                        className="scaleHeader2">
                        <div style={{display: "inline"}} >
                            {isOpen ? <i className="fa-solid fa-angle-down"></i> : <i className="fa-solid fa-angle-right"></i>} <strong><FormatAccidentalsForDisplay textInput={getScaleDisplayName(scale, selectedMode)}/>:</strong>
                        </div> <div>{getScaleNotesDisplay(getScaleNotes()?.notes, highlightQueryNotes, queryNotes, showNoteScaleDegree, scale.type, selectedMode, enharmonicEquivalence)}</div>
                    </div>
                </div>
                    {isOpen && showRelativeModeButton() && (
                        <ModeSelector scaleType={scale.type} onModeChange={handleModeChange} selectedMode={selectedMode} modeType="Relative"/>
                    )}
            </div>
            {isOpen && (
                <>
                    <ChordsDisplay scale={getScaleNotes()} selectedMode={selectedMode} includeSevenths={includeSevenths} />
                    { showParallelModeButton() && 
                        <ParallelModesDisplay scale={scale} displayScaleOnKeyboard={displayScaleOnKeyboard}/>
                    }
                </>
            )}
        </li>
    );
}

export default ScaleDisplay;