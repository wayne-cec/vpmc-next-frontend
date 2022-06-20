import { createSlice } from '@reduxjs/toolkit'
import { ICountyData, IResult, IResultStatistics, ITownData } from '../../api/prod/aprRegion'
import { persistConfig } from '../config'
import { persistReducer } from 'redux-persist'

interface IAprRegionState {
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
} as IAprRegionState

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
    initAprRegionCounty: (state: IAprRegionState, action: IArpRegionAction) => {
      state.county = action.payload
    },
    initAprRegionTown: (state: IAprRegionState, action: IArpRegionAction) => {
      state.town = action.payload
    },
    initAprRegionDisplayData: (state: IAprRegionState, action: IArpRegionDisplayAction) => {
      state.displayData = action.payload
    },
    initCountyData: (state: IAprRegionState, action: IInitCountyDataAction) => {
      state.countyData = action.payload
      state.county = action.payload['北部'][0].name
    },
    initTownData: (state: IAprRegionState, action: IInitTownDataAction) => {
      state.townData = action.payload
      state.town = action.payload['鄉鎮市區'][0].name
    }
  }
})

export const selectAprRegion = (state: any) => {
  return state.aprRegion as IAprRegionState
}

export const {
  initAprRegionCounty,
  initAprRegionTown,
  initAprRegionDisplayData,
  initCountyData,
  initTownData
} = aprRegionSlice.actions


const aprRegionReducer = persistReducer<IAprRegionState>(persistConfig, aprRegionSlice.reducer)

export default aprRegionReducer
