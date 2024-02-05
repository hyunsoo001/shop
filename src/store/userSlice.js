import { createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "user",
  initialState: { name: "kim", age: 20 },

  reducers: {
    changeName(state) {
      //   return { name: "Park", age: 20 };
      state.name = "park";
    },
    addAge(state, action) {
      state.age = state.age + action.payload;
    },
  },
});
export let { changeName, addAge } = user.actions;

export default user;
