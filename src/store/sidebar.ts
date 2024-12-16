import { createSlice } from "@reduxjs/toolkit";

interface SidebarState {
    collapsed: boolean
}

// Define initial state
const initialState: SidebarState = {
    collapsed: false
};

const sidenavbarSlice = createSlice({
    name: "setCollapsed",
    initialState: initialState,
    reducers: {
        setSideBarCollapsed: (state) => {
        state.collapsed = !state.collapsed;
      },
    },
  });
  
  export const { setSideBarCollapsed } = sidenavbarSlice.actions;
  
  export default sidenavbarSlice.reducer;
  

