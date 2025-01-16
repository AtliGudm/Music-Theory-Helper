import {useState} from "react";
import { useScaleSettings } from "../ScaleSettingsContext";
import ChordsDisplay from "./ChordsDisplay";
import ModeSelector from "./ModeSelector";
import { modes } from '../data/ModesData';
import { getScale, PayloadContainer, ParaScale } from "../data/ScaleData";
import { getFifth, modifyNote, DisplayParallelScaleOnKeyboardPayload } from '../Helpers'
import { Scale } from "../data/ScaleData";
import { getScaleNotesDisplay, FormatAccidentalsForDisplay } from "./HelperComponents";
import PianoKeysIcon from "../assets/PianoKeysIcon";

const ParallelModesDisplay = ({scale, displayScaleOnKeyboard}: {scale: Scale, displayScaleOnKeyboard: (payloadContainer: PayloadContainer) => void }) => {
    const [ isOpen, setIsOpen ] = useState(false);
    const [ selectedMode, setSelectedMode ] = useState(0);
    const { includeSevenths, highlightQueryNotes, queryNotes, showNoteScaleDegree, enharmonicEquivalence } = useScaleSettings();

    const getSourceTemplateScale = () => {
        const type = scale.type;
        if(type === "Major Pentatonic" || type === "Minor Pentatonic") {
            if (scale.root) return getScale("Major Pentatonic", scale.root);
        }
        else  if (scale.root) return getScale("Major", scale.root);
        
        return undefined;
    }

    const GetParallelScaleHeader = ({mode, parallelRoot} : {mode: string, parallelRoot: string}) => {
        let scaleName = "";
        if(mode === scale.type) scaleName = scale.root + " " + scale.type;
        else                    scaleName = scale.root + " " + mode + " [" + parallelRoot + " " + scale.type + "]";
        
        return (
            <FormatAccidentalsForDisplay textInput={scaleName}/>
        );
    }

    const getParallelScale = () => {
        const mode = modes[scale.type][selectedMode];
        const fifthShift = mode.fifthShift;
        const parallelRoot = scale.root ? getFifth(scale.root, fifthShift) : '';
        const modeAccidentals = mode.accidentals;
        const scaleToModify = getSourceTemplateScale();

        const modifiedScale: Scale = { type: scale.type,
                                root: scale.root,
                                notes: (scaleToModify) ? (scaleToModify.notes.map((note, index) => modifyNote(note, modeAccidentals[index]))) : [],             
                                order: scale.order}
        return {mode: mode, parallelRoot: parallelRoot, modifiedScale: modifiedScale};      
    }

    const callDisplayScaleOnKeyboard = () => {
        const para: ParaScale = getParallelScale();
        const payload = DisplayParallelScaleOnKeyboardPayload(para);
        displayScaleOnKeyboard(payload); 
    }

    const ParallelScale = () => {
        const para: ParaScale = getParallelScale();
        return (
            <>
                <div className="parallelScaleHeader" style={{marginBottom: "0.4rem", marginTop: "0.4rem", display: "flex", alignItems: "center", position: "relative", marginInline: "54px"}}>
                    <button className="display-scale-on-keyboard-button" title="Search" 
                            onClick={callDisplayScaleOnKeyboard} 
                            style={{marginRight: "auto"}}
                            >
                        <PianoKeysIcon width="30" height="30"/>
                    </button>
                    <div style={{flexGrow: "2", display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "5px"}}>
                        <strong><GetParallelScaleHeader mode={para.mode.mode} parallelRoot={para.parallelRoot}/>:</strong>
                        <div>{getScaleNotesDisplay(para.modifiedScale.notes,highlightQueryNotes,queryNotes,showNoteScaleDegree,scale.type,selectedMode, enharmonicEquivalence)}</div>
                    </div>
                </div>
                <ModeSelector modeType="Parallel" scaleType={scale.type} onModeChange={handleModeChange} selectedMode={selectedMode}/>
                <ChordsDisplay scale={para.modifiedScale} selectedMode={selectedMode} includeSevenths={includeSevenths} />
            </>
        );
    }

    const handleModeChange = (mode: number) => {
        setSelectedMode(mode);
    };

    return (
        <>
            <div className="parallelModesButton" style={{paddingTop:"10px"}} onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <i className="fa-solid fa-angle-down"></i> : <i className="fa-solid fa-angle-right"></i>}  <strong>Parallel Modes</strong>
            </div>
            {isOpen && (
                <ParallelScale />
            )}
        </>
    );
}

export default ParallelModesDisplay;