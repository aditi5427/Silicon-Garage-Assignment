import React from 'react';
import '../style/popUp.css';


function popUp({ popupRef, handleClickOutside, handleSubmitBtnClick, popupName }) {
    return (
        <div className='fullScreen'
            onClick={handleClickOutside}
        >

            <form className='pop' onSubmit={(e) => handleSubmitBtnClick(e, popupName)} ref={popupRef}>
                <div className='add'>{popupName}</div>
                <div className="inputLabelBox">
                    <div>Item Name</div>
                    <input type="text" required name='itemName'></input>
                </div>
                <div className="inputLabelBox">
                    <div>Date of Service</div>
                    <input type="date" required name='dateofService'></input>
                </div>
                <div className='inputLabelBox'>
                    <div>Owner Name</div>
                    <input type="text" required name='ownerName'></input>
                </div>
                <div className='inputLabelBox'>
                    <div>Vender Name</div>
                    <input type="text" required name='venderName'></input>
                </div>
                <button id="submit">Submit</button>
            </form>
        </div>
    );
}

export default popUp;
