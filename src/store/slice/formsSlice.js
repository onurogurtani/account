import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import formServices from '../../services/forms.services';

export const getFilteredPagedForms = createAsyncThunk('getFilteredPagedForms', async (data) => {
  let urlString;
  if (data) {
    let urlArr = [];
    for (let item in data) {
      if (data[item] != null && data[item] != '') {
        let newStr = `FormDetailSearch.${item}=${data[item]}`;
        urlArr.push(newStr);
      }
    }
    if (!data.OrderBy) {
      let newStr = `FormDetailSearch.OrderBy=IdDESC`;
      urlArr.push(newStr);
    }
    if (!data.PageNumber) {
      let newStr = `FormDetailSearch.PageNumber=1`;
      urlArr.push(newStr);
    }
    if (!data.PageSize) {
      let newStr = `FormDetailSearch.PageSize=10`;
      urlArr.push(newStr);
    }
    urlString = urlArr.join('&');
  } else {
    urlString = 'FormDetailSearch.OrderBy=IdDESC&FormDetailSearch.PageNumber=1&FormDetailSearch.PageSize=10';
  }
  const response = await formServices.getByFilterPagedForms(urlString);
  return response;
});
export const getFormCategories = createAsyncThunk('getFormCategories', async (data, { dispatch, rejectWithValue }) => {
  try {
    const response = await formServices.getFormCategories();
    return response;
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});
export const getFormPackages = createAsyncThunk('getFormPackages', async (data, { dispatch, rejectWithValue }) => {
  try {
    const response = await formServices.getFormPackages();
    return response;
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});
export const copyForm = createAsyncThunk('copyForm', async (data, { dispatch, rejectWithValue }) => {
  try {
    const response = await formServices.copyForm(data);
    return response;
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});
export const addNewForm = createAsyncThunk('addNewForm', async (data, { dispatch, rejectWithValue }) => {
  try {
    const response = await formServices.addNewForm(data);
    return response;
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});
export const updateForm = createAsyncThunk('updateForm', async (data, { dispatch, rejectWithValue }) => {
  try {
    const response = await formServices.updateForm(data);
    return response;
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});
export const setScore = createAsyncThunk('setScore', async (data, { dispatch, rejectWithValue }) => {
  try {
    const response = await formServices.setScore(data);
    return response;
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});
export const addNewGroupToForm = createAsyncThunk('addNewGroupToForm', async (data, { dispatch, rejectWithValue }) => {
  try {
    const response = await formServices.addNewGroupToForm(data);
    return response;
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});
export const updateGroupOfForm = createAsyncThunk('updateGroupOfForm', async (data, { dispatch, rejectWithValue }) => {
  try {
    const response = await formServices.updateGroupOfForm(data);
    return response;
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});
export const updateQuestionsOrder = createAsyncThunk(
  'updateQuestionsOrder',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await formServices.updateQuestionsOrder(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const deleteGroupOfForm = createAsyncThunk('deleteGroupOfForm', async (data, { dispatch, rejectWithValue }) => {
  try {
    const response = await formServices.deleteGroupOfForm(data);
    return response;
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});
export const getGroupsOfForm = createAsyncThunk('getGroupsOfForm', async (data, { dispatch, rejectWithValue }) => {
  try {
    const response = await formServices.getGroupsOfForm(data);
    return response;
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});
export const addNewQuestionToForm = createAsyncThunk(
  'addNewQuestionToForm',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await formServices.addNewQuestionToForm(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);
export const addNewQuestionToGroup = createAsyncThunk(
  'addNewQuestionToGroup',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await formServices.addNewQuestionToGroup(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);
export const updateQuestion = createAsyncThunk('updateQuestion', async (data, { dispatch, rejectWithValue }) => {
  try {
    const response = await formServices.updateQuestion(data);
    return response;
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});
export const getAllQuestionsOfForm = createAsyncThunk(
  'getAllQuestionsOfForm',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await formServices.getAllQuestionsOfForm(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

export const deleteQuestion = createAsyncThunk('deleteQuestion', async (data, { dispatch, rejectWithValue }) => {
  try {
    const response = await formServices.deleteQuestion(data);
    return response;
  } catch (error) {
    return rejectWithValue(error?.data);
  }
});
export const deleteQuestionFromGroup = createAsyncThunk(
  'deleteQuestionFromGroup',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await formServices.deleteQuestionFromGroup(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

// Get TargetGroup
export const getTargetGroup = createAsyncThunk('form/getTargetGroup', async (data, { dispatch }) => {
  const response = await formServices.addNewForm(data);
  dispatch(getFilteredPagedForms());
  return response;
});

// Get SurveyConstraints
export const getSurveyConstraint = createAsyncThunk('form/getSurveyConstraint', async (data, { dispatch }) => {
  const response = await formServices.getSurveyConstraint(data);
  dispatch(getFilteredPagedForms());
  return response;
});

export const deleteForm = createAsyncThunk('form/deleteForm', async (data, { dispatch }) => {
  const response = await formServices.formDelete(data);
  dispatch(getFilteredPagedForms());
  return response;
});

// Active Question
export const activeForm = createAsyncThunk('form/activeForm', async (data, { dispatch }) => {
  const response = await formServices.formActive(data);
  dispatch(getFilteredPagedForms());
  return response;
});

// Passive Question
export const passiveForm = createAsyncThunk('form/passiveForm', async (data, { dispatch }) => {
  const response = await formServices.formPassive(data);
  dispatch(getFilteredPagedForms());
  return response;
});
const initialState = {
  formList: [],
  tableProperty: {
    currentPage: 1,
    page: 1,
    pageSize: 10,
    totalCount: 0,
  },
  filterObject: {
    Name: '',
    UpdateUserName: '',
    InsertUserName: '',
    SurveyCompletionStatusId: [],
    SurveyConstraintId: [],
    TargetGroupId: [],
    CategoryId: [],
    PublishStatus: null,
    UpdateStartDate: '',
    UpdateEndDate: '',
    InsertEndDate: '',
    InsertStartDate: '',
    OrderBy: '',
    PageNumber: '1',
    PageSize: '',
  },
  formCategories: [],
  formPackages: [],
  formTargetGroup: [],
  surveyConstraint: [],
  currentForm: [],
  allGroups: [],
  questionsOfForm: null,
  showFormObj: {},
};

export const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    setFormFilterObject: (state, action) => {
      state.filterObject = action.payload;
    },
    setTableProperty: (state, action) => {
      state.tableProperty = action.payload;
    },
    setShowFormObj: (state, action) => {
      state.showFormObj = action.payload;
    },
    setCurrentForm: (state, action) => {
      state.currentForm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFilteredPagedForms.fulfilled, (state, action) => {
      state.formList = action?.payload?.data?.items || [];
      state.tableProperty = action?.payload?.data?.pagedProperty || {};
    });
    builder.addCase(getFilteredPagedForms.rejected, (state, action) => {
      state.formList = [];
      state.tableProperty = {
        currentPage: 1,
        page: 1,
        pageSize: 0,
        totalCount: 0,
      };
    });
    builder.addCase(getAllQuestionsOfForm.fulfilled, (state, action) => {
      state.questionsOfForm = action?.payload?.data;
    });
    builder.addCase(getAllQuestionsOfForm.rejected, (state, action) => {
      state.questionsOfForm = null;
    });
    builder.addCase(addNewForm.fulfilled, (state, action) => {
      state.currentForm = action?.payload?.data;
      // state.showFormObj=action?.payload?.data;
    });
    builder.addCase(copyForm.fulfilled, (state, action) => {
      state.showFormObj = action?.payload?.data;
    });

    builder.addCase(getFormCategories.fulfilled, (state, action) => {
      state.formCategories = action?.payload?.data?.items;
    });
    builder.addCase(getFormCategories.rejected, (state, action) => {
      state.formCategories = [];
    });
    builder.addCase(getFormPackages.fulfilled, (state, action) => {
      state.formPackages = action?.payload?.data?.items;
    });
    builder.addCase(getTargetGroup.fulfilled, (state, action) => {
      state.formTargetGroup = action?.payload?.data;
    });

    builder.addCase(getSurveyConstraint.fulfilled, (state, action) => {
      state.surveyConstraint = action?.payload?.data;
    });
    builder.addCase(getGroupsOfForm.fulfilled, (state, action) => {
      state.allGroups = action?.payload?.data?.items;
    });
    builder.addCase(getGroupsOfForm.rejected, (state, action) => {
      state.groupsOfForm = [];
    });
    builder.addCase(updateQuestionsOrder.fulfilled, (state, action) => {});
  },
});

export const { setCurrentForm, setFormFilterObject, setTableProperty, setShowFormObj } = formsSlice.actions;
