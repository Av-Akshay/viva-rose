import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { ContactSection, Section, ShopByGenderSection } from "../Components";

const LandingPage = () => {
  return (
    <React.Fragment>
      <Section
        heading={"Top Seller"}
        tagline={"Explore our most loved products"}
        className={""}
      />
      <Section
        heading={"New For You"}
        tagline={" Our latest release, just for you"}
        className={"bg-extraLight"}
      />
      <ShopByGenderSection />
      <ContactSection />
    </React.Fragment>
  );
};

export default LandingPage;
