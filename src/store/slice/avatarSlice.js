import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import avatarFilesServices from "../../services/avatarFiles.services";

export const getAllImages = createAsyncThunk(
    'getAllImages',
    async (body, { rejectWithValue }) => {
        try {
            return await avatarFilesServices.getAllImages();
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    }
);

export const getImage = createAsyncThunk(
    'getImage',
    async ({ id }, { rejectWithValue }) => {
        try {
            return await avatarFilesServices.getImage({ id });
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    }
);

export const deleteImage = createAsyncThunk(
    'deleteImage',
    async (data, {dispatch, rejectWithValue }) => {
        try {
            const response = await avatarFilesServices.deleteImage(data);
            dispatch(getAllImages());
            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    }
);

export const addImage = createAsyncThunk(
    'addImage',
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const response = await avatarFilesServices.addImage(data);
            dispatch(getAllImages());
            return response;
        } catch (error) {
            return rejectWithValue(error?.data);
        }
    }
);

const initialState = {
    images: [],
    draftedTableProperty: {
        currentPage: 1,
        page: 1,
        pageSize: 10,
        totalCount: 0,
    },
}

export const avatarFilesSlice = createSlice({
    name: 'avatarFiles',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getAllImages.fulfilled, (state, action) => {
            state.images = action?.payload?.data?.items
            state.draftedTableProperty = {
                currentPage: 1,
                page: 1,
                pageSize: 10,
                totalCount: action?.payload?.data?.items?.length,
            };
        });
        builder.addCase(getAllImages.rejected, (state, action) => {
            state.images = [];
            state.draftedTableProperty = {
                currentPage: 1,
                page: 1,
                pageSize: 10,
                totalCount: 0,
            };
        });
    }
}
);


