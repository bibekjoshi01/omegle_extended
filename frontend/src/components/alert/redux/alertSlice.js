import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showAlert: false,
  alertMsg: "",
  alertType: "",
};

const alertSlice = createSlice({
    name : alert,
    initialState,
    reducers:{
        showAlertMsg : (state, action)=>{
            return action.payload;
        }
    }
})
export const {showAlertMsg} = alertSlice.actions;
export default alertSlice.reducer