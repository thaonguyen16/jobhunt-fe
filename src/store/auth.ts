import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAccessToken } from "@utils/authUtils";
import api from "@utils/axios";
import { IUserProfile } from "@data/interface";

interface AuthState {
  isAuthenticated: boolean;
  roles?: string[];
  avatar?: string;
}

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

const initialState: AuthState = {
  isAuthenticated: getAccessToken() ? true : false,
  roles: [],
  avatar: "",
};

const loginSlide = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.roles = [];
    },
    setAvatar: (state, image) => {
      state.avatar = image.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.roles = action.payload.roles;
      state.avatar = action.payload.avatar;
    });
  },
});

export const { login, logout, setAvatar } = loginSlide.actions;

export default loginSlide.reducer;
