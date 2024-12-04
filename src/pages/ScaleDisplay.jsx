import React, {useState} from "react";
import GenerateDiatonicChords from "./ChordGenerator";
import { useScaleSettings } from "../ScaleSettingsContext";
import ChordsDisplay from "./ChordsDisplay";
import ModeSelector from "./ModeSelector";
import { modes } from '../data/ModesData';
import { shiftScale } from '../Helpers'


const ScaleDisplay = ({scale}) => {
    const { includeSevenths } = useScaleSettings();
    const [ isOpen, setIsOpen ] = useState(false);
    const [ modesOpen, setModesOpen ] = useState(false);
    const [ selectedMode, setSelectedMode ] = useState(0);

    const getScaleDisplayName = () => {
        if(selectedMode == 0)
            return (scale.name);
        return scale.notes[selectedMode] + " " + modes[scale.type][selectedMode].mode + "[" + scale.name + "]";
    }

    const getScaleNotesDisplay = () => {
        return (selectedMode != 0) ? shiftScale(scale, selectedMode) : scale;
    }

    const handleModeChange = (mode) => {
        setSelectedMode(mode);
        console.log('Selected mode:', mode);
    };

    return (
        <li className="scaleDisplay">
            <div className="scaleHeaderContainer"  /* style={{display: "flex"}} */>
                <div className="scaleHeaderCentered">
                    <div style={{display: "inline"}} onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? "▼" : "▶"} <strong>{getScaleDisplayName()}:</strong>
                    </div> {getScaleNotesDisplay().notes.join(", ")} 
                </div>
                    {isOpen && (
                        <>
                            <ModeSelector scaleType={scale.type} onModeChange={handleModeChange} selectedMode={selectedMode}/>
                        </>
                    )}
            </div>
             {isOpen && (
                <>
                    <ChordsDisplay scale={getScaleNotesDisplay()} selectedMode={selectedMode} includeSevenths={includeSevenths} />
                </>
            )}
        </li>
    );
}

export default ScaleDisplay;