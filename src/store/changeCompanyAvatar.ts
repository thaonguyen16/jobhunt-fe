import { createSlice } from "@reduxjs/toolkit";

interface ChangeCompanyAvatarState {
  link: string;
}

const initialState: ChangeCompanyAvatarState = {
  link: "",
};

const changeCompanyAvatarSlice = createSlice({
  name: "changeCompanyAvatar",
  initialState,
  reducers: {
    setCompanyAvatar: (state, action) => {
      state.link = action.payload;
    },
  },
});

export const { setCompanyAvatar } = changeCompanyAvatarSlice.actions;

export default changeCompanyAvatarSlice.reducer;
