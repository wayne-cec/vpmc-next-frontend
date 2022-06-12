import { createSlice } from '@reduxjs/toolkit'
import { IResult, IResultStatistics } from '../../api/prod/aprRegion'

interface IInitialState {
  county: string | null
  town: string | null
  displayData: {
    [key: string]: {
      [key: string]: IResult[] | IResultStatistics
    }
  } | null
}

const init = {
  county: null,
  town: null,
  displayData: null
} as IInitialState

interface IArpRegionAction {
  payload: string
  type: string
}

interface IArpRegionDisplayAction {
  payload: {
    [key: string]: {
      [key: string]: IResult[] | IResultStatistics
    }
  }
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
    },
    initAprRegionDisplayData: (state: IInitialState, action: IArpRegionDisplayAction) => {
      state.displayData = action.payload
    }
  }
})

export const selectAprRegion = (state: any) => {
  return state.aprRegion as IInitialState
}

export const {
  initAprRegionCounty,
  initAprRegionTown,
  initAprRegionDisplayData
} = aprRegionSlice.actions

export default aprRegionSlice.reducer
