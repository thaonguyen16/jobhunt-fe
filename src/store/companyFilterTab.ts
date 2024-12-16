import { createSlice } from "@reduxjs/toolkit";

interface CompanyFilterTabState {
  tabIndex: number;
}

const initialState: CompanyFilterTabState = {
  tabIndex: 1,
};

const companyFilterTabSlide = createSlice({
  name: "companyFilterTab",
  initialState,
  reducers: {
    setIndex(state, action) {
      state.tabIndex = action.payload;
    },
  },
});

export const { setIndex } = companyFilterTabSlide.actions;

export default companyFilterTabSlide.reducer;
