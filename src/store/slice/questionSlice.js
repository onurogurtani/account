import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import questionServices from '../../services/questions.services';

// Question Type
export const getQuestionsType = createAsyncThunk("question/getQuestionsType", async () => {
        const response = await questionServices.getQuestionType();
        return response;
});

// Get Questions
export const getQuestions = createAsyncThunk("question/getQuestions", 
    async (data) => {
    const response = await questionServices.getQuestions(data);
    return response;
});


// Add Question
export const addQuestions = createAsyncThunk("question/addQuestions", async (data) => {
    console.log(data)
    const response = await questionServices.addQuestion(data);
    return response;
});


// Delete Qeustion
export const questionDelete = createAsyncThunk( 'question/deleteQuestion', async (data, {dispatch }) => {
      const response =  await questionServices.questionDelete(data);
      dispatch(getQuestions());
      return response;
  },
);


// Inıtıal State
const initialState = {
  questionType: [],
  questionList: [],
};

export const questionSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getQuestionsType.fulfilled, (state, action) => {
        state.questionType = action.payload.data.items
    });

    builder.addCase(getQuestions.fulfilled, (state, action) => {
        state.questionList = action.payload.data.items
    });

    builder.addCase(addQuestions.fulfilled, (state, action) => {
        console.log("ss")
    });

  },
});
