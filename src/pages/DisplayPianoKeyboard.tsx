import './PianoKeyboard.css'
import { scaleNotesToInt } from '../Helpers';
import { Scale } from '../data/ScaleData';

const pianoKeys: any[] = [ [0,"W"], [1,"B"], [2,"W"], [3,"B"], [4,"W"], [5,"W"], [6,"B"], [7,"W"], [8,"B"], [9,"W"], [10,"B"], [11,"W"] ];

const DisplayPianoKeyboard = ({selectedScale}:{selectedScale: Scale}) => {
    const scaleNotes = scaleNotesToInt(selectedScale.notes);
    let currentIndex = 0;

    const sdfg = (noteInt: number) => {
        if (scaleNotes[currentIndex] == noteInt) {
            currentIndex++;
            //if(currentIndex === 1) return " selected-root-key";
            return " highlighted-key";
        }
        return "";
    }

    const CreateOctave = (pianoKeys2: any[]) => {
        return (
            <>
            { pianoKeys2.map((item) => (
                <li key={item[0]}
                    className={"piano-keys" + 
                                (item[1] === "W" ? " white-key" : " black-key") + 
                                sdfg(item[0])}>
                </li>
            ))}
            </>
        )
    }

    const getScaleDisplayName = () => {
        if(selectedScale && selectedScale.type) {
            if(selectedScale.root) {
                return (selectedScale.root + " " + selectedScale.type)
            }
            else {
                return selectedScale.type;
            }
        }
        return "No scale selected for display";
    }

    return (
        <div className='container'>
            <div className='piano-display-border'>
                <div style={{padding: "4px"}}>{getScaleDisplayName()}</div>
                <div className="piano-container">
                    <ul className="piano-keys-list">
                        {CreateOctave(pianoKeys)}
                        {CreateOctave(pianoKeys)}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default DisplayPianoKeyboard;