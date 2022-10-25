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
