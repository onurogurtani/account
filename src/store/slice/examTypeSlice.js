import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import examTypeServices from '../../services/examType.services';


export const getExamType = createAsyncThunk('getExamType', async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await examTypeServices.getExamType(null,data);
      console.log(response);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
     
    
    }
  });

  const initialState = {
    allExamTypes: [],
   
  };


  export const examTypesSlice = createSlice({
    name: 'examTypesSlice',
    initialState,
    reducers: {
      clearClasses: (state, action) => {
        state.allExamTypes = action.payload;
      },
     }
     
  ,
    extraReducers: (builder) => {
      builder.addCase(getExamType.fulfilled, (state, action) => {
        state.allExamTypes = action?.payload?.data;
      
      });
   
    },
  });
 

  export const clearClasses = examTypesSlice.actions;