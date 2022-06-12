import { createSlice } from '@reduxjs/toolkit'

interface IInitialState {
  county: string | null
  town: string | null
}

const init = {
  county: null,
  town: null
} as IInitialState

interface IArpRegionAction {
  payload: string
  type: string
}

export const aprRegionSlice = createSlice({
  name: 'aprRegion',
  initialState: init,
  reducers: {
    initAprRegionCounty: (state: IInitialState, action: IArpRegionAction) => {
      state.county = action.payload
    },
    initAprRegionTown: (state: IInitialState, action: IArpRegionAction) => {
      state.town = action.payload
    }
  }
})

export const selectAprRegion = (state: any) => {
  return state.aprRegion as IInitialState
}

export const {
  initAprRegionCounty,
  initAprRegionTown
} = aprRegionSlice.actions

export default aprRegionSlice.reducer
