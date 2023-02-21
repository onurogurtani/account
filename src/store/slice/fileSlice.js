import { createAsyncThunk } from '@reduxjs/toolkit';
import fileServices from '../../services/file.services';
import { saveAs } from 'file-saver';

export const downloadFile = createAsyncThunk('downloadFile', async (body, { rejectWithValue }) => {
  try {
    const response = await fileServices.downloadFile(body.id);
    saveAs(response, body.fileName);
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});

export const deleteFile = createAsyncThunk('deleteFile', async (body, { rejectWithValue }) => {
  try {
    const response = await fileServices.deleteFile({ id: body });
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});
export const getBase64 = createAsyncThunk('getBase64', async (data, { rejectWithValue }) => {
  try {
    const response = await fileServices.getBase64(data);
    return response;
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});
