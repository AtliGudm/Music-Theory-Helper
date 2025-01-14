import './PianoKeyboard.css'
import { PayloadContainer } from '../data/ScaleData';
import { useScaleSettings } from "../ScaleSettingsContext";
import { FormatAccidentalsForDisplay } from './HelperComponents';

const DisplayPianoKeyboard = ({selectedScale, isSmallScreen}:{selectedScale: PayloadContainer, isSmallScreen: boolean}) => {
    const { showDisplayKeyboardDegrees } = useScaleSettings();
    const pianoKeys = [ [0,"W"], [1,"B"], [2,"W"], [3,"B"], [4,"W"], [5,"W"], [6,"B"], [7,"W"], [8,"B"], [9,"W"], [10,"B"], [11,"W"] ];
                       // [0,"W"], [1,"B"], [2,"W"], [3,"B"], [4,"W"], [5,"W"], [6,"B"], [7,"W"], [8,"B"], [9,"W"], [10,"B"], [11,"W"] ];
    const switcher = true;

    const createPianoKeyboard = ( minifyPiano: boolean = false /* pianoKeys2: (string | number)[][] */) => {
        const result: any[] = [];
        
        if(minifyPiano) {
            pianoKeys.forEach(item => {
                const noteMatch = selectedScale.payloadList.find(payload => payload.note === item[0]);
                console.log(noteMatch);
                if(noteMatch) {
                    result.push({note: item[0], color: item[1], highlight: true, degree: ((showDisplayKeyboardDegrees) ? noteMatch.degree: null)});
                }
                else {
                    result.push({note: item[0], color: item[1], highlight: false, degree: null});
                } 
            });
        }
        else {
            let pianoKeys2: (string | number)[][] = [];
            for(let i = 0; i < 2; i++) {
                pianoKeys.forEach(item => {
                    pianoKeys2.push(item);
                });
            }

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
        }


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
                        {createPianoKeyboard(isSmallScreen)}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default DisplayPianoKeyboard;