import { configureStore } from '@reduxjs/toolkit'
import commiteeReducer from './slice/commitee'

export default configureStore({
  reducer: {
    commitee: commiteeReducer
  }
})