import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import formServices from '../../services/forms.services';


// Get Forms
// export const getForms = createAsyncThunk("forms/getQuestions",
//   async (data) => {
//     let urlString;
//     if(data){
//       let urlArr = []
//       for (let item in data) {
//         if (!!data[item]) {
//           if(item === "QuestionTypeId" || item === "Status" ) {
//             data[item]?.map((element ,idx) => {
//               let newStr = `QuestionDetailSearch.${item}=${data[item][idx]}`
//               urlArr.push(newStr)
//             });
//           } else {
//             let newStr = `QuestionDetailSearch.${item}=${data[item]}`
//             urlArr.push(newStr)
//           }
//         }
//       }
//       if (!data.OrderBy) {
//         let newStr = `QuestionDetailSearch.OrderBy=insertDESC`
//         urlArr.push(newStr)
//       }
//         if (!data.PageNumber) {
//           let newStr = `QuestionDetailSearch.PageNumber=1`
//           urlArr.push(newStr)
//         }
//         if (!data.PageSize) {
//           let newStr = `QuestionDetailSearch.PageSize=10`
//           urlArr.push(newStr)
//         }
//       urlString = urlArr.join('&')
//     } else {
//       urlString="QuestionDetailSearch.OrderBy=insertDESC&QuestionDetailSearch.PageNumber=1&QuestionDetailSearch.PageSize=10"
//     }
//     const response = await formServices.getForms(urlString);
//     return response;
//   });


// Get Form Static
export const getFormsStatic = createAsyncThunk("forms/getFormsStatic", async (data, { dispatch }) => {
  const response = await formServices.getFormsStatic(data);
  return response;
});


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
export const deleteForm = createAsyncThunk('question/deleteForm', async (data, { dispatch }) => {
  const response = await formServices.formDelete(data);
  dispatch(getFormsStatic());
  return response;
},
);

// Active Question
export const activeForm= createAsyncThunk('question/activeForm', async (data, { dispatch }) => {
  const response = await formServices.formActive(data);
  dispatch(getFormsStatic());
  return response;
},
);

// Passive Question
export const passiveForm = createAsyncThunk('question/passiveForm', async (data, { dispatch }) => {
  const response = await formServices.formPassive(data);
  dispatch(getFormsStatic());
  return response;
},
);

// Initial State
const initialState = {
  formList: [],
};

export const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFormsStatic.fulfilled, (state, action) => {
      state.formList = action.payload.data
    });
    // builder.addCase(getForms.fulfilled, (state, action) => {
    //   state.formList = action.payload.data
    // });

    // builder.addCase(addForm.fulfilled, (state, action) => {
    //   console.log("ss")
    // });
    // builder.addCase(updateForm.fulfilled, (state, action) => {
    //   console.log("aa")
    // });
  },
});
