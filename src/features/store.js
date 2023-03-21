
import {persistStore,persistReducer,} from 'redux-persist';
import {combineReducers,configureStore} from '@reduxjs/toolkit';
import dataReducer from '../modules/InventoryControl/src/features/dataSlice'
import userReducer from './userSlice'
import configReduce from './configSlice'
import storage from 'redux-persist/lib/storage';

const reducer = combineReducers({
    user: userReducer,
    config: configReduce,
    data: dataReducer,
    
})

const persistConfig = {
    key: 'root',
    storage: storage
}

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
    })
})
const persistor = persistStore(store);
export {persistor, store}
