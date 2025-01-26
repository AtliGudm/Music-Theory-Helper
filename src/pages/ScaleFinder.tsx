import { useState, useEffect } from "react"
import './ScaleFinder.css'
import ScaleGroupDisplay from "./ScaleGroupDisplay";
import { useScaleSettings } from "../ScaleSettingsContext";
import { groupScalesByType, processTextInput, processTextInput2, findScalesByNotes, groupScalesByType2, getFifth } from "../Helpers";
import { scales, Scale, getScales, getScale, PayloadContainer } from "../data/ScaleData";
import SearchBar from "./SearchBar";
import { findByName } from "../data/ModesData";
import DisplayPianoKeyboard from "./DisplayPianoKeyboard";
import PianoKeysIcon from '../assets/PianoKeysIcon';
import { PinnedScale, PinnedScales } from "./PinnedScales";

const ScaleFinder = () => {
    const { enharmonicEquivalence, setQueryNotes } = useScaleSettings();
    const [ groupedScales, setGroupedScales ] = useState<{ [key: string]: { scale: Scale[], selectedModeIndex: number, parentScale: string | null }}>({});
    const [ selectedScale, setSelectedScale ] = useState<PayloadContainer>();
    const [ isFooterVisible, setFooterVisible ] = useState(false);
    const [ isSmallScreen, setIsSmallScreen ] = useState(window.innerWidth <= 730);
    const [ pinnedScalesList, setPinnedScalesList ] = useState<PinnedScale[]>([]);

    const findScales = (queryText: string, threshold: number = 0, enharmonicEquivalenceOverride: boolean|null = null) => {
        if(queryText.length === 0) {
            setQueryNotes([]);
            const dfgg = groupScalesByType(scales);
            setGroupedScales(dfgg);
            return;
        }

        const { musicalNotes, rebuiltInputString } = processTextInput2(queryText);
        if(rebuiltInputString.length === 0) {
            setQueryNotes(musicalNotes);
            setGroupedScales(findScalesByNotes(musicalNotes, (enharmonicEquivalenceOverride) ? enharmonicEquivalenceOverride : enharmonicEquivalence, scales));
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
            setGroupedScales(grouped);
            setQueryNotes([]);
        }
        else {
            setGroupedScales({});
            setQueryNotes([]);
        }
    }

    const packageScale = (scale: Scale, item: any) =>{
        return { scale: scale, 
                 selectedModeIndex: (item.type === "scale") ? 0 : item.modeNumber, 
                 parentScale: (item.type === "scale") ? "" : item.parentScale }
    } 
   
    useEffect(() => {
        findScales("");
    }, []);

    const displayScaleOnKeyboard = (payloadContainer: PayloadContainer) => {
        setSelectedScale(payloadContainer);
        if(!isFooterVisible) toggleFooter();
    }

    const toggleFooter = () => {
        setFooterVisible(!isFooterVisible);
    };

    useEffect(() => {
        const handleResize = () => setIsSmallScreen(window.innerWidth <= 600);
        window.addEventListener("resize", handleResize);
    
        return () => window.removeEventListener("resize", handleResize);
      }, []);

    const pinnScale = (pinnedScale: PinnedScale) => {
        const copiedPinnedScalesList = [...pinnedScalesList];
        copiedPinnedScalesList.push(pinnedScale);
        setPinnedScalesList(copiedPinnedScalesList);
    }

    const changeModeCallback = (index: number, newValue: number) => {
        const copiedPinnedScalesList = [...pinnedScalesList];
        copiedPinnedScalesList[index].selectedMode = newValue; 
        setPinnedScalesList(copiedPinnedScalesList);
    }

    const emptyPinnedScalesList = () => {
        setPinnedScalesList([]);
    }

    const unpinScale = (index: number) => {
        let copiedPinnedScalesList = [...pinnedScalesList];
        copiedPinnedScalesList.splice(index, 1);
        setPinnedScalesList(copiedPinnedScalesList);
    }

    return (
        <div className="scaleFinder">
            <h1><span style={{fontSize: "1.25em"}}>S</span>CALE <span style={{fontSize: "1.25em"}}>F</span>INDER</h1>
            <SearchBar setGroupedScales={setGroupedScales} findScales={findScales} setQueryNotes={setQueryNotes}/>    
            <PinnedScales pinnedScalesList={pinnedScalesList}
                          changeModeCallback={changeModeCallback}
                          emptyPinnedScalesListCallback={emptyPinnedScalesList}
                          unpinScaleCallback={unpinScale}/>
            <div className="scaleGroupContainer" style={{maxWidth: "750px", marginLeft: "auto", marginRight: "auto"}}>
                {Object.keys(groupedScales).length > 0 ? (
                    Object.entries(groupedScales).map(([type, item]) => (
                        <ScaleGroupDisplay
                            key={type}
                            type={type}
                            scales={item.scale}
                            scaleGroupStartingMode={item.selectedModeIndex}
                            parentScale={item.parentScale}
                            displayScaleOnKeyboard={displayScaleOnKeyboard}
                            pinnScaleCallback={pinnScale}
                        />
                    ))
                    ) : (
                    <p>No matching scales found.</p>
                )}
            </div>
            <div className={"sticky-bottom " + (isFooterVisible ? "visible" : "")}>
                <DisplayPianoKeyboard toggleFooter={toggleFooter} isSmallScreen={isSmallScreen} selectedScale={selectedScale || { scaleName: "", payloadList: [] }}/>
            </div>
            {!isFooterVisible && (
                <button className="toggle-button"
                        onClick={toggleFooter}
                        style={{fontSize: "18px"}}>
                    <PianoKeysIcon width="40" height="40"/>
                </button>
            )}
            <div style={{height: "170px"}}></div>
        </div>
    );
}

export default ScaleFinder;