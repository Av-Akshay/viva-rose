import React from "react";

import Cards from "../Cards";
import { set } from "../../utils/icons";

const Products = ({ items }) => {
  return (
    <React.Fragment>
      {items?.map((item) => {
        return <Cards key={item} pic={set} name="set" />;
      })}
    </React.Fragment>
  );
};

export default Products;
