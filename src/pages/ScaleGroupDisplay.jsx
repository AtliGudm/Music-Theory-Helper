import React, { useState } from "react";
import ScaleDisplay from "./ScaleDisplay";

const ScaleGroupDisplay = ({type, scales}) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="scaleGroup">
            <h2 className="scaleGroupHeader" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? "▼" : "▶"} {type} Scales ({scales.length})
            </h2>
            {isOpen && (
                <ul>
                    {scales.map((_scale) => (
                        <ScaleDisplay key={_scale.root + " " + _scale.type} scale={_scale} />
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ScaleGroupDisplay;