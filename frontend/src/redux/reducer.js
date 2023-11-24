import { combineReducers } from "@reduxjs/toolkit";
import commonAppSlice from "./common/commonAppSlice";
import starterSlice from "../components/Starter/redux/starterSlice";

export const rootReducer = combineReducers({
  commonApp: commonAppSlice,
  starter: starterSlice,
});
