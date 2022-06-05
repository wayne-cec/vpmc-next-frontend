import { createSlice } from '@reduxjs/toolkit'
import { ICommitee } from '../../components/MapContainer/AprV2Map'

export interface ICommiteeAprDetail {
  transactionTime: string
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

interface IInitialState {
  commiteeInExtent: ICommitee[]
  currentCommitee: ICommitee | undefined
  currentCommiteeAprDetail: ICommiteeAprDetail | undefined
}

const init = {
  commiteeInExtent: [],
  currentCommitee: undefined,
  currentCommiteeAprDetail: undefined
} as IInitialState

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
    initCommiteeInExtent: (state: IInitialState, action: IInitCommiteeAction) => {
      state.commiteeInExtent = action.payload
    },
    initCurrentCommitee: (state: IInitialState, action: IInitCurrentCommiteeAction) => {
      state.currentCommitee = action.payload
    }
    ,
    initCurrentCommiteeAprDetail: (state: IInitialState, action: IInitCurrentCommiteeAprDetailAction) => {
      state.currentCommiteeAprDetail = action.payload
    }
  }
})

export const selectCommitee = (state: any) => {
  return state.commitee as IInitialState
}
export const {
  initCommiteeInExtent,
  initCurrentCommitee,
  initCurrentCommiteeAprDetail
} = commiteeSlice.actions
export default commiteeSlice.reducer
