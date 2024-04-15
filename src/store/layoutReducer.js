import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: false,
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {

    // handle dark mode
    handleDarkMode: (state, action) => {
      state.darkMode = action.payload;
      if (typeof window !== "undefined") {
        window?.localStorage.setItem("darkMode", action.payload);
      }
    },

  },
});

export const {
  handleDarkMode,
} = layoutSlice.actions;

export default layoutSlice.reducer;
