import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

export const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2
}
