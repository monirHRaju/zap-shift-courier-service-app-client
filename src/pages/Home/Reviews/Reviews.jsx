import React, { use } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import coverImg from '../../../assets/customer-top.png'
const reviewPromise = fetch("/reviews.json").then((res) => res.json());

const Reviews = () => {
  const reviews = use(reviewPromise);
  console.log(reviews);
  return (
    <div className="mt-30">
        
      <h2 className="text-2xl text-secondary font-bold text-center">
        What our customers are sayings
      </h2>
      <figure className="flex justify-center my-8">
            <img src={coverImg} className="" alt="" />
        </figure>
      <p className="text-base-300 text-center">Enhance posture, mobility, and well-being effortlessly with Posture Pro. <br />Achieve proper alignment, reduce pain, and strengthen your body with ease!</p>
      <div className="my-10">
        
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"3"}
          loop={true}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
          pagination={true}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="mySwiper"
        >
          
        

            {reviews.map((review) => (
                <SwiperSlide>
            <div className="p-6 bg-white rounded-2xl">
                <FaQuoteLeft size={80} className="text-secondary opacity-50" />
                <p>{review.review}</p>
                <hr class="border-t-2 border-dashed border-secondary w-full my-5" />

                {/* <div className='w-full border-2 border-t border-dashed border-secondary'> </div> */}
                <div className="flex gap-7">
                <img
                    src={review.user_photoURL}
                    className="bg-secondary w-12 h-12 rounded-full "
                    alt=""
                />
                <div>
                    <h3 className="text-secondary font-bold">{review.userName}</h3>
                    <p className="text-base-300">{"Senior Developer"}</p>
                </div>
                </div>
            </div>
            </SwiperSlide>
            ))}
        
          
        </Swiper>
      </div>
    </div>
  );
};

export default Reviews;
