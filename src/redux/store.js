import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { contactsReducer } from "./contacts/contacts-slice";
import filterReducer from "./filter/filter-slice";

const contactsPersistConfig = {
    key: 'root',
    storage,
    blacklist: ['filter']
}
const reducer = combineReducers({
    contacts: contactsReducer,
    filter: filterReducer,
})

const persistedContactsReducer = persistReducer(contactsPersistConfig, reducer);

export const store = configureStore({
    reducer: persistedContactsReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
});

export const persistor = persistStore(store);
