import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    logged: true,
  },
  reducers: {
    logUser: (state) => {
      state.logged = true;
    },
    logoutUser: (state) => {
      state.logged = false;
    },
  },
});

export const { logUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
