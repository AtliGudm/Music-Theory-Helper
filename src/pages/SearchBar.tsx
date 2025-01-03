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
  const [ highlightedIndex, setHighlightedIndex ] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  const inputSearchChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQueryText = e.target.value;
    inputSearchChange(newQueryText);
  }

  const inputSearchChange = (newQueryText: string) => {
    setQueryText(newQueryText);
    setHighlightedIndex(-1);

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
    setQueryText(generateSearchResultViewText(item));

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
    if(showDropdown) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightedIndex((prevIndex) => {
          if(prevIndex < searchResults2.length - 1) {
            console.log("path-A:" + (prevIndex+1));
            return prevIndex+1;
          }
          else {
            console.log("path-B:" + (searchResults2.length - 1));
            return searchResults2.length - 1;
          }
        })
      } 
      else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightedIndex((prevIndex) => {
          if(prevIndex > 0) {
            console.log("path-C:" + (prevIndex-1));
            return prevIndex-1;
          }
          else {
            console.log("patch-D:" + -1);
            return -1;
          }
        })
      } 
      else if (e.key === "Enter") {
          if(highlightedIndex > -1 && searchResults2 && searchResults2.length > 0) {
            searchResultClicked(searchResults2[highlightedIndex]);
          }
          else {
            setShowDropdown(false);
            findScales(queryText);
          }
      }
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

  const generateSearchResultViewText = (item: any) => {
    return (item.root != null ? item.root + " ": "") + ((typeof item.obj === 'string') ? item.obj : ('item' in item.obj ? item.obj.item.mode : ('type' in item.obj ? item.obj.type : item.obj.mode)) );
  }

  return (
    <div className={`sticky-div ${isSticky ? "sticky-active" : ""}`} ref={containerRef}>
      <div className="search-container">
      <button className="search-icon" title="Search" 
                onClick={() => {setShowDropdown(false); findScales(queryText)}}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
        <input type="text" 
                          onChange={inputSearchChange2} 
                          value={queryText} 
                          placeholder="Enter notes separated by commas (e.g. C, D, E...)"
                          onKeyDown={handleKeyDown} 
                          onFocus={() => inputSearchChange(queryText)}
                          />
      </div>
      { queryText && searchResults2.length !== 0 && showDropdown &&
          (<div className="dropdown-content">
          {searchResults2 && searchResults2.map((item, index) => (
              <div key={generateKey(item)}
                   onClick={() => searchResultClicked(item)}
                   className={(index == highlightedIndex) ? "dropdown-highlight" : "dropdown-highlight2" }>
                  { generateSearchResultViewText(item) }
                  { /* @ts-ignore */}
                  { /* {(item.root != null ? item.root + " ": "") + ((typeof item.obj === 'string') ? item.obj : ('item' in item.obj ? item.obj.item.mode : ('type' in item.obj ? item.obj.type : item.obj.mode)) )} */ }
              </div>)
          )}
          </div>) 
      }
      <ScaleFinderSettings/>
    </div>
  );
};

export default SearchBar;