import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface JobApplicationIdState {
  jobApplicationId: number | null; // Lưu ID của CV cần xóa, hoặc null nếu không có CV nào cần xóa
}

const initialState: JobApplicationIdState = {
  jobApplicationId: null,
};

const jobApplicatonSlice = createSlice({
  name: "jobApplicationId",
  initialState,
  reducers: {
    setSelectedJobApplication: (state, action: PayloadAction<number>) => {
      state.jobApplicationId = action.payload;
    },
    clearJobApplication: (state) => {
      state.jobApplicationId = null;
    },
  },
});

export const { setSelectedJobApplication, clearJobApplication } =
  jobApplicatonSlice.actions;
export default jobApplicatonSlice.reducer;
