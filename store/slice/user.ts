import { createSlice } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import { persistConfig } from '../config'

export interface IUserInfo {
  token: string
}

const init = {
  token: ''
} as IUserInfo

export const userSlice = createSlice({
  name: 'user',
  initialState: init,
  reducers: {
    setUserToken: (state: IUserInfo, action: { type: string, payload: string }) => {
      state.token = action.payload
    }
  }
})

export const selectUser = (state: any) => {
  return state.user as IUserInfo
}

export const {
  setUserToken
} = userSlice.actions

const userReducer = persistReducer<IUserInfo>(persistConfig, userSlice.reducer)

export default userReducer



// export type UserState = {
//   token: string
// }

// const initialState: UserState = {
//   token: 'wwwww'
// }

// // const setUserToken = (state: IInitialState, action: { type: string, payload: string }) => {
// //   state.token = action.payload
// // }



// export const setUserToken = createAction<string>('user/setUserToken')

// export const userReducer = createReducer(initialState, builder => {
//   builder
//     .addCase(setUserToken, (state, { payload }) => {
//       state.token = payload
//     })
// })