import React from 'react';
import '../style/popUp.css';


function popUp({ popupRef, handleClickOutside }) {

    return (
        <div className='fullScreen'
            onClick={handleClickOutside}
        >

            <div className='pop' ref={popupRef}>
                <div className='add'>Add</div>
                <div className="inputLabelBox">
                    <div>Item Name</div>
                    <input type="text"></input>
                </div>
                <div className="inputLabelBox">
                    <div>Date of Service</div>
                    <input type="text"></input>
                </div>
                <div className='inputLabelBox'>
                    <div>Owner Name</div>
                    <input type="text"></input>
                </div>
                <div className='inputLabelBox'>
                    <div>Vendor Name</div>
                    <input type="text"></input>
                </div>
                <button id="submit">Submit</button>
            </div>
        </div>
    );
}

export default popUp;
