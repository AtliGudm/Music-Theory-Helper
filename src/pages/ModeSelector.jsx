import React from 'react';
import { modes } from '../data/ModesData';

const ModeSelector = ({scaleType, selectedMode, onModeChange}) => {
    const handleChange = (event) => {
        const newSelectedMode = event.target.value;
        onModeChange(newSelectedMode);
    };

    return (
        <>
        {(scaleType != "Minor") && (
            <div style={{marginTop: "12px"}}>
                <label style={{paddingRight: "6px"}} htmlFor="mode-select"><strong>Mode:</strong></label>
                <select style={{fontSize: "16px"}} id="mode-select" value={selectedMode} onChange={handleChange}>
                    {modes[scaleType].map((modeObj, index) => (
                        <option key={index} value={index}>
                            {modeObj.mode}
                        </option>
                    ))}
                </select>
            </div>
        )}
        </>
    );
};

export default ModeSelector;