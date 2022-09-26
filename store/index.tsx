import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore } from 'redux-persist'
import commiteeReducer from './slice/commitee'
import userReducer from './slice/user'
import sideBarReducer from './slice/sideBar'
import { aprApi } from './services/apr'

const combinedReducer = combineReducers({
  commitee: commiteeReducer,
  user: userReducer,
  sideBar: sideBarReducer,
  [aprApi.reducerPath]: aprApi.reducer
})

const store = configureStore({
  reducer: combinedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(aprApi.middleware)
})

export const persistor = persistStore(store)

export default store
