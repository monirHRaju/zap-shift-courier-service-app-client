import React from "react";

const About = () => {
  return (
    <div className="my-20 text-center">
      <h1 className="text-secondary font-bold text-4xl">About Us</h1>
      <p className="my-10">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. <br /> From personal packages to business shipments — we deliver
        on time, every time.
      </p>
      <hr className="border border-base-200 my-8" />
      <div>
        {/* name of each tab group should be unique */}
        <div className="tabs tabs-lift">
          <input
            type="radio"
            name="my_tabs_3"
            className="tab"
            aria-label="Story"
          />
          <div className="tab-content bg-base-100 border-base-300 p-6">
            <p className="mb-5">We started with a simple promise — to make parcel delivery fast, reliable, and stress-free. Over the years, our commitment to real-time tracking, efficient logistics, and customer-first service has made us a trusted partner for thousands. Whether it's a personal gift or a time-sensitive business delivery, we ensure it reaches its destination — on time, every time.</p>
            <p className="mb-5">We started with a simple promise — to make parcel delivery fast, reliable, and stress-free. Over the years, our commitment to real-time tracking, efficient logistics, and customer-first service has made us a trusted partner for thousands. Whether it's a personal gift or a time-sensitive business delivery, we ensure it reaches its destination — on time, every time.</p>
            <p className="mb-5">We started with a simple promise — to make parcel delivery fast, reliable, and stress-free. Over the years, our commitment to real-time tracking, efficient logistics, and customer-first service has made us a trusted partner for thousands. Whether it's a personal gift or a time-sensitive business delivery, we ensure it reaches its destination — on time, every time.</p>
          </div>

          <input
            type="radio"
            name="my_tabs_3"
            className="tab"
            aria-label="Tab 2"
            defaultChecked
          />
          <div className="tab-content bg-base-100 border-base-300 p-6">
            Tab content 2
          </div>

          <input
            type="radio"
            name="my_tabs_3"
            className="tab"
            aria-label="Tab 3"
          />
          <div className="tab-content bg-base-100 border-base-300 p-6">
            Tab content 3
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default About;
