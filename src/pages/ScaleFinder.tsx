import { useState, useEffect } from "react"
import './ScaleFinder.css'
import ScaleGroupDisplay from "./ScaleGroupDisplay";
import { useScaleSettings } from "../ScaleSettingsContext";
import { groupScalesByType, processTextInput, processTextInput2, findScalesByNotes, groupScalesByType2, getFifth } from "../Helpers";
import { scales, Scale, getScales, getScale } from "../data/ScaleData";
import SearchBar from "./SearchBar";
import { findByName } from "../data/ModesData";

const ScaleFinder = () => {
    const { enharmonicEquivalence, setQueryNotes } = useScaleSettings();
    const [ groupedScales, setGroupedScales ] = useState<{ [key: string]: { scale: Scale[], selectedModeIndex: number, parentScale: string | null }}>({});

    const findScales = (queryText: string, threshold: number = 0) => {
        if(queryText.length === 0) {
            setQueryNotes([]);
            const dfgg = groupScalesByType(scales);
            setGroupedScales(dfgg);
            return;
        }

        const { musicalNotes, rebuiltInputString } = processTextInput2(queryText);
        if(rebuiltInputString.length === 0) {
            setQueryNotes(musicalNotes);
            setGroupedScales(findScalesByNotes(musicalNotes, enharmonicEquivalence, scales));
            return;
        }

        let result: any[] = [];
        let grouped: any = null;
        if(musicalNotes.length === 0) {
            const scalesTypes = findByName(rebuiltInputString.join(" "), threshold);

            scalesTypes.forEach(scaleType => {
                const clickedScales = getScales(scaleType.parentScale);
                const packagedScales = clickedScales?.map(scale1 => packageScale(scale1, scaleType));
                packagedScales?.forEach(scale => {
                    result.push(scale);
                })
            });
        }
        else {
            const { found, rebuiltInputString } = processTextInput(queryText);
            const scalesTypes = findByName(rebuiltInputString.join(" "), threshold);

            scalesTypes.forEach(item => {
                const root = (item.type === "mode") ? getFifth(found, item.item.fifthShift) : found;
                const scaleName = (item.type === "mode") ? item.parentScale : item.item.mode ;
                const clickedScale = getScale(scaleName, root);
                if (clickedScale) {
                    const stuff = packageScale(clickedScale, item);
                    result.push(stuff);
                }
            });
        }

        if (result.length > 0) {
            grouped = groupScalesByType2(result);
            console.log(grouped);
            //setShowDropdown(false);
            setGroupedScales(grouped);
            setQueryNotes([]);
        }
        else {
            setGroupedScales({});
            setQueryNotes([]);
        }
/*         if(musicalNotes.length === 0) { // TODO: Breyta þessu case fyrir modes
            const results = fuzzysort.go(queryText, scales,{ keys: ["type", "order"], threshold: threshold });
            setQueryNotes([]);
            // @ts-ignore
            formatSearchResults(results);
        } else { // TODO: Breyta þessu case fyrir modes
            const { found, rebuiltInputString } = processTextInput(queryText);
            const filteredScales = scales.filter((item) => {
                return item.root === found;
            });
            const results = fuzzysort.go(rebuiltInputString.join(" "), filteredScales,{key: "type", threshold: threshold});
            setQueryNotes([]);
            formatSearchResults(results);
        } */
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

    const packageScale = (scale: Scale, item: any) =>{
        return { scale: scale, 
                 selectedModeIndex: (item.type === "scale") ? 0 : item.modeNumber, 
                 parentScale: (item.type === "scale") ? "" : item.parentScale }
    } 
   
    useEffect(() => {
        findScales("");
    }, []);

    return (
        <div className="scaleFinder">
            <h1><span style={{fontSize: "1.25em"}}>S</span>CALE <span style={{fontSize: "1.25em"}}>F</span>INDER</h1>
            <SearchBar setGroupedScales={setGroupedScales} findScales={findScales} setQueryNotes={setQueryNotes} />    
            <div style={{maxWidth: "750px", marginLeft: "auto", marginRight: "auto"}}>
                {Object.keys(groupedScales).length > 0 ? (
                    Object.entries(groupedScales).map(([type, item]) => (
                        <ScaleGroupDisplay
                            key={type}
                            type={type}
                            scales={item.scale}
                            scaleGroupStartingMode={item.selectedModeIndex}
                            parentScale={item.parentScale}
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