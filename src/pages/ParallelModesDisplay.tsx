import {useState} from "react";
import { useScaleSettings } from "../ScaleSettingsContext";
import ChordsDisplay from "./ChordsDisplay";
import ModeSelector from "./ModeSelector";
import { modes } from '../data/ModesData';
import { getScale } from "../data/ScaleData";
import { getFifth, modifyNote } from '../Helpers'
import { Scale } from "../data/ScaleData";
import { getScaleNotesDisplay } from "./HelperComponents";

const ParallelModesDisplay = ({scale}: {scale: Scale}) => {
    const [ isOpen, setIsOpen ] = useState(false);
    const [ selectedMode, setSelectedMode ] = useState(0);
    const { includeSevenths, highlightQueryNotes, queryNotes, showNoteScaleDegree, enharmonicEquivalence } = useScaleSettings();

    const GetParallelScale = () => {
        const mode = modes[scale.type][selectedMode];
        const fifthShift = mode.fifthShift;
        const parallelRoot = getFifth(scale.root, fifthShift);
        const modeAccidentals = mode.accidentals;
        
        // The mode accidentals are stored relative to the major scale, so we need to shift the scale
        const majorScaleToModify = getScale("Major", scale.root);
        if (!majorScaleToModify) {
            return <div>Error: Major scale could not be found.</div>;
        }
        const modifiedScale = { type: scale.type,
                                root: scale.root,
                                notes: majorScaleToModify.notes.map((note, index) => modifyNote(note, modeAccidentals[index])),
                                order: scale.order}
        return (
            <>
                <div className="parallelScaleHeader" style={{marginBottom: "0.4rem", marginTop: "0.4rem"}}>
                    <strong>{scale.root} {mode.mode}[{parallelRoot} {scale.type}]:</strong> {getScaleNotesDisplay(modifiedScale.notes,highlightQueryNotes,queryNotes,showNoteScaleDegree,scale.type,selectedMode, enharmonicEquivalence)}
                </div>
                <ModeSelector /* style={{display:"inline-flex"}} */ scaleType={scale.type} onModeChange={handleModeChange} selectedMode={selectedMode}/>
                <ChordsDisplay scale={modifiedScale} selectedMode={selectedMode} includeSevenths={includeSevenths} />
            </>
        );
    }

    const handleModeChange = (mode: number) => {
        setSelectedMode(mode);
        console.log('Selected mode:', modes[scale.type][mode]);
    };

    return (
        <>
            <div className="parallelModesButton" style={{paddingTop:"10px"}} onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? "▼" : "▶"} <strong>Parallel Modes</strong>
            </div>
            {isOpen && (
                <GetParallelScale />
            )}
        </>
    );
}

export default ParallelModesDisplay;