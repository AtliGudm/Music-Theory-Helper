import {useState} from "react";
import { useScaleSettings } from "../ScaleSettingsContext";
import ChordsDisplay from "./ChordsDisplay";
import ModeSelector from "./ModeSelector";
import { modes } from '../data/ModesData';
import { shiftScale } from '../Helpers'
import ParallelModesDisplay from "./ParallelModesDisplay";
import { Scale } from "../data/ScaleData";


const ScaleDisplay = ({scale} : {scale: Scale}) => {
    const { includeSevenths } = useScaleSettings();
    const [ isOpen, setIsOpen ] = useState(false);
    const [ selectedMode, setSelectedMode ] = useState(0);

    const getScaleDisplayName = () => {
        if(selectedMode === 0)
            return (scale.root + " " + scale.type);
        return scale.notes[selectedMode] + " " + modes[scale.type][selectedMode].mode + "[" + scale.root + " " + scale.type + "]";
    }

    const getScaleNotesDisplay = () => {
        return (selectedMode !== 0) ? shiftScale(scale, selectedMode) : scale;
    }

    const handleModeChange = (modeIndex: any) => {
        setSelectedMode(modeIndex);
        console.log('Selected mode:', modeIndex);
    };

    return (
        <li className="scaleDisplay">
            <div /* className="scaleHeaderContainer" */>
                <div role="button" style={{marginBottom: "0.4rem"}} className="scaleHeader" onClick={() => setIsOpen(!isOpen)} /* className="scaleHeaderCentered" */>
                    <div style={{display: "inline"}} >
                        {isOpen ? "▼" : "▶"} <strong>{getScaleDisplayName()}:</strong>
                    </div> {getScaleNotesDisplay().notes.join(", ")} 
                </div>
                    {isOpen && (
                        <ModeSelector scaleType={scale.type} onModeChange={handleModeChange} selectedMode={selectedMode}/>
                    )}
            </div>
            {isOpen && (
                <>
                    <ChordsDisplay scale={getScaleNotesDisplay()} selectedMode={selectedMode} includeSevenths={includeSevenths} />
                    <ParallelModesDisplay scale={scale}/>
                </>
            )}
        </li>
    );
}

export default ScaleDisplay;