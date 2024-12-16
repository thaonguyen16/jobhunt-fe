import { createSlice } from "@reduxjs/toolkit";

interface EmailState {
  email: string;
}

const initialState: EmailState = {
  email: "",
};

const sidebarSlice = createSlice({
  name: "registerEmail",
  initialState: initialState,
  reducers: {
    setRegisterEmail(state, action) {
      state.email = action.payload;
    },
  },
});

export const { setRegisterEmail } = sidebarSlice.actions;

export default sidebarSlice.reducer;
