import React from 'react';

const Error = () => {
    return (
        <div className='my-25 flex items-center justify-center flex-col gap-8 text-secondary'>
            <img src="https://img.icons8.com/clouds/100/https://img.icons8.com/fluency/48/loading--v1.png" className='w-[300px]' alt="" />
            <h1 className='text-6xl font-black text-secondary'>Loading</h1>
        </div>
    );
};

export default Error;