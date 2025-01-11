import React from "react";
import { FaStarHalfAlt } from "react-icons/fa";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Link } from "react-router-dom";

const Star = ({ stars, review }) => {
  const ratingStar = Array.from({ length: 5 }, (elem, index) => {
    let number = index + 0.5;
    return (
      <span key={index}>
        {stars >= index + 1 ? (
          <AiFillStar className="text-ratingColor text-lg" />
        ) : stars >= number ? (
          <FaStarHalfAlt className="text-ratingColor text-lg" />
        ) : (
          <AiOutlineStar className="text-ratingColor text-lg" />
        )}
      </span>
    );
  });

  return (
    <React.Fragment>
      <div className="flex items-center">
        {ratingStar}
        <Link to={"#"} className="ml-2 capitalize font-poppinsLight">
          ({review} customer reviews)
        </Link>
      </div>
    </React.Fragment>
  );
};

export default Star;
