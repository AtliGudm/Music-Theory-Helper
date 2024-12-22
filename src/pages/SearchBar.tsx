import { useState, useRef, useEffect } from "react";
import { formatNote, processTextInput, groupScalesByType } from "../Helpers";
import { scales, Scale } from "../data/ScaleData";
import fuzzysort from "fuzzysort";
import ScaleFinderSettings from "./ScaleFinderSettings";

// @ts-ignore
const SearchBar = ({ setGroupedScales, findScales/* , children   */}) => {
  const [ queryText, setQueryText] = useState("");
  const [ showDropdown, setShowDropdown ] = useState(false);
  const [ searchResults, setSearchResults ] = useState<Fuzzysort.Results>();
  const [isSticky, setIsSticky] = useState(false);
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

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const isNowSticky = rect.top <= 10; // Check if the element's top is at or above the viewport
        setIsSticky(isNowSticky);
      }
    };
    window.addEventListener("scroll", handleScroll);
    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`sticky-div ${isSticky ? "sticky-active" : ""}`} ref={containerRef}>
      <div className="search-container">
        <input type="text" 
                          onChange={inputSearchChange} 
                          value={queryText} 
                          placeholder="Enter notes separated by commas (e.g. C, D, E...)"
                          onKeyDown={handleKeyDown} 
                          style={{paddingLeft: "18px"}}
                          onFocus={() => setShowDropdown(true)}
                          />
        <button className="search-icon" title="Search" style={{paddingRight: "14px"}}
                onClick={() => {setShowDropdown(false); findScales(queryText)}}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
      { queryText && searchResults?.total !== 0 && showDropdown &&
          (<div className="dropdown-content">
          {searchResults && searchResults.map(item => (
              <div key={item.target} onClick={() => searchResultClicked(item)}>
                  {/* @ts-ignore */}
                  {item.obj.root + " " + item.obj.type} <hr />
              </div>)
          )}
          </div>) 
      }
      <ScaleFinderSettings/>
    </div>
  );
};

export default SearchBar;