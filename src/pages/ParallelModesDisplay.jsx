import React, {useState} from "react";
import GenerateDiatonicChords from "./ChordGenerator";
import { useScaleSettings } from "../ScaleSettingsContext";
import ChordsDisplay from "./ChordsDisplay";
import ModeSelector from "./ModeSelector";
import { modes } from '../data/ModesData';
import { getScale } from "../data/ScaleData";
import { shiftScale, getFifth, modifyNote } from '../Helpers'

const ParallelModesDisplay = ({scale}) => {
    const [ isOpen, setIsOpen ] = useState(false);
    const [ selectedMode, setSelectedMode ] = useState(0);
    const { includeSevenths } = useScaleSettings();

    const GetParallelScale = () => {
        const mode = modes[scale.type][selectedMode];
        const fifthShift = mode.fifthShift;
        const parallelRoot = getFifth(scale.root, fifthShift);
        const modeAccidentals = mode.accidentals;
        // The mode accidentals are always relative to the major scale, so we need to shift the scale

        const majorScaleToModify = getScale("Major", scale.root);
        const modifiedScale = { type: scale.type,
                                root: scale.root,
                                notes: majorScaleToModify.notes.map((note, index) => modifyNote(note, modeAccidentals[index])) }
        return (
            <>
                <p style={{marginBottom: "0.4rem", marginTop: "0.4rem"}}><strong>{scale.root} {mode.mode}</strong>[{parallelRoot} {scale.type}]: {modifiedScale.notes.join(", ")}</p>
                <ModeSelector style={{display:"inline-flex"}} scaleType={scale.type} onModeChange={handleModeChange} selectedMode={selectedMode}/>
                <ChordsDisplay scale={modifiedScale} selectedMode={selectedMode} includeSevenths={includeSevenths} />
            </>
        );
    }

    const handleModeChange = (mode) => {
        setSelectedMode(mode);
        console.log('Selected mode:', modes[scale.type][mode]);
    };

    return (
        <>
            <div style={{display: "inline", paddingTop:"10px"}} onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? "▼" : "▶"} <strong>Parallel Modes</strong>
            </div>
            {isOpen && (
                <>
                    {/* <ModeSelector style={{display:"inline-flex"}} scaleType={scale.type} onModeChange={handleModeChange} selectedMode={selectedMode}/> */}
                    <GetParallelScale />
                </>
            )}
        </>
    );
}

export default ParallelModesDisplay;