import { useState, useEffect } from "react";
import ScaleDisplay from "./ScaleDisplay";
import { Scale } from "../data/ScaleData";

const ScaleGroupDisplay = ({type, scales, scaleGroupStartingMode, parentScale} : {type: string, scales: Scale[], scaleGroupStartingMode: number, parentScale: string | null}) => {
    const [ isOpen, setIsOpen ] = useState(true);
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

    return (
        <div className="scaleGroup">
            <h2 className="scaleGroupHeader" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? "▼" : "▶"} {getHeaderText()} Scales ({scales.length})
            </h2>
            {isOpen && (
                <ul>
                    {scales.map((_scale,index) => (
                        <ScaleDisplay key={_scale.root+_scale.type+index} selectedMode={selectedModes[index]} scaleIndex={index} changeModeCallback={changeModeCallback}  scale={_scale} />
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ScaleGroupDisplay;