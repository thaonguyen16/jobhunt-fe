import authReducer from "./auth.ts";
import roleReducer from "./role.ts";
import userFilterTabReducer from "./userFilterTab.ts";
import registerEmailReducer from "./register.ts";
import jobDetailReducer from "./jobDetail.ts";
import changeCompanyAvatarReducer from "./changeCompanyAvatar.ts";
import jobFilterReducer from "./filterOption.ts";
import paginationDataReducer from "./paginationData.ts";
import userAvatarReducer from "./avatar.ts";
import jobApplicationId from "./selectedJobApplication.ts";
import companyFilterTab from "./companyFilterTab.ts";
import sidebarState from "./sidebar.ts";
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
};

const avatarReducer = combineReducers({
  auth: authReducer,
    role: roleReducer,
    userFilterTab: userFilterTabReducer,
    companyFilterTab: companyFilterTab,
    registerEmail: registerEmailReducer,
    jobDetail: jobDetailReducer,
    changeCompanyAvatar: changeCompanyAvatarReducer,
    jobFilter: jobFilterReducer,
    paginationData: paginationDataReducer,
    userAvatar: userAvatarReducer,
    jobApplicatonId: jobApplicationId,
    sidebarState: sidebarState,
});

const persistedReducer = persistReducer(persistConfig, avatarReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ thunk: true,serializableCheck: false });
  },
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
