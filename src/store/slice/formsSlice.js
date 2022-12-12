import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import formServices from '../../services/forms.services';


// Get Forms
export const getFilteredPagedForms = createAsyncThunk("forms/getFilteredPagedForms",
  async (data) => {
    let urlString;
    if(data){
      let urlArr = []
      for (let item in data) {
        if (!!data[item]) {
          if(
            item === "SurveyConstraintId" ||
            item === "TargetGroupId" || 
            item === "CategoryId" ||
            item === "SurveyCompletionStatusId" ||
            item === "Status" ) {
            data[item]?.map((element ,idx) => {
              let newStr = `FormDetailSearch.${item}=${data[item][idx]}`
              urlArr.push(newStr)
            });
          } else {
            let newStr = `FormDetailSearch.${item}=${data[item]}`
            urlArr.push(newStr)
          }
        }
      }
      if (!data.OrderBy) {
        let newStr = `FormDetailSearch.OrderBy=IdASC`
        urlArr.push(newStr)
      }
        if (!data.PageNumber) {
          let newStr = `FormDetailSearch.PageNumber=1`
          urlArr.push(newStr)
        }
        if (!data.PageSize) {
          let newStr = `FormDetailSearch.PageSize=10`
          urlArr.push(newStr)
        }
      urlString = urlArr.join('&')
    } else {
      urlString="FormDetailSearch.OrderBy=IdDESC&FormDetailSearch.PageNumber=1&FormDetailSearch.PageSize=10"
    }
    const response = await formServices.getByFilterPagedForms(urlString);
    return response;
  });


// Get Categories

export const getFormCategories = createAsyncThunk(
  'getFormCategories',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await formServices.getFormCategories();
      return response;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  },
);

// Get TargetGroup
export const getTargetGroup = createAsyncThunk('form/getTargetGroup', async (data, { dispatch }) => {
  const response = await formServices.getTargetGroup(data);
  dispatch(getFilteredPagedForms ());
  return response;
},
);

// Get SurveyConstraints
export const getSurveyConstraint = createAsyncThunk('form/getSurveyConstraint', async (data, { dispatch }) => {
  const response = await formServices.getSurveyConstraint(data);
  dispatch(getFilteredPagedForms ());
  return response;
},
);


// Delete Form
export const deleteForm = createAsyncThunk('form/deleteForm', async (data, { dispatch }) => {
  const response = await formServices.formDelete(data);
  dispatch(getFilteredPagedForms ());
  return response;
},
);

// Active Question
export const activeForm= createAsyncThunk('form/activeForm', async (data, { dispatch }) => {
  const response = await formServices.formActive(data);
  dispatch(getFilteredPagedForms ());
  return response;
},
);

// Passive Question
export const passiveForm = createAsyncThunk('form/passiveForm', async (data, { dispatch }) => {
  const response = await formServices.formPassive(data);
  dispatch(getFilteredPagedForms ());
  return response;
},
);
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
    Status: [],
    UpdateStartDate: '',
    UpdateEndDate: '',
    InsertEndDate: '',
    InsertStartDate: '',
    OrderBy: '',
    PageNumber: '1',
    PageSize: '',
  },
  formCategories: [],
  formTargetGroup: [],
  surveyConstraint: [],
  
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

    builder.addCase(getFormCategories.fulfilled, (state, action) => {
      state.formCategories = action.payload.data.items;
    });

    builder.addCase(getTargetGroup.fulfilled, (state, action) => {
      state.formTargetGroup = action.payload.data
    });

    builder.addCase(getSurveyConstraint.fulfilled, (state, action) => {
      state.surveyConstraint = action.payload.data
    });
  },
});

export const {setFormFilterObject,setTableProperty } = formsSlice.actions;
