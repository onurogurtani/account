import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import trialExamServices from '../../services/trialExam.services';

export const getTrialExamList = createAsyncThunk(
    'getTrialExamList',
    async ({ params, data } = {}, { dispatch, rejectWithValue }) => {
        try {
            const response = await trialExamServices.getCurrentUser(params);
            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);
export const getTrialExamAdd = createAsyncThunk(
    'getTrialExamAdd',
    async ({ params, data } = {}, { dispatch, rejectWithValue }) => {
        try {
            const response = await trialExamServices.trialExamsAdd(data);
            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);

const initialState = {
    trialExamList: [],
    trialExamFormData: { sections: [] },
};

export const trialExamSlice = createSlice({
    name: 'trialExam',
    initialState,
    reducers: {
        setTrialExamFormData: (state, action) => {
            state.trialExamFormData = action?.payload;
        },
        deleteAddQuesiton: (state, action) => {
            state.trialExamFormData.sections[action.payload.index].sectionQuestionOfExams.splice(
                action.payload.quesitonIndex,
                1,
            );
        },
    },

    extraReducers: (builder) => {
        builder.addCase(getTrialExamList.fulfilled, (state, action) => {
            state.trialExamList = action?.payload?.data;
        });
    },
});

export const { setTrialExamFormData, deleteAddQuesiton } = trialExamSlice.actions;
