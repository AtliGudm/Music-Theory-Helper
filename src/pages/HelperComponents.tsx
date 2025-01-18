import { convertNotesToInt, isLetter, getModeAccidental } from "../Helpers";
import { useScaleSettings } from "../ScaleSettingsContext";


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

export const FormatAccidentalsForDisplay = ({textInput, forceAccidental = false, seventhChordSymbolAllowed = false} : {textInput: string | undefined, forceAccidental?: boolean, seventhChordSymbolAllowed?: boolean}) => {
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
                if(forceAccidental && (textArray[i].toUpperCase() === "I" || textArray[i].toUpperCase() === "V")) {
                    return (<span key={i} className="roman-numeral">{textArray[i]}</span>);
                }
                else if (textArray[i] === "b") {
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
                        else if((i + 4 < textArray.length) && 
                                 textArray[i+1] === "s" &&
                                 textArray[i+2] === "u" &&
                                 textArray[i+3] === "s") {
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
                else if(textArray[i] === "ø") {
                    return (<span key={i} className="superscript-chord-symbol">{textArray[i]}</span>);
                }
                else if(seventhChordSymbolAllowed) {
                    if(textArray[i] === "m") {
                        if((i + 3 < textArray.length) && 
                            textArray[i+1] === "a" &&
                            textArray[i+2] === "j" &&
                            textArray[i+3] === "7") {
                                return (<span key={i} className="superscript-chord-symbol">m</span>);
                        }
                    }
                    else if(textArray[i] === "a") {
                        if((i + 2 < textArray.length) && 
                        textArray[i+1] === "j" &&
                        textArray[i+2] === "7") {
                            return (<span key={i} className="superscript-chord-symbol">a</span>);
                        }
                    }
                    else if(textArray[i] === "j") {
                        if((i + 1 < textArray.length) && 
                        textArray[i+1] === "7") {
                            return (<span key={i} className="superscript-chord-symbol">j</span>);
                        }
                    }
                    else if(textArray[i] === "7") {
                        return (<span key={i} className="superscript-chord-symbol">7</span>);
                    }
                }
                
                return (<>{item}</>);
            })}
            </>
        );
    }
    return (<></>);
}