import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore } from 'redux-persist'
import commiteeReducer from './slice/commitee'
import userReducer from './slice/user'
import sideBarReducer from './slice/sideBar'

const combinedReducer = combineReducers({
  commitee: commiteeReducer,
  user: userReducer,
  sideBar: sideBarReducer
})

const store = configureStore({
  reducer: combinedReducer
})

export const persistor = persistStore(store)

export default store
