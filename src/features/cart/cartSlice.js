import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import cartItems from "../../cartItems";

// const url = "https://course-api.com/react-useReducer-cart-project";
// const proxy = "https://cors-anywhere.herokuapp.com/";

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
};

export const getCartItems = createAsyncThunk("cart/getCartItems", () => {
  // return fetch(proxy + url)
  //   .then((resp) => resp.json())
  //   .catch((err) => console.log(err));
  return cartItems;
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, {payload}) => {
      const itemId = payload.id;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increase: (state, {payload}) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount += 1;
    },
    decrease: (state, {payload}) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount -= 1;
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(getCartItems.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const {clearCart, removeItem, increase, decrease, calculateTotals} =
  cartSlice.actions;
export default cartSlice.reducer;
