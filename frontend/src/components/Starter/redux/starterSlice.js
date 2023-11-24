import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  loading: false,
}


export const starterSlice = createSlice({
  name: 'starter',
  initialState,
  reducer:{
    createStarterRequest: (state) =>{
      state.loading = true
    },
    createStarterSuccess: (state) =>{
      state.loading = true
    },
    createStarterFail: (state) =>{
      state.loading = true
    },
  }
})

export const {createStarterRequest, createStarterSuccess, createStarterFail} = starterSlice.actions;
export default starterSlice.reducer