import { configureStore, combineReducers } from '@reduxjs/toolkit'
import commiteeReducer from './slice/commitee'
import userReducer from './slice/user'
import { persistStore } from 'redux-persist'

const combinedReducer = combineReducers({
  commitee: commiteeReducer,
  user: userReducer
})

const store = configureStore({
  reducer: combinedReducer
})

export const persistor = persistStore(store)

export default store
