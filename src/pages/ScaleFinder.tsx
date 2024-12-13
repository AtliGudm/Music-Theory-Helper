import { useState, useRef, useEffect } from "react"
import './ScaleFinder.css'
import ScaleGroupDisplay from "./ScaleGroupDisplay";
import { useScaleSettings } from "../ScaleSettingsContext";
import { formatNotes, formatNote, convertNotesToInt, scaleNotesToInt, isMusicalNote } from "../Helpers";
import { scales, Scale } from "../data/ScaleData";
import fuzzysort from "fuzzysort";

const CheckboxSetting = ({ id, label, checked, onChange }: { id: string, label: string, checked: boolean, onChange: () => void }) => (
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
    const { includeSevenths, setIncludeSevenths, 
            enharmonicEquivalence, setEnharmonicEquivalence,
            romanNumeralsMajorAdjusted, setRomanNumeralsMajorAdjusted } = useScaleSettings();
    const [ groupedScales, setGroupedScales ] = useState<{ [key: string]: Scale[] }>({});
    const [ queryText, setQueryText] = useState("");
    const [ searchResults, setSearchResults ] = useState<Fuzzysort.Results>();
    const [showDropdown, setShowDropdown] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const findScalesByNotes = (noteList: string[] = []) => {
        const bgbg = (noteList.length === 0) ? queryText.split(",") : noteList;
        const input = (enharmonicEquivalence) ? convertNotesToInt(bgbg) : formatNotes(bgbg);

        const matches: Scale[] = scales.filter((_scale) => {
            const scaleToCompare = (enharmonicEquivalence) ? scaleNotesToInt(_scale.notes) : _scale.notes;
            return (input as (string | number)[]).every((note) => (scaleToCompare as (string | number)[]).includes(note));
        });

        // Group the matching scales by type
        const grouped = groupScalesByType(matches);
        setGroupedScales(grouped);
    }

    const groupScalesByType = (matchedScales: Scale[]) => {
        return matchedScales.reduce((acc: { [key: string]: Scale[] }, _scale: Scale) => {
            if (!acc[_scale.type]) acc[_scale.type] = [];
            acc[_scale.type].push(_scale);
            return acc;
        }, {});
    } 

    const findScales = () => {
        setShowDropdown(false);
        if(queryText.length === 0) {
            setGroupedScales(groupScalesByType(scales));
            return;
        }

        const { musicalNotes, rebuiltInputString } = processTextInput2(queryText);
        if(rebuiltInputString.length === 0) {
            findScalesByNotes(musicalNotes);
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
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            findScales();
        }
      };

    const searchResultClicked = (item: any) => { 
        let scaleContainer: Scale[] = [];
        scaleContainer.push(item.obj);
        const grouped = groupScalesByType(scaleContainer);
        setGroupedScales(grouped);
        setShowDropdown(false);
    }

    const processTextInput2 = (inputText: string) => {
        const splittedString = inputText.split(/[\s,]+/);
        let musicalNotes: string[] = [];
        let rebuiltInputString: string[] = [];
        
        splittedString.forEach((item) => {
            if (isMusicalNote(item)) {
                musicalNotes.push(formatNote(item));
            } else if(item.length > 0) {
                rebuiltInputString.push(item);
            }
        });
        return {musicalNotes, rebuiltInputString};
    }

    const processTextInput = (inputText: string) => {
        const splittedString = inputText.split(/[\s,]+/);
        let found: string = "";
        let rebuiltInputString: string[] = [];
        splittedString.forEach((item) => {
            if (!found && isMusicalNote(item)) {
                found = formatNote(item);
            } else if(item.length > 0) {
                rebuiltInputString.push(item);
            }
        });
        return {found, rebuiltInputString};
    }

    const inputSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSearchText = e.target.value;
        setQueryText(e.target.value);

        if (newSearchText.length === 0 || newSearchText.includes(",")) {
            setShowDropdown(false);
            return;
        }

        let found: string, rebuiltInputString: string[];
        ({found, rebuiltInputString} = processTextInput(newSearchText));

        let filteredScales = scales;
        if(found) {
            found = formatNote(found);
            filteredScales = scales.filter((item) => {
                return item.root === found;
            });
        } 
        // The case when user only inputted a note, no other text
        if(rebuiltInputString.length === 0)
        {
            let bldd = filteredScales.map((item) => {
                return {target: item.type, obj: item, score: 0, indexes: [], totalScore: 0};
            });
            setShowDropdown(true);
            // @ts-ignore
            setSearchResults(bldd);
            return;
        }

        // add order and weight property to scales 
        if(found) {
            const results = fuzzysort.go(rebuiltInputString.join(" "), filteredScales,{limit: 7, key: "type"});
            setShowDropdown(results.total !== 0);
            setSearchResults(results);
        } else {
            const results = fuzzysort.go(newSearchText, filteredScales,{limit: 7, keys: ["type", "order"]});
            setShowDropdown(results.total !== 0);
            // @ts-ignore 
            setSearchResults(results);
        }
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setShowDropdown(false);
        }
    };
    
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="scaleFinder">
            <h1>Scale Finder</h1>
            <p>Enter musical notes separated by commas (e.g. C, D, E...)</p>
            <div>
            <div className="search">
                <div ref={containerRef}>
                    <input type="text" 
                        onChange={inputSearchChange} 
                        value={queryText} 
                        onKeyDown={handleKeyDown} 
                        className="userInput"
                        onFocus={() => setShowDropdown(true)}
                        />
                    <button className="searchButton" onClick={findScales}>Find Scales</button>

                    { queryText && searchResults?.total !== 0 && showDropdown && /* inputFocus && */
                        (<div className="dropdown-content">
                        {searchResults && searchResults.map(item => (
                            <div key={item.target} onClick={() => searchResultClicked(item)}>
                                {/* 
                                // @ts-ignore */}
                                {item.obj.root + " " + item.obj.type} <hr />
                            </div>)
                        )}
                        </div>) 
                    }
                </div>
                
            </div>
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

            <div style={{maxWidth: "750px", marginLeft: "auto", marginRight: "auto"}}>
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