import { modes } from "../data/ModesData";
import { convertNotesToInt } from "../Helpers";

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
                <div key={item+index} className="chord-notes">
                    <div>{item}</div>
                    <div className="scale-note-degree">{getModeAccidental(index, scaleType, selectedMode)}{index+1}</div>
                </div>
            ))}
        </div>
    ));
}