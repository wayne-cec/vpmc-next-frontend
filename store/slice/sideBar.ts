import { createSlice } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import { persistConfig } from '../config'

export type AdminPageType =
  | 'home'
  | 'userLogs'
  | 'user'
  | 'role'
  | 'functions'

export interface ISideBarConfig {
  toggled: boolean
  page: AdminPageType
}

const init = {
  toggled: false,
  page: 'userLogs',
} as ISideBarConfig

export const sideBarSlice = createSlice({
  name: 'sideBar',
  initialState: init,
  reducers: {
    onToggle: (state: ISideBarConfig, action: { type: string; payload: boolean }) => {
      state.toggled = action.payload
    },
    onPageChange: (state: ISideBarConfig, action: { type: string; payload: AdminPageType }) => {
      state.page = action.payload
    },
  },
})

export const selectSideBarConfig = (state: any) => {
  return state.sideBar as ISideBarConfig
}

export const { onToggle, onPageChange } = sideBarSlice.actions

const sideBarReducer = persistReducer<ISideBarConfig>(persistConfig, sideBarSlice.reducer)

export default sideBarReducer
