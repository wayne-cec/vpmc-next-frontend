import { createSlice } from '@reduxjs/toolkit'
import { ICountyData, IResult, IResultStatistics, ITownData } from '../../api/prod/aprRegion'

interface IInitialState {
  county: string | null
  town: string | null
  displayData: {
    [key: string]: {
      [key: string]: IResult[] | IResultStatistics
    }
  } | null
  countyData: ICountyData | null
  townData: ITownData | null
}

const init = {
  county: null,
  town: null,
  displayData: null,
  countyData: null,
  townData: null
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

interface IInitCountyDataAction {
  type: string
  payload: ICountyData
}

interface IInitTownDataAction {
  type: string
  payload: ITownData
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
    },
    initCountyData: (state: IInitialState, action: IInitCountyDataAction) => {
      state.countyData = action.payload
      state.county = action.payload['北部'][0].name
    },
    initTownData: (state: IInitialState, action: IInitTownDataAction) => {
      state.townData = action.payload
      state.town = action.payload['鄉鎮市區'][0].name
    }
  }
})

export const selectAprRegion = (state: any) => {
  return state.aprRegion as IInitialState
}

export const {
  initAprRegionCounty,
  initAprRegionTown,
  initAprRegionDisplayData,
  initCountyData,
  initTownData
} = aprRegionSlice.actions

export default aprRegionSlice.reducer
