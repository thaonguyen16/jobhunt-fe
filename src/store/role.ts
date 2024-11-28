import { createSlice } from "@reduxjs/toolkit";
import { Roles } from "@data/constants";

interface RoleState {
  role: string;
}

const initialState: RoleState = {
  role: Roles.CANDIDATE,
};

const roleSlice = createSlice({
  name: "role",
  initialState: initialState,
  reducers: {
    setRole(state, action) {
      state.role = action.payload;
    },
  },
});

export const { setRole } = roleSlice.actions;

export default roleSlice.reducer;
