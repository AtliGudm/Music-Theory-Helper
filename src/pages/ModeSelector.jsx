import React, { useState } from 'react';
import { modes } from '../data/ModesData';

const ModeSelector = ({scaleType, onModeChange}) => {
    const [selectedMode, setSelectedMode] = useState(0);

    const handleChange = (event) => {
        const newSelectedMode = event.target.value;
        setSelectedMode(newSelectedMode);
        onModeChange(newSelectedMode);
    };

    return (
        <>
        {(scaleType != "Minor") && (
            <div style={{padding: "8px"}}>
            <label style={{paddingRight: "6px"}} htmlFor="mode-select">Mode:</label>
            { <select style={{fontSize: "16px"}} id="mode-select" value={selectedMode} onChange={handleChange}>
                {modes[scaleType].map((modeObj, index) => (
                    <option key={index} value={index}>
                        {modeObj.mode}
                    </option>
                ))}
            </select> }
            </div>
        )}
        </>
    );
};

export default ModeSelector;