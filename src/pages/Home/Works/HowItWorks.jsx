import React from 'react';
import { BsCashCoin } from 'react-icons/bs';
import { CiDeliveryTruck } from 'react-icons/ci';
import { LuBuilding2 } from 'react-icons/lu';
import { MdDeliveryDining } from 'react-icons/md';

const HowItWorks = () => {
    return (
        <div className='my-30'>
            <h1 className='text-secondary font-bold text-3xl my-10'>How it Works</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                <div className='p-5 rounded-2xl bg-white'>
                    <CiDeliveryTruck size={70} color='#03373D'/>
                    <h2 className='text-secondary font-bold text-2xl my-5'>Booking Pick & Drop</h2>
                    <p className='text-base-300'>From personal packages to business shipments — we deliver on time, every time.</p>
                </div>
                
                <div className='p-5 rounded-2xl bg-white'>
                    <BsCashCoin size={70} color='#03373D'/>
                    <h2 className='text-secondary font-bold text-2xl my-5'>Cash On Delivery</h2>
                    <p className='text-base-300'>From personal packages to business shipments — we deliver on time, every time.</p>
                </div>
                <div className='p-5 rounded-2xl bg-white'>
                    <MdDeliveryDining size={70} color='#03373D'/>
                    <h2 className='text-secondary font-bold text-2xl my-5'>Delivery Hub</h2>
                    <p className='text-base-300'>From personal packages to business shipments — we deliver on time, every time.</p>
                </div>
                
                <div className='p-5 rounded-2xl bg-white'>
                    <LuBuilding2 size={70} color='#03373D'/>
                    <h2 className='text-secondary font-bold text-2xl my-5'>Booking SME & Corporate</h2>
                    <p className='text-base-300'>From personal packages to business shipments — we deliver on time, every time.</p>
                </div>

            </div>
        </div>
    );
};

export default HowItWorks;