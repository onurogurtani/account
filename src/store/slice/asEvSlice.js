import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import asEvServices from '../../services/asEv.service';
import { getByFilterPagedParamsHelper } from '../../utils/utils';

export const adAsEv = createAsyncThunk('adAsEv', async (data, { dispatch, rejectWithValue }) => {
    try {
        const response = await asEvServices.adAsEv(data);
        return response;
    } catch (error) {
        return rejectWithValue(error?.data);
    }
});

export const adAsEvQuestion = createAsyncThunk('adAsEvQuestion', async (data, { dispatch, rejectWithValue }) => {
    try {
        const response = await asEvServices.addAsEvQuestion(data);
        return response;
    } catch (error) {
        return rejectWithValue(error?.data);
    }
});

export const getAsEvTestPreview = createAsyncThunk(
    'getAsEvTestPreview ',
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const response = await asEvServices.getAsEvTestPreview(data);
            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);

export const  setQuestionSequence= createAsyncThunk(
    'setQuestionSequence',
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const response = await asEvServices.setQuestionSequence(data);
            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);
export const removeAsEvQuestion = createAsyncThunk(
    'removeAsEvQuestion',
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const response = await asEvServices.removeAsEvQuestion(data);
            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);
export const getFilterPagedAsEvs = createAsyncThunk(
    'getFilterPagedAsEvs',
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const params = getByFilterPagedParamsHelper(data, 'AsEvsDetailSearch.');
            const response = await asEvServices.getFilterPagedAsEvs(params);
            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);
export const deleteAsEv = createAsyncThunk('getFilterPagedAsEvs', async (data, { dispatch, rejectWithValue }) => {
    try {
        const response = await asEvServices.deleteAsEv(data);
        return response;
    } catch (error) {
        return rejectWithValue(error?.data);
    }
});
export const getAsEvQuestionOfExamsByAsEvId = createAsyncThunk(
    'getAsEvQuestionOfExamsByAsEvId',
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const response = await asEvServices.getAsEvQuestionOfExamsByAsEvId(data);
            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);

export const getByFilterPagedAsEvQuestions = createAsyncThunk(
    'getByFilterPagedAsEvQuestions',
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const response = await asEvServices.getByFilterPagedAsEvQuestions(data);
            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    },
);

const initialState = {
    questions: [],
    newAsEv: {},
    asEvList: [],
    pagedProperty: {},
    asEvQuestions: [],
    filteredPagedQuestions: [],
    asEvTestPreview: [],
};

export const asEvSlice = createSlice({
    name: 'asEvs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getByFilterPagedAsEvQuestions.fulfilled, (state, action) => {
            state.questions = action?.payload?.data;
        });
        builder.addCase(getByFilterPagedAsEvQuestions.rejected, (state, action) => {
            state.questions = [];
        });

        builder.addCase(getAsEvTestPreview.fulfilled, (state, action) => {
            state.asEvTestPreview = action?.payload?.data;
        });
        builder.addCase(getAsEvTestPreview.rejected, (state, action) => {
            state.asEvTestPreview = [];
        });

        builder.addCase(adAsEv.fulfilled, (state, action) => {
            state.newAsEv = action?.payload?.data || {};
            state.asEvQuestions = action?.payload?.data?.asEvQuestionOfExams || [];
        });
        builder.addCase(adAsEv.rejected, (state, action) => {
            state.newAsEv = [];
        });
        builder.addCase(getFilterPagedAsEvs.fulfilled, (state, action) => {
            state.asEvList = action?.payload?.data?.items;
            state.pagedProperty = action?.payload?.data?.pagedProperty;
        });
        builder.addCase(getFilterPagedAsEvs, (state, action) => {
            state.asEvList = [];
            state.pagedProperty = {};
        });
        builder.addCase(getAsEvQuestionOfExamsByAsEvId.fulfilled, (state, action) => {
            state.filteredPagedQuestions = action?.payload?.data?.items || [];
        });
        builder.addCase(getAsEvQuestionOfExamsByAsEvId.rejected, (state, action) => {
            state.filteredPagedQuestions = [];
        });
    },
});
