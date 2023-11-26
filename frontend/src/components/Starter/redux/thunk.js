import { createAsyncThunk } from '@reduxjs/toolkit';
import { initialize, getPartners } from './api';

export const createStarter = createAsyncThunk('starter', async (values) => {
  try{
    const response = await initialize(values)
    return {payload: response.data}

  }catch(err){
    return err
  }
});


export const findPartners = createAsyncThunk("partners", async(room_id)=>{
  try{
    const response = await getPartners(room_id)
    return {payload: response.data}

  }catch(err){
    return err
  }
})