import React from 'react';

function Jumbotron({title = 'ONLINE TEST',subtitle='PLATFORMASI'}) {
    return (
        <div className='jumbotron  mb-4 p-4 bg-light w-100 rounded'>
            <div className='text-center'>
                <h4>{title}</h4>
                <p>{subtitle}</p>
            </div>
        </div>
    );
}

export default Jumbotron;