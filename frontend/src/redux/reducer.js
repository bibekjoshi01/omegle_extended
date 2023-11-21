import { combineReducers } from "@reduxjs/toolkit";
import commonAppSlice from "./common/commonAppSlice";

export const rootReducer = combineReducers({
  commonApp: commonAppSlice,
});
