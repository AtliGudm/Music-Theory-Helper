import { useState } from "react"
import './ScaleFinder.css'
import ScaleGroupDisplay from "./ScaleGroupDisplay";
import { useScaleSettings } from "../ScaleSettingsContext";
import { groupScalesByType, findScalesByNotes, processTextInput, processTextInput2 } from "../Helpers";
import { scales, Scale } from "../data/ScaleData";
import fuzzysort from "fuzzysort";
import { CheckboxSetting } from "./CheckboxSetting";
import InputField from "./InputField";


const ScaleFinder = () => {
    const { includeSevenths, setIncludeSevenths, 
            enharmonicEquivalence, setEnharmonicEquivalence,
            romanNumeralsMajorAdjusted, setRomanNumeralsMajorAdjusted } = useScaleSettings();
    const [ groupedScales, setGroupedScales ] = useState<{ [key: string]: Scale[] }>({});

    const findScales = (queryText: string) => {
        if(queryText.length === 0) {
            setGroupedScales(groupScalesByType(scales));
            return;
        }

        const { musicalNotes, rebuiltInputString } = processTextInput2(queryText);
        if(rebuiltInputString.length === 0) {
            setGroupedScales(findScalesByNotes(musicalNotes, enharmonicEquivalence, scales));
            return;
        }

        if(musicalNotes.length === 0) {
            const results = fuzzysort.go(queryText, scales,{ keys: ["type", "order"] });
            // @ts-ignore
            formatSearchResults(results);
        } else {
            const { found, rebuiltInputString } = processTextInput(queryText);
            const filteredScales = scales.filter((item) => {
                return item.root === found;
            });
            const results = fuzzysort.go(rebuiltInputString.join(" "), filteredScales,{key: "type"});
            formatSearchResults(results);
        }
    }

    const formatSearchResults = (unformattedResults: Fuzzysort.Results) => {
        let formattedResult: Scale[] = [];
        unformattedResults.forEach(item => {
            // @ts-ignore
            formattedResult.push(item.obj);
        })
        const grouped = groupScalesByType(formattedResult);
        setGroupedScales(grouped);
    }

    return (
        <div className="scaleFinder">
            <h1>Scale Finder</h1>
            <p>Enter musical notes separated by commas (e.g. C, D, E...)</p>
            <InputField setGroupedScales={setGroupedScales} findScales={findScales}/>
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

            <div style={{maxWidth: "750px", marginLeft: "auto", marginRight: "auto"}}>
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