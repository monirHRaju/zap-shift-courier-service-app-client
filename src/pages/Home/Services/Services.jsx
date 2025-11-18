import React, { use } from 'react';
import serviceImg from '../../../assets/service.png'
const promise = fetch('/services.json').then(res => res.json())

const Services = () => {
    const services = use(promise)
    console.log(services)
    return (
        <div className='bg-secondary p-10 rounded-3xl my-20'>
            <h1 className='text-4xl font-bold text-center mt-8 text-white'>Our Services</h1>
            <p className='text-white text-center my-7'>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to <br /> business shipments — we deliver on time, every time.</p>
        
            <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
                {
                    services.map((service, index) => 
                        <div key={index} className='flex flex-col items-center p-5 rounded-2xl bg-white hover:bg-primary'>
                            <img src={serviceImg} className='rounded-full w-20' alt="" />
                            <h3 className='text-2xl font-bold text-secondary'>{service.title}</h3>
                            <p className='text-base-300 text-center'>{service.description}</p>
                        </div>
                    )
                }
                
                
                
                
                
            </div>
        </div>
    );
};

export default Services;