import { useState, useEffect } from "react";
import ScaleDisplay from "./ScaleDisplay";
import { useScaleSettings } from "../ScaleSettingsContext";
import { Scale, PayloadContainer } from "../data/ScaleData";
import { FormatAccidentalsForDisplay } from './HelperComponents';
import { PinnedScale } from "./PinnedScales";

const ScaleGroupDisplay = ({type, scales, scaleGroupStartingMode, parentScale, displayScaleOnKeyboard, pinnScaleCallback} : {type: string, scales: Scale[], scaleGroupStartingMode: number, parentScale: string | null,  displayScaleOnKeyboard: (payloadContainer: PayloadContainer) => void, pinnScaleCallback: (pinnedScale: PinnedScale) => void }) => {
    const [ isOpen, setIsOpen ] = useState(false);
    const { forceScaleGroupOpen } = useScaleSettings();
    const [ selectedModes, setSelectedModes ] = useState(() => Array(scales.length).fill(scaleGroupStartingMode));

    const changeModeCallback = (index: number, newValue: number) => {
        let newSelectedModes = selectedModes.slice();
        newSelectedModes[index] = newValue;
        setSelectedModes(newSelectedModes);
    }

    const getHeaderText = () => {
        return type + ((scaleGroupStartingMode > 0) ? " [" + parentScale + "]" : "");
    }

    useEffect(() => {
        setSelectedModes(Array(scales.length).fill(scaleGroupStartingMode));
    }, [scales.length, scaleGroupStartingMode]);

    useEffect(() => {
        setIsOpen(forceScaleGroupOpen);
    }, [forceScaleGroupOpen]);

    return (
        <div className="scaleGroup">
            <h2 className="scaleGroupHeader" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <i className="fa-solid fa-angle-down"></i> : <i className="fa-solid fa-angle-right"></i>}  <FormatAccidentalsForDisplay textInput={getHeaderText()}/> Scales ({scales.length})
            </h2>
            {isOpen && (
                <ul>
                    {scales.map((_scale,index) => (
                        <ScaleDisplay key={_scale.root+_scale.type+index} 
                                    selectedMode={selectedModes[index]} 
                                    scaleIndex={index} 
                                    changeModeCallback={changeModeCallback}  
                                    scale={_scale} 
                                    displayScaleOnKeyboard={displayScaleOnKeyboard}
                                    pinnScaleCallback={pinnScaleCallback}
                                    unpinScaleCallback={null}/>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ScaleGroupDisplay;