import React from 'react';

const Loading = () => {
    return (
        <div>
            <div className='my-25 flex items-center justify-center flex-col gap-8 text-secondary'>
              <img src="https://img.icons8.com/clouds/100/error.png" className='w-[300px]' alt="" />
             <h1 className='text-6xl font-black text-secondary'>Error 404</h1>
            </div>
        </div>
    );
};

export default Loading;