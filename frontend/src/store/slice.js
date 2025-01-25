import { createSlice } from "@reduxjs/toolkit";

const jewellerySlice = createSlice({
  name: "silverJewellery",
  initialState: {
    allProducts: [],
  },
  reducers: {
    addAllProducts: (state, action) => {
      state.allProducts = action.payload;
    },
  },
});

export const { addAllProducts } = jewellerySlice.actions;
export default jewellerySlice.reducer;
