import { useState, useRef, useEffect } from "react";
import { formatNote, processTextInput, groupScalesByType } from "../Helpers";
import { scales, Scale } from "../data/ScaleData";
import fuzzysort from "fuzzysort";

interface InputFieldProps {
    setGroupedScales: (groupedScales: any) => void;
    findScales: (inputText: string) => void;
}
// @ts-ignore
const InputField = ({ setGroupedScales, findScales, children }) => {
    const [ queryText, setQueryText] = useState("");
    const [ showDropdown, setShowDropdown ] = useState(false);
    const [ searchResults, setSearchResults ] = useState<Fuzzysort.Results>();
    const containerRef = useRef<HTMLDivElement>(null);

    const inputSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQueryText = e.target.value;
        setQueryText(e.target.value);

        if (newQueryText.length === 0 || newQueryText.includes(",")) {
            setShowDropdown(false);
            return;
        }

        let found: string, rebuiltInputString: string[];
        ({found, rebuiltInputString} = processTextInput(newQueryText));

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
            const results = fuzzysort.go(newQueryText, filteredScales,{limit: 7, keys: ["type", "order"]});
            setShowDropdown(results.total !== 0);
            // @ts-ignore 
            setSearchResults(results);
        }
    }

    const searchResultClicked = (item: any) => { 
        let scaleContainer: Scale[] = [];
        scaleContainer.push(item.obj);
        const grouped = groupScalesByType(scaleContainer);
        setShowDropdown(false);
        setGroupedScales(grouped);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setShowDropdown(false);
            findScales(queryText);
        }
      };

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
        <div className="search">
            <div ref={containerRef}>
                <input type="text" 
                    onChange={inputSearchChange} 
                    value={queryText} 
                    placeholder="Enter notes separated by commas (e.g. C, D, E...)"
                    onKeyDown={handleKeyDown} 
                    className="userInput"
                    onFocus={() => setShowDropdown(true)}
                    />
                <button className="searchButton"
                        onClick={() => {setShowDropdown(false); findScales(queryText)}}>
                    Filter Scales
                </button>

                { queryText && searchResults?.total !== 0 && showDropdown &&
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
            {children}
        </div>
    );
}

export default InputField;