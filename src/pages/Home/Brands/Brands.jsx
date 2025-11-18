import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import amazon from '../../../assets/brands/amazon.png'
import casio from '../../../assets/brands/casio.png'
import moonstar from '../../../assets/brands/moonstar.png'
import randstad from '../../../assets/brands/randstad.png'
import amazon_vector from '../../../assets/brands/amazon_vector.png'
import star from '../../../assets/brands/star.png'
import start_people from '../../../assets/brands/start_people.png'
// Import Swiper styles
import 'swiper/css';
import { A11y, Autoplay, Pagination, Scrollbar } from 'swiper/modules';

const brands = [amazon, casio, moonstar, randstad, star, amazon_vector, start_people]
const Brands = () => {
    return (
        <div className='my-20'>
            <h2 className='text-2xl text-secondary font-bold text-center'>We've helped thousands of sales teams</h2>
            <div className='my-10'>
            <Swiper
                slidesPerView={1}
                spaceBetween={10}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                clickable: true,
                }}
                breakpoints={{
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 4,
                    spaceBetween: 40,
                },
                1024: {
                    slidesPerView: 5,
                    spaceBetween: 50,
                },
                }}
                modules={[Pagination, Autoplay]}

                className="mySwiper"
                >
                {
                    brands.map(brand => <SwiperSlide><img src={brand} alt="" /></SwiperSlide>)
                }
                
                
                
            </Swiper>
            </div>
        </div>
    );
};

export default Brands;