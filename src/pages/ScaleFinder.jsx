import { useState } from "react"
import './ScaleFinder.css'
import ScaleGroupDisplay from "./ScaleGroupDisplay";
import { useScaleSettings } from "../ScaleSettingsContext";
import { formatNotes, convertNotesToInt, scaleNotesToInt } from "../Helpers";
import { scales } from "../data/ScaleData";

const CheckboxSetting = ({ id, label, checked, onChange }) => (
    <div>
        <input 
            type="checkbox" 
            checked={checked}
            onChange={onChange} 
            id={id} />
        <label htmlFor={id}>{label}</label>
    </div>
);

const ScaleFinder = () => {
    const [ inputNotes, setInputNotes ] = useState("");
    const { includeSevenths, setIncludeSevenths, 
            enharmonicEquivalence, setEnharmonicEquivalence,
            romanNumeralsMajorAdjusted, setRomanNumeralsMajorAdjusted } = useScaleSettings();
    const [ groupedScales, setGroupedScales ] = useState({});

    const findScales = () => {
        const input = (enharmonicEquivalence) ? convertNotesToInt(inputNotes.split(",")) : formatNotes(inputNotes.split(","));

        if(input.length === 0) {
            setGroupedScales(groupScalesByType(scales));
            return;
        }

        const matches = scales.filter((scale) => {
            const scaleToCompare = (enharmonicEquivalence) ? scaleNotesToInt(scale.notes) : scale.notes;
            return input.every((note) => scaleToCompare.includes(note));
        });

        // Group the matching scales by type
        const grouped = groupScalesByType(matches);
  
        setGroupedScales(grouped);
    }

    const groupScalesByType = (matchedScales) => {
        return matchedScales.reduce((acc, scale) => {
            if (!acc[scale.type]) acc[scale.type] = [];
            acc[scale.type].push(scale);
            return acc;
        }, {});
    } 

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            findScales();
        }
      };

    return (
        <div className="scaleFinder">
            <h1>Scale Finder</h1>
            <p>Enter musical notes separated by commas (e.g. C, D, E...)</p>
            <div>
            <input 
                type="text"
                value={inputNotes}
                onChange={(e) => setInputNotes(e.target.value)}
                placeholder="Enter notes here..."
                onKeyDown={handleKeyDown} // Listen for the Enter key
            />
            <button onClick={findScales}>Find Scales</button>
            </div>
            <div className="settings-container">
                <CheckboxSetting id={"enharmonicEquivalence"} 
                                 checked={enharmonicEquivalence}
                                 onChange={() => setEnharmonicEquivalence(!enharmonicEquivalence)}
                                 label={"Enharmonic Check"} />
                <CheckboxSetting id={"includeSevenths"} 
                                 checked={includeSevenths}
                                 onChange={() => setIncludeSevenths(!includeSevenths)}
                                 label={"Include 7ths"} />
                <CheckboxSetting id={"romanNumeralsMajorAdjusted"} 
                                 checked={romanNumeralsMajorAdjusted}
                                 onChange={() => setRomanNumeralsMajorAdjusted(!romanNumeralsMajorAdjusted)}
                                 label={"Major Relative RNs"} />
            </div>
            <div>
                {/* Skip all this JSX if there are no scale matches */}
                {Object.keys(groupedScales).length > 0 ? (
                    Object.entries(groupedScales).map(([type, scales]) => (
                        <ScaleGroupDisplay
                            key={type}
                            type={type}
                            scales={scales}
                        />
                    ))
                    ) : (
                    <p>No matching scales found.</p>
                )}
            </div>
        </div>
    );
}

export default ScaleFinder;