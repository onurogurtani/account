import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authServices from '../../services/auth.services';
import { PURGE } from 'redux-persist';

export const login = createAsyncThunk('login', async (body, { rejectWithValue }) => {
  try {
    const response = await authServices.login(body);
    console.log('otp şifresi =', response?.data?.claims?.toString());
    return response;
  } catch (error) {
    // Use `err.response.data` as `action.payload` for a `rejected` action,
    // by explicitly returning it using the `rejectWithValue()` utility
    return rejectWithValue(error?.data);
  }
});

export const loginOtp = createAsyncThunk('loginOtp', async (body, { getState, rejectWithValue }) => {
  try {
    const mobileLoginId = await getState()?.auth.mobileLoginId;
    if (!mobileLoginId) {
      return rejectWithValue('Lütfen önce giriş yapınız.');
    }
    body.sessionType = 1;
    return await authServices.loginOtp({ ...body, mobileLoginId: parseFloat(mobileLoginId) });
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});

export const reSendOtpSms = createAsyncThunk('reSendOtpSms', async (body, { getState, rejectWithValue }) => {
  try {
    const mobileLoginId = await getState()?.auth.mobileLoginId;
    if (!mobileLoginId) {
      return rejectWithValue('Lütfen önce giriş yapınız.');
    }
    const response = await authServices.reSendOtpSms({
      mobileLoginId: parseFloat(mobileLoginId),
    });
    console.log('otp şifresi =', response?.data?.claims?.toString());
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});

export const forgotPasswordChange = createAsyncThunk('forgotPasswordChange', async (body, { rejectWithValue }) => {
  try {
    const response = await authServices.forgotPasswordChange(body);
    console.log('otp şifresi =', response?.data?.claims?.toString());
    return response;
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});

export const forgotPassword = createAsyncThunk('forgotPassword', async (body, { rejectWithValue }) => {
  try {
    return await authServices.forgotPassword(body);
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});

export const getPasswordRules = createAsyncThunk('getPasswordRules', async (body, { rejectWithValue }) => {
  try {
    return await authServices.getPasswordRules();
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});

export const changeUserPassword = createAsyncThunk('changeUserPassword', async (body, { rejectWithValue }) => {
  try {
    return await authServices.changeUserPassword(body);
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});

export const forgottenPasswordTokenCheck = createAsyncThunk(
  'forgottenPasswordTokenCheck',
  async (body, { rejectWithValue }) => {
    try {
      return await authServices.forgottenPasswordTokenCheck(body);
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const logout = createAsyncThunk('logout', async (body, { rejectWithValue }) => {
  try {
    await authServices.logout();
  } catch (error) {
    rejectWithValue(error?.data);
  }
});

export const getPasswordRuleAndPeriod = createAsyncThunk(
  'getPasswordRuleAndPeriod',
  async (body, { rejectWithValue }) => {
    try {
      return await authServices.getPasswordRuleAndPeriod();
    } catch (error) {
      rejectWithValue(error?.data);
    }
  },
);

export const setPasswordRuleAndPeriodValue = createAsyncThunk(
  'setPasswordRuleAndPeriodValue',
  async (body, { rejectWithValue }) => {
    try {
      return await authServices.setPasswordRuleAndPeriodValue(body);
    } catch (error) {
      rejectWithValue(error?.data);
    }
  },
);

export const behalfOfLogin = createAsyncThunk('behalfOfLogin', async (body, { getState, rejectWithValue }) => {
  try {
    body.sessionType = 1;
    return await authServices.behalfOfLogin(body);
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});

const initialState = {
  token: null,
  msisdn: null,
  mobileLoginId: null,
  authority: [],
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    removeToken: (state) => {
      state.token = null;
      state.msisdn = null;
      state.mobileLoginId = null;
      state.authority = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.msisdn = action?.payload?.data?.msisdn;
      state.mobileLoginId = action?.payload?.data?.token;
    });
    builder.addCase(loginOtp.fulfilled, (state, action) => {
      localStorage.setItem('persist:crossTabs', 'false');
      state.token = action?.payload?.data?.token;
      state.msisdn = null;
      state.mobileLoginId = null;
      state.authority = ['dashboard'];
    });
    builder.addCase(forgotPasswordChange.fulfilled, (state, action) => {
      state.msisdn = action?.payload?.data?.msisdn;
      state.mobileLoginId = action?.payload?.data?.token;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.token = null;
      state.msisdn = null;
      state.mobileLoginId = null;
      state.authority = [];
    });
    builder.addCase(PURGE, () => {
      localStorage.setItem('persist:crossTabs', 'true');
      return { ...initialState };
    });
  },
});

export const { removeToken } = authSlice.actions;
