import './PianoKeyboard.css'
import { PayloadContainer } from '../data/ScaleData';
import { useScaleSettings } from "../ScaleSettingsContext";
import { FormatAccidentalsForDisplay } from './HelperComponents';

const DisplayPianoKeyboard = ({selectedScale, isSmallScreen, toggleFooter}:{selectedScale: PayloadContainer, isSmallScreen: boolean, toggleFooter: () => void}) => {
    const { showDisplayKeyboardDegrees, fillDisplayPiano } = useScaleSettings();
    const pianoKeys = [ [0,"W"], [1,"B"], [2,"W"], [3,"B"], [4,"W"], [5,"W"], [6,"B"], [7,"W"], [8,"B"], [9,"W"], [10,"B"], [11,"W"] ];
                       // [0,"W"], [1,"B"], [2,"W"], [3,"B"], [4,"W"], [5,"W"], [6,"B"], [7,"W"], [8,"B"], [9,"W"], [10,"B"], [11,"W"] ];
    
    const glurp = (inputPianoKeys: (string | number)[][]) => {
        const result: any[] = [];
        inputPianoKeys.forEach(item => {
            const noteMatch = selectedScale.payloadList.find(payload => payload.note === item[0]);
            console.log(noteMatch);
            const style = (item[0] === 4 || item[0] === 11) ? " narrower-piano-key" : "";
            if(noteMatch) {
                result.push({note: item[0], color: item[1], highlight: true, style: style, degree: ((showDisplayKeyboardDegrees) ? noteMatch.degree: null)});
            }
            else {
                result.push({note: item[0], color: item[1], highlight: false, style: style, degree: null});
            } 
        });
        return result;
    }

    const createPianoKeyboard = ( minifyPiano: boolean = false /* pianoKeys2: (string | number)[][] */) => {
        let result: any[] = [];
        
        if(minifyPiano) {
            result = glurp(pianoKeys);
        }
        else {
            let pianoKeys2: (string | number)[][] = [];
            for(let i = 0; i < 2; i++) {
                pianoKeys.forEach(item => {
                    pianoKeys2.push(item);
                });
            }

            if(fillDisplayPiano) {
                result = glurp(pianoKeys2);
            }
            else {
                const copiedArray = [...selectedScale.payloadList];
                pianoKeys2.forEach(item => {
                    const style = (item[0] === 4 || item[0] === 11) ? " narrower-piano-key" : "";
                    if(copiedArray.length > 0 && copiedArray[0].note == item[0]) {
                        const baba = copiedArray.shift();
                        result.push({note: item[0], color: item[1], highlight: true, style: style, degree: ((showDisplayKeyboardDegrees) ? baba?.degree : null)});
                    }
                    else {
                        result.push({note: item[0], color: item[1], highlight: false, style: style, degree: null});
                    }
                });
            }
        }

        return (
            <>
                { result.map((item,index) => (
                    <li key={index}
                        className={"piano-keys" + item.style + (item.highlight ? " highlighted-key" : "") + (item.color === "W" ? " white-key" : " black-key") }>
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
            <div className='piano-display-border' style={isSmallScreen ? {width: "307px"} : {width: "586px"}}>
                <div style={{display: "flex"}}>
                    <div style={{paddingRight: "0px"}}>
                        <i onClick={toggleFooter}
                            style={{fontSize: "18px"}}
                            className={"fa-solid fa-circle-chevron-down"}></i>
                    </div>
                    <div style={{padding: "4px", flexGrow: "2"}}><FormatAccidentalsForDisplay textInput={getScaleDisplayName()}/></div>
                </div>
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