import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import formServices from '../../services/forms.services';


// Get Forms
export const getForms = createAsyncThunk("forms/getForms",
  async (data) => {
    let urlString;
    console.log(data)
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
        let newStr = `FormDetailSearch.OrderBy=insertDESC`
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
      urlString="FormDetailSearch.OrderBy=insertDESC&FormDetailSearch.PageNumber=1&FormDetailSearch.PageSize=10"
    }
    const response = await formServices.getForms(urlString);
    console.log(response)
    return response;
  });


// Get Categories
export const getFormCategories = createAsyncThunk('form/getFormCategories', async (data, { dispatch }) => {
  const response = await formServices.getFormCategories(data);
  dispatch(getForms());
  return response;
},
);

// Get TargetGroup
export const getTargetGroup = createAsyncThunk('form/getTargetGroup', async (data, { dispatch }) => {
  const response = await formServices.getTargetGroup(data);
  dispatch(getForms());
  return response;
},
);

// Get SurveyConstraints
export const getSurveyConstraint = createAsyncThunk('form/getSurveyConstraint', async (data, { dispatch }) => {
  const response = await formServices.getSurveyConstraint(data);
  dispatch(getForms());
  return response;
},
);

// Add Form
// export const addForm = createAsyncThunk("forms/addForms", async (data, { dispatch }) => {
//   const response = await formServices.addForms(data);
//   dispatch(getForms());
//   return response;
// });

// // Update Question
// export const updateForm = createAsyncThunk("forms/updateForm", async (data, { dispatch }) => {
//   const response = await formServices.updateForm(data);
//   dispatch(getForms());
//   return response;
// });


// Delete Form
export const deleteForm = createAsyncThunk('form/deleteForm', async (data, { dispatch }) => {
  const response = await formServices.formDelete(data);
  dispatch(getForms());
  return response;
},
);

// Active Question
export const activeForm= createAsyncThunk('form/activeForm', async (data, { dispatch }) => {
  const response = await formServices.formActive(data);
  dispatch(getForms());
  return response;
},
);

// Passive Question
export const passiveForm = createAsyncThunk('form/passiveForm', async (data, { dispatch }) => {
  const response = await formServices.formPassive(data);
  dispatch(getForms());
  return response;
},
);

// Initial State
const initialState = {
  formList: [],
  formCategories: [],
  formTargetGroup: [],
  surveyConstraint: []
};

export const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getForms.fulfilled, (state, action) => {
      state.formList = action.payload.data
    });

    builder.addCase(getFormCategories.fulfilled, (state, action) => {
      state.formCategories = action.payload.data
    });

    builder.addCase(getTargetGroup.fulfilled, (state, action) => {
      state.formTargetGroup = action.payload.data
    });

    builder.addCase(getSurveyConstraint.fulfilled, (state, action) => {
      state.surveyConstraint = action.payload.data
    });


    // builder.addCase(addForm.fulfilled, (state, action) => {
    //   console.log("ss")
    // });
    // builder.addCase(updateForm.fulfilled, (state, action) => {
    //   console.log("aa")
    // });
  },
});
