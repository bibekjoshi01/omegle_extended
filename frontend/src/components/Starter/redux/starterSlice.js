import {createSlice} from '@reduxjs/toolkit'
import { createStarter, findPartners } from './thunk'

const initialState = {
  loading: false,
  searching: false,
}


export const starterSlice = createSlice({
  name: 'starter',
  initialState,
  reducer:{
   
  },
  // extraReducers: (builder)=>{
  //   builder.addCase(createStarter.pending, (state)=>{
  //     state.loading = true
  //   })
  //   builder.addCase(createStarter.fulfilled, (state)=>{
  //     state.loading = false
      
  //   })
  //   builder.addCase(createStarter.rejected, (state)=>{
  //     state.loading = false

  //   })
  //   builder.addCase(findPartners.pending, (state)=>{
  //     state.searching = true
  //   })
  //   builder.addCase(findPartners.fulfilled, (state)=>{
  //     state.searching = false
  //   })
  //   builder.addCase(findPartners.fulfilled, (state)=>{
  //     state.searching = false
  //   })
  // }
})

export const {} = starterSlice.actions;
export default starterSlice.reducer