import { combineReducers } from "@reduxjs/toolkit";
import commonAppSlice from "./common/commonAppSlice";
import starterSlice from "../components/Starter/redux/starterSlice";
import alertSlice from "../components/alert/redux/alertSlice";

export const rootReducer = combineReducers({
  commonApp: commonAppSlice,
  starter: starterSlice,
  alert: alertSlice
});
