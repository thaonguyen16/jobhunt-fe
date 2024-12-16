import { createSlice } from "@reduxjs/toolkit";

interface UserFilterTabState {
  tabIndex: number;
}

const initialState: UserFilterTabState = {
  tabIndex: 4,
};

const userFilterTabSlide = createSlice({
  name: "userFilterTab",
  initialState,
  reducers: {
    setIndex(state, action) {
      state.tabIndex = action.payload;
    },
  },
});

export const { setIndex } = userFilterTabSlide.actions;

export default userFilterTabSlide.reducer;
