import { configureStore } from '@reduxjs/toolkit'
import commiteeReducer from './slice/commitee'
import aprRegionReducer from './slice/aprRegion'

export default configureStore({
  reducer: {
    commitee: commiteeReducer,
    aprRegion: aprRegionReducer
  }
})