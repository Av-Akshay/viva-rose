import React from "react";

import Cards from "../Cards";
import { set } from "../../utils/icons";

const Products = ({ items }) => {
  return (
    <React.Fragment>
      {items?.map((item) => {
        return (
          <Cards
            key={item._id}
            pic={item?.jewelleryImages[0]}
            price={item?.price}
            name={item?.jewelleryType}
          />
        );
      })}
    </React.Fragment>
  );
};

export default Products;
