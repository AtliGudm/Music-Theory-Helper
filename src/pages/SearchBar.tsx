import { useState, useRef, useEffect } from "react";
import { processTextInput, groupScalesByType2 } from "../Helpers";
import { Scale, getScale, getScales } from "../data/ScaleData";
import ScaleFinderSettings from "./ScaleFinderSettings";
import { findByName, SearchResult } from "../data/ModesData";
import { modes } from "../data/ModesData";
import { getFifth } from "../Helpers";

export interface SearchResultContainer {
  root: null | string,
  type: string,
  obj: SearchResult | string
}

// @ts-ignore
const SearchBar = ({ setGroupedScales, findScales, setQueryNotes}) => {
  const [ queryText, setQueryText] = useState("");
  const [ showDropdown, setShowDropdown ] = useState(false);
  const [ searchResults2, setSearchResults2 ] = useState<SearchResultContainer[]>([]);
  const [ isSticky, setIsSticky ] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const inputSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQueryText = e.target.value;
    setQueryText(e.target.value);

    if (newQueryText.trim().length === 0 || newQueryText.includes(",")) {
        setShowDropdown(false);
        return;
    }

    const {found, rebuiltInputString} = processTextInput(newQueryText);
    let result: SearchResultContainer[] = [];

    if(found && rebuiltInputString.length === 0) {
      const scaleNames = Object.keys(modes);
      scaleNames.forEach(scaleName => {
        result.push({root: found, type: "scale", obj: scaleName});
      });
    }
    else {
      const scales = findByName(rebuiltInputString.join(" "));
      scales.forEach(item => {
        result.push({root: (found) ? found : null, type: item.type, obj: item });
      });
    }

    if(result.length > 0) {
      setShowDropdown(true);
      setSearchResults2(result);
      return;
    }
    setShowDropdown(false);
  }


 const packageScale = (scale: Scale, item: any) =>{
  return { scale: scale, 
           selectedModeIndex: (item.type === "scale") ? 0 : item.obj.modeNumber, 
           parentScale: (item.type === "scale") ? "" : item.obj.parentScale }
} 

const getScaleName = (item: any) => {
  return (item.type === "mode") ? item.obj.parentScale : ((typeof item.obj === 'string') ? item.obj : item.obj.item.mode);
}

const searchResultClicked = (item: SearchResultContainer) => {
    const scaleName = getScaleName(item);
    let grouped: any = null;

    if(item.root == null) {
        const clickedScales = getScales(scaleName);
        const packagedScales = clickedScales?.map(scale => packageScale(scale, item));
        if (packagedScales) grouped = groupScalesByType2(packagedScales);
    }
    else {
      let root = item.root;
      if(item.type === "mode" && typeof item.obj !== 'string') root = getFifth(item.root, item.obj.item.fifthShift);
      const clickedScale = getScale(scaleName, root);
      if (clickedScale) grouped = groupScalesByType2([packageScale(clickedScale, item)]);
    }
    setShowDropdown(false);
    setGroupedScales(grouped);
    setQueryNotes([]);
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

  const generateKey = (item: any) => {
    let asdf = item.type;
    if(typeof item.obj === 'string') asdf += item.obj;
    else asdf += item.obj.item.mode;
    return asdf;
  }

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
      { queryText && searchResults2.length !== 0 && showDropdown &&
          (<div className="dropdown-content">
          {searchResults2 && searchResults2.map(item => (
              <div key={generateKey(item)} onClick={() => searchResultClicked(item)}>
                  { /* @ts-ignore */}
                  {(item.root != null ? item.root + " ": "") + ((typeof item.obj === 'string') ? item.obj : ('item' in item.obj ? item.obj.item.mode : ('type' in item.obj ? item.obj.type : item.obj.mode)) )} <hr />
              </div>)
          )}
          </div>) 
      }
      <ScaleFinderSettings/>
    </div>
  );
};

export default SearchBar;