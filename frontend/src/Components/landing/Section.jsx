import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Cards from "../Cards";
import { ethnic, jewellery, ring, set } from "../../utils/icons";

const Section = ({ className, tagline, heading }) => {
  return (
    <section className={`bg-transparent ${className}`}>
      <div className="w-4/5 m-auto py-5">
        <div className="w-full flex flex-col items-center gap-2">
          <h1 className=" text-headingColor font-poppinsBold text-5xl text-center ">
            {heading}
          </h1>
          <p className="px-5 text-headingColor font-poppinsLight text-lg text-center relative after:content-[''] after:w-full after:h-1 after:bg-headingColor after:absolute after:top-1/2 after:-right-full before:content-[''] before:w-full before:h-1 before:bg-headingColor before:absolute before:top-1/2 before:-left-full">
            {tagline}
          </p>
        </div>
        <div className="flex items-center justify-between my-5">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            loop={true}
            pagination={false}
            breakpoints={{
              1280: {
                slidesPerView: 3.5,
              },
              1150: {
                slidesPerView: 3.2,
              },
              1000: {
                slidesPerView: 3,
              },
              820: {
                slidesPerView: 2.5,
              },
              600: {
                slidesPerView: 2.1,
              },
              470: {
                slidesPerView: 1.7,
              },
              370: {
                slidesPerView: 1.3,
              },
              280: {
                slidesPerView: 1,
              },
            }}
          >
            <SwiperSlide>
              <Cards pic={ethnic} name="ethnic" />
            </SwiperSlide>
            <SwiperSlide>
              <Cards pic={jewellery} name="jewellery" />
            </SwiperSlide>
            <SwiperSlide>
              <Cards pic={ring} name="ring" />
            </SwiperSlide>
            <SwiperSlide>
              <Cards pic={set} name="set" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Section;
