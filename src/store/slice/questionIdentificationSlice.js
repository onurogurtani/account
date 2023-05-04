import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import questionIdentificationServices from '../../services/questionIdentification.services';

export const getByFilterPagedQuestionOfExamsList = createAsyncThunk(
    'getByFilterPagedQuestionOfExamsList',
    async (data = {}, { dispatch, rejectWithValue }) => {
        try {
            const response = await questionIdentificationServices.getByFilterPagedQuestionOfExams(data);
            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);
export const getFileUpload = createAsyncThunk('getFileUpload', async (data = {}, { dispatch, rejectWithValue }) => {
    try {
        const response = await questionIdentificationServices.fileUpload(data.data, data.options);
        return response;
    } catch (error) {
        return rejectWithValue(error?.data);
    }
});
export const getAddQuestion = createAsyncThunk('getAddQuestion', async (data = {}, { dispatch, rejectWithValue }) => {
    try {
        const response = await questionIdentificationServices.getAddQuestionOfExams(data.data);
        return response;
    } catch (error) {
        return rejectWithValue(error?.data);
    }
});
export const getUpdateQuestion = createAsyncThunk(
    'getUpdateQuestion',
    async (data = {}, { dispatch, rejectWithValue }) => {
        try {
            const response = await questionIdentificationServices.getUpdateQuestionOfExams(data.data);
            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);

const initialState = {
    questionOfExams: {},
    questionOfExamsList: [],
    pagedProperty: {},
};

export const questionIdentificationSlice = createSlice({
    name: 'questionIdentificationSlice',
    initialState,
    reducers: {
        resetQuestionOfExamsList: (state, aciton) => {
            state.questionOfExamsList = [];
            state.pagedProperty = {};
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getByFilterPagedQuestionOfExamsList.fulfilled, (state, action) => {
            state.questionOfExams = action?.payload?.data.items[0] ? action?.payload?.data.items[0] : {};
            state.questionOfExamsList = action?.payload?.data.items[0] ? action?.payload?.data.items : [];
            state.pagedProperty = action?.payload?.data.pagedProperty;
        });
    },
});
export const { resetQuestionOfExamsList } = questionIdentificationSlice.actions;
