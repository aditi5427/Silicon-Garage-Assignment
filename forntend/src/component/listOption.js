import React from 'react';

function component() {
    return (
        <div className='listOption'>
            <div className='ItemName'>Butter</div>
            <div className='date'>20/12/2022</div>
            <div className='remainingItems'>10</div>
            <div className='btnArea'>
                <button className='addRemoveBtn addBtn'>Add</button>
                <button className='addRemoveBtn removeBtn'>Edit</button>
            </div>
        </div>
    );
}

export default component;
