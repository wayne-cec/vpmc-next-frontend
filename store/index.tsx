import {
  configureStore,
  Action, ThunkAction, combineReducers, AnyAction
} from '@reduxjs/toolkit'
import commiteeReducer from './slice/commitee'
import aprRegionReducer from './slice/aprRegion'
import userReducer from './slice/user'
import { createWrapper, HYDRATE } from 'next-redux-wrapper'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'


const combinedReducer = combineReducers({
  commitee: commiteeReducer,
  aprRegion: aprRegionReducer,
  user: userReducer
})

export const store = configureStore({
  reducer: combinedReducer
})

export const persistor = persistStore(store)
export default store
// const myPersistReducer = persistReducer<>(persistConfig, userReducer)




// const reducer = (state: ReturnType<typeof combinedReducer>, action: AnyAction) => {
//   if (action.type === HYDRATE) {
//     const nextState: typeof combinedReducer = {
//       ...state,
//       ...action.payload
//     }
//     return nextState
//   } else {
//     return combinedReducer(state, action)
//   }
// }

// // export const store = configureStore({
// //   reducer: {
// //     commitee: commiteeReducer,
// //     aprRegion: aprRegionReducer,
// //     user: userReducer
// //   }
// // })

// const makeStore = () => (
//   configureStore({
//     // @ts-ignore
//     reducer,
//     devTools: true,
//   })
// )

// export type AppStore = ReturnType<typeof makeStore>
// export type AppState = ReturnType<AppStore['getState']>
// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>

// export const wrapper = createWrapper(makeStore, {
//   debug: true
// })





