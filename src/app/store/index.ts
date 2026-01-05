import { configureStore } from '@reduxjs/toolkit'
import settingsReducer from './settingsSlice'
import repetitionGameReducer from './repetitionGameSlice'

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    repetitionGame: repetitionGameReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
