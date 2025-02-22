import { PayloadContainer } from "../data/ScaleData"
import { Scale } from "../data/ScaleData"
import ScaleDisplay from "./ScaleDisplay";
import { useState } from "react";
import { useScaleSettings } from "../ScaleSettingsContext";

export interface PinnedScale {
    scale: Scale;
    selectedMode: number; 
    scaleIndex: number;
    changeModeCallback : (index: number, newValue: number) => void;
    displayScaleOnKeyboard: (payloadContainer: PayloadContainer) => void;
}

export const PinnedScales = ({ pinnedScalesList, isSmallScreen, changeModeCallback, emptyPinnedScalesListCallback, unpinScaleCallback = null }: { pinnedScalesList: PinnedScale[], isSmallScreen: boolean, changeModeCallback : (index: number, newValue: number) => void, emptyPinnedScalesListCallback: () => void, unpinScaleCallback: (index: number) => void | null }) => {
    const [ isOpen, setIsOpen ] = useState(false);
    const { enablePinFuntionality, chordDisplayOrientation } = useScaleSettings();

    return (<>
        {(enablePinFuntionality && pinnedScalesList && pinnedScalesList.length > 0) && (
            <div className="scaleGroupContainer" style={{maxWidth: ((chordDisplayOrientation === "vertical") ? "750px" : "1050px"), marginLeft: "auto", marginRight: "auto"}}>
                <div className="scaleGroup">
                    <h2 className="pinnedScalesHeader" onClick={() => setIsOpen(!isOpen)}>
                        <div><i className="fa-solid fa-thumbtack" style={{transform: "rotate(45deg)"}}></i></div>
                        <div>{isOpen ? <i className="fa-solid fa-angle-down"></i> : <i className="fa-solid fa-angle-right"></i>} Pinned Scales ({pinnedScalesList.length})</div>
                        <button onClick={emptyPinnedScalesListCallback}
                                className="trash-can">
                            <i className="fa-regular fa-trash-can"></i>
                        </button>
                    </h2>
                    <ul>
                        {isOpen && pinnedScalesList.map((item, index) => (
                            <ScaleDisplay key={item.scale.root+item.scale.type+index} 
                                    selectedMode={item.selectedMode} 
                                    scaleIndex={index} 
                                    changeModeCallback={changeModeCallback}  
                                    scale={item.scale} 
                                    displayScaleOnKeyboard={item.displayScaleOnKeyboard}
                                    pinnScaleCallback={null}
                                    unpinScaleCallback={unpinScaleCallback}
                                    isSmallScreen={isSmallScreen}/>
                        ))}
                    </ul>
                </div>
            </div>
        )}
    </>);
}