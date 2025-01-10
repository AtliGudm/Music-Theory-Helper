import './PianoKeyboard.css'
import { PayloadContainer } from '../data/ScaleData';
import { useScaleSettings } from "../ScaleSettingsContext";
import { FormatAccidentalsForDisplay } from './HelperComponents';

const DisplayPianoKeyboard = ({selectedScale}:{selectedScale: PayloadContainer}) => {
    const { showDisplayKeyboardDegrees } = useScaleSettings();
    const pianoKeys = [ [0,"W"], [1,"B"], [2,"W"], [3,"B"], [4,"W"], [5,"W"], [6,"B"], [7,"W"], [8,"B"], [9,"W"], [10,"B"], [11,"W"],
                        [0,"W"], [1,"B"], [2,"W"], [3,"B"], [4,"W"], [5,"W"], [6,"B"], [7,"W"], [8,"B"], [9,"W"], [10,"B"], [11,"W"] ];

    const createPianoKeyboard = (pianoKeys2: (string | number)[][]) => {
        const result: any[] = [];
        const copiedArray = [...selectedScale.payloadList];
        pianoKeys2.forEach(item => {
            if(copiedArray.length > 0 && copiedArray[0].note == item[0]) {
                const baba = copiedArray.shift();
                result.push({note: item[0], color: item[1], highlight: true, degree: ((showDisplayKeyboardDegrees) ? baba?.degree : null)});
            }
            else {
                result.push({note: item[0], color: item[1], highlight: false, degree: null});
            }
        });

        return (
            <>
                { result.map((item,index) => (
                    <li key={index}
                        className={"piano-keys" + (item.highlight ? " highlighted-key" : "") + (item.color === "W" ? " white-key" : " black-key") }>
                                <span className='piano-keyboard-scale-degrees'><FormatAccidentalsForDisplay textInput={item.degree}/></span>
                    </li>
                ))}
            </>
        )
    }

    const getScaleDisplayName = () => {
        if(selectedScale && selectedScale.scaleName) {
            return selectedScale.scaleName;
        }
        return "No scale selected for display";
    }

    return (
        <div className='container'>
            <div className='piano-display-border'>
                <div style={{padding: "4px"}}><FormatAccidentalsForDisplay textInput={getScaleDisplayName()}/></div>
                <div className="piano-container">
                    <ul className="piano-keys-list">
                        {createPianoKeyboard(pianoKeys)}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default DisplayPianoKeyboard;