import { useState } from "react"
import './ScaleFinder.css'
import ScaleGroupDisplay from "./ScaleGroupDisplay";
import { useScaleSettings } from "../ScaleSettingsContext";
import { groupScalesByType, findScalesByNotes, processTextInput, processTextInput2 } from "../Helpers";
import { scales, Scale } from "../data/ScaleData";
import fuzzysort from "fuzzysort";
import ScaleFinderSettings from "./ScaleFinderSettings";
import InputField from "./InputField";


const ScaleFinder = () => {
    const { enharmonicEquivalence, setQueryNotes } = useScaleSettings();
    const [ groupedScales, setGroupedScales ] = useState<{ [key: string]: Scale[] }>({});

    const findScales = (queryText: string) => {
        if(queryText.length === 0) {
            setQueryNotes([]);
            setGroupedScales(groupScalesByType(scales));
            return;
        }

        const { musicalNotes, rebuiltInputString } = processTextInput2(queryText);
        if(rebuiltInputString.length === 0) {
            setQueryNotes(musicalNotes);
            setGroupedScales(findScalesByNotes(musicalNotes, enharmonicEquivalence, scales));
            return;
        }

        if(musicalNotes.length === 0) {
            const results = fuzzysort.go(queryText, scales,{ keys: ["type", "order"] });
            setQueryNotes([]);
            // @ts-ignore
            formatSearchResults(results);
        } else {
            const { found, rebuiltInputString } = processTextInput(queryText);
            const filteredScales = scales.filter((item) => {
                return item.root === found;
            });
            const results = fuzzysort.go(rebuiltInputString.join(" "), filteredScales,{key: "type"});
            setQueryNotes([]);
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
            <InputField setGroupedScales={setGroupedScales} findScales={findScales}>
                <ScaleFinderSettings/>
            </InputField>
            
            <div style={{maxWidth: "750px", marginLeft: "auto", marginRight: "auto"}}>
                {Object.keys(groupedScales).length > 0 ? (
                    Object.entries(groupedScales).map(([type, scales]) => (
                        <ScaleGroupDisplay
                            key={type}
                            type={type}
                            scales={scales}
                            enharmonicEquivalence={enharmonicEquivalence}
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