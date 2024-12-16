import { IUserProfile } from "@data/interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAccessToken } from "@utils/authUtils";
import api from "@utils/axios";

export interface AvatarState {
  url: string;
  alt: string;
}


const initialState: AvatarState = {
  url: "",
  alt: "Ảnh đại diện",
};


export const fetchUserProfile = createAsyncThunk<IUserProfile>(
  "auth/fetchUserProfile",
  async () => {
    const response = await api.get("/users/profile", {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data.data.profile;
  }
);

export const userAvatarSlice = createSlice({
  name: "userAvatar",
  initialState,
  reducers: {
    setUserAvatar: (state, action) => {
      const { url, name } = action.payload;
      state.url = url;
      state.alt = name;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.url = action.payload.avatar ? action.payload.avatar: "";
    });
  },
});


export const { setUserAvatar } = userAvatarSlice.actions;

export default userAvatarSlice.reducer;
