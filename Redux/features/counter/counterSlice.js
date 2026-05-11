import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({

  name: "counter",

  initialState: {
    value: 0
  },

  reducers: {

    increment: (state) => {
      state.value += 1;
    },

    decrement: (state) => {
      state.value -= 1;
    }
  }
});


// Export actions
export const { increment, decrement } = counterSlice.actions;

// Export reducer
export default counterSlice.reducer;