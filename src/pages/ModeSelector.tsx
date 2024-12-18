
import { modes } from '../data/ModesData';

const ModeSelector = ({scaleType, selectedMode, onModeChange}: {scaleType: string, selectedMode: number, onModeChange: (newSelectedMode: number) => void }) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newSelectedMode = parseInt(event.target.value, 10);
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