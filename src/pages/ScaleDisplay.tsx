import { useState } from "react";
import { useScaleSettings } from "../ScaleSettingsContext";
import ChordsDisplay from "./ChordsDisplay";
import ModeSelector from "./ModeSelector";
import { modes } from '../data/ModesData';
import { shiftScale } from '../Helpers'
import ParallelModesDisplay from "./ParallelModesDisplay";
import { getScaleNotesDisplay } from './HelperComponents';

// @ts-ignore
const ScaleDisplay = ({scale, selectedMode, scaleIndex, changeModeCallback}) => {
    const { includeSevenths, highlightQueryNotes, queryNotes, showNoteScaleDegree, enharmonicEquivalence } = useScaleSettings();
    const [ isOpen, setIsOpen ] = useState(false);

    const getScaleDisplayName = () => {
        const root = (scale.root === null) ? "" : (scale.root + " ");
        if(selectedMode === 0)
            return (root + " " + scale.type);

        if (scale.notes[selectedMode] && modes[scale.type] && modes[scale.type][selectedMode]) {
            return scale.notes[selectedMode] + " " + modes[scale.type][selectedMode].mode + " [" + root + " " + scale.type + "]";
        }
        return root + " " + scale.type;
    }

    const getScaleNotes = () => {
        return (selectedMode !== 0) ? shiftScale(scale, selectedMode) : scale;
    }

    const handleModeChange = (modeIndex: any) => {
        changeModeCallback(scaleIndex, modeIndex);
        console.log('Selected mode:', modeIndex);
    };

    const showParallelModeButton = () => {
        if (scale.type === "Minor" || 
            scale.type === "Whole Tone" || 
            scale.type === "Half-Whole Diminished") return false;
        return true;
    }

    return (
        <li className="scaleDisplay">
            <div>
                <div role="button" style={{marginBottom: "0.4rem"}} className="scaleHeader" onClick={() => setIsOpen(!isOpen)}>
                    <div style={{display: "inline"}} >
                        {isOpen ? "▼" : "▶"} <strong>{getScaleDisplayName()}:</strong>
                    </div> {getScaleNotesDisplay(getScaleNotes()?.notes, highlightQueryNotes, queryNotes, showNoteScaleDegree, scale.type, selectedMode, enharmonicEquivalence)} 
                </div>
                    {isOpen && showParallelModeButton() && (
                        <ModeSelector scaleType={scale.type} onModeChange={handleModeChange} selectedMode={selectedMode} modeType="Relative"/>
                    )}
            </div>
            {isOpen && (
                <>
                    <ChordsDisplay scale={getScaleNotes()} selectedMode={selectedMode} includeSevenths={includeSevenths} />
                    { showParallelModeButton() && 
                        <ParallelModesDisplay scale={scale}/>
                    }
                </>
            )}
        </li>
    );
}

export default ScaleDisplay;