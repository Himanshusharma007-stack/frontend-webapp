import { createSlice, createSelector } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import localStorageFunctions from "../../utils/localStorageFunctions";

const initialState = {
  value: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action) => {
      const item = { ...action.payload, quantity: 1 };
      state.value.push(item);
      localStorageFunctions.saveInLocalstorage("cartItems", state.value);
    },

    reset: (state) => {
      state.value = [];
      localStorageFunctions.saveInLocalstorage("cartItems", state.value);
    },

    increament: (state, action) => {
      state.value.forEach((elem) => {
        if (elem._id === action.payload._id) {
          elem.quantity += 1;
        }
      });
      localStorageFunctions.saveInLocalstorage("cartItems", state.value);
    },

    decreament: (state, action) => {
      state.value.forEach((elem, index) => {
        if (elem._id === action.payload._id) {
          if (elem.quantity > 0) {
            elem.quantity -= 1;
          }
          if (elem.quantity === 0) {
            state.value.splice(index, 1); // Remove the item if quantity is 0
          }
        }
      });
      localStorageFunctions.saveInLocalstorage("cartItems", state.value);
    },

    deletefromCart: (state, action) => {
      state.value.forEach((elem, index) => {
        if (elem._id === action.payload._id) {
          state.value.splice(index, 1);
        }
      });
      localStorageFunctions.saveInLocalstorage("cartItems", state.value);
    },

    setCartItemsFromLocalStorage: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const getTotalAmount = createSelector(
  (state) => state.cart.value,
  (val) =>
    val.reduce(
      (accumulator, { size, quantity, price }) =>
        accumulator + (size?.price || price) * quantity,
      0
    )
);

// Action creators are generated for each case reducer function
export const {
  add,
  reset,
  increament,
  decreament,
  deletefromCart,
  setCartItemsFromLocalStorage,
} = cartSlice.actions;

export default cartSlice.reducer;

// Hook to fetch cart items from localStorage
export function useSetCartItemsFromLocalStorage() {
  const dispatch = useDispatch();

  useEffect(() => {
    const items = localStorageFunctions.getDatafromLocalstorage("cartItems");
    if (items) {
      try {
        if (Array.isArray(items)) {
          dispatch(setCartItemsFromLocalStorage(items));
        }
      } catch (error) {
        console.error("Error parsing localStorage data", error);
      }
    }
  }, [dispatch]);
}
