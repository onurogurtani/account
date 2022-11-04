import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import { encryptTransform } from 'redux-persist-transform-encrypt';

import { authSlice } from './slice/authSlice';
import { userSlice } from './slice/userSlice';
import { menuSlice } from './slice/menuSlice';
import { lookupSlice } from './slice/lookupSlice';
import { cardOrderSlice } from './slice/cardOrderSlice';
import { addressSlice } from './slice/addressSlice';
import { cardOrderDetailsSlice } from './slice/cardOrderDetailtsSlice';
import { mobilExpressSlice } from './slice/mobilExpressSlice';
import { balanceUploadSlice } from './slice/balanceUploadSlice';
import { customerSlice } from './slice/customerSlice';
import { draftOrderSlice } from './slice/draftOrderSlice';
import { balanceUploadDetailSlice } from './slice/balanceUploadDetailSlice';
import { orderSlice } from './slice/orderSlice';
import { manageMyCardsSlice } from './slice/manageMyCardsSlice';
import { balanceTransferSlice } from './slice/balanceTransferSlice';
import { autoUploadInstructionsSlice } from './slice/autoUploadInstructionsSlice';
import { appSettingsSlice } from './slice/appSettingsSlice';
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

const reducers = combineReducers({
  auth: authSlice.reducer,
  user: userSlice.reducer,
  customer: customerSlice.reducer,
  menu: menuSlice.reducer,
  lookup: lookupSlice.reducer,
  address: addressSlice.reducer,
  cardOrder: cardOrderSlice.reducer,
  cardOrderDetails: cardOrderDetailsSlice.reducer,
  mobilExpress: mobilExpressSlice.reducer,
  balanceUpload: balanceUploadSlice.reducer,
  balanceUploadDetail: balanceUploadDetailSlice.reducer,
  draftOrder: draftOrderSlice.reducer,
  order: orderSlice.reducer,
  manageMyCards: manageMyCardsSlice.reducer,
  balanceTransfer: balanceTransferSlice.reducer,
  autoUploadInstructions: autoUploadInstructionsSlice.reducer,
  appSettings: appSettingsSlice.reducer,
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
  packages: packageSlice.reducer,
  category: categorySlice.reducer,
  subCategory:subCategorySlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'user', 'menu', 'customer'], // only persist these keys,
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
