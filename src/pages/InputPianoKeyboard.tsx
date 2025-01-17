import './PianoKeyboard.css'
import { useState } from 'react';

const pianoKeys:any[] = [["C", "W"],
                        ["C#", "B"],
                        ["D", "W"],
                        ["D#", "B"],
                        ["E", "W"],
                        ["F", "W"],
                        ["F#", "B"],
                        ["G", "W"],
                        ["G#", "B"],
                        ["A", "W"],
                        ["A#", "B"],
                        ["B", "W"]];

const InputPianoKeyboard = ({findScales} : {findScales: (queryText: string, threshold?: number, enharmonicEquivalenceOverride?: boolean | null) => void}) => {
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    
    const toggleKeySelection = (note:string) => {        
        const selectedKeysCopy = selectedKeys.slice();

        if(selectedKeys.includes(note)) {
            const index = selectedKeysCopy.indexOf(note);
            if (index > -1) { // only splice array when item is found
                selectedKeysCopy.splice(index, 1); // 2nd parameter means remove one item only
            }
        }
        else {
            selectedKeysCopy.push(note);
        }

        const filteredKeys = getSelectedKeysReadyForSearch(selectedKeysCopy);
        findScales(filteredKeys.join(" "), 0, true);
        setSelectedKeys(selectedKeysCopy);
    };

    const getSelectedKeysReadyForSearch = (selectedKeysCopy: string[]) => {
        const dfgf = selectedKeysCopy.map(item => item.slice(0, -1))
        
        const filtered =  dfgf.filter(function(item, pos) {
            return dfgf.indexOf(item) == pos;
        })
        return filtered;
    }

    const CreateOctave = (pianoKeys2: any[], octave: string) => {
        return (
            <>
            { pianoKeys2.map((item) => (
                <li key={item[0]+octave}
                    onClick={() => toggleKeySelection(item[0]+octave)}
                    className={"piano-keys" + 
                                ((item[0] === "E" || item[0] === "B") ? " narrower-piano-key" : "") +
                                (item[1] === "W" ? " white-key" : " black-key") + 
                                (selectedKeys.includes(item[0]+octave) ? " selected-key" : "")}></li>
            ))}
            </>
        )
    }

    return (
        <div className='container'>
            <div className="piano-container">
                <ul className="piano-keys-list">
                    {CreateOctave(pianoKeys, "1")}
                    {CreateOctave(pianoKeys, "2")}
                </ul>
            </div>
        </div>
    );
}





export default InputPianoKeyboard;