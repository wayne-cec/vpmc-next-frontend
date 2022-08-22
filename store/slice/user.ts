import { createSlice } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import { persistConfig } from '../config'

export type AppCode = 'info:bulletin' |
  'info:generalLaw' |
  'info:twTrend' |
  'info:licenseSta' |
  'info:admin' |
  'news:marquee' |
  'function:aprMap' |
  'function:surveySheet' |
  'function:marketCompare' |
  'function:batchMarketCompare' |
  'function:landDevelop' |
  'function:test'

export type RoleCode = 'user:basic' |
  'user:test' |
  'user:ccis' |
  'admin:ccis' |
  'admin:root'

export interface IApp {
  id: string
  name: string
  code: AppCode
}

export interface IUserRole {
  id: string
  name: string
  code: RoleCode
  apps: IApp[]
}

export interface IUserProfile {
  _userId: string
  username: string
  email: string
  alias: string | null
}

export interface IUserInfo {
  token: string
  userProfile: IUserProfile | null
  userRoles: IUserRole[] | undefined
}

const init = {
  token: '',
  userProfile: null,
  userRoles: undefined
} as IUserInfo

export const userSlice = createSlice({
  name: 'user',
  initialState: init,
  reducers: {
    setUserToken: (state: IUserInfo, action: { type: string, payload: string }) => {
      state.token = action.payload
    },
    setUserProfile: (state: IUserInfo, action: { type: string, payload: IUserProfile }) => {
      state.userProfile = action.payload
    },
    setUserRoles: (state: IUserInfo, action: { type: string, payload: IUserRole[] }) => {
      state.userRoles = action.payload
    }
  }
})

export const selectUser = (state: any) => {
  return state.user as IUserInfo
}

export const selectUserRoles = (state: any) => {
  const userRoles = (state.user as IUserInfo).userRoles
  if (!userRoles) return []
  return userRoles
}

export const selectUserApps = (state: any) => {
  const userRoles = (state.user as IUserInfo).userRoles
  if (!userRoles) return []
  const apps: IApp[] = []
  userRoles.forEach((role) => {
    role.apps.forEach((app) => {
      if (!apps.includes(app)) apps.push(app)
    })
  })
  return apps
}

export const isAppPermitted = (appCode: AppCode, apps: IApp[]) => {
  let permittedApps = apps.filter(app => app.code === appCode)
  if (permittedApps.length === 0) return false
  return true
}

export const {
  setUserToken,
  setUserProfile,
  setUserRoles
} = userSlice.actions

const userReducer = persistReducer<IUserInfo>(persistConfig, userSlice.reducer)

export default userReducer