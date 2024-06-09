import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action) => {
      let item = { ...action.payload, quantity: 1 };
      state.value.push(item);
    },
    increament: (state, action) => {

      state.value.forEach((elem) => {
        if (elem._id === action.payload._id) {
          elem.quantity += 1;
        }
      });
    },

    decreament: (state, action) => {
      state.value.forEach((elem, index) => {
        if (elem._id === action.payload._id) {
          if (elem.quantity > 0) {
            elem.quantity -= 1;
          }
          if (elem.quantity === 0) {
            // This ensures that items with 0 quantity are removed
            state.value.splice(index, 1);
          }
        }
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { add, increament, decreament } = cartSlice.actions;

export default cartSlice.reducer;
