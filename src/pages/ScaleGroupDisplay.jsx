import React, { useState } from "react";
import ScaleDisplay from "./ScaleDisplay";

const ScaleGroupDisplay = ({type, scales}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <h2 onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? "▼" : "▶"} {type} Scales ({scales.length})
            </h2>
            {isOpen && (
                <ul>
                    {scales.map((_scale) => (
                        <ScaleDisplay key={_scale.name} scale={_scale} />
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ScaleGroupDisplay;