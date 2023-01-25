import React, { useCallback, useEffect, useState, useRef } from 'react';
import LsitOption from './component/listOption'
import PopUp from './component/popUp';

import logo from './logo.svg';
import contactLogo from './img/contactsLogo.png'
import './style/App.css';

function App() {
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const popupRef = useRef()

    //component did mount
    useEffect(function () {
        document.addEventListener('click', handleClickOutside, true);

        //component did un-mount
        return function () {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    function handleClickOutside(e) {
        if (popupRef.current && !popupRef.current.contains(e.target)) {
            setIsPopupOpen(false);
        }
    }

    const handleAddBtnClick = useCallback(() => {
        setIsPopupOpen(true)
    }, [])


    return (
        <>
            {
                isPopupOpen ?
                    <PopUp
                        setIsPopupOpen={setIsPopupOpen}
                        popupRef={popupRef}
                        handleClickOutside={handleClickOutside}
                    /> : null
            }
            <div style={isPopupOpen ? { filter: 'blur(5px)' } : null}>
                <div className="navBar">
                    <div className='mainLogoBox'>
                        <img src={logo} alt='' height='40px' />
                    </div>
                    Inventory Management{isPopupOpen}
                    <img className='contactLogo' alt='' src={contactLogo} />
                </div>
                <div className='mainScreen'>
                    <div className='sideBar'></div>
                    <div className='containt'>

                        <div className='tableTitle'>
                            <div id='title'>Main Ledger</div>
                            <div className="table">
                                <button id='add' onClick={handleAddBtnClick}>Add</button>
                                <div className="list">
                                    <div className='ItemNameTitle'>Item Name</div>
                                    <div className='dateTitle'>Date of Service</div>
                                    <div className='remainingItemsTitle'>Remaining Items</div>
                                </div>
                                <LsitOption />
                                <LsitOption />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
