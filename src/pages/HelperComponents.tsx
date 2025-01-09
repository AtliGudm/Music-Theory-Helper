import { modes } from "../data/ModesData";
import { convertNotesToInt, isLetter } from "../Helpers";
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

    const FormatModeAccidentals = ({modeAccidental}: {modeAccidental: string | number | undefined }) => {
        if(modeAccidental) {
            if(modeAccidental == "0") {
                return (<></>);
            }
            else {
                return (<FormatAccidentalsForDisplay textInput={String(modeAccidental)} />);
            }
        }
        return (<></>);
    }
    
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
                            <div className={item.style}><FormatAccidentalsForDisplay textInput={item.note}/>{/* {index < scaleNotes.length - 1 ? ",": ""} */}</div>
                            <div className={`scale-note-degree ${item.style}`}><FormatModeAccidentals modeAccidental={getModeAccidental(index, scaleType, selectedMode)}/>{index+1}</div>
                        </div>
                    ))}
                </div>
            );
        }
        else {
            return (<>
                {ouputString.map((item, index) => (
                    <>
                    <span className={item.style}><FormatAccidentalsForDisplay textInput={item.note}/></span>
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
                        <div className="scale-note-degree"><FormatModeAccidentals modeAccidental={getModeAccidental(index, scaleType, selectedMode)}/>{index+1}</div>
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
    const flatIcon = "♭";
    const sharpIcon = "♯";
    const naturalIcon = "♮";
    const doubleSharpIcon = "𝄪";
    
    if(textInput) {
        if(useAsciiAccidentals) return (<>{textInput}</>)
        
        let textArray = textInput.split('');
        return (
            <>
            {textArray.map((item, i) => {
                if (textArray[i] === "b") {
                    if(forceAccidental) {
                        return (<span key={i} className="flat-accidental">{flatIcon}</span>);
                    }
                    else if (i + 1 < textArray.length) {
                        if (textArray[i + 1] === "b") {
                            return (<span key={i} className="first-flat-in-double-flat">{flatIcon}</span>);
                        } 
                        else if(textArray[i + 1] == "m" || !isLetter(textArray[i + 1])) {
                            return (<span key={i} className="flat-accidental">{flatIcon}</span>);
                        }
                        else if (textArray[i + 1] >= '0' && textArray[i + 1] <= '9') {
                            return (<span key={i} className="flat-accidental">{flatIcon}</span>);
                        }
                    } else {
                        return (<span key={i} className="flat-accidental">{flatIcon}</span>);
                    }
                }
                else if (textArray[i] === "n") {
                    if(forceAccidental) {
                        return (<span key={i} className="flat-accidental">{naturalIcon}</span>);
                    }
                    else if (i + 1 < textArray.length) {
                        if (textArray[i + 1] >= '0' && textArray[i + 1] <= '9') {
                            return (<span key={i}>{naturalIcon}</span>);
                        }
                    }
                }
                else if (textArray[i] === "#") {
                    return (<span key={i} className="sharp-accidental">{sharpIcon}</span>);
                }
                else if (textArray[i] === "x") {
                    if(forceAccidental) {
                        return (<span key={i} className="double-sharp-accidental">{doubleSharpIcon}</span>);
                    }
                    else if (i + 1 < textArray.length) {
                        if (textArray[i + 1] === "b"  || textArray[i + 1] == "m" || !isLetter(textArray[i + 1])) {
                            return (<span key={i} className="double-sharp-accidental">{doubleSharpIcon}</span>);
                        } else if (textArray[i + 1] >= '0' && textArray[i + 1] <= '9') {
                            return (<span key={i} className="double-sharp-accidental">{doubleSharpIcon}</span>);
                        }
                    } else {
                        return (<span key={i} className="double-sharp-accidental">{doubleSharpIcon}</span>);
                    }
                }
                return (<>{item}</>);
            })}
            </>
        );
    }
    return (<></>);
}