import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import trialExamServices from '../../services/trialExam.services';

export const getTrialExamList = createAsyncThunk(
    'getTrialExamList',
    async ({ params, data } = {}, { dispatch, rejectWithValue }) => {
        try {
            const response = await trialExamServices.getTrialExamList(data);
            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);
export const getTrialExamById = createAsyncThunk(
    'getTrialExamById',
    async ({ params, data } = {}, { dispatch, rejectWithValue }) => {
        try {
            const response = await trialExamServices.getTrialExamById(params);
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
export const getTrialExamUpdate = createAsyncThunk(
    'getTrialExamUpdate',
    async ({ params, data } = {}, { dispatch, rejectWithValue }) => {
        try {
            const response = await trialExamServices.trialExamsUpdate(data);
            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);

export const getSectionDescriptions = createAsyncThunk(
    'getTrialExamUpdate',
    async ({ params, data } = {}, { dispatch, rejectWithValue }) => {
        try {
            const response = await trialExamServices.sectionDescriptions(params);
            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);
export const getFileUpload = createAsyncThunk('getFileUpload', async (data = {}, { dispatch, rejectWithValue }) => {
    try {
        const response = await trialExamServices.fileUpload(data.data, data.options);
        return response;
    } catch (error) {
        return rejectWithValue(error?.data);
    }
});
const initialState = {
    trialExamList: [],
    trialExamFormData: { sections: [] },
    sectionDescriptions: {},
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
        canceledQuesiton: (state, action) => {
            state.trialExamFormData.sections[action.payload.index].sectionQuestionOfExams[
                action.payload.quesitonIndex
            ].isCanceled = action.payload.isCanceled;
        },
        changeQuesiton: (state, action) => {
            state.trialExamFormData.sections[action.payload.index].sectionQuestionOfExams[
                action.payload.quesitonIndex
            ].questionOfExamId = action.payload.id;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(getTrialExamList.fulfilled, (state, action) => {
            state.trialExamList = action?.payload?.data;
        });

        builder.addCase(getSectionDescriptions.fulfilled, (state, action) => {
            state.sectionDescriptions = action?.payload?.data;
        });
        builder.addCase(getSectionDescriptions.rejected, (state, action) => {
            state.sectionDescriptions = {};
        });
    },
});

export const { setTrialExamFormData, deleteAddQuesiton, canceledQuesiton, changeQuesiton } = trialExamSlice.actions;
