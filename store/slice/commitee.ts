import { createSlice } from '@reduxjs/toolkit'
import { ICommitee } from '../../components/MapContainer/AprV2Map'

interface IInitialState {
  commiteeInExtent: ICommitee[]
}

const init = {
  commiteeInExtent: []
} as IInitialState

interface IInitCommiteeAction {
  payload: ICommitee[]
  type: string
}

export const commiteeSlice = createSlice({
  name: 'commitee',
  initialState: init,
  reducers: {
    initCommiteeInExtent: (state: IInitialState, action: IInitCommiteeAction) => {
      state.commiteeInExtent = action.payload
    }
  }
})

export const selectCommitee = (state: any) => {
  return state.commitee as IInitialState
}
export const {
  initCommiteeInExtent
} = commiteeSlice.actions
export default commiteeSlice.reducer
