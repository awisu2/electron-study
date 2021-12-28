import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './reducers/counter'
import displayReducer from './reducers/display'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    display: displayReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
