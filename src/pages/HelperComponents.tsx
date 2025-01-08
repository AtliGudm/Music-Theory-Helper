import { modes } from "../data/ModesData";
import { convertNotesToInt, formatAccidentalsForDisplay, isLetter } from "../Helpers";
import { useScaleSettings } from "../ScaleSettingsContext";

const getModeAccidental = (index: number, scaleType: string, selectedMode: number) => {
    const mode = modes[scaleType] && modes[scaleType][selectedMode];
    const modeAccidental = mode ? mode.accidentals[index] : undefined;
    if(modeAccidental == 0) return "";
    return modeAccidental;
}

export const getScaleNotesDisplay = (scaleNotes: string[] | null, 
                              highlightQueryNotes: any, 
                              queryNotes: any, 
                              showNoteScaleDegree: any, 
                              scaleType: string, 
                              selectedMode: number,
                            enharmonicEquivalence: boolean) => {
    if(scaleNotes == null) return "";
    if(highlightQueryNotes && queryNotes.length > 0) {
        let ouputString: any[] = [];
        const bkhg = (enharmonicEquivalence) ? convertNotesToInt(scaleNotes) : scaleNotes;
        const blah = (enharmonicEquivalence) ? convertNotesToInt(queryNotes) : queryNotes;
        bkhg.forEach((item, index) => {
            if(blah.includes(item)) {
                ouputString.push({style: "highlightedNote", note: scaleNotes[index]})
            } else {
                ouputString.push({style: "standardNote", note: scaleNotes[index]})
            }
        });

        if(showNoteScaleDegree) {
            return (
                <div className="scale-note-display">
                    {ouputString.map((item, index) => (
                        <div key={item+index} className="chord-notes">
                            <div className={item.style}>{formatAccidentalsForDisplay(item.note)}{/* {index < scaleNotes.length - 1 ? ",": ""} */}</div>
                            <div className={`scale-note-degree ${item.style}`}>{getModeAccidental(index, scaleType, selectedMode)}{index+1}</div>
                        </div>
                    ))}
                </div>
            );
        }
        else {
            return (<>
                {ouputString.map((item, index) => (
                    <>
                    <span className={item.style}>{formatAccidentalsForDisplay(item.note)}</span>
                    <span>{index < ouputString.length - 1 ? ", ": ""}</span> 
                    </>
                ))}
                </>
            );
        }
    }
    return (!showNoteScaleDegree ? (
        <FormatAccidentalsForDisplay textInput={scaleNotes.join(", ")} />
        ) : (
            <div className="scale-note-display">
                {scaleNotes.map((item, index) => (
                    <div key={item+index} className="chord-notes">
                        <div><FormatAccidentalsForDisplay textInput={item} /></div>
                        <div className="scale-note-degree">{getModeAccidental(index, scaleType, selectedMode)}{index+1}</div>
                    </div>
                ))}
            </div>
        )
    );
}

/* {formatAccidentalsForDisplay(item)} */
/* formatAccidentalsForDisplay(scaleNotes.join(", ")))  */

export const FormatAccidentalsForDisplay = ({textInput, forceAccidental = false} : {textInput: string | undefined, forceAccidental?: boolean}) => {
    const { useAsciiAccidentals  } = useScaleSettings();
    // ♭    ♮    ♯   
    if(textInput) {
        if(useAsciiAccidentals) return (<>{textInput}</>)
        
        let textArray = textInput.split('');
        return (
            <>
            {textArray.map((item, i) => {
                if (textArray[i] === "b") {
                    if(forceAccidental) {
                        return (<span key={i} className="flat-accidental">♭</span>);
                    }
                    else if (i + 1 < textArray.length) {
                        if (textArray[i + 1] === "b"  || textArray[i + 1] == "m" || !isLetter(textArray[i + 1])) {
                            return (<span key={i} className="flat-accidental">♭</span>);
                        } else if (textArray[i + 1] >= '0' && textArray[i + 1] <= '9') {
                            return (<span key={i} className="flat-accidental">♭</span>);
                        }
                    } else {
                        return (<span key={i} className="flat-accidental">♭</span>);
                    }
                } else if (textArray[i] === "n") {
                    if(forceAccidental) {
                        return (<span key={i} className="flat-accidental">♮</span>);
                    }
                    else if (i + 1 < textArray.length) {
                        if (textArray[i + 1] >= '0' && textArray[i + 1] <= '9') {
                            return (<span key={i}>♮</span>);
                        }
                    }
                } else if (textArray[i] === "#") {
                    return (<span key={i} className="sharp-accidental">♯</span>);
                }
                return (<>{item}</>);
            })}
            </>
        );
    }
    return (<></>);
}