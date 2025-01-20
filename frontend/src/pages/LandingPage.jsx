import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { ContactSection, Section, ShopByGenderSection } from "../Components";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <React.Fragment>
      <div className="flex z-10 flex-col relative font-poppinsMedium">
        <div className="navbar bg-base-100 w-11/12 m-auto h-[12vh] max-sm:h-[8vh] flex items-center justify-center max-lg:justify-between">
          <div className="navbar-start w-fit">
            <details className="dropdown">
              <summary
                tabIndex={0}
                role="button"
                className="btn lg:hidden max-sm:px-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </summary>
              <ul className="menu dropdown-content !justify-center bg-black rounded-box z-[1] mt-3 max-lg:w-[88vw] items-center !left-0 h-[75vh] flex-col  p-2 shadow hidden max-lg:flex ">
                <li className="bg-transparent">
                  <Link
                    to={"/"}
                    className={
                      "font-interSemiBold text-white hover:border-b-2 hover:border-orange-500 transition-all hover:text-primary-color text-base capitalize cursor-pointer "
                    }
                  >
                    Necklaces and Pendants
                  </Link>
                </li>

                <li className="bg-transparent">
                  <Link
                    to={"/about"}
                    className={
                      "font-interSemiBold text-white hover:border-b-2 hover:border-orange-500 transition-all hover:text-primary-color text-base capitalize cursor-pointer "
                    }
                  >
                    Earrings
                  </Link>
                </li>
                <li className="bg-transparent">
                  <Link
                    to={"/properties"}
                    className={
                      "font-interSemiBold text-white hover:border-b-2 hover:border-orange-500 transition-all hover:text-primary-color text-base capitalize cursor-pointer  "
                    }
                  >
                    Rings
                  </Link>
                </li>
                <li className="bg-transparent">
                  <Link
                    to={"/contact"}
                    className={
                      "font-interSemiBold text-white hover:border-b-2 hover:border-orange-500 transition-all hover:text-primary-color text-base capitalize cursor-pointer  "
                    }
                  >
                    Bracelets
                  </Link>
                </li>
                <li className="bg-transparent">
                  <Link
                    to={"/list-property"}
                    className={
                      "font-interSemiBold text-white hover:border-b-2 hover:border-orange-500 transition-all hover:text-primary-color text-base capitalize cursor-pointer  "
                    }
                  >
                    Anklets
                  </Link>
                </li>
                <li className="bg-transparent">
                  <Link
                    to={"/list-property"}
                    className={
                      "font-interSemiBold text-white hover:border-b-2 hover:border-orange-500 transition-all hover:text-primary-color text-base capitalize cursor-pointer  "
                    }
                  >
                    Toe Rings
                  </Link>
                </li>
                <li className="bg-transparent">
                  <Link
                    to={"/list-property"}
                    className={
                      "font-interSemiBold text-white hover:border-b-2 hover:border-orange-500 transition-all hover:text-primary-color text-base capitalize cursor-pointer  "
                    }
                  >
                    Brooches and Pins
                  </Link>
                </li>
                <li className="bg-transparent">
                  <Link
                    to={"/list-property"}
                    className={
                      "font-interSemiBold text-white hover:border-b-2 hover:border-orange-500 transition-all hover:text-primary-color text-base capitalize cursor-pointer  "
                    }
                  >
                    Jewelry Sets
                  </Link>
                </li>
                <li className="bg-transparent">
                  <Link
                    to={"/list-property"}
                    className={
                      "font-interSemiBold text-white hover:border-b-2 hover:border-orange-500 transition-all hover:text-primary-color text-base capitalize cursor-pointer  "
                    }
                  >
                    Men's Silver Jewelry
                  </Link>
                </li>
              </ul>
            </details>
            {/* <Link to={"/"}>
                    <img
                      className="w-40 h-12 max-sm:h-12 max-xl:w-24 max-xl:h-12 max-lg:w-52 max-sm:w-32 max-[450px]:w-16 max-[450px]:h-10 max-[380px]:w-24 max-[380px]:h-8 "
                      src={logo}
                      alt="logo"
                    />
                  </Link> */}
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className=" flex items-center gap-5  menu-horizontal px-1">
              <li className="bg-transparent">
                <Link
                  to={"/"}
                  className={
                    "font-interSemiBold text-black hover:border-b-2 hover:border-orange-500 transition-all hover:text-primary-color text-base capitalize cursor-pointer "
                  }
                >
                  Necklaces and Pendants
                </Link>
              </li>

              <li className="bg-transparent">
                <Link
                  to={"/about"}
                  className={
                    "font-interSemiBold text-black hover:border-b-2 hover:border-orange-500 transition-all hover:text-primary-color text-base capitalize cursor-pointer "
                  }
                >
                  Earrings
                </Link>
              </li>
              <li className="bg-transparent">
                <Link
                  to={"/properties"}
                  className={
                    "font-interSemiBold text-black hover:border-b-2 hover:border-orange-500 transition-all hover:text-primary-color text-base capitalize cursor-pointer  "
                  }
                >
                  Rings
                </Link>
              </li>
              <li className="bg-transparent">
                <Link
                  to={"/contact"}
                  className={
                    "font-interSemiBold text-black hover:border-b-2 hover:border-orange-500 transition-all hover:text-primary-color text-base capitalize cursor-pointer  "
                  }
                >
                  Bracelets
                </Link>
              </li>
              <li className="bg-transparent">
                <Link
                  to={"/list-property"}
                  className={
                    "font-interSemiBold text-black hover:border-b-2 hover:border-orange-500 transition-all hover:text-primary-color text-base capitalize cursor-pointer  "
                  }
                >
                  Anklets
                </Link>
              </li>
              <li className="bg-transparent">
                <Link
                  to={"/list-property"}
                  className={
                    "font-interSemiBold text-black hover:border-b-2 hover:border-orange-500 transition-all hover:text-primary-color text-base capitalize cursor-pointer  "
                  }
                >
                  Toe Rings
                </Link>
              </li>
              <li className="bg-transparent">
                <Link
                  to={"/list-property"}
                  className={
                    "font-interSemiBold text-black hover:border-b-2 hover:border-orange-500 transition-all hover:text-primary-color text-base capitalize cursor-pointer  "
                  }
                >
                  Brooches and Pins
                </Link>
              </li>
              <li className="bg-transparent">
                <Link
                  to={"/list-property"}
                  className={
                    "font-interSemiBold text-black hover:border-b-2 hover:border-orange-500 transition-all hover:text-primary-color text-base capitalize cursor-pointer  "
                  }
                >
                  Jewelry Sets
                </Link>
              </li>
              <li className="bg-transparent">
                <Link
                  to={"/list-property"}
                  className={
                    "font-interSemiBold text-black hover:border-b-2 hover:border-orange-500 transition-all hover:text-primary-color text-base capitalize cursor-pointer  "
                  }
                >
                  Men's Silver Jewelry
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* <Dropdowns /> */}
      </div>
      <Section
        heading={"Top Seller"}
        tagline={"Explore our most loved products"}
        className={""}
      />
      <Section
        heading={"New For You"}
        tagline={" Our latest release, just for you"}
        className={"!bg-extraLight"}
      />
      <ShopByGenderSection />
      <ContactSection />
    </React.Fragment>
  );
};

export default LandingPage;
