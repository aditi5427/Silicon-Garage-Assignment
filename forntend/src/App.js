import React, { useCallback, useEffect, useState, useRef } from 'react';
import { apiCall } from './apiCall'
import LsitOption from './component/listOption'
import PopUp from './component/popUp';

import logo from './logo.svg';
import contactLogo from './img/contactsLogo.png'
import './style/App.css';

function App() {
    const [userData, setUserData] = useState([])
    const [openedDataId, setOpenedDataId] = useState('')
    const [flag, setflag] = useState(false)
    const [popupName, setPopupName] = useState('')
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const popupRef = useRef()

    useEffect(function () {
        (async () => {
            const apiResp = await apiCall('get_data')
            setUserData(apiResp?.data || [])
        })();
    }, [flag]);

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

    const handlePopupView = useCallback((btnType, id) => {
        setPopupName(btnType)
        setIsPopupOpen(true)
        setOpenedDataId(id)
    }, [])

    const handleSubmitBtnClick = useCallback(async (e, btnType) => {
        e.preventDefault()
        const itemName = e.target.itemName.value;
        const dateOfService = e.target.dateofService.value;
        const ownerName = e.target.ownerName.value;
        const venderName = e.target.venderName.value;

        if (btnType === "Add") {
            const apiResp = await apiCall('add_data', 'post', {
                itemName,
                dateOfService,
                ownerName,
                venderName
            })
            console.log(apiResp?.msg);
            setflag(!flag)
        } else if ('Edit') {
            const apiResp = await apiCall('update_data', 'put', {
                id: openedDataId,
                itemName,
                dateOfService,
                ownerName,
                venderName
            })
            console.log(apiResp?.msg);
            setflag(!flag)
        }
    }, [flag, openedDataId])

    const handleRemoveBtn = useCallback(async (id) => {
        const apiResp = await apiCall('delete_data', 'delete', {
            id: id
        })
        setflag(!flag)
        console.log(apiResp?.msg);
    }, [flag])

    return (
        <>
            {
                isPopupOpen ?
                    <PopUp
                        popupName={popupName}
                        popupRef={popupRef}
                        handleClickOutside={handleClickOutside}
                        handleSubmitBtnClick={handleSubmitBtnClick}
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
                                <button id='add' onClick={(e) => handlePopupView('Add')} > Add</button>
                                <div className="list">
                                    <div className='ItemNameTitle'>Item Name</div>
                                    <div className='dateTitle'>Date of Service</div>
                                    <div className='remainingItemsTitle'>Remaining Items</div>
                                </div>
                                {
                                    userData.map((item, index) => {
                                        return <div key={index}>
                                            <LsitOption
                                                id={item._id}
                                                itemName={item?.itemName}
                                                dateOfService={item.dateOfService}
                                                handlePopupView={handlePopupView}
                                                handleRemoveBtn={handleRemoveBtn}
                                            />
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
