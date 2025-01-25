import { PinnedScale } from "./PinnedScales";
import { getScale } from "../data/ScaleData";
import { getFifth } from "../Helpers";

const ModalWindow = ({rootScale, isModalOpen, closeModal} : {rootScale: PinnedScale, isModalOpen: boolean, closeModal: () => void}) => {

    const getCloseScalesInFifths = (_rootScale: PinnedScale) => {
        if(_rootScale) {
            const scale1 = getScale(_rootScale.scale.type, getFifth(_rootScale.scale.root,1));
            const scale2 = getScale(_rootScale.scale.type, getFifth(_rootScale.scale.root,2));

            const scale3 = getScale(_rootScale.scale.type, getFifth(_rootScale.scale.root,-1));
            const scale4 = getScale(_rootScale.scale.type, getFifth(_rootScale.scale.root,-2));
        }

    }

    return (
        <>
            {isModalOpen && (
                <div className="modal-overlay">
                <div className="modal">
                     {pinnedScalesList.map((item, index) => (
                            <ScaleDisplay key={item.scale.root+item.scale.type+index} 
                                    selectedMode={item.selectedMode} 
                                    scaleIndex={index} 
                                    changeModeCallback={changeModeCallback}  
                                    scale={item.scale} 
                                    displayScaleOnKeyboard={item.displayScaleOnKeyboard}
                                    pinnScaleCallback={null}
                                    unpinScaleCallback={unpinScaleCallback}/>
                    ))}
                    <button onClick={closeModal}>Close</button>
                </div>
                </div>
            )}
        </>
    );
}

export default ModalWindow;