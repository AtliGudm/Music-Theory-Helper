import React, { useState } from "react";
import ScaleDisplay from "./ScaleDisplay";
import { Scale } from "../data/ScaleData";
// @ts-ignore
const ScaleGroupDisplay = ({type, scales, enharmonicEquivalence} : {type: string, scales: Scale[], enharmonicEquivalence:boolean}) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="scaleGroup">
            <h2 className="scaleGroupHeader" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? "▼" : "▶"} {type} Scales ({scales.length})
            </h2>
            {isOpen && (
                <ul>
                    {scales.map((_scale,index) => (
                        <ScaleDisplay key={_scale.root+_scale.type+index} scale={_scale} />
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ScaleGroupDisplay;