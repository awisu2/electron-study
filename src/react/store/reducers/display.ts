/**
 * 画面情報管理
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '..'

export const DisplayMain = {
  top: 'top',
  config: 'config'
} as const
export type DisplayMain = typeof DisplayMain[keyof typeof DisplayMain]

interface DisplayState {
  main: DisplayMain
}

const initialState: DisplayState = {
  main: DisplayMain.top
}

export const displaySlice = createSlice({
  name: 'display',
  initialState,
  reducers: {
    setMain: (state, action: PayloadAction<DisplayMain>) => {
      state.main = action.payload
    }
  }
})

export const { setMain } = displaySlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectDisplay = (state: RootState): DisplayState => state.display
export const selectDisplayMain = (state: RootState): DisplayMain => state.display.main

export default displaySlice.reducer
