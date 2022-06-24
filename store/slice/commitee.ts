import { createSlice } from '@reduxjs/toolkit'
import { ICommitee } from '../../components/MapContainer/AprV2Map'
import { persistConfig } from '../config'
import { persistReducer } from 'redux-persist'

export interface ICommiteeAprDetail {
  transactiontime: string
  transferFloor: number
  unitPrice: number
  priceWithoutParking: number
  roomNumber: number
  hallNumber: number
  bathNumber: number
  buildingTransferArea: number
  parkingSpacePrice: number
  parkingSpaceTransferArea: number
  price: number
}

interface ICommiteeState {
  commiteeInExtent: ICommitee[]
  currentCommitee: ICommitee | undefined
  currentCommiteeAprDetail: ICommiteeAprDetail | undefined
}

const init = {
  commiteeInExtent: [],
  currentCommitee: undefined,
  currentCommiteeAprDetail: undefined
} as ICommiteeState

interface IInitCommiteeAction {
  payload: ICommitee[]
  type: string
}

interface IInitCurrentCommiteeAction {
  payload: ICommitee
  type: string
}

interface IInitCurrentCommiteeAprDetailAction {
  payload: ICommiteeAprDetail
  type: string
}

export const commiteeSlice = createSlice({
  name: 'commitee',
  initialState: init,
  reducers: {
    initCommiteeInExtent: (state: ICommiteeState, action: IInitCommiteeAction) => {
      state.commiteeInExtent = action.payload
    },
    initCurrentCommitee: (state: ICommiteeState, action: IInitCurrentCommiteeAction) => {
      state.currentCommitee = action.payload
    }
    ,
    initCurrentCommiteeAprDetail: (state: ICommiteeState, action: IInitCurrentCommiteeAprDetailAction) => {
      state.currentCommiteeAprDetail = action.payload
    }
  }
})

export const selectCommitee = (state: any) => {
  return state.commitee as ICommiteeState
}
export const {
  initCommiteeInExtent,
  initCurrentCommitee,
  initCurrentCommiteeAprDetail
} = commiteeSlice.actions

const commiteeReducer = persistReducer<ICommiteeState>(persistConfig, commiteeSlice.reducer)

export default commiteeReducer
