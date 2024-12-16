import {useState} from "react";
import { useScaleSettings } from "../ScaleSettingsContext";
import ChordsDisplay from "./ChordsDisplay";
import ModeSelector from "./ModeSelector";
import { modes } from '../data/ModesData';
import { shiftScale } from '../Helpers'
import ParallelModesDisplay from "./ParallelModesDisplay";
import { Scale } from "../data/ScaleData";


const ScaleDisplay = ({scale} : {scale: Scale}) => {
    const { includeSevenths, highlightQueryNotes, queryNotes, showNoteScaleDegree } = useScaleSettings();
    const [ isOpen, setIsOpen ] = useState(false);
    const [ selectedMode, setSelectedMode ] = useState(0);

    const getScaleDisplayName = () => {
        if(selectedMode === 0)
            return (scale.root + " " + scale.type);
        return scale.notes[selectedMode] + " " + modes[scale.type][selectedMode].mode + "[" + scale.root + " " + scale.type + "]";
    }

    const getScaleNotes = () => {
        return (selectedMode !== 0) ? shiftScale(scale, selectedMode) : scale;
    }

    const getScaleNotesDisplay = (scaleNotes: string[] | null) => {
        if(scaleNotes == null) return "";
        if(highlightQueryNotes && queryNotes.length > 0) {
            let ouputString: any[] = [];
            scaleNotes.forEach(item => {
                if(queryNotes.includes(item)) {
                    ouputString.push({style: "highlightedNote", note: item})
                } else {
                    ouputString.push({style: "standardNote", note: item})
                }
            });

            if(showNoteScaleDegree) {
                return (
                    <div className="scale-note-display">
                        {ouputString.map((item, index) => (
                            <div className="chord-notes">
                                <div className={item.style}>{item.note}{/* {index < scaleNotes.length - 1 ? ",": ""} */}</div>
                                <div className={`scale-note-degree ${item.style}`}>{getModeAccidental(index)}{index+1}</div>
                            </div>
                        ))}
                    </div>
                );
            }
            else {
                return (<>
                    {ouputString.map((item, index) => (
                        <>
                        <span className={item.style}>{item.note}</span>
                        <span>{index < ouputString.length - 1 ? ", ": ""}</span> 
                        </>
                    ))}
                    </>
                );
            }
        }
        return (!showNoteScaleDegree ? scaleNotes.join(", ") : (
            <div className="scale-note-display">
                {scaleNotes.map((item, index) => (
                    <div className="chord-notes">
                        <div>{item}{/* {index < scaleNotes.length - 1 ? ",": ""} */}</div>
                        <div className="scale-note-degree">{getModeAccidental(index)}{index+1}</div>
                    </div>
                ))}
            </div>
        ));
    }

    const getModeAccidental = (index: number) => {
        const modeAccidental = modes[scale.type][selectedMode].accidentals[index];
        if(modeAccidental == 0) return "";
        return modeAccidental;
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
                    </div> {getScaleNotesDisplay(getScaleNotes()?.notes)} 
                </div>
                    {isOpen && (
                        <ModeSelector scaleType={scale.type} onModeChange={handleModeChange} selectedMode={selectedMode}/>
                    )}
            </div>
            {isOpen && (
                <>
                    <ChordsDisplay scale={getScaleNotes()} selectedMode={selectedMode} includeSevenths={includeSevenths} />
                    {scale.type !== "Minor" && 
                        <ParallelModesDisplay scale={scale}/>
                    }
                </>
            )}
        </li>
    );
}

export default ScaleDisplay;