import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import { encryptTransform } from 'redux-persist-transform-encrypt';

import { authSlice } from './slice/authSlice';
import { userSlice } from './slice/userSlice';
import { menuSlice } from './slice/menuSlice';
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

import { publisherSlice } from './slice/publisherSlice';
import { publisherBookSlice } from './slice/publisherBookSlice';

import { questionManagementSlice } from './slice/questionFileSlice';
import { lessonUnitsSlice } from './slice/lessonUnitsSlice';
import { lessonSubjectsSlice } from './slice/lessonSubjectsSlice';
import { lessonSubSubjectsSlice } from './slice/lessonSubSubjectsSlice';
import { questionIdentificationSlice } from './slice/questionIdentificationSlice';
import { earningChoiceSlice } from './slice/earningChoiceSlice';
import { participantGroupsSlice } from './slice/participantGroupsSlice';
import { workPlanSlice } from './slice/workPlanSlice';
import { trialTypeSlice } from './slice/trialTypeSlice';
import { documentsSlice } from './slice/documentsSlice';
import { booksSlice } from './slice/booksSlice';
import { organisationTypesSlice } from './slice/organisationTypesSlice';
import { organisationsSlice } from './slice/organisationsSlice';
import { contractTypeSlice } from './slice/contractTypeSlice';
import { trialExamSlice } from './slice/trialExamSlice';
import { contractKindsSlice } from './slice/contractKindsSlice';
import { difficultyLevelQuestionOfExamSlice } from './slice/difficultyLevelQuestionOfExamSlice';
import { maxNetNumberSlice } from './slice/maxNetNumberSlice';
import { contractsSlice } from './slice/contractsSlice';
import { asEvSlice } from './slice/asEvSlice';
import { roleAuthorizationSlice } from './slice/roleAuthorizationSlice';
import { videoReportsNotConnectedSlice } from './slice/videoReportsNotConnectedSlice';
import { jobSettingsSlice } from './slice/jobSettingsSlice';
import { videoReportsConnectedSlice } from './slice/videoReportsConnectedSlice';
import { teachersSlice } from './slice/teachersSlice';

const reducers = combineReducers({
    auth: authSlice.reducer,
    user: userSlice.reducer,
    menu: menuSlice.reducer,
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
    branchs: branchsSlice.reducer,
    publisher: publisherSlice.reducer,
    publisherBook: publisherBookSlice.reducer,
    questionManagement: questionManagementSlice.reducer,
    workPlan: workPlanSlice.reducer,
    questionIdentification: questionIdentificationSlice.reducer,
    earningChoice: earningChoiceSlice.reducer,
    participantGroups: participantGroupsSlice.reducer,
    trialType: trialTypeSlice.reducer,
    documents: documentsSlice.reducer,
    books: booksSlice.reducer,
    organisationTypes: organisationTypesSlice.reducer,
    organisations: organisationsSlice.reducer,
    contractTypes: contractTypeSlice.reducer,
    tiralExam: trialExamSlice.reducer,
    contractKinds: contractKindsSlice.reducer,
    difficultyLevelQuestionOfExams: difficultyLevelQuestionOfExamSlice.reducer,
    maxNetNumber: maxNetNumberSlice.reducer,
    contracts: contractsSlice.reducer,
    asEv: asEvSlice.reducer,
    roleAuthorization: roleAuthorizationSlice.reducer,
    videoReportsNotConnected: videoReportsNotConnectedSlice.reducer,
    jobSettings: jobSettingsSlice.reducer,
    videoReportsConnected: videoReportsConnectedSlice.reducer,
    teachers: teachersSlice.reducer,
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'user', 'menu', 'forms'], // only persist these keys,
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
