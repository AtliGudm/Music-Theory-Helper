import './PianoKeyboard.css'
import { PayloadContainer } from '../data/ScaleData';
import { useScaleSettings } from "../ScaleSettingsContext";
import { FormatAccidentalsForDisplay } from './HelperComponents';
import { CheckboxSetting } from './CheckboxSetting';
import { useState } from 'react';

const InlinePianoKeyboard = ({selectedScale, isSmallScreen/* , toggleFooter */}:{selectedScale: PayloadContainer, isSmallScreen: boolean /*, toggleFooter: () => void */}) => {
    const [ fillDisplayPiano, setFillDisplayPiano ] = useState(true);
    const [ showDisplayKeyboardDegrees, setShowDisplayKeyboardDegrees ] = useState(true);
    const [ showPianoSettings, setShowPianoSettings ] = useState(false);
    const pianoKeys = [ [0,"W"], [1,"B"], [2,"W"], [3,"B"], [4,"W"], [5,"W"], [6,"B"], [7,"W"], [8,"B"], [9,"W"], [10,"B"], [11,"W"] ];

    const glurp = (inputPianoKeys: (string | number)[][]) => {
        const result: any[] = [];
        inputPianoKeys.forEach(item => {
            const noteMatch = selectedScale.payloadList.find(payload => payload.note === item[0]);
            const style = (item[0] === 4 || item[0] === 11) ? " narrower-piano-key" : "";
            if(noteMatch) {
                const root = item[0] === selectedScale.payloadList[0].note;
                result.push({note: item[0], color: item[1], root: root, highlight: true, style: style, degree: ((showDisplayKeyboardDegrees) ? noteMatch.degree: null)});
            }
            else {
                result.push({note: item[0], color: item[1], root: false, highlight: false, style: style, degree: null});
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
                        const root = item[0] === selectedScale.payloadList[0].note;
                        const baba = copiedArray.shift();
                        result.push({note: item[0], color: item[1], root: root, highlight: true, style: style, degree: ((showDisplayKeyboardDegrees) ? baba?.degree : null)});
                    }
                    else {
                        result.push({note: item[0], color: item[1], root: false, highlight: false, style: style, degree: null});
                    }
                });
            }
        }

        return (
            <>
                { result.map((item,index) => (
                    <li key={index}
                        className={"piano-keys" + 
                                    item.style + 
                                    (item.highlight ? " highlighted-key" : "") + 
                                    (item.color === "W" ? " white-key" : " black-key") +
                                    (item.root ? " piano-key-underline" : "")}>
                                <span className='piano-keyboard-scale-degrees'><FormatAccidentalsForDisplay textInput={item.degree}/></span>
                    </li>
                ))}
            </>
        )
    }

    const toggleShowPianoSettings = () => {
        setShowPianoSettings(!showPianoSettings);
    }

    return (
        <div className='container' style={{paddingBottom: "10px", marginTop: "-6px"}}>
            <div className='piano-display-border' style={{display: "flex"}} /* style={isSmallScreen ? {width: "307px"} : {width: "586px"}} */>
                <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between", paddingInline: "6px", paddingBlock: "2px", alignSelf: "end"}}>
                    {/* <div style={{paddingRight: "0px"}}>
                            <i onClick={toggleFooter}
                                style={{fontSize: "18px"}}
                                className={"fa-solid fa-circle-xmark"}></i>
                    </div> */}
                    <div style={{paddingRight: "0px"}}>
                            <i  onClick={toggleShowPianoSettings}
                                style={{fontSize: "18px"}}
                                className={showPianoSettings ? "fa-solid fa-circle-chevron-up" : "fa-solid fa-circle-chevron-down"}></i>
                    </div>
                </div>
                <div>
                    {/* <div style={{display: "flex"}}>
                        <div style={{padding: "4px", flexGrow: "2"}}><FormatAccidentalsForDisplay textInput={getScaleDisplayName()} seventhChordSymbolAllowed={true}/></div>
                    </div> */}
                    <div className="piano-container">
                        <ul className="piano-keys-list">
                            {createPianoKeyboard(isSmallScreen)}
                        </ul>
                    </div>
                    {showPianoSettings && (
                        <div style={{display: "flex", fontSize: "16px", fontWeight: "normal", gap: "8px", paddingTop: "6px"}}>
                            <CheckboxSetting id={"showDisplayKeyboardDegrees"} 
                                                checked={showDisplayKeyboardDegrees}
                                                onChange={() => setShowDisplayKeyboardDegrees(!showDisplayKeyboardDegrees)}
                                                label={"Degrees"} />
                            <CheckboxSetting id={"fillDisplayPiano"} 
                                                checked={fillDisplayPiano}
                                                onChange={() => setFillDisplayPiano(!fillDisplayPiano)}
                                                label={"Fill Piano"} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default InlinePianoKeyboard;