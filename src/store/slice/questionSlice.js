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

// Likert Type
export const getLikertType = createAsyncThunk("question/getLikertType", async () => {
  const response = await questionServices.getLikertType();
  return response;
});


// Add Question
export const addQuestions = createAsyncThunk("question/addQuestions", async (data, {dispatch }) => {
    const response = await questionServices.addQuestion(data);
    dispatch(getQuestions());
    return response;
});

// Update Question
export const updateQuestions = createAsyncThunk("question/updateQuestions", async (data, {dispatch }) => {
  const response = await questionServices.updateQuestion(data);
  dispatch(getQuestions());
  return response;
});


// Delete Qeustion
export const deleteQuestion = createAsyncThunk( 'question/deleteQuestion', async ({ id }, {dispatch }) => {
      const response =  await questionServices.questionDelete({ id });
      dispatch(getQuestions());
      return response;
  },
);

// Active Question
export const activeQuestion = createAsyncThunk( 'question/activeQuestion', async (data, {dispatch }) => {
  console.log(data)
  const response =  await questionServices.questionActive(data);
  dispatch(getQuestions());
  return response;
 },
);


// Passive Question
export const passiveQuestion = createAsyncThunk( 'question/passiveQuestion', async (data, {dispatch }) => {
  console.log(data)
  const response =  await questionServices.questionPassive(data);
  dispatch(getQuestions());
  return response;
 },
);

// Initial State
const initialState = {
  questionType: [],
  questionList: [],
  likertTypes: [],
};

export const questionSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getQuestionsType.fulfilled, (state, action) => {
        state.questionType = action.payload.data.items
    });
    builder.addCase(getLikertType.fulfilled, (state, action) => {
      state.likertTypes = action.payload.data.items
  });

    builder.addCase(getQuestions.fulfilled, (state, action) => {
        state.questionList = action.payload.data.items
    });

    builder.addCase(addQuestions.fulfilled, (state, action) => {
        console.log("ss")
    });
    builder.addCase(updateQuestions.fulfilled, (state, action) => {
      console.log("aa")
  });


  },
});
