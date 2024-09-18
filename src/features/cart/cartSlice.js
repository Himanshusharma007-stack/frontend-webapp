import { createSlice, createSelector } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import localStorageFunctions from "../../utils/localStorageFunctions";
import { getSignedUrl } from "../../services/FoodItems";

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
    const fetchSignedUrls = async () => {
      const items = localStorageFunctions.getDatafromLocalstorage("cartItems");
      if (items) {
        try {
          if (Array.isArray(items)) {
            const updatedItems = await Promise.all(
              items.map(async (item) => {
                if (item.imageUrl) {
                  try {
                    const res = await getSignedUrl(item.imageUrl);
                    if (res.success) {
                      item.imageUrl = res.data.signedUrl;
                    }
                  } catch (error) {
                    console.error(`Failed to get signed URL for item: ${item._id}`, error);
                  }
                }
                return item;
              })
            );
  
            console.log('Updated items with signed URLs === ', updatedItems);
            // Optionally update local storage again with the items containing signed URLs
            localStorageFunctions.saveInLocalstorage("cartItems", updatedItems);
  
            dispatch(setCartItemsFromLocalStorage(updatedItems));

          }
        } catch (error) {
          console.error("Error processing localStorage data", error);
        }
      }
    };
  
    fetchSignedUrls(); // Call the async function inside useEffect
  }, [dispatch]);
}



