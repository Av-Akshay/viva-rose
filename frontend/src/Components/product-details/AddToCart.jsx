import React, { useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import CartAmount from "./CartAmount";

// import CartAmount from "../cart-components/CartAmount";
// import { addToCart } from "../../reduxToolKit/slices";

const AddToCart = ({ product }) => {
  console.log(product);

  //   const dispatch = useDispatch();
  const { id, colors, stock } = product;
  console.log(colors);

  const [color, setColor] = useState(colors[0]);
  const [Amount, setAmount] = useState(1);
  const increment = () => {
    Amount < stock ? setAmount(Amount + 1) : setAmount(stock);

    if (Amount === stock) {
      alert(`only ${stock} item present in stock`);
    }
  };
  const decrement = () => {
    Amount > 1 ? setAmount(Amount - 1) : setAmount(1);
  };

  return (
    <React.Fragment>
      {/* add to cart */}
      <CartAmount Amount={Amount} decrement={decrement} increment={increment} />

      <NavLink
        to="/cart"
        className={
          " border-2 border-headingColor bg-white text-headingColor py-2 w-full text-center hover:text-white hover:bg-headingColor transition-all font-poppinsSemibold"
        }
        // onClick={() => dispatch(addToCart({ id, Amount, color, product }))}
      >
        Add To Cart
      </NavLink>
      <NavLink
        to="/cart"
        className={
          " border-2 border-headingColor bg-white text-headingColor py-2 w-full text-center hover:text-white hover:bg-headingColor transition-all font-poppinsSemibold"
        }
        // onClick={() => dispatch(addToCart({ id, Amount, color, product }))}
      >
        Add To Wishlist
      </NavLink>
    </React.Fragment>
  );
};

export default AddToCart;
