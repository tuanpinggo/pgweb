import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visible: false,
};

export const cartDrawerSlice = createSlice({
  name: "cartDrawer",
  initialState,
  reducers: {
    setVisible: (state, action) => {
      state.visible = action.payload;
    },
  },
});

export const { setVisible } = cartDrawerSlice.actions;

export default cartDrawerSlice.reducer;
