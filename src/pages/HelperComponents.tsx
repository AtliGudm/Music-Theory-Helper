import { modes } from "../data/ModesData";

const getModeAccidental = (index: number, scaleType: string, selectedMode: number) => {
    const modeAccidental = modes[scaleType][selectedMode].accidentals[index];
    if(modeAccidental == 0) return "";
    return modeAccidental;
}

export const getScaleNotesDisplay = (scaleNotes: string[] | null, 
                              highlightQueryNotes: any, 
                              queryNotes: any, 
                              showNoteScaleDegree: any, 
                              scaleType: string, 
                              selectedMode: number) => {
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
                    <div>{item}</div>
                    <div className="scale-note-degree">{getModeAccidental(index, scaleType, selectedMode)}{index+1}</div>
                </div>
            ))}
        </div>
    ));
}