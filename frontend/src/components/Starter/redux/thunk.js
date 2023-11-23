import { createAsyncThunk } from '@reduxjs/toolkit';
import { initialize } from './api';

export const createStarter = createAsyncThunk('starter', async (values) => {
  try{
    // const body = JSON.stringify(values)
    const response = await initialize(values)
    console.log(response, 'response')
    return {payload: response.data}

  }catch(err){
    return err
  }
});
