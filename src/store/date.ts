import { createSlice } from "@reduxjs/toolkit";

export interface DateState {
  date: string;
}


const initialState: DateState = {
  date: new Date().toLocaleString(),
};

export const dateSlice = createSlice({
  name: "userAvatar",
  initialState,
  reducers: {
    setDate: (state) => {
      state.date = new Date().toLocaleString();
    },
  },
});
export const { setDate } = dateSlice.actions;

export default dateSlice.reducer;
