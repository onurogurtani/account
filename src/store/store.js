import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import { encryptTransform } from 'redux-persist-transform-encrypt';

import { authSlice } from './slice/authSlice';
import { userSlice } from './slice/userSlice';
import { menuSlice } from './slice/menuSlice';
import { operationClaimsSlice } from './slice/operationClaimsSlice';
import { groupsSlice } from './slice/groupsSlice';
import { userListSlice } from './slice/userListSlice';
import { avatarFilesSlice } from './slice/avatarSlice';
import { schoolSlice } from './slice/schoolSlice';
import { questionSlice } from './slice/questionSlice';
import { formsSlice } from './slice/formsSlice';
import { announcementSlice } from './slice/announcementSlice';
import { citysCountysSlice } from './slice/citysCountysSlice';
import { videoSlice } from './slice/videoSlice';
import { lessonsSlice } from './slice/lessonsSlice';
import { packageSlice } from './slice/packageSlice';
import { categorySlice } from './slice/categorySlice';
import { subCategorySlice } from './slice/subCategorySlice ';
import { eventTypeSlice } from './slice/eventTypeSlice';
import { eventsSlice } from './slice/eventsSlice';
import { classStageSlice } from './slice/classStageSlice';
import { announcementTypeSlice } from './slice/announcementTypeSlice';
import { educationYearsSlice } from './slice/educationYearsSlice';
import { graduationYearsSlice } from './slice/graduationYearsSlice';
import { adminUserSlice } from './slice/adminUserSlice';
import { targetSentenceSlice } from './slice/targetSentenceSlice';
import { preferencePeriodSlice } from './slice/preferencePeriodSlice';


import { targetScreenSlice } from './slice/targetScreenSlice';
import { packageTypeSlice } from './slice/packageTypeSlice';
import { userTypeSlice } from './slice/userTypeSlice';
import { branchsSlice } from './slice/branchsSlice';
import { questionManagementSlice } from './slice/questionFileSlice';
import { lessonUnitsSlice } from './slice/lessonUnitsSlice';
import { lessonSubjectsSlice } from './slice/lessonSubjectsSlice';
import { lessonSubSubjectsSlice } from './slice/lessonSubSubjectsSlice';

const reducers = combineReducers({
  auth: authSlice.reducer,
  user: userSlice.reducer,
  menu: menuSlice.reducer,
  operationClaims: operationClaimsSlice.reducer,
  groups: groupsSlice.reducer,
  userList: userListSlice.reducer,
  avatarFiles: avatarFilesSlice.reducer,
  school: schoolSlice.reducer,
  questions: questionSlice.reducer,
  forms: formsSlice.reducer,
  announcement: announcementSlice.reducer,
  citysCountys: citysCountysSlice.reducer,
  videos: videoSlice.reducer,
  lessons: lessonsSlice.reducer,
  lessonUnits: lessonUnitsSlice.reducer,
  lessonSubjects: lessonSubjectsSlice.reducer,
  lessonSubSubjects: lessonSubSubjectsSlice.reducer,
  packages: packageSlice.reducer,
  category: categorySlice.reducer,
  subCategory: subCategorySlice.reducer,
  eventType: eventTypeSlice.reducer,
  events: eventsSlice.reducer,
  classStages: classStageSlice.reducer,
  announcementTypes: announcementTypeSlice.reducer,
  targetScreen: targetScreenSlice.reducer,
  educationYears: educationYearsSlice.reducer,
  graduationYears: graduationYearsSlice.reducer,
  adminUsers: adminUserSlice.reducer,
  targetSentence: targetSentenceSlice.reducer,
  preferencePeriod: preferencePeriodSlice.reducer,
  packageType: packageTypeSlice.reducer,
  userType: userTypeSlice.reducer,
  branchs:branchsSlice.reducer,
  questionManagement : questionManagementSlice.reducer
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'user', 'menu'], // only persist these keys,
  transforms: [
    encryptTransform({
      secretKey: 'dd-secret-key-for-redux-persist',
      onError: function (error) {
        throw new Error(error?.message);
      },
    }),
  ],
};

const rootReducer = (state, action) => {
  if (action.type === FLUSH) {
    storage.removeItem('persist:root');
    return reducers(undefined, action);
  }

  return reducers(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
  },
});

const persist = persistStore(store);

export { store, persist };
