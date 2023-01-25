import React from 'react';

function component({ id, itemName, dateOfService, handlePopupView, handleRemoveBtn }) {
    return (
        <div className='listOption'>
            <div className='ItemName'>{itemName}</div>
            <div className='date'>{
                new Date(dateOfService)?.toLocaleString('en-US', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                })}
            </div>
            <div className='remainingItems'>10</div>
            <div className='btnArea'>
                <button className='addRemoveBtn removeBtn' onClick={() => handleRemoveBtn(id)}>Remove</button>
                <button className='addRemoveBtn addBtn' onClick={(e) => handlePopupView('Edit', id)}>Edit</button>
            </div>
        </div>
    );
}

export default component;
